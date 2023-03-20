import React, { useEffect, useState } from "react";
import keycloak from "../../keycloak";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [workoutsFetched, setWorkoutsFetched] = useState(false);

  useEffect(() => {
    if (!workoutsFetched) {
      fetchWorkouts();
    }
  }, [workoutsFetched]);

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
          // handleNoUser();
          throw new Error("Response not OK");
        }
      })
      .then((data) => {
        setWorkouts(data);
        setWorkoutsFetched(true);
      })
      .catch((error) => console.error(error));
  };
  return (
    <ul>
      {workouts.map((workout, key) => (
        <li
          key={key}
          className="flex justify-between focus:bg-gray-900 focus:text-white text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          <div className="text-left">
            <p>{workout.name}</p>
            <i>Type: {workout.type}</i>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Workouts;
