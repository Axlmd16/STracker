import React from "react";

const TextAreaForm = ({
    label,
    name,
    register,
    errors,
    clearErrors,
    icon: Icon,
    required = true,
    rows = 1,
}) => (
    <div className="relative z-0 w-full mb-5 group">
        <textarea
            name={name}
            id={name}
            rows={rows}
            className={`block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 appearance-none resize-none ${
                errors[name] ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            {...register(name, { required: required })}
            onFocus={() => clearErrors(name)}
        ></textarea>
        <label
            htmlFor={name}
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
            {Icon && <Icon className="inline-block mr-2" />} {label}
        </label>
    </div>
);

export default TextAreaForm;
