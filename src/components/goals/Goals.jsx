import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import keycloak from "../../keycloak";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Goals() {
  const user = useSelector((state) => state.user.user);
  const [profileId, setProfileId] = useState([]);
  const [goals, setGoals] = useState([]);
  const [expandedGoalIndex, setExpandedGoalIndex] = useState(null);
  const [checkedPrograms, setCheckedPrograms] = useState(new Map());
  const [bgColorOnClick, setBgColorOnClick] = useState(false);

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

  // const deleteGoal = (id) => {
  //   fetch("http://localhost:8080/api/v1/goals/" + id, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${keycloak.token}`,
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => {
  //     console.log(res);
  //     // fetchProfile();
  //   });
  // };

  function toggleExpanded(index) {
    setExpandedGoalIndex(index === expandedGoalIndex ? null : index);
    setBgColorOnClick(!bgColorOnClick);
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
    console.log(goals);
  };

  return (
    <div>
      <ul className="w-full">
        {goals &&
          goals.map((goal, goalIndex) =>
            goal.achieved === false ? (
              <li key={goalIndex} className="flex justify-between pt-1 py-0">
                <div className="text-left w-full">
                  <div
                    className={
                      expandedGoalIndex === goalIndex
                        ? "hover:bg-gray-600 text-white bg-gray-700 rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer"
                        : "focus:bg-gray-900 focus:text-white text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer"
                    }
                    onClick={() => toggleExpanded(goalIndex)}
                  >
                    <h3 className="text-lg">Goal {goalIndex + 1}</h3>
                    <p>End Date: {goal.endDate}</p>
                  </div>
                  {expandedGoalIndex === goalIndex && (
                    <div className="px-3 pt-2 pb-5 border-2 rounded-b-md border-t-0">
                      <h4 className="text-base">Programs:</h4>
                      {goal.programs.map((program, programIndex) => (
                        <>
                          <div
                            className="flex justify-between"
                            key={programIndex}
                          >
                            <div>
                              <p>Name: {program.name}</p>
                              <i>Category: {program.category}</i>
                            </div>
                            <input
                              className="accent-purple-500 focus:accent-purple-600 hover:cursor-pointer h-5 w-5 ml-4 text-right"
                              type="checkbox"
                              checked={
                                checkedPrograms
                                  .get(goalIndex)
                                  ?.has(programIndex) || false
                              }
                              onChange={() =>
                                handleProgramCheck(goalIndex, programIndex)
                              }
                            />
                          </div>
                          <p>Completed: {program.completed ? "Yes" : "No"}</p>
                        </>
                      ))}
                      {checkedPrograms.get(goalIndex)?.size > 0 ? (
                        <button
                          className="bg-purple-500 text-white active:bg-purple-600  hover:bg-purple-600
                        font-bold px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-2"
                          onClick={programCompleted}
                        >
                          Complete
                        </button>
                      ) : (
                        <button
                          className="bg-purple-200 text-white
                        font-bold px-4 py-2 rounded shadow outline-none mt-2"
                          disabled="true"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ) : null
          )}
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
