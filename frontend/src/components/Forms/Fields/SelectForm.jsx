import React from "react";

const SelectForm = ({
    label,
    name,
    options,
    register,
    errors,
    clearErrors,
}) => (
    <div className="relative z-0 w-full mb-5 group">
        <select
            id={name}
            className={`mt-2 select-ghost select block select-sm  w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 appearance-none  ${
                errors[name] ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            {...register(name, { required: true })}
            onFocus={() => clearErrors(name)}
        >
            <option value="">{label}</option>
            {options.map((option, index) => (
                <option
                    key={index}
                    value={option.value}
                    className="py-2 text-base-content"
                >
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default SelectForm;
