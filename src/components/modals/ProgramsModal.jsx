import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import keycloak from "../../keycloak";

export default function ProgramsModal() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const [workouts, setWorkouts] = useState([]);
  const [workoutsFetched, setWorkoutsFetched] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const { name, category, workout } = e.target.elements;
    console.log({
      name: name.value,
      category: category.value,
      workout: workout.value,
    });
  }

  useEffect(() => {
    if (!workoutsFetched) {
      fetchWorkouts();
    }
  }, [workoutsFetched]);

  const fetchWorkouts = () => {
    fetch(`http://localhost:8080/api/v1/workouts`, {
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
          // handleNoUser();
          throw new Error("Response not OK");
        }
      })
      .then((data) => {
        setWorkouts(data);
        setWorkoutsFetched(true);
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      <button
        className="bg-slate-700 text-white active:bg-black  hover:bg-black
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setOpen(true)}
      >
        Add program
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Add new training program
                          </Dialog.Title>
                          <div className="mt-2 w-full max-w-xs">
                            <div className="mb-6">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                              >
                                Name
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Biggest arms in town"
                              />
                            </div>
                            <div className="mb-6">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="category"
                              >
                                Category
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="category"
                                type="text"
                                name="category"
                                placeholder="Upper body"
                              />
                            </div>
                            <div className="mb-6">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="workout"
                              >
                                Add workout to program
                              </label>
                              <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="workout"
                                type="select"
                                name="workout"
                                placeholder="Biceps"
                              >
                                <option value="workout">
                                  Choose workout to program
                                </option>
                                {workouts.map((workout, index) => (
                                  <option
                                    key={index}
                                    value={workout.workout_id}
                                  >
                                    {workout.name} ({workout.type})
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* <button type="submit">klick</button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 sm:ml-3 sm:w-auto"
                        onClick={() => setOpen(false)}
                      >
                        Save program
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </form>
        </Dialog>
      </Transition.Root>
    </>
  );
}
