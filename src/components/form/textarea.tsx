import React from "react";
import { FieldValues, get, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FormTextareaElementConfig } from "../../typescript/component";
import ErrorBlock from "../atoms/error";



export type TextareaType = "textarea";

export type TextareaProps<TFormValues extends FieldValues> = {
  id?: string;
  label: string;
  name: Path<TFormValues>;
  text?: string;
  error?: string;
  placeholder: string;
  type: TextareaType;
  register: UseFormRegister<TFormValues>; // declare register props
  registerOptions?: RegisterOptions;

  // styling 
  containerClass?: string
};

const HeroTextarea = <TFormValues extends Record<string, unknown>>({
  name,
  label,
  register,
  error,
  containerClass = "Textarea-fields",
  placeholder, registerOptions: options,
  text,
  ...rest
}: TextareaProps<TFormValues>): JSX.Element => {


  return (
    <div className={containerClass} >
      <label htmlFor={name}>{label}</label>
      {text &&
        <p>
          <small className="form-text text-muted">{text}</small>
        </p>}

      <textarea id={name} placeholder={placeholder}  {...register(name, { ...options })} {...rest} />

      {error && <ErrorBlock error={error} />}
    </div >
  )
};

HeroTextarea.displayName = "TextareaText";


export const renderTextarea = (
  name: string,
  errors: any,
  register: any,
  { type, label, placeholder, registerOptions, text, containerClass }: FormTextareaElementConfig) =>

  <HeroTextarea
    containerClass={containerClass}
    type={type}
    name={name} label={label} text={text}
    placeholder={placeholder}
    error={get(errors, name)?.message}
    register={register}
    registerOptions={registerOptions}
  />

export default HeroTextarea
