import { act, Fragment } from "react";
import { Link } from "react-router-dom";

function BreadCrumbs({ items }) {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {items.map((item, index) => (
                    <Fragment key={index}>
                        <li className="inline-flex items-center">
                            <Link
                                key={index}
                                to={item.to || "#"}
                                className={`inline-flex items-center text-sm hover:text-gray-900 ${
                                    item.active
                                        ? "text-gray-900 font-semibold"
                                        : "text-gray-500"
                                }`}
                            >
                                {item.icon && (
                                    <div className="mr-2">
                                        <item.icon className="w-4 h-4 text-gray-800" />
                                    </div>
                                )}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                        {index < items.length - 1 && (
                            <li>
                                <div className="flex items-center">
                                    <svg
                                        className="rtl:rotate-180 w-3 h-3 text-gray-600 mx-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                </div>
                            </li>
                        )}
                    </Fragment>
                ))}
            </ol>
        </nav>
    );
}

export default BreadCrumbs;
