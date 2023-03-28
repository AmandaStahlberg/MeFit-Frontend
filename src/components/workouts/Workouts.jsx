import React, { useEffect, useState } from "react";
import keycloak from "../../keycloak";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ROLES } from "../../const/roles";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [workoutsFetched, setWorkoutsFetched] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedWorkoutIndex, setExpandedWorkoutIndex] = useState(null);

  useEffect(() => {
    if (!workoutsFetched) {
      fetchWorkouts();
    }
  }, [workoutsFetched]);

  function toggleExpanded(index) {
    setExpandedWorkoutIndex(index === expandedWorkoutIndex ? null : index);
  }

  const fetchWorkouts = () => {
    fetch(`http://localhost:8080/api/v1/workouts`, {
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
        setWorkouts(data);
        setWorkoutsFetched(true);
        console.log(data);
      })
      .catch((error) => console.error(error));
  };
  const deleteWorkout = (id) => {
    fetch("http://localhost:8080/api/v1/workouts/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      fetchWorkouts();
    });
  };
  return (
    <ul>
      {workouts.map((workout, key) => (
        <li
          onClick={() => toggleExpanded(key)}
          key={key}
          className="flex justify-between focus:bg-gray-900 focus:text-white text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer"
        >
          <div className="text-left w-5/6">
            <p className="text-lg">{workout.name}</p>
            <i className="text-base">{workout.type}</i>
            {expandedWorkoutIndex === key && (
              <div className="pt-3 pb-3">
                <b>Exercises:</b>
                {workout.exercises.map((exercise, key) => (
                  <div className="pb-2" key={key}>
                    <p>{exercise.name}</p>
                    <i>{exercise.description}</i>
                  </div>
                ))}
              </div>
            )}
          </div>
          {keycloak.hasResourceRole(ROLES.Admin) && (
            <button onClick={() => deleteWorkout(workout.workout_id)}>
              <TrashIcon className="h-4 w-4 hover:text-red-700 hover:cursor-pointer" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Workouts;
