import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import keycloak from "../../keycloak";
import { useSelector } from "react-redux";

export default function GoalsModal() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const user = useSelector((state) => state.user.user);

  const defaultDate = new Date();

  const [selectedBg, setSelectedBg] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  const [programs, setPrograms] = useState([]);
  const [programsFetched, setProgramsFetched] = useState(false);

  useEffect(() => {
    if (!programsFetched) {
      fetchPrograms();
    }
  }, [programsFetched]);

  const fetchPrograms = () => {
    fetch(`http://localhost:8080/api/v1/programs`, {
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
        setPrograms(data);
        setProgramsFetched(true);
      })
      .catch((error) => console.error(error));
  };

  const addGoalToDb = (goal) => {
    fetch(`http://localhost:8080/api/v1/goals`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goal),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
      })
      .catch((error) => console.error(error));
  };

  const openModal = () => {
    setOpen(true);
    setSelectedPrograms([]);
    setSelectedBg([]);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const { startDate, endDate } = e.target.elements;
    const goal = {
      startDate: startDate.value,
      endDate: endDate.value,
      achieved: false,
      programs: selectedPrograms,
      profile_id: user.user_id,
    };
    console.log(goal);
    addGoalToDb(goal);
  }
  const selectedProgram = (index, goal) => {
    if (selectedBg.includes(index)) {
      setSelectedBg(selectedBg.filter((goal) => goal !== index));
    } else {
      setSelectedBg([...selectedBg, index]);
    }

    const programToAdd = {
      program_id: goal.program_id,
      completed: false,
    };
    if (selectedPrograms.includes(goal.program_id)) {
      // Program is already selected, remove it
      setSelectedPrograms(
        selectedPrograms.filter((id) => id !== goal.program_id)
      );
    } else {
      // Program is not selected, add it
      setSelectedPrograms([...selectedPrograms, programToAdd]);
    }
    console.log(selectedPrograms);
  };

  return (
    <>
      <button
        className="bg-slate-700 text-white active:bg-black  hover:bg-black
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => openModal()}
      >
        Add goal
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
                            Add new goal
                          </Dialog.Title>
                          <div className="mt-2 w-full max-w-xs">
                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="startDate"
                              >
                                Start date
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="startDate"
                                type="date"
                                defaultValue={defaultDate.toLocaleDateString()}
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="endDate"
                              >
                                End date
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="endDate"
                                type="date"
                              />
                            </div>
                            <div className="pl-4 pr-4">
                              <h5 className="block text-gray-700 text-sm font-bold mb-2">
                                Programs
                              </h5>
                              <ul className="overflow-y-scroll max-h-60 mb-2">
                                {programs.map((goal, key) => (
                                  <li
                                    onClick={() => selectedProgram(key, goal)}
                                    key={key}
                                    className={
                                      selectedBg.includes(key)
                                        ? "flex justify-between rounded-md px-1 py-1 text-sm font-medium  text-gray-700 bg-gray-900 text-white hover:cursor-pointer"
                                        : "flex justify-between text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-1 py-1 text-sm font-medium hover:cursor-pointer"
                                    }
                                    aria-current={goal.id}
                                  >
                                    <div className="text-left w-5/6">
                                      <p>{goal.name}</p>
                                      <i>{goal.type}</i>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
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
                        Save goal
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
