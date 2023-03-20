import React from "react";

const dummyData = [
  { name: "Biceps", type: "Strength" },
  { name: "Triceps", type: "Strength" },
  { name: "Condition", type: "Cardio" },
  { name: "Lower legs", type: "Strength" },
];

function Workouts() {
  return (
    <ul>
      {dummyData.map((workout, key) => (
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