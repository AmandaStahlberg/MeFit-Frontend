import { useState, useEffect, useRef } from "react";
import EditUserProfile from "../components/profile/EditProfile";
import UserProfile from "../components/profile/UserProfile";
import keycloak from "../keycloak";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/user";
import { useSelector } from "react-redux";

function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log(user);
  console.log(user.user_id);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(
    keycloak.tokenParsed.preferred_username
  );
  const [name, setName] = useState(keycloak.tokenParsed.name);
  const [userId, serUserId] = useState(user.user_id);
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [medicalConditions, setMedicalConditions] = useState();
  const [disabilities, setDisabilities] = useState();

  const stored = {
    username,
    userId,
    name,
    height,
    weight,
    medicalConditions,
    disabilities,
  };

  function handleEditComplete(result) {
    if (result != null) {
      setHeight(result.height);
      setWeight(result.weight);
      setMedicalConditions(result.medicalConditions);
      setDisabilities(result.disabilities);
      /*
      const response = fetch(
        `http://localhost:8080/api/v1/profile/${user.user_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${keycloak.token}`,
          },
          body: JSON.stringify({
            height: result.height,
            weight: result.weight,
            medicalConditions: result.medicalConditions,
            disabilities: result.disabilities,
            user: {user_id: stored.userId}
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update profile");
          }
          return response.json();
        })
        .then((data) => {
          dispatch(setUser(data));
          setEditMode(false);
        })
        .catch((error) => {
          console.error(error);
        });*/
    }
    setEditMode(false);
  }

  return (
    <div className="h-screen">
      <header className="">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          {keycloak.tokenParsed && (
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {keycloak.tokenParsed.name}, My Profile
            </h1>
          )}
        </div>
      </header>
      <main className="h-3/4">
        <div className="grid grid-cols-1 gap-6 h-full">
          <div className="col-span-1 bg-white shadow-md border border-stone-100 text-center p-4">
            <h5 className="text-xl font-bold tracking-tight">Exercises</h5>
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
              </>
            )}
          </div>
          {keycloak.token && (
            <div>
              <h4>Token</h4>
              <pre>{keycloak.token}</pre>
              <p>Sub: {keycloak.tokenParsed.sub}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;

//TODO: change email, change password, fitness level, request to become a contributor
