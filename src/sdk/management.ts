import { HeroFormFields } from "./../typescript/super-hero-form";
import axios from "axios";

// const contentstackClient = contentstack.client();

// const Stack = contentstackClient.stack({
//   api_key: `${process.env.REACT_APP_CONTENTSTACK_API_KEY}`,
//   management_token: `${process.env.REACT_APP_CONTENTSTACK_MANAGEMENT_TOKEN}`
// });

//
// https://{{base_url}}/v3/assets

const auth = {
  api_key: `${process.env.REACT_APP_CONTENTSTACK_API_KEY}`,
  authorization: `${process.env.REACT_APP_CONTENTSTACK_MANAGEMENT_TOKEN}`
};
// const API = process.env.REACT_APP_CONTENTSTACK_PROXY_HOST
//   ? process.env.REACT_APP_CONTENTSTACK_PROXY_HOST
//   : process.env.REACT_APP_CONTENTSTACK_API_HOST;

const API = process.env.REACT_APP_CONTENTSTACK_API_HOST;
console.log("API: ", API);

type HeroAsset = {
  "asset[upload]": File;
  "asset[parent_uid]": string;
  "asset[title]": string;
  "asset[description]": string;
};

type HeroEntry = {
  entry: HeroFormFields;
};

export default {
  async createHero(data: HeroFormFields) {
    const createdAsset = await this.createAsset(data);

    if (createdAsset.status === 201) {
      const entry = {
        ...data,
        original_image: createdAsset?.data?.asset?.uid
      };
      const createdEntry = await this.createEntry("superhero_form", {
        entry: entry
      });
      return { entry: createdEntry?.data, error: false };
    }
    return { entry: null, error: true };
  },

  createEntry(content_type_uid: string, entry: HeroEntry) {
    return axios.post(
      `https://${API}/v3/content_types/${content_type_uid}/entries`,
      entry,
      {
        headers: { ...auth }
      }
    );
  },

  updateEntry(content_type_uid: string, entry: HeroEntry) {
    return axios.put(
      `https://${API}/v3/content_types/${content_type_uid}/entries`,
      entry,
      {
        headers: { ...auth }
      }
    );
  },

  createAsset(asset: HeroFormFields) {
    const img: HeroAsset = {
      "asset[upload]": asset?.original_image?.[0],
      "asset[parent_uid]": "blt93a6efcaf31fde12",
      "asset[title]": `hero-${asset?.title}`,
      "asset[description]": ""
    };

    const formData: FormData = new FormData();
    Object.entries(img).map(([key, value]) => formData.append(key, value));

    console.log("to save asset: ", img);

    return axios.post(`https://${API}/v3/assets`, formData, {
      headers: {
        ...auth,
        "Content-Type": "multipart/form-data"
      }
    });
  }
};
