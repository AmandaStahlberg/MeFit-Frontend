import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import keycloak from "../../keycloak";

export default function Goals() {
    const user = useSelector((state) => state.user.user);

    const [goals, setGoals] = useState([]);

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
                    console.log("data", data.goals);
                    setGoals(data.goals);
                })
                .catch((error) => console.error(error));
        };

        fetchProfile();
    }, [user]);

    return (
        <ul>
            {goals &&
                goals.map((goal, index) => (
                    <li key={index}>
                        <div>
                            <h3>Goal {index + 1}</h3>
                            <p>Achieved: {goal.achieved ? "Yes" : "No"}</p>
                            <p>Start Date: {goal.startDate}</p>
                            <p>End Date: {goal.endDate}</p>
                            <div>
                                <h4>Programs:</h4>
                                {goal.programs.map((program, programIndex) => (
                                    <div key={programIndex}>
                                        <p>Name: {program.name}</p>
                                        <p>Category: {program.category}</p>
                                        <p>
                                            Workout IDs:{" "}
                                            {program.workoutIds.join(", ")}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
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
