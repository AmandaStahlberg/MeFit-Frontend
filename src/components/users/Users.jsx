import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const dummyUsers = [
  {
    Name: "Amanda Ståhlberg",
    UserName: "AStahl",
    Email: "email@email.com",
    Role: "Admin",
  },
  {
    Name: "Isabelle Tancred",
    UserName: "ITan",
    Email: "isabelle@email.com",
    Role: "Contributer",
  },
  {
    Name: "Alex Mamqvist",
    UserName: "ALLE",
    Email: "alle@email.com",
    Role: "User",
  },
  {
    Name: "Test Testsson",
    UserName: "Tessy",
    Email: "test@email.com",
    Role: "User",
  },
];

function Users() {
  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="min-w-full border-collapse block md:table bg-white text-left text-sm text-gray-500">
          <thead className=" bg-gray-50">
            <tr className="md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th className="px-6 py-4 font-medium text-gray-900 text-left block md:table-cell">
                Name
              </th>
              <th className="px-6 py-4 text-gray-900 text-left font-medium block md:table-cell">
                User Name
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
          {dummyUsers.map((user, index) => (
            <tbody
              key={index}
              className="block md:table-row-group divide-y divide-gray-100 border-t border-gray-100"
            >
              <tr className="md:border-none block md:table-row hover:bg-gray-50">
                <td className="p-2 text-left block md:table-cell md:px-6 md:py-4 font-normal text-gray-900">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Name
                  </span>
                  {user.Name}
                </td>
                <td className="p-2 text-left block md:table-cell md:px-6 md:py-4 font-normal text-gray-900">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    User Name
                  </span>
                  {user.UserName}
                </td>
                <td className="p-2 text-left block md:table-cell md:px-6 md:py-4 font-normal text-gray-900">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Email Address
                  </span>
                  {user.Email}
                </td>
                <td className="p-2 text-left block md:table-cell md:px-6 md:py-4 font-normal text-gray-900">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Role
                  </span>
                  {user.Role}
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
