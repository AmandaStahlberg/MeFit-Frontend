import React, { useEffect, useState } from "react";
import keycloak from "../../keycloak";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ROLES } from "../../const/roles";

function Programs({ programs, deleteProgram }) {
    const [expandedWorkoutIndex, setExpandedWorkoutIndex] = useState(null);
    const [bgColorOnClick, setBgColorOnClick] = useState(false);

    function toggleExpanded(index) {
        setExpandedWorkoutIndex(index === expandedWorkoutIndex ? null : index);
        setBgColorOnClick(!bgColorOnClick);
    }

    return (
        <ul>
            {programs &&
                programs.map((program, key) => (
                    <li key={key} className="flex justify-between pt-1 py-0">
                        <div className="text-left w-full mb-2">
                            <div
                                onClick={() => toggleExpanded(key)}
                                className={
                                    expandedWorkoutIndex === key
                                        ? "flex justify-between hover:bg-gray-600 border-2 rounded-b-md border-t-0 border-gray-700 text-white bg-gray-700 rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer"
                                        : "flex justify-between border-2 rounded-b-md border-t-0 focus:bg-gray-900 focus:text-white text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer"
                                }
                            >
                                <div>
                                    <p className="text-lg">{program.name}</p>
                                    <i className="text-base">
                                        {program.category}
                                    </i>
                                </div>
                                {keycloak.hasResourceRole(ROLES.Admin) && (
                                    <div className="">
                                        <button
                                            onClick={() =>
                                                deleteProgram(
                                                    program.program_id
                                                )
                                            }
                                        >
                                            <TrashIcon className="h-4 w-4 hover:text-red-700 hover:cursor-pointer" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            {expandedWorkoutIndex === key && (
                                <div className=" px-3 pt-2 pb-5 shadow-md border border-stone-100 rounded-md ">
                                    <ul className="pt-3 pb-3">
                                        <p className="text-md font-bold pb-2">
                                            Workouts in this program:
                                        </p>
                                        {program.workouts.map(
                                            (workout, key) => (
                                                <div
                                                    className="pb-5 border-2 mb-3 rounded-md p-2"
                                                    key={key}
                                                >
                                                    <p className="font-bold">
                                                        {workout.name}
                                                    </p>
                                                    <i>Type: {workout.type}</i>
                                                    <p className="pt-2 font-bold pl-3">
                                                        Exercises:
                                                    </p>
                                                    {workout.exercises.map(
                                                        (exercise, index) => (
                                                            <li
                                                                key={index}
                                                                className="pl-3 py-0"
                                                            >
                                                                <p className="font-bold">
                                                                    {
                                                                        exercise.name
                                                                    }
                                                                </p>
                                                                <i>
                                                                    {
                                                                        exercise.description
                                                                    }
                                                                </i>
                                                            </li>
                                                        )
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                            {keycloak.hasResourceRole(ROLES.Admin) &&
                            keycloak.hasResourceRole(ROLES.Contributor) ? (
                                <button
                                    onClick={() =>
                                        deleteProgram(program.program_id)
                                    }
                                >
                                    <TrashIcon className="h-4 w-4 hover:text-red-700 hover:cursor-pointer" />
                                </button>
                            ) : null}
                        </div>
                    </li>
                ))}
        </ul>
    );
}

export default Programs;
