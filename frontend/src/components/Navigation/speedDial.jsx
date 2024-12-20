import React, { useState, useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip";

const SpeedDial = ({ actions }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className="fixed bottom-6 end-6 group">
            {/* Speed Dial Menu */}
            <div
                ref={menuRef}
                className={`flex flex-col items-center mb-4 space-y-2 ${
                    open ? "block" : "hidden"
                }`}
                style={{ transformOrigin: "bottom" }}
            >
                {actions.map((action, index) => (
                    <div key={index} className="relative">
                        <button
                            type="button"
                            onClick={action.onClick}
                            className="flex justify-center items-center w-14 h-14 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 focus:ring-4 focus:ring-gray-300"
                            data-tooltip-id={`tooltip-${index}`}
                        >
                            {action.icon}
                        </button>
                    </div>
                ))}
            </div>
            {/* Tooltips */}
            {actions.map((action, index) => (
                <Tooltip
                    key={index}
                    id={`tooltip-${index}`}
                    anchorSelect={`[data-tooltip-id="tooltip-${index}"]`}
                    place="left"
                >
                    {action.label}
                </Tooltip>
            ))}
            {/* Speed Dial Button */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-controls="speed-dial-menu"
                aria-expanded={open}
                className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            >
                <svg
                    className={`w-5 h-5 transition-transform ${
                        open ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                    />
                </svg>
            </button>
        </div>
    );
};

export default SpeedDial;
