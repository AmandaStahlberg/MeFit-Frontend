import React from "react";
import { useState, useEffect } from "react";
import keycloak from "../../keycloak";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ROLES } from "../../const/roles";
import EditExercisesModal from "../modals/EditExerciseModal";

function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [exercisesFetched, setExercisesFetched] = useState(false);

  useEffect(() => {
    if (!exercisesFetched) {
      fetchExercises();
    }
  }, [exercisesFetched]);

  const fetchExercises = () => {
    fetch(`http://localhost:8080/api/v1/exercises`, {
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
        setExercises(data);
      })
      .then(() => {
        setExercisesFetched(true);
      })
      .catch((error) => console.error(error));
  };

  const deleteExercise = (id) => {
    fetch("http://localhost:8080/api/v1/exercises/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setExercisesFetched(false);
    });
  };
  return (
    <ul>
      {exercises.map((exercise, key) => (
        <li
          key={key}
          className="flex justify-between focus:bg-gray-900 focus:text-white text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          <div className="text-left w-5/6">
            <p>{exercise.name}</p>
            <i>Description: {exercise.description}</i>
          </div>
          {keycloak.hasResourceRole(ROLES.Admin) && (
            <div>
              <button onClick={() => deleteExercise(exercise.exercise_id)}>
                <TrashIcon className="h-6 w-6 hover:text-red-700 hover:cursor-pointer" />
              </button>
              <EditExercisesModal
                exercise={exercise}
                setReload={setExercisesFetched}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Exercises;
