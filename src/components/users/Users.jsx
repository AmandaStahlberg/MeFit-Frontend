import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import keycloak from "../../keycloak";

function Users() {
  const [users, setUsers] = useState([]);
  const [usersFetched, setUsersFetched] = useState(false);

  useEffect(() => {
    if (!usersFetched) {
      fetchPrograms();
    }
  }, [usersFetched]);

  const fetchPrograms = () => {
    fetch(`http://localhost:8080/api/v1/users`, {
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
        setUsers(data);
        setUsersFetched(true);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="min-w-full border-collapse block md:table bg-white text-left text-sm text-gray-500">
          <thead className=" bg-gray-50">
            <tr className="md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell">
                Username
              </th>
              <th className="px-6 py-4 text-gray-900 text-left font-medium block md:table-cell">
                Name
              </th>
              <th className="px-6 py-4 text-gray-900 text-left font-medium block md:table-cell">
                Email Address
              </th>
              <th className="px-6 py-4 text-gray-900 text-left font-medium block md:table-cell">
                Role
              </th>
              <th className="px-6 py-4 text-gray-900 text-left font-medium block md:table-cell"></th>
            </tr>
          </thead>
          {users.map((user, index) => (
            <tbody
              key={index}
              className="block md:table-row-group divide-y divide-gray-100 border-t border-gray-100"
            >
              <tr className="md:border-none block md:table-row hover:bg-gray-50">
                <td className="p-2 text-left block md:table-cell md:px-6 md:py-4 font-normal text-gray-900">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Username
                  </span>
                  {user.username}
                </td>
                <td className="p-2 text-left block md:table-cell md:px-6 md:py-4 font-normal text-gray-900">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Name
                  </span>
                </td>
                <td className="p-2 text-left block md:table-cell md:px-6 md:py-4 font-normal text-gray-900">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Email Address
                  </span>
                </td>
                <td className="p-2 text-left block md:table-cell md:px-6 md:py-4 font-normal text-gray-900">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Role
                  </span>
                  {user.isAdmin === true
                    ? "Admin"
                    : user.isContributor === true
                    ? "Contributor"
                    : "User"}
                </td>
                <td className="p-2 md:text-right block md:table-cell md:px-6 md:py-4 font-normal text-gray-900">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Actions
                  </span>
                  <button className="hover:text-red-600 pr-4">
                    <TrashIcon className="h-6 w-6" />
                  </button>
                  <button className="hover:text-blue-600 ">
                    <PencilIcon className="h-6 w-6" />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}

export default Users;
