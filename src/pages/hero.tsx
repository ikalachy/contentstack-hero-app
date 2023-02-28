import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getHeroFormListRes } from "../helper";
import Skeleton from "react-loading-skeleton";
import { Hero } from "../typescript/pages";
import { useLivePreviewCtx } from "../context/live-preview-context-provider";
import { Banner } from "../typescript/component";



export default function HeroPage() {
  const lpTs = useLivePreviewCtx();
  const { blogId } = useParams();
  const history = useNavigate();
  const [getEntry, setEntry] = useState({} as Banner);
  const [error, setError] = useState(false);

  async function fetchData() {
    try {
      // const entryUrl = blogId ? `/blog/${blogId}` : "/";
      // const banner = await getPageRes("/hero");
      const result = await getHeroFormListRes(1, "updated_at");

      result
        // .filter((image: ImageData) => !!image.aprimo_hero_card_url)
        .forEach((hero: Hero) => {
          const hero_banner = {
            bg_color: "white",
            text_color: "black",
            banner_title: "Do we need title?",
            banner_description: "",
            // call_to_action: Action;
            banner_image: {
              filename: "ddd",
              url: hero.aprimo_composable_card_url
            }
          } as Banner

          setEntry(hero_banner);
        })
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  useEffect(() => {

    fetchData();
    error && history("/404");
    const timer1 = setInterval(() => fetchData, 6000)

    return () => {
      clearInterval(timer1)
    }

  }, [lpTs, error]);


  return (

    <div
      style={{
        display: "grid",
        height: "90 %",
        border: "2px solid #eee",
        borderRadius: "4px",
        boxSizing: "content-box",
        alignItems: "center",
        // padding: `${layoutOptions.padding - 2}px`,
        marginBottom: 10,
        // paddingTop: "8px",
      }}
    >

      {getEntry.banner_image && (
        <img
          style={{
            maxWidth: "100%",
            maxHeight: "100vh",
            margin: "auto"
          }}
          {...getEntry.banner_image.$?.url as {}}
          alt={getEntry.banner_image.filename}
          src={getEntry.banner_image.url}
        />
      )}

    </div>
  )
}
