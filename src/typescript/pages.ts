import { Component } from "../typescript/component";

type Object = {
    title: string;
    body: string;
    date: string;
    related_post: [];
  }

type Author = {
    title: string;
    $: Object;
  }

type Blog = {
    url: string;
    body: string;
    title: string;
    $: Object;
  }

export type PageEntry = {
    url: string;
    page_components: Component[];
    uid: string;
    locale: string;
  }
  
export type Prop = {
    entry: Function
  }
  
export type Entry = {
    uid: string;
    page_components: Component[];
    locale: string;
  };
  
export type BlogData = {
    is_archived: boolean;
}
  
export type ImageData = {
  uid: string;
  aprimo_composable_card_url: string;
  aprimo_hero_card_url: string;
  title: string;
  job_title: string;
  created_at: Date;
  updated_by: Date;
};
  
export type ArchiveBlogList = [
    blogs:{
      url: string;
      body: string;
      title: string;
      $: Object;
    }
  ]

export type Banner = {
    uid: string;
    page_components:Component[];
    locale: string;
  }

export type Post = {
    url: string;
    page_components:[];
    title: string;
    date:string;
    author:Author[];
    body:string;
    related_post:[Blog];
    $:Object;
}
  
export type Hero = {
  page_components: [];
  uid: string;
  aprimo_composable_card_url: string;
  aprimo_hero_card_url: string;
  title: string;
  created_at: Date;
  updated_by: Date;
  $: Object;
};
