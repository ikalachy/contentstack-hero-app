import React, { SelectHTMLAttributes } from "react";
import { FieldValues, get, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FormSelectElementConfig } from "../../typescript/component";
import ErrorBlock from "../atoms/error";


function getValueByKeyForNumberEnum(source: { [s: number]: string }, value: string) {
  return Object.entries(source).find(([key, val]) => key === value)?.[1];
}

interface SelectProps<TFormValues extends FieldValues> extends SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  label: string;
  name: Path<TFormValues>;
  text?: string;
  error?: string;
  placeholder?: string;
  register: UseFormRegister<TFormValues>; // declare register props
  registerOptions?: RegisterOptions;
  options: { [s: number]: string };
  // styling 
  containerClass?: string
}


const HeroSelect = <TFormValues extends Record<string, unknown>>({
  name, label, register, error,
  containerClass = 'select-field',
  options,
  registerOptions,
  text,
  ...rest
}: SelectProps<TFormValues>) => {
  console.log("options", options);

  return (
    <div className={containerClass} >
      <label htmlFor={name}>{label}</label>
      {text &&
        <p>
          <small className="form-text text-muted">{text}</small>
        </p>}

      <select id={name} {...register(name, { ...registerOptions })} {...rest}>
        {
          Object.keys(options).map((option, index) =>
            (<option key={`o-${name}-${index}`} value={getValueByKeyForNumberEnum(options, option)}>{option}</option>))
        }
      </select>

      {error && <ErrorBlock error={error} />}
    </div >
  )
};


export const renderSelect = (
  name: string,
  errors: any,
  register: any,
  { label, placeholder, registerOptions, text, containerClass, options }: FormSelectElementConfig) =>

  <HeroSelect
    containerClass={containerClass}
    name={name} label={label} text={text}
    placeholder={placeholder}
    error={get(errors, name)?.message}
    register={register}
    options={options}
    registerOptions={registerOptions}
  />

HeroSelect.displayName = "SelectInput";

export default HeroSelect
