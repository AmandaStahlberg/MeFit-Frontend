import React from "react";

const dummyData = [
  { name: "Biggest Arms, look like Johnny Bravo", category: "Upper body" },
  { name: "No chicken legs here, mate", category: "Lower body" },
];

function Programs() {
  return (
    <ul>
      {dummyData.map((program, key) => (
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
