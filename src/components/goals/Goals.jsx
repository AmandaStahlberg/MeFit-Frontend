import React, { useState } from "react";

// Handle isAchieved state on each checkbox

export default function Goals() {
  const [isAchieved, setIsAchieved] = useState(false);
  const toggleAchieved = () => setIsAchieved((value) => !value);
  const dummyData = [
    { goal: "Goal ett", achieved: isAchieved, endDate: "2023-03-31" },
    { goal: "Goal två", achieved: isAchieved, endDate: "2023-03-28" },
    { goal: "Goal tre", achieved: isAchieved, endDate: "2023-03-17" },
    { goal: "Goal fyra", achieved: isAchieved, endDate: "2023-04-10" },
  ];
  return (
    <ul>
      {dummyData.map((goal, key) =>
        goal.achieved == false ? (
          <li
            key={key}
            className="flex justify-between focus:bg-gray-900 focus:text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
          >
            <div className="text-left">
              <p>{goal.goal}</p>
              <p>End: {goal.endDate}</p>
            </div>
            <input
              type="checkbox"
              class=""
              checked={isAchieved}
              onChange={toggleAchieved}
            />
          </li>
        ) : null
      )}
    </ul>
  );
}

export function CompletedGoals() {
  const [isAchieved, setIsAchieved] = useState(true);
  const toggleAchieved = () => setIsAchieved((value) => !value);
  const dummyData = [
    { goal: "Completed Goal ett", achieved: isAchieved, endDate: "2023-03-04" },
    { goal: "Completed Goal två", achieved: isAchieved, endDate: "2023-03-07" },
  ];
  return (
    <ul>
      {dummyData.map((goal, key) =>
        goal.achieved == true ? (
          <li
            key={key}
            className="flex justify-between focus:bg-gray-900 focus:text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
          >
            <div className="text-left">
              <p>{goal.goal}</p>
              <p>End: {goal.endDate}</p>
            </div>
          </li>
        ) : null
      )}
    </ul>
  );
}
