import React from "react";
import { FieldValues, get, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FormInputElementConfig } from "../../typescript/component";
import ErrorBlock from "../atoms/error";



export type InputType = "text" | "file" | "checkbox" | "number";

export type InputProps<TFormValues extends FieldValues> = {
  id?: string;
  label: string;
  name: Path<TFormValues>;
  text?: string;
  error?: string;
  placeholder: string;
  type: InputType;
  register: UseFormRegister<TFormValues>; // declare register props
  registerOptions?: RegisterOptions;

  // styling 
  containerClass?: string
};

const HeroInput = <TFormValues extends Record<string, unknown>>({
  name,
  label,
  register,
  error,
  containerClass = "input-fields",
  placeholder, registerOptions: options,
  text,
  type = "text",
  ...rest
}: InputProps<TFormValues>): JSX.Element => {


  return (
    <div className={containerClass} >
      <label htmlFor={name}>{label}</label>
      {
        text &&
        <p>
          <small className="form-text text-muted">{text}</small>
        </p>
      }

      <input id={name} type={type} placeholder={placeholder}  {...register(name, { ...options })}  {...rest} />
      {error && <ErrorBlock error={error} />}
    </div >
  )
};

HeroInput.displayName = "InputText";


export const renderInput = (
  name: string,
  errors: any,
  register: any,
  { type, label, placeholder, registerOptions, text, containerClass }: FormInputElementConfig) =>

  <HeroInput
    containerClass={containerClass}
    type={type}
    name={name} label={label} text={text}
    placeholder={placeholder}
    error={get(errors, name)?.message}
    register={register}
    registerOptions={registerOptions}
  />

export default HeroInput
