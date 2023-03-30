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
            className="flex justify-between text-gray-700 border-2 rounded-b-mb rounded-mb border-t-0  px-3 py-2 mb-4 text-sm font-medium"
          >
            <div className="text-left w-5/6">
              <p className="font-bold">{exercise.name}</p>
              <i>Description: {exercise.description}</i>
            </div>
            {keycloak.hasResourceRole(ROLES.Admin) && (
              <div>
                <button onClick={() => deleteExercise(exercise.exercise_id)}>
                  <TrashIcon className="h-4 w-4 hover:text-red-700 hover:cursor-pointer" />
                </button>
                <EditExercisesModal
                  exercise={exercise}
                  setExercisesFetched={setExercisesFetched}
                />
              </div>
            )}
          </li>
        ))}
    </ul>
  );
}

export default Exercises;
