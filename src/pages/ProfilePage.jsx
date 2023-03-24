import { useState, useEffect, useRef } from "react";
import EditUserProfile from "../components/profile/EditProfile";
import UserProfile from "../components/profile/UserProfile";
import keycloak from "../keycloak";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/reducers/user";
import { async } from "q";

function ProfilePage() {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  console.log(user.user_id);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(
    keycloak.tokenParsed.preferred_username
  );
  const [name, setName] = useState(keycloak.tokenParsed.name);
  const [email, setEmail] = useState(keycloak.tokenParsed.email);
  const [userId, setUserId] = useState(user.user_id);
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [medicalConditions, setMedicalConditions] = useState();
  const [disabilities, setDisabilities] = useState();
  const [attributesFetched, setAttributesFetched] = useState(false);

  useEffect(() => {
    if (!attributesFetched) {
      fetchAttributes();
    }
  }, [attributesFetched]);

  const fetchAttributes = () => {
    fetch(`http://localhost:8080/api/v1/profile/${user.user_id}`, {
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
          throw new Error("Response not OK");
        }
      })
      .then((data) => {
        setHeight(data.height);
        setWeight(data.weight);
        setDisabilities(data.disabilities);
        setMedicalConditions(data.medicalConditions);
        setAttributesFetched(true);
      })
      .catch((error) => console.error(error));
  };

  const stored = {
    username,
    email,
    userId,
    name,
    height,
    weight,
    medicalConditions,
    disabilities,
  };

  async function handleEditComplete(result) {
    if (result != null) {
      const newHeight = result.height;
      const newWeight = result.weight;
      const newMedicalConditions = result.medicalConditions;
      const newDisabilities = result.disabilities;

      const response = await fetch(
        `http://localhost:8080/api/v1/profile/${user.user_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${keycloak.token}`,
          },
          body: JSON.stringify({
            height: newHeight,
            weight: newWeight,
            medicalConditions: newMedicalConditions,
            disabilities: newDisabilities,
          }),
        }
      );

      if (response.ok) {
        setHeight(newHeight);
        setWeight(newWeight);
        setMedicalConditions(newMedicalConditions);
        setDisabilities(newDisabilities);
      }
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
            <h5 className="text-xl font-bold tracking-tight mb-4">About me</h5>
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
