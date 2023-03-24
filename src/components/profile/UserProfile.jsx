import { useState } from "react";

export default function EditUserProfile({ stored, startEditCallback }) {
  return (
    <div className="flex flex-col gap-6 ">
      <div>
        <h2 className="font-bold pr-4">Username:</h2> {stored.username}
      </div>
      <div>
        <h2 className="font-bold pr-4">Name:</h2> {stored.name}
      </div>
      <div>
        <h2 className="font-bold pr-4">Height:</h2> {stored.height}
      </div>
      <div>
        <h2 className="font-bold pr-4">Weight:</h2> {stored.weight}
      </div>
      <div>
        <h2 className="font-bold pr-4">MedicalConditions:</h2>
        {stored.medicalConditions}
      </div>
      <div>
        <h2 className="font-bold pr-4">Disabilities:</h2> {stored.disabilities}
      </div>
      <div>
        <button
          className="h-10 px-6 font-semibold rounded-md bg-gray-700 text-white"
          onClick={startEditCallback}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
