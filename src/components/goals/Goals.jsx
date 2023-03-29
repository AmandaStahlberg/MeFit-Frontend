import React, { useState, useEffect } from "react";
import keycloak from "../../keycloak";
import { TrashIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

export default function Goals({ goals, setGoals }) {
    const [expandedGoalIndex, setExpandedGoalIndex] = useState(null);
    const [checkedPrograms, setCheckedPrograms] = useState(new Map());
    const [bgColorOnClick, setBgColorOnClick] = useState(false);

    async function updateProgramCompleted(goalId, programId, completed) {
        try {
            const response = await fetch(
                "http://localhost:8080/api/v1/goal-program-associations",
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ goalId, programId, completed }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to update the program completed status"
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    const programCompleted = () => {
        const checkedProgramsForGoal = checkedPrograms.get(expandedGoalIndex);
        if (checkedProgramsForGoal) {
            checkedProgramsForGoal.forEach((programIndex) => {
                const program = goals[expandedGoalIndex].programs[programIndex];
                updateProgramCompleted(
                    goals[expandedGoalIndex].goal_id,
                    program.program_id,
                    !program.completed
                );
            });
        }
    };

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
    return <></>;
}
