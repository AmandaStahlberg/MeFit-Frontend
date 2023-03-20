import React, { useEffect, useState } from "react";
import keycloak from "../../keycloak";

function Programs() {
  const [programs, setPrograms] = useState([]);
  const [programsFetched, setProgramsFetched] = useState(false);

  useEffect(() => {
    if (!programsFetched) {
      fetchPrograms();
    }
  }, [programsFetched]);

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
          // handleNoUser();
          throw new Error("Response not OK");
        }
      })
      .then((data) => {
        setPrograms(data);
        setProgramsFetched(true);
      })
      .catch((error) => console.error(error));
  };
  return (
    <ul>
      {programs.map((program, key) => (
        <li
          key={key}
          className="flex justify-between focus:bg-gray-900 focus:text-white text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          <div className="text-left">
            <p>{program.name}</p>
            <i>Category: {program.category}</i>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Programs;
