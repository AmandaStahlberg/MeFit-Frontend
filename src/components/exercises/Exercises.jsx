import React from "react";

const dummyData = [
  {
    name: "Push up",
    description:
      "Pushups are done in prone position with palms under shoulders, balls of feet on the ground. The body is pushed up and down with arms straightening and bending alternately, while keeping the back straight.",
  },
  {
    name: "Chins",
    description: "Hang in a bar and drag your self up and down.",
  },
  { name: "Bicep curls", description: "Curl a dumbbell up and down" },
  { name: "Spinning", description: "Pedal spinning bike" },
];

function Exercises() {
  return (
    <ul>
      {dummyData.map((exercise, key) => (
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
