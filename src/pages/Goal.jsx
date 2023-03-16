import React from "react";
import Goals, { CompletedGoals } from "../components/goals/Goals";
import keycloak from "../keycloak";

export default function Goal() {
  return (
    <>
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
          <div className="grid grid-cols-2 gap-6 h-full">
            <div className="col-span-1 bg-white shadow-md border border-stone-100 text-center p-4">
              <h5 className="text-xl font-bold tracking-tight">Goals</h5>
              <Goals />
            </div>
            <div className="col-span-1 bg-white shadow-md border border-stone-100 text-center p-4">
              <h5 className="text-xl font-bold tracking-tight">
                Completed goals
              </h5>
              <CompletedGoals />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
