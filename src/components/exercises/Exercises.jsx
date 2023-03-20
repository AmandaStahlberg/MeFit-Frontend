import React from "react";
import { useState, useEffect } from "react";
import keycloak from "../../keycloak";

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
          // handleNoUser();
          throw new Error("Response not OK");
        }
      })
      .then((data) => {
        setExercises(data);
        setExercisesFetched(true);
      })
      .catch((error) => console.error(error));
  };
  return (
    <ul>
      {exercises.map((exercise, key) => (
        <li
          key={key}
          className="flex justify-between focus:bg-gray-900 focus:text-white text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          <div className="text-left">
            <p>{exercise.name}</p>
            <i>Description: {exercise.description}</i>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Exercises;
