import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getMyHeroRes } from "../helper";
import Skeleton from "react-loading-skeleton";
import { HeroFormFields } from "../typescript/super-hero-form";
import useLocalStorage from "use-local-storage";
import Loader from "../components/atoms/loader";
import ReactCompareImage from 'react-compare-image';

const placeholderUrl = "https://via.placeholder.com/468x468?text=...in+progress"


export default function MyHeroPage() {

  const [getEntry, setEntry] = useState({} as any);
  const [errorStatus, setError] = useState({ error: false, message: "" });
  const [loading, setLoading] = useState(false)


  const [heroEntry, setHeroEntry] = useLocalStorage<HeroFormFields>("heroEntry", {} as HeroFormFields);

  const cacheEntryUid = heroEntry?.entry?.uid

  async function fetchData(id: string) {
    setLoading(true)
    setTimeout(() => getMyHeroRes(id)
      .then(result => {
        // console.log("result", JSON.stringify(result));
        setEntry(result)
      })
      .catch(err =>
        setError({ error: true, message: err?.error_message })
      ).finally(() => setLoading(false)), 3000)
  }

  useEffect(() => {
    // console.log("my hero", heroEntry?.entry?.uid);
    cacheEntryUid && fetchData(cacheEntryUid);
  }, []);

  if (loading)
    return <Loader /> && <Skeleton height={400} />

  console.log("render MyHero" + cacheEntryUid + "  : " + getEntry?.aprimo_hero_card_url);

  return (
    <>

      {
        cacheEntryUid && getEntry?.aprimo_hero_card_url === undefined &&
        <div className='hero-page'>
          <div className="hero-message">
            <p>Please, wait! We are doing our best to deliver your image!</p>
          </div>
        </div>
      }

      {
        !cacheEntryUid &&
        <div className='hero-page'>
          <div className="hero-message">
            <p>
              Please fill out the form below
              <Link style={{ color: "#7d4dff" }} to='/hero-form'>
                <span> Hero Form --&gt; </span>
              </Link>
            </p>
          </div>
        </div>
      }




      {
        cacheEntryUid && getEntry?.aprimo_hero_card_url !== undefined &&
        <>
          <div className="note-div">
            <p>Dont like your result? <a style={{
              color: "#7d4dff"
            }} href="#">  Regenerate --&gt; </a></p>
          </div>


          <div className="resizableContainer">
            <ReactCompareImage
              aspectRatio="wider"
              leftImageCss={{ objectFit: "scale-down" }}
              leftImageLabel="original"
              leftImage={heroEntry?.entry?.original_image?.url}
              rightImageCss={{ objectFit: "scale-down" }}
              rightImageLabel={"hero"}
              rightImage={getEntry?.aprimo_hero_card_url
                ? getEntry.aprimo_hero_card_url
                : placeholderUrl} />
          </div>
        </>

      }
    </>
  )

}
