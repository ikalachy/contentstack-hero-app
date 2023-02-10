import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SuperHeroFromProps } from '../typescript/component';
import { HeroQuality, GenderQuality, Inputs } from '../typescript/super-hero-form';


export default function SuperHeroForm({ form }: { form: SuperHeroFromProps }) {

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  const original_image = register("original_image")
  console.log(errors);


  function getValueByKeyForNumberEnum(value: string) {
    return Object.entries(HeroQuality).find(([key, val]) => key === value)?.[1];
  }

  return (
    <div className='contact-page-section max-width'>

      <div className='contact-page-content'>
        {form.title && <h1>{form.title}</h1>}
        <div>{form.description && form.description}</div>
      </div>

      <div className='contact-page-form' >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-fields">
            <h3>Your name:</h3>
            <input type="text" placeholder="Enter your name" {...register("name", { required: true, maxLength: 80 })} />
          </div>
          <div className="input-fields">
            <h3>Job Title:</h3>
            <input type="text" placeholder="Enter your full job title" {...register("job_title", { required: true, maxLength: 100 })} />
          </div>

          <div className="input-fields">
            <h3>What is your main job description?</h3>
            <input type="text" placeholder="Enter your job description" {...register("job_description", {})} />
          </div>

          <div className="select-field">
            <h3>Character Request:</h3>
            <p><small>What type of character do you want to be?</small></p>
            <select {...register("superhero_qualities")}>
              {
                Object.keys(HeroQuality).map((heroQuality, index) =>
                  (<option key={`opt-${index}`} value={getValueByKeyForNumberEnum(heroQuality)}>{heroQuality}</option>))
              }

            </select>
          </div>
          <div className="select-field">
            <h3>Additional characteristics:</h3>
            <p><small>Additional description features will help create the image you want.</small></p>
            {
              Object.keys(GenderQuality).map((quality, index) =>
              (
                <>
                  <div className="checkbox-field">
                    <input className='inp-cbx' id={`cbx-${index}`} type="checkbox" value={quality} {...register("gender_qualities")} />
                    <label htmlFor={`cbx-${index}`} className="cbx" key={`label-for-${quality}`} >
                      <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg>
                      </span>
                      <span>{quality}</span>
                    </label>
                  </div>
                </>)
              )
            }
          </div>
          <div className="input-fields">
            <h3>Original Image:</h3>
            <p><small>Upload a headshot of your clear face, with no hat, glasses or distracting background elements.</small></p>
            <input id="original_image" type="file" placeholder="Original Image" {...original_image} />
          </div>


          {/* <input type="file" placeholder="Output Image" {...register("Output Image", {})} /> */}
          <div className="text-field">
            <h3>Background story:</h3>
            <textarea placeholder='Type something...' {...register("background_story", {})} />
          </div>
          <input type="submit" />
        </form>
      </div >
    </div >
  );
}
