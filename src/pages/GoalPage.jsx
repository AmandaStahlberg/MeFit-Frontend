import React, { useState, useEffect } from "react";
import Goals, { CompletedGoals } from "../components/goals/Goals";
import GoalsModal from "../components/modals/GoalsModal";
import keycloak from "../keycloak";
import { useSelector } from "react-redux";

export default function Goal() {
    const user = useSelector((state) => state.user.user);
    const [profileId, setProfileId] = useState([]);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        if (!user) {
            return;
        }
        const fetchProfile = () => {
            fetch(`http://localhost:8080/api/v1/profile/${user.user_id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else if (response.status === 404) {
                        console.log("no profile found");
                    }
                })
                .then((data) => {
                    setProfileId(data.profile_id);
                    setGoals(data.goals);
                })
                .catch((error) => console.error(error));
        };

        fetchProfile();
    }, [user]);

    return (
        <div className="h-screen">
            <header className="">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    {keycloak.tokenParsed && (
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            {keycloak.tokenParsed.name}, this is your Goals
                        </h1>
                    )}
                </div>
            </header>
            <main className="h-3/4">
                <div className="grid grid-cols-1 gap-6 h-full">
                    <div className="col-span-1 bg-white shadow-md border border-stone-100 text-center p-4">
                        <h5 className="text-xl font-bold tracking-tight">
                            Goals
                        </h5>
                        <Goals
                            goals={goals}
                            setGoals={setGoals}
                            profileId={profileId}
                            setProfileId={setProfileId}
                        />
                        <div className="pt-8">
                            <GoalsModal goals={goals} setGoals={setGoals} />
                        </div>
                    </div>
                    {/* <div className="col-span-1 bg-white shadow-md border border-stone-100 text-center p-4">
            <h5 className="text-xl font-bold tracking-tight">
              Completed goals
            </h5>
            <CompletedGoals />
          </div> */}
                </div>
            </main>
        </div>
    );
}
