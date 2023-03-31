import { useState } from "react";
import keycloak from "../../keycloak";

export default function EditUserProfile({ stored, editCompleteCallback }) {
    const [username, setUsername] = useState(stored.username);
    const [name, setName] = useState(stored.name);
    const [height, setHeight] = useState(stored.height);
    const [weight, setWeight] = useState(stored.weight);
    const [medicalConditions, setMedicalConditions] = useState(
        stored.medicalConditions
    );
    const [disabilities, setDisabilities] = useState(stored.disabilities);

    function handleCancelClicked() {
        editCompleteCallback(null);
    }

    function handleSaveClicked() {
        editCompleteCallback({
            height,
            weight,
            medicalConditions,
            disabilities,
        });
    }

    return (
        <>
            <div className="flex flex-col gap-6 ">
                <div>
                    <h2 className="font-bold pr-4">Username:</h2>{" "}
                    {stored.username}
                </div>
                <div>
                    <h2 className="font-bold pr-4">Email:</h2> {stored.email}
                </div>
                <div>
                    <h2 className="font-bold pr-4">Name:</h2> {stored.name}
                </div>
                <div>
                    <h2 className="font-bold">Height (in cm):</h2>
                    <input
                        className="rounded-md p-2 ring-1 ring-slate-200"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>
                <div>
                    <h2 className="font-bold">Weight (in kg):</h2>
                    <input
                        className="rounded-md p-2 ring-1 ring-slate-200"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>
                <div>
                    <h2 className="font-bold">Medical Conditions:</h2>
                    <input
                        className="rounded-md p-2 ring-1 ring-slate-200"
                        type="text"
                        value={medicalConditions}
                        onChange={(e) => setMedicalConditions(e.target.value)}
                    />
                </div>
                <div>
                    <h2 className="font-bold">Disabilities:</h2>
                    <input
                        className="rounded-md p-2 ring-1 ring-slate-200"
                        type="text"
                        value={disabilities}
                        onChange={(e) => setDisabilities(e.target.value)}
                    />
                </div>
                <div className="flex-auto ">
                    <button
                        className="h-10 px-6 font-semibold rounded-md bg-gray-700 text-white mr-2"
                        onClick={handleSaveClicked}
                    >
                        Save
                    </button>
                    <button
                        className="h-10 px-6 font-semibold rounded-md bg-gray-700 text-white ml-2"
                        onClick={handleCancelClicked}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}
