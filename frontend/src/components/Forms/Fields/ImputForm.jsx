import React from "react";

const ImputForm = ({
    label,
    name,
    register,
    errors,
    clearErrors,
    required = true,
    icon: Icon,
    type = "text",
}) => (
    <div className="relative z-0 w-full mb-5 group">
        <input
            type={type}
            name={name}
            id={name}
            className={`block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 appearance-none ${
                errors[name] ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            {...register(name, { required: required })}
            onFocus={() => clearErrors(name)}
        />
        <label
            htmlFor={name}
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
            {Icon && <Icon className="inline-block mr-2" />}
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    </div>
);

export default ImputForm;
