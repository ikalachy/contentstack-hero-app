import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import { useForm, SubmitHandler } from 'react-hook-form';
import useLocalStorage from "use-local-storage";
import { FormCheckboxElementConfig, FormInputElementConfig, FormSelectElementConfig, FormTextareaElementConfig, SuperHeroFromProps } from '../typescript/component';
import { HeroFormFields } from '../typescript/super-hero-form';
import StackClient from "../sdk/management";
import { renderInput } from './form/input-text';
import { renderSelect } from './form/select-field';
import { renderCheckbox } from './form/checkbox-field';
import { renderTextarea } from './form/textarea';
import Loader from './atoms/loader';
import ErrorMessage from '../pages/errorMessage';
import Consent, { renderConsent } from './consent';


export default function SuperHeroForm({ form }: { form: SuperHeroFromProps }) {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [errorStatus, setErrorStatus] = useState({ error: false, message: "" })
  const { register, handleSubmit, formState: { errors } } = useForm<HeroFormFields>();
  const [heroEntry, persistHeroEntry] = useLocalStorage<HeroFormFields>("heroEntry", {} as HeroFormFields);


  console.log("formStateErrors:", errors);

  const onSubmit: SubmitHandler<HeroFormFields> = data => {
    // console.log("data: ", data);

    setLoading(true)
    StackClient.createHero(data)
      .then(result => {
        // console.log("result", JSON.stringify(result));
        persistHeroEntry(result.entry)
        navigate("/hero")
      })
      .catch(err => {
        console.log("error handling: ", err)
        setErrorStatus({ error: true, message: err?.response?.data?.error_message })
      })
      .finally(() => setLoading(false))
  }


  if (loading) return <Loader />
  if (errorStatus?.error) return <ErrorMessage message={errorStatus.message} title="Wow ... we have some problems" />

  const combineFormElements = (elements: Array<any>) =>
    <div className='with-border'>
      {[...elements]}
    </div>

  return (
    <div className='contact-page-section max-width'>

      {form.title ? (
        <div className='contact-page-content'>
          {form.title && <h1>{form.title}</h1>}
          <div>{form?.description && form?.description}</div>
        </div>
      ) : (
        <Skeleton height={400} />
      )}

      <div className='contact-page-form' >
        {form.form_config ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <>
              {
                Object.keys(form.form_config).map((name: string) => {

                  const element = form.form_config[name]
                  if (element.type === "text" || element.type === "file" || element.type === "number")
                    return renderInput(name, errors, register, element as FormInputElementConfig)

                  if (element.type === "select")
                    return renderSelect(name, errors, register, element as FormSelectElementConfig)

                  // quick workaround to order elements TODO: use order style
                  if (name === "heroConsent" && form.consent && element.type === "checkbox") {
                    return combineFormElements([renderConsent(form.consent), renderCheckbox(name, errors, register, element as FormCheckboxElementConfig)])
                    // return [renderConsent(form.consent), renderCheckbox(name, errors, register, element as FormCheckboxElementConfig)]
                  }

                  if (element.type === "checkbox") {
                    return renderCheckbox(name, errors, register, element as FormCheckboxElementConfig)
                  }

                  if (element.type === "textarea")
                    return renderTextarea(name, errors, register, element as FormTextareaElementConfig)
                })
              }

              <input className="btn primary-btn rounded mt-2" type="submit" />
            </>
          </form>
        ) : (
          <Skeleton height={400} />
        )}
      </div >
    </div >
  );
}
