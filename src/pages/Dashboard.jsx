import React, { useState, useEffect } from "react";
import Goals from "../components/goals/Goals";
import Programs from "../components/programs/Programs";
import TimeAndDate from "../components/timeAndDate/TimeAndDate";
import keycloak from "../keycloak";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [userFetched, setUserFetched] = useState(false);

    useEffect(() => {
        if (!userFetched) {
            fetchUser();
        }
    }, [userFetched]);

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
                } else {
                    handleNoUser();
                    throw new Error("Response not OK");
                }
            })
            .then((data) => {
                console.log("test", data);
                setUser(data);
                setUserFetched(true);
            })
            .catch((error) => console.error(error));
    };

    const handleNoUser = () => {
        console.log("fired");
        if (!user) {
            fetch(`http://localhost:8080/api/v1/users`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("res", response);
                    } else {
                        console.log("hej");
                        throw new Error("Response not OK");
                    }
                })
                .then((data) => {
                    console.log(data);
                    setUser(data);
                    setUserFetched(true);
                })
                .catch((error) => console.error(error));
        } else {
            setUserFetched(true);
        }
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
                            Training programs
                        </h1>
                        <Programs />
                    </div>
                    <div className="col-span-1 grid grid-rows-3 gap-6">
                        <div className="grid row-span-1 bg-white shadow-md border border-stone-100 place-content-center">
                            <TimeAndDate />
                        </div>
                        <div className="row-span-2 bg-white shadow-md border border-stone-100 text-center p-4">
                            <h1 className="text-xl font-bold tracking-tight text-gray-900">
                                Goals
                            </h1>
                            <Goals />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
