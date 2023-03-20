import { useState } from 'react';

export default function EditUserProfile({
    stored,
    editCompleteCallback
}) {

    console.log("Edit User Profile");

    const [username, setUsername] = useState(stored.username);
    const [name, setName] = useState(stored.name);
    const [height, setHeight] = useState(stored.height);
    const [weight, setWeight] = useState(stored.weight);

    function handleCancelClicked() {
        editCompleteCallback(null);
    }

    function handleSaveClicked() {
        editCompleteCallback({username, name, height, weight});
    }


    return <>
        <div>            
            <h2>Username:</h2>
            <input
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
            />            
        </div>
        <div>            
            <h2>Name:</h2>            
            <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
            />  
        </div>
        <div>            
            <h2>Height:</h2>
            <input
                type='text'
                value={height}
                onChange={e => setHeight(e.target.value)}
            />
        </div>
        <div>            
            <h2>Weight:</h2>
            <input
                type='text'
                value={weight}
                onChange={e => setWeight(e.target.value)}
            />
        </div>
        <div className="flex-auto flex space-x-4">
            <button className="h-10 px-6 font-semibold rounded-md bg-gray-700 text-white" onClick={handleSaveClicked}>Save</button>
            <button className="h-10 px-6 font-semibold rounded-md bg-gray-700 text-white" onClick={handleCancelClicked}>Cancel</button>
        </div>
    </>
}