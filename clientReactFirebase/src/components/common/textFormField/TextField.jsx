import React, { useState } from "react";
import "./textField.css";

function TextField({ name, value, type, error, onChange }) {
    const [labelActive, setLabelActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <div className="input-container flex justify-center items-center flex-col relative">
            <input
                onBlur={(e) => {
                    e.target.value !== ""
                        ? setLabelActive(true)
                        : setLabelActive(false);
                }}
                autoComplete="off"
                id={name}
                name={name}
                value={value}
                className={`${
                    error ? "bg-red-50" : "bg-green-50"
                } text-input border border-green-500 placeholder-green-700  text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 `}
                placeholder=" "
                onChange={(e) => onChange(e)}
                type={showPassword ? "text" : type}
            />
            <label
                htmlFor={name}
                className={`label ${
                    labelActive && "filled"
                } block mb-2 text-sm font-medium`}
            >
                {name[0].toUpperCase() + name.slice(1)}
            </label>
            <span className="absolute right-0 h-[52px] top-0">
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary h-full rounded-[5px] p-2"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <Eye show={showPassword} />
                    </button>
                )}
            </span>
            <p className="mt-2 text-sm text-red-600 text-shadow-none">
                {error}
            </p>
        </div>
    );
}

export default TextField;
