import React, { useEffect, useState } from "react";
import keycloak from "../../keycloak";
import { useSelector } from "react-redux";

export default function Goals() {
  const user = useSelector((state) => state.user.user);
  console.log(user);

  const [profile, setProfile] = useState([]);
  const [isAchieved, setIsAchieved] = useState(false);
  const [goals, setGoals] = useState([]);
  const [goalsFetched, setGoalsFetched] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedGoalIndex, setExpandedGoalIndex] = useState(null);

  useEffect(() => {
    if (!goalsFetched) {
      fetchGoals();
    }
  }, [goalsFetched]);

  function toggleExpanded(index) {
    setExpandedGoalIndex(index === expandedGoalIndex ? null : index);
  }

  const fetchGoals = () => {
    fetch(`http://localhost:8080/api/v1/goal/list?ids=`, {
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
        setGoals(data);
        setGoalsFetched(true);
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <ul>
      {goals.map((goal, key) => (
        <li
          onClick={() => toggleExpanded(key)}
          key={key}
          className="flex justify-between focus:bg-gray-900 focus:text-white text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer"
        >
          <div className="text-left w-5/6">
            <p className="text-lg">{goal.start_date}</p>
            <i className="text-base">{goal.type}</i>
            {/* {expandedGoalIndex === key && (
              <div className="pt-3 pb-3">
                <b>Exercises:</b>
                {goal.exercises.map((exercise, key) => (
                  <div className="pb-2" key={key}>
                    <p>{exercise.name}</p>
                    <i>{exercise.description}</i>
                  </div>
                ))}
              </div>
            )} */}
          </div>
          {/* <button onClick={() => deleteWorkout(goal.workout_id)}>
            <TrashIcon className="h-4 w-4 hover:text-red-700 hover:cursor-pointer" />
          </button> */}
        </li>
      ))}
    </ul>
  );
}

// export function CompletedGoals() {
//   const [isAchieved, setIsAchieved] = useState(true);
//   const [dummyData, setDummyData] = useState([
//     { goal: "Completed Goal ett", achieved: isAchieved, endDate: "2023-03-04" },
//     { goal: "Completed Goal två", achieved: isAchieved, endDate: "2023-03-07" },
//   ]);
//   const toggleAchieved = (index) => {
//     const newGoals = [...dummyData];
//     newGoals[index].achieved = !newGoals[index].achieved;
//     setDummyData(newGoals);
//   };

//   // useEffect(() => {
//   //   if (isAchieved) {
//   //     const newGoal = [...dummyData];
//   //     console.log(newGoal);
//   //   }
//   // }, [isAchieved]);

//   return (
//     <ul>
//       {dummyData.map((goal, key) =>
//         goal.achieved === true ? (
//           <li
//             key={key}
//             className="flex justify-between text-gray-700rounded-md px-3 py-2 text-sm font-medium"
//           >
//             <div className="text-left">
//               <p>{goal.goal}</p>
//               <p>End: {goal.endDate}</p>
//             </div>
//             <input
//               type="checkbox"
//               className=""
//               checked={isAchieved}
//               onChange={() => {
//                 toggleAchieved(key);
//               }}
//             />
//           </li>
//         ) : null
//       )}
//     </ul>
//   );
// }
