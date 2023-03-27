import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import keycloak from "../../keycloak";

export default function Goals() {
  const user = useSelector((state) => state.user.user);
  const [profileId, setProfileId] = useState([]);
  const [goals, setGoals] = useState([]);
  const [expandedGoalIndex, setExpandedGoalIndex] = useState(null);
  const [checkedPrograms, setCheckedPrograms] = useState(new Map());

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchProfile = () => {
      fetch(`http://localhost:8080/api/v1/profile/${user.user_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            console.log("no profile found");
          }
        })
        .then((data) => {
          setProfileId(data.profile_id);
          setGoals(data.goals);
        })
        .catch((error) => console.error(error));
    };

    fetchProfile();
  }, [user]);

  function toggleExpanded(index) {
    setExpandedGoalIndex(index === expandedGoalIndex ? null : index);
  }

  function handleProgramCheck(goalIndex, programIndex) {
    const newCheckedPrograms = new Map(checkedPrograms);
    const checkedProgramsForGoal =
      newCheckedPrograms.get(goalIndex) || new Set();

    if (checkedProgramsForGoal.has(programIndex)) {
      checkedProgramsForGoal.delete(programIndex);
    } else {
      checkedProgramsForGoal.add(programIndex);
    }
    newCheckedPrograms.set(goalIndex, checkedProgramsForGoal);
    setCheckedPrograms(newCheckedPrograms);
  }

  const programCompleted = () => {
    console.log("hej");
  };

  return (
    <div>
      <ul>
        {goals &&
          goals.map((goal, goalIndex) => (
            <li key={goalIndex} className="flex justify-between">
              <div className="text-left w-full">
                <div
                  className="focus:bg-gray-900 focus:text-white text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer"
                  onClick={() => toggleExpanded(goalIndex)}
                >
                  <h3 className="text-lg">Goal {goalIndex + 1}</h3>
                  <p>End Date: {goal.endDate}</p>
                </div>
                {expandedGoalIndex === goalIndex && (
                  <div className="px-3 py-2 ">
                    <h4 className="text-base">Programs:</h4>
                    {goal.programs.map((program, programIndex) => (
                      <div key={programIndex}>
                        <p>Name: {program.name}</p>
                        <i>Category: {program.category}</i>
                        <input
                          type="checkbox"
                          checked={
                            checkedPrograms.get(goalIndex)?.has(programIndex) ||
                            false
                          }
                          onChange={() =>
                            handleProgramCheck(goalIndex, programIndex)
                          }
                        />
                        <p>Completed: {program.completed ? "Yes" : "No"}</p>
                        {checkedPrograms.get(goalIndex)?.has(programIndex) && (
                          <button onClick={programCompleted}>
                            Claim reward
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
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
