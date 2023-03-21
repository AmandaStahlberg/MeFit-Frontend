import React, { useEffect, useState } from "react";

// Handle isAchieved state on each checkbox

export default function Goals() {
  const [isAchieved, setIsAchieved] = useState(false);
  const [dummyData, setDummyData] = useState([
    { goal: "Goal ett", achieved: isAchieved, endDate: "2023-03-31" },
    { goal: "Goal två", achieved: isAchieved, endDate: "2023-03-28" },
    { goal: "Goal tre", achieved: isAchieved, endDate: "2023-03-17" },
    { goal: "Goal fyra", achieved: isAchieved, endDate: "2023-04-10" },
  ]);
  const toggleAchieved = (index) => {
    const newGoals = [...dummyData];
    newGoals[index].achieved = !newGoals[index].achieved;
    setDummyData(newGoals);
  };

  useEffect(() => {
    if (!isAchieved) {
      // const newGoal = [...dummyData];
      // console.log(newGoal, "new");
      console.log(dummyData);
    }
  }, [dummyData]);
  return (
    <ul>
      {dummyData.map((goal, key) =>
        goal.achieved === false ? (
          <li
            key={key}
            className="flex justify-between focus:bg-gray-900 focus:text-white text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
          >
            <div className="text-left">
              <p>{goal.goal}</p>
              <p>End: {goal.endDate}</p>
            </div>
            <input
              type="checkbox"
              className=""
              checked={isAchieved}
              onChange={() => {
                toggleAchieved(key);
              }}
            />
          </li>
        ) : null
      )}
    </ul>
  );
}

export function CompletedGoals() {
  const [isAchieved, setIsAchieved] = useState(true);
  const [dummyData, setDummyData] = useState([
    { goal: "Completed Goal ett", achieved: isAchieved, endDate: "2023-03-04" },
    { goal: "Completed Goal två", achieved: isAchieved, endDate: "2023-03-07" },
  ]);
  const toggleAchieved = (index) => {
    const newGoals = [...dummyData];
    newGoals[index].achieved = !newGoals[index].achieved;
    setDummyData(newGoals);
  };

  // useEffect(() => {
  //   if (isAchieved) {
  //     const newGoal = [...dummyData];
  //     console.log(newGoal);
  //   }
  // }, [isAchieved]);

  return (
    <ul>
      {dummyData.map((goal, key) =>
        goal.achieved === true ? (
          <li
            key={key}
            className="flex justify-between text-gray-700rounded-md px-3 py-2 text-sm font-medium"
          >
            <div className="text-left">
              <p>{goal.goal}</p>
              <p>End: {goal.endDate}</p>
            </div>
            <input
              type="checkbox"
              className=""
              checked={isAchieved}
              onChange={() => {
                toggleAchieved(key);
              }}
            />
          </li>
        ) : null
      )}
    </ul>
  );
}
