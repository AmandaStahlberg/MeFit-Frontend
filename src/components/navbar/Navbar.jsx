import { Fragment } from "react";
import { Link } from "react-router-dom";
import keycloak from "../../keycloak";
import { Disclosure, Menu } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import Logo from "../../logo-mefit.png";
import { ROLES } from "../../const/roles";

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Goals", href: "/goal", current: true },
  { name: "Programs", href: "/program", current: true },
  { name: "Workouts", href: "/workout", current: true },
  { name: "Exercises", href: "/exercise", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/">
                      <img
                        className="block h-6 w-auto lg:hidden"
                        src={Logo}
                        alt="MeFit"
                      />
                      <img
                        className="hidden h-6 w-auto lg:block"
                        src={Logo}
                        alt="MeFit"
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          to={item.href}
                          key={item.name}
                          // href={item.href}
                          className="focus:bg-gray-900 focus:text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                      {keycloak.hasRealmRole(ROLES.Admin) && (
                        <Link
                          to="/users"
                          className="focus:bg-gray-900 focus:text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Users
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {keycloak.authenticated && (
                    <button
                      onClick={() => keycloak.logout()}
                      className="bg-gray-800 p-1 text-gray-400 hover:text-white"
                    >
                      <span className="sr-only">Logout</span>
                      <ArrowLeftOnRectangleIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  )}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Link
                        to="/profile"
                        className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">Open user menu</span>
                        <UserCircleIcon
                          className="h-8 w-8"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
export default Navbar;
