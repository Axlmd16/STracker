import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

function Sidebar({ buttons }) {
    return (
        <div className="bg-slate-800 bg w-16 h-screen fixed top-0 left-0 z-10 shadow-lg">
            <div className="flex flex-col items-center justify-center h-full">
                {buttons.map((button, index) => (
                    <Link
                        key={index}
                        to={button.href}
                        className="flex items-center justify-center w-full h-16 text-white hover:text-orange-800"
                        data-tooltip-id={`tooltip-${index}`}
                    >
                        <button.icon size={24} />
                    </Link>
                ))}
            </div>
            {buttons.map((button, index) => (
                <Tooltip
                    key={index}
                    id={`tooltip-${index}`}
                    anchorSelect={`[data-tooltip-id="tooltip-${index}"]`}
                    place="top"
                >
                    {button.tooltip}
                </Tooltip>
            ))}
        </div>
    );
}

export default Sidebar;
