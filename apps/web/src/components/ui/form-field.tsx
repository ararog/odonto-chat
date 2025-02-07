

import { useTranslation } from 'react-i18next'
import { useFormContext } from "react-hook-form";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  tabIndex?: number;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = ({ label, name, onChange, type, tabIndex, className }: FormFieldProps) => {
  const { control, formState: { errors } } = useFormContext();
  const { t } = useTranslation();

  const props = control.register(name);

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <label htmlFor={name}>{label}</label>
      <input
        {...props}
        id={name}
        type={type}
        tabIndex={tabIndex}
        onChange={onChange ? onChange : props.onChange}
        className="p-2 border-2 border-gray-300 rounded-lg w-96 max-sm:w-80"
      />
      {errors[name] && (
        <span className="text-red-500">{t(errors[name].message?.toString() ?? "")}</span>
      )}  
    </div>
  );
};

export default FormField;
