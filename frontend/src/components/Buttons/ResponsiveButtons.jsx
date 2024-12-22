import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MoreVertical, Pencil, Trash2 as Trash2Icon } from "lucide-react";

const ResponsiveButtons = ({ row }) => {
    return (
        <div className="relative inline-block text-left">
            <Menu>
                {({ open }) => (
                    <>
                        <Menu.Button className="btn-ghost btn btn-sm">
                            <MoreVertical size={20} />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                id="btn-update"
                                                className={`${
                                                    active ? "bg-gray-100" : ""
                                                } group flex items-center w-full px-2 py-2 text-sm text-blue-700`}
                                                onClick={() => console.log(row)}
                                            >
                                                <Pencil
                                                    size={20}
                                                    className="mr-2"
                                                />
                                                Editar
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                id="btn-delete"
                                                className={`${
                                                    active ? "bg-gray-100" : ""
                                                } group flex items-center w-full px-2 py-2 text-sm text-red-500`}
                                                onClick={() => console.log(row)}
                                            >
                                                <Trash2Icon
                                                    size={20}
                                                    className="mr-2"
                                                />
                                                Eliminar
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
        </div>
    );
};

export default ResponsiveButtons;
