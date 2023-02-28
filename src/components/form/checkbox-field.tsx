import React from "react";
import { FieldValues, get, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FormCheckboxElementConfig } from "../../typescript/component";
import ErrorBlock from "../atoms/error";


function getValueByKeyForNumberEnum(source: { [s: number]: string }, value: string) {
  return Object.entries(source).find(([key, val]) => key === value)?.[1];
}

interface CheckboxProps<TFormValues extends FieldValues> {
  id?: string;
  label?: string;
  name: Path<TFormValues>;
  text?: string;
  error?: string;
  placeholder?: string;
  register: UseFormRegister<TFormValues>; // declare register props
  registerOptions?: RegisterOptions;
  options: { [s: number]: string };
  // styling 
  containerClass?: string;
}


const HeroCheckbox = <TFormValues extends Record<string, unknown>>({
  name,
  label,
  register,
  error,
  containerClass = "checkbox-fields",
  options,
  registerOptions,
  text,
  ...rest
}: CheckboxProps<TFormValues>) => {
  console.log("rerender checkbox", error);

  return (
    <div className={containerClass} >
      <label htmlFor={name}>{label}</label>
      {text &&
        <p>
          <small className="form-text text-muted">{text}</small>
        </p>
      }

      {
        Object.keys(options).map((option, index) =>
        (
          <>
            <div className="checkbox-field">
              <input className='inp-cbx' id={`cbx-${name}-${index}`} type="checkbox" value={getValueByKeyForNumberEnum(options, option)} {...register(name, { ...registerOptions })} />
              <label htmlFor={`cbx-${name}-${index}`} className="cbx" key={`label-for-${option}`} >
                <span>
                  <svg width="12px" height="10px" viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </svg>
                </span>
                <span>{getValueByKeyForNumberEnum(options, option)}</span>
              </label>
            </div>
          </>)
        )
      }

      {error && <ErrorBlock error={error} />}
    </div >
  )
};

export const renderCheckbox = (
  name: string,
  errors: any,
  register: any,
  { label, placeholder, registerOptions, text, containerClass, options }: FormCheckboxElementConfig,
) =>
  <HeroCheckbox
    containerClass={containerClass}
    name={name}
    label={label}
    text={text}
    placeholder={placeholder}
    error={get(errors, name)?.message}
    register={register}
    registerOptions={registerOptions}
    options={options} />

HeroCheckbox.displayName = "HeroCheckbox";

export default HeroCheckbox
