import { useState, useEffect, useRef } from "react";
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
  const [medicalConditions, setMedicalConditions] = useState();
  const [disabilities, setDisabilities] = useState();

  const stored = {
    username,
    name,
    height,
    weight,
    medicalConditions,
    disabilities,
  };
  const [user, setUser] = useState({});
  const storedUser = user;
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchUser();
  }, []);

  const fetchUser = () => {
    fetch(`http://localhost:8080/api/v1/users/keycloak`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error(error));
  };

  function handleEditComplete(result) {
    if (result != null) {
      /*const response = fetch(`http://localhost:8080/api/v1/users/3`, {
        //TODO byt ut mot user.id
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keycloak.token}`,
        },
        body: JSON.stringify({
          username: result.username, //TODO: borde på något sätt ändras/uppdateras i keycloak också
          //name: result.name,
        }),
      });*/

      /*if (response.ok) {*/
      console.log("connectade till api, la till nytt usernam");
      const response2 = fetch(`http://localhost:8080/api/v1/profile/4`, {
        //TODO byt ut mot user.id
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keycloak.token}`,
        },
        body: JSON.stringify({
          height: result.height,
          weight: result.weight,
          medicalConditions: result.medicalConditions,
          disabilities: result.disabilities,
        }),
      });
      if (response2.ok) {
        console.log("response 2 ok");
        setUsername(result.username);
        setName(result.name);
        setHeight(result.height);
        setWeight(result.weight);
        setMedicalConditions(result.medicalConditions);
        setDisabilities(result.disabilities);
      }
      //}
      setEditMode(false);
    }
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
