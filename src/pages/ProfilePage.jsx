import { useState } from "react";
import EditUserProfile from "../components/profile/EditProfile";
import UserProfile from "../components/profile/UserProfile";
import keycloak from "../keycloak";

function ProfilePage() {
  const [editMode, setEditMode] = useState(false);

  const [username, setUsername] = useState(
    keycloak.tokenParsed.preferred_username
  );
  const [name, setName] = useState(keycloak.tokenParsed.name);
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();

  const stored = { username, name, height, weight };

  function handleEditComplete(result) {
    if (result != null) {
      setUsername(result.username);
      setName(result.name);
      setHeight(result.height);
      setWeight(result.weight);
    }
    setEditMode(false);
  }

  return (
    <div className="h-screen">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Profile</h1>
      <div>
        {editMode ? (
          <>
            {keycloak.tokenParsed && (
              <EditUserProfile
                stored={stored}
                editCompleteCallback={handleEditComplete}
              />
            )}
          </>
        ) : (
          <>
            <UserProfile
              stored={stored}
              startEditCallback={() => setEditMode(true)}
            />
            {keycloak.token && (
              <div>
                <h4>Token</h4>
                <pre>{keycloak.token}</pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
