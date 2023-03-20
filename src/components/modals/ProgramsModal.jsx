import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ProgramsModal() {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const dummyData = [
    { name: "Biceps", type: "Strength" },
    { name: "Triceps", type: "Strength" },
    { name: "Condition", type: "Cardio" },
    { name: "Lower legs", type: "Strength" },
  ];

  const dummyData2 = [
    {
      name: "Push up",
      description:
        "Pushups are done in prone position with palms under shoulders, balls of feet on the ground. The body is pushed up and down with arms straightening and bending alternately, while keeping the back straight.",
    },
    {
      name: "Chins",
      description: "Hang in a bar and drag your self up and down.",
    },
    { name: "Bicep curls", description: "Curl a dumbbell up and down" },
    { name: "Spinning", description: "Pedal spinning bike" },
  ];

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
                          <form class="w-full">
                            <div class="mb-6">
                              <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="workout"
                              >
                                Add workout to program
                              </label>
                              <select
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="select-workout"
                                type="select"
                                name="workout"
                                placeholder="Biceps"
                              >
                                <option value="Workout">
                                  Choose workout to program
                                </option>
                                {dummyData.map((workout, index) => (
                                  <option key={index} value={workout.name}>
                                    {workout.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div class="mb-6">
                              <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="workout"
                              >
                                Add exercise to program
                              </label>
                              <select
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="select-workout"
                                type="select"
                                name="workout"
                                placeholder="Push up"
                              >
                                <option value="Workout">
                                  Choose exercise to program
                                </option>
                                {dummyData2.map((exercise, index) => (
                                  <option key={index} value={exercise.name}>
                                    {exercise.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
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
        </Dialog>
      </Transition.Root>
    </>
  );
}
