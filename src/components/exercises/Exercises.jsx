import React from "react";
import { useState, useEffect } from "react";
import keycloak from "../../keycloak";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ROLES } from "../../const/roles";
import EditExercisesModal from "../modals/EditExerciseModal";

function Exercises({ exercises, deleteExercise, setExercisesFetched }) {
    return (
        <ul>
            {exercises &&
                exercises.map((exercise, key) => (
                    <li
                        key={key}
                        className="flex justify-between focus:bg-gray-900 focus:text-white text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                        <div className="text-left w-5/6">
                            <p>{exercise.name}</p>
                            <i>Description: {exercise.description}</i>
                        </div>
                        {keycloak.hasResourceRole(ROLES.Admin) && (
                            <button
                                onClick={() =>
                                    deleteExercise(exercise.exercise_id)
                                }
                            >
                                <TrashIcon className="h-4 w-4 hover:text-red-700 hover:cursor-pointer" />
                            </button>
                        )}
                        <div>
                            <button
                                onClick={() =>
                                    deleteExercise(exercise.exercise_id)
                                }
                            >
                                <TrashIcon className="h-6 w-6 hover:text-red-700 hover:cursor-pointer" />
                            </button>
                            <EditExercisesModal
                                exercise={exercise}
                                setReload={setExercisesFetched}
                            />
                        </div>
                    </li>
                ))}
        </ul>
    );
}

export default Exercises;
