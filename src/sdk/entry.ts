/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undef */
import * as contentstack from "contentstack";
import * as Utils from "@contentstack/utils";

import ContentstackLivePreview from "@contentstack/live-preview-utils";

type GetEntry = {
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
  limit?: number;
  orderBy?: string;
};

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

type GetEntryById = {
  entryId: string;
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

// console.log(`api: ${process.env.REACT_APP_CONTENTSTACK_API_HOST}`);
const Stack = contentstack.Stack({
  api_key: `${process.env.REACT_APP_CONTENTSTACK_API_KEY}`,
  delivery_token: `${process.env.REACT_APP_CONTENTSTACK_DELIVERY_TOKEN}`,
  environment: `${process.env.REACT_APP_CONTENTSTACK_ENVIRONMENT}`,
  //@ts-ignore
  region: `${process.env.REACT_APP_CONTENTSTACK_REGION}`
    ? `${process.env.REACT_APP_CONTENTSTACK_REGION}`
    : "us",
  live_preview: {
    management_token: `${process.env.REACT_APP_CONTENTSTACK_MANAGEMENT_TOKEN}`
      ? `${process.env.REACT_APP_CONTENTSTACK_MANAGEMENT_TOKEN}`
      : "",
    enable: false,
    host: `${process.env.REACT_APP_CONTENTSTACK_API_HOST}`
      ? `${process.env.REACT_APP_CONTENTSTACK_API_HOST}`
      : ""
  }
});

/**
 * initialize live preview
 */
ContentstackLivePreview.init({
  enable: true,
  //@ts-ignore
  stackSdk: Stack,
  clientUrlParams: {
    host: `${process.env.REACT_APP_CONTENTSTACK_APP_HOST}`
      ? `${process.env.REACT_APP_CONTENTSTACK_APP_HOST}`
      : ""
  },
  ssr: false
});

// if (`${process.env.REACT_APP_CONTENTSTACK_PROXY_HOST}`) {
//   Stack.setHost(`${process.env.REACT_APP_CONTENTSTACK_PROXY_HOST}`);
// }
if (`${process.env.REACT_APP_CONTENTSTACK_API_HOST}`) {
  Stack.setHost(`${process.env.REACT_APP_CONTENTSTACK_API_HOST}`);
}

const renderOption = {
  ["span"]: (node: any, next: any) => {
    return next(node.children);
  }
};

export const onEntryChange = ContentstackLivePreview.onEntryChange;

export default {
  /**
   *
   * fetches all the entries from specific content-type
   * @param {* content-type uid} contentTypeUid
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   *
   */
  getEntry({
    contentTypeUid,
    referenceFieldPath,
    jsonRtePath,
    limit = 20,
    orderBy = "updated_at"
  }: GetEntry) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      query
        .includeOwner()
        .limit(limit)
        .descending(orderBy)
        .toJSON()
        .find()
        .then(
          (result) => {
            jsonRtePath &&
              Utils.jsonToHTML({
                entry: result,
                paths: jsonRtePath,
                renderOption
              });
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },

  /**
   *fetches specific entry from a content-type
   *
   * @param {* content-type uid} contentTypeUid
   * @param {* url for entry to be fetched} entryUrl
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   * @returns
   */
  getEntryByUrl({
    contentTypeUid,
    entryUrl,
    referenceFieldPath,
    jsonRtePath
  }: GetEntryByUrl) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.includeOwner().toJSON();
      const data = blogQuery.where("url", `${entryUrl}`).find();
      data.then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption
            });
          resolve(result[0]);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },

  /**
   *fetches specific entry from a content-type by id
   *
   * @param {* content-type uid} contentTypeUid
   * @param {* id for entry to be fetched} entryId
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   * @returns
   */
  getEntryById({
    contentTypeUid,
    entryId,
    referenceFieldPath,
    jsonRtePath
  }: GetEntryById) {
    return new Promise((resolve, reject) => {
      const entryQuery = Stack.ContentType(contentTypeUid).Entry(entryId);
      // const blogQuery = Stack.ContentType("contentTypeUid").Query("entryId");
      if (referenceFieldPath) entryQuery.includeReference(referenceFieldPath);
      // blogQuery.includeOwner().toJSON();
      const data = entryQuery.toJSON().fetch();
      data.then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption
            });
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
};
