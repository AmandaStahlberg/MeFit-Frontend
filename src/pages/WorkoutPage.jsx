import WorkoutsModal from "../components/modals/WorkoutsModal";
import Workouts from "../components/workouts/Workouts";
import { ROLES } from "../const/roles";
import keycloak from "../keycloak";
import React, { useEffect, useState } from "react";

export default function Workout() {
    const [workouts, setWorkouts] = useState([]);
    const [workoutsFetched, setWorkoutsFetched] = useState(false);

    useEffect(() => {
        if (!workoutsFetched) {
            fetchWorkouts();
        }
    }, [workoutsFetched]);

    const fetchWorkouts = () => {
        fetch(`http://localhost:8080/api/v1/workouts`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Response not OK");
                }
            })
            .then((data) => {
                setWorkouts(data);
                setWorkoutsFetched(true);
                console.log(data);
            })
            .catch((error) => console.error(error));
    };
    const deleteWorkout = (id) => {
        fetch("http://localhost:8080/api/v1/workouts/" + id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
                "Content-Type": "application/json",
            },
        }).then((res) => {
            fetchWorkouts();
        });
    };
    return (
        <>
            <div className="h-screen">
                <header className="">
                    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                        {keycloak.tokenParsed && (
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                {keycloak.tokenParsed.name}, workouts
                            </h1>
                        )}
                    </div>
                </header>
                <main className="h-3/4">
                    <div className="grid grid-cols-1 gap-6 h-full">
                        <div className="col-span-1 bg-white shadow-md border border-stone-100 text-center p-4">
                            <h5 className="text-xl font-bold tracking-tight">
                                Workouts
                            </h5>
                            <Workouts
                                workouts={workouts}
                                setWorkouts={setWorkouts}
                                deleteWorkout={deleteWorkout}
                            />
                        </div>
                        {keycloak.hasResourceRole(ROLES.Admin) && (
                            <WorkoutsModal
                                workouts={workouts}
                                setWorkouts={setWorkouts}
                            />
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
