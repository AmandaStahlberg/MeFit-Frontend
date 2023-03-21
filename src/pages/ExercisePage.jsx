import Exercises from "../components/exercises/Exercises";
import ExercisesModal from "../components/modals/ExerciseModal";
import { ROLES } from "../const/roles";
import keycloak from "../keycloak";

export default function Exercise() {
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
              <Exercises />
            </div>
            {keycloak.hasResourceRole(ROLES.Admin) && <ExercisesModal />}
          </div>
        </main>
      </div>
    </>
  );
}
