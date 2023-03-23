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
  console.log(user);

  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchUser();
  }, []);

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
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
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
