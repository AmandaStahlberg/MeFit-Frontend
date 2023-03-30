import React, { useEffect, useState } from "react";
import keycloak from "../../keycloak";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ROLES } from "../../const/roles";

function Workouts({ workouts, setWorkouts, deleteWorkout }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedWorkoutIndex, setExpandedWorkoutIndex] = useState(null);
  const [bgColorOnClick, setBgColorOnClick] = useState(false);

  function toggleExpanded(index) {
    setExpandedWorkoutIndex(index === expandedWorkoutIndex ? null : index);
    setBgColorOnClick(!bgColorOnClick);
  }

  return (
    <ul>
      {workouts.map((workout, key) => (
        <li key={key} className="flex justify-between pt-1 py-0">
          <div className="text-left w-full mb-2">
            {/* <div className="text-left w-5/6"> */}
            <div
              onClick={() => toggleExpanded(key)}
              className={
                expandedWorkoutIndex === key
                  ? "flex justify-between hover:bg-gray-600 border-2 rounded-b-md border-t-0 border-gray-700 text-white bg-gray-700 rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer"
                  : "flex justify-between border-2 rounded-b-md border-t-0 focus:bg-gray-900 focus:text-white text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer"
              }
            >
              <div>
                <p className="text-lg">{workout.name}</p>
                <i className="text-base">{workout.type}</i>
              </div>
              {keycloak.hasResourceRole(ROLES.Admin) && (
                <div className="">
                  <button onClick={() => deleteWorkout(workout.workout_id)}>
                    <TrashIcon className="h-4 w-4 hover:text-red-700 hover:cursor-pointer" />
                  </button>
                </div>
              )}
            </div>
            {expandedWorkoutIndex === key && (
              <div className="px-3 pt-3 pb-5 border-2 rounded-b-md border-t-0">
                <p className="font-bold">Exercises:</p>
                {workout.exercises.map((exercise, key) => (
                  <div className="pb-2" key={key}>
                    <p className="font-bold">{exercise.name}</p>
                    <i>{exercise.description}</i>
                  </div>
                ))}
              </div>
            )}
            {/* </div> */}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Workouts;
