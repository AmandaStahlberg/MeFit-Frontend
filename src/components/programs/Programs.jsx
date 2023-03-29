import React, { useEffect, useState } from "react";
import keycloak from "../../keycloak";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ROLES } from "../../const/roles";

function Programs() {
  const [programs, setPrograms] = useState([]);
  const [programsFetched, setProgramsFetched] = useState(false);
  const [expandedWorkoutIndex, setExpandedWorkoutIndex] = useState(null);

  useEffect(() => {
    if (!programsFetched) {
      fetchPrograms();
    }
  }, [programsFetched]);

  function toggleExpanded(index) {
    setExpandedWorkoutIndex(index === expandedWorkoutIndex ? null : index);
  }

  const fetchPrograms = () => {
    fetch(`http://localhost:8080/api/v1/programs`, {
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
        setPrograms(data);
        setProgramsFetched(true);
      })
      .catch((error) => console.error(error));
  };
  const deleteProgram = (id) => {
    fetch("http://localhost:8080/api/v1/programs/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      fetchPrograms();
    });
  };

  return (
    <ul>
      {programs.map((program, key) => (
        <li
          onClick={() => toggleExpanded(key)}
          key={key}
          className="flex justify-between focus:bg-gray-900 focus:text-white text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer"
        >
          <div className="text-left w-5/6">
            <p className="text-lg">{program.name}</p>
            <i className="text-base">Category: {program.category}</i>

            {/* {expandedWorkoutIndex === key && (
              <div className="pt-3 pb-3">
                <b>Workouts:</b>
                {program.workouts.map((workout, key) => (
                  <div className="pb-2" key={key}>
                    <p>{workout.name}</p>
                    <i>hrj</i>
                  </div>
                ))}
              </div>
            )} */}
          </div>
          {keycloak.hasResourceRole(ROLES.Admin) &&
          keycloak.hasResourceRole(ROLES.Contributor) ? (
            <button onClick={() => deleteProgram(program.program_id)}>
              <TrashIcon className="h-4 w-4 hover:text-red-700 hover:cursor-pointer" />
            </button>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export default Programs;
