import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RenderComponents from "../components/render-components";
import { getHeroFormListRes, getPageRes } from "../helper";
import Skeleton from "react-loading-skeleton";
import { Prop, Entry, ImageData } from "../typescript/pages";
import { useLivePreviewCtx } from "../context/live-preview-context-provider";


// import optional lightbox plugins
import { PhotoAlbum, RenderPhoto, Photo } from "react-photo-album";
import Loader from "../components/atoms/loader";

interface HeroImagePhoto extends Photo {
  job_title: string;
}

export default function HeroGallery({ entry }: Prop) {
  const history = useNavigate();
  const [getEntry, setEntry] = useState({} as Entry);
  const [getList, setList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const lpTs = useLivePreviewCtx();


  const renderPhoto: RenderPhoto<HeroImagePhoto> = ({ photo, layoutOptions, imageProps: { alt, style, ...restImageProps } }) => (
    <div
      style={{
        border: "2px solid #eee",
        borderRadius: "4px",
        boxSizing: "content-box",
        alignItems: "center",
        width: style?.width,
        padding: `${layoutOptions.padding - 2}px`,
        marginBottom: 10,
        paddingTop: "8px",
      }}
    >
      <img alt={alt} className="rounded" style={{ ...style, width: "100%", padding: 0 }} {...restImageProps} />
      <div
        style={{
          paddingTop: "8px",
          paddingBottom: "8px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          textAlign: "center",
        }}
      >
        {photo.job_title}
      </div>
    </div>
  );


  async function fetchData() {
    try {
      !loading && setLoading(true)
      const heroPage = await getPageRes("/gallery");
      const result = await getHeroFormListRes(20, "updated_at");
      (!heroPage || !result) && setError(true);

      // const archive = [] as any;
      const heroList = [] as any;

      result
        .filter((image: ImageData) => !!image.aprimo_hero_card_url)
        .forEach((image: ImageData) => {
          const photo = { src: image.aprimo_hero_card_url, title: image.title, job_title: image.job_title, alt: image.uid, width: 300, height: 300 } as HeroImagePhoto
          heroList.push(photo);
        });

      console.log("heroList", heroList);

      setEntry(heroPage);
      setList(heroList);
      // entry({ page: heroPage, blogPost: result });
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
    error && history("/404");
    const timer1 = setInterval(() => fetchData(), 60000)

    return () => {
      clearInterval(timer1)
    }
  }, [error, lpTs]);

  // if (loading) return <Loader />

  return (
    <>
      {loading && <Loader />}
      {Object.keys(getEntry).length ? (
        <RenderComponents
          pageComponents={getEntry.page_components}
          blogsPage
          contentTypeUid='page'
          entryUid={getEntry.uid}
          locale={getEntry.locale}
        />
      ) : (
        <Skeleton height={400} />
      )}

      {getList.length > 0 ? (
        <>
          <PhotoAlbum
            // layout="rows"
            layout="masonry"
            // layout="columns"
            spacing={5}
            padding={10}
            targetRowHeight={150}
            columns={3}
            renderPhoto={renderPhoto}
            // renderRowContainer={renderRowContainer}
            photos={getList} />
        </>
      ) : (
        <Skeleton height={400} />
      )}
    </>
  );
}
