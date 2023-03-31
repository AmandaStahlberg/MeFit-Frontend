import React, { useState, useEffect, useRef } from "react";
import Goals from "../components/goals/Goals";
import Programs from "../components/programs/Programs";
import TimeAndDate from "../components/timeAndDate/TimeAndDate";
import keycloak from "../keycloak";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/user";
import { useSelector } from "react-redux";

export default function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [profileId, setProfileId] = useState([]);
    const [goals, setGoals] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [programsFetched, setProgramsFetched] = useState(false);

    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchUser();
    }, []);

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

    useEffect(() => {
        if (!programsFetched) {
            fetchPrograms();
        }
    }, [programsFetched]);

    const fetchPrograms = () => {
        fetch(`http://localhost:8080/api/v1/programs`, {
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
                setPrograms(data);
                setProgramsFetched(true);
            })
            .catch((error) => console.error(error));
    };

    const fetchUser = () => {
        fetch(`http://localhost:8080/api/v1/users/keycloak`, {
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
                    handleNoUser();
                }
            })
            .then((data) => {
                dispatch(setUser(data));
            })
            .catch((error) => console.error(error));
    };

    const handleNoUser = () => {
        fetch(`http://localhost:8080/api/v1/users`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(setUser(data));
                const profileBody = {
                    height: 0,
                    weight: 0,
                    disabilities: "none",
                    medicalConditions: "none",
                    user: {
                        user_id: data.user_id,
                    },
                };
                fetch(`http://localhost:8080/api/v1/profile`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(profileBody),
                })
                    .then((response) => {
                        if (response.ok) {
                            console.log("Profile created successfully");
                        } else {
                            console.error("Failed to create profile");
                        }
                    })
                    .then((data) => console.log("data", data))
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    };
    const deleteProgram = (id) => {
        fetch("http://localhost:8080/api/v1/programs/" + id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
                "Content-Type": "application/json",
            },
        }).then((res) => {
            fetchPrograms();
        });
    };

    return (
        <div className="h-screen">
            <header className="">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    {keycloak.tokenParsed && (
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Welcome, &nbsp;
                            {keycloak.tokenParsed.name}
                        </h1>
                    )}
                </div>
            </header>
            <main className="h-3/4">
                <div className="grid grid-cols-3 gap-6 h-full">
                    <div className="col-span-2 bg-white shadow-md border border-stone-100 text-center p-4">
                        <h1 className="text-xl font-bold tracking-tight text-gray-900">
                            Goals
                        </h1>
                        <Goals
                            goals={goals}
                            setGoals={setGoals}
                            profileId={profileId}
                            setProfileId={setProfileId}
                        />
                    </div>
                    <div className="col-span-1 grid grid-rows-3 gap-6">
                        <div className="grid row-span-1 bg-white shadow-md border border-stone-100 place-content-center">
                            <TimeAndDate />
                        </div>
                        <div className="row-span-2 bg-white shadow-md border border-stone-100 text-center p-4">
                            <h1 className="text-xl font-bold tracking-tight text-gray-900">
                                Training programs
                            </h1>
                            <Programs
                                programs={programs}
                                deleteProgram={deleteProgram}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
