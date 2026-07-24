import React from "react";

type InputFieldProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  label,
  placeholder,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        value={value}
        onChange={onChange}
        className="
          h-12
          w-full
          rounded-xl
          border
          border-slate-300
          bg-slate-50
          px-4
          text-sm
          text-slate-800
          placeholder:text-slate-400
          transition-all
          duration-200
          outline-none
          focus:border-blue-500
          focus:bg-white
          focus:ring-4
          focus:ring-blue-100
        "
      />
    </div>
  );
};

export default InputField;