import Exercises from "../components/exercises/Exercises";
import ExercisesModal from "../components/modals/ExerciseModal";
import { ROLES } from "../const/roles";
import keycloak from "../keycloak";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Exercise() {
  const [exercises, setExercises] = useState([]);
  const [exercisesFetched, setExercisesFetched] = useState(false);

  useEffect(() => {
    if (!exercisesFetched) {
      fetchExercises();
    }
  }, [exercisesFetched]);

  const fetchExercises = () => {
    fetch(`http://localhost:8080/api/v1/exercises`, {
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
        setExercises(data);
        setExercisesFetched(true);
      })
      .catch((error) => console.error(error));
  };

  const deleteExercise = (id) => {
    fetch("http://localhost:8080/api/v1/exercises/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      fetchExercises();
      toast("Exercise was succefully deleted!");
    });
  };
  return (
    <>
      <div className="h-screen">
        <header className="">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            {keycloak.tokenParsed && (
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {keycloak.tokenParsed.name}, exercises
              </h1>
            )}
          </div>
        </header>
        <main className="h-3/4">
          <div className="grid grid-cols-1 gap-6 h-full">
            <div className="col-span-1 bg-white shadow-md border border-stone-100 text-center p-4">
              <h5 className="text-xl font-bold tracking-tight">Exercises</h5>
              <Exercises
                exercises={exercises}
                deleteExercise={deleteExercise}
              />
            </div>
            {keycloak.hasResourceRole(ROLES.Admin) && (
              <ExercisesModal
                exercises={exercises}
                setExercises={setExercises}
                exercisesFetched={exercisesFetched}
                setExercisesFetched={setExercisesFetched}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
