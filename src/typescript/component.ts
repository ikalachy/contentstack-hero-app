import { InputType } from "./../components/form/input-text";
import { Action, Image } from "./action";

type Object = {
  title: string;
  title_h2: string;
  title_h3: string;
  description: string;
  banner_title: string;
  banner_description: string;
  designation: string;
  name: string;
  html_code: string;
  body: string;
};

type Employee = {
  image: Image;
  name: string;
  designation: string;
  $: Object;
};

type BucketList = [
  BucketArray: {
    title_h3: string;
    description: string;
    url: string;
    call_to_action: Action;
    icon: Image;
    $: Object;
  }
];

type Card = [
  cardArray: {
    title_h3: string;
    description: string;
    call_to_action: Action;
    $: Object;
  }
];

type Article = {
  href: string;
  title: string;
  $: Object;
};

type FeaturedBlog = [
  BlogArray: {
    title: string;
    featured_image: Image;
    body: string;
    url: string;
    $: Object;
  }
];

type Widget = {
  title_h2: string;
  type?: string;
  $: Object;
};

export type Component = {
  super_hero_form: any;
  hero_banner: Banner;
  section?: SectionProps;
  section_with_buckets?: SectionWithBucket;
  from_blog?: FeaturedBlogData;
  section_with_cards?: Cards;
  section_with_html_code?: ObjectProps;
  our_team?: TeamProps;
  widget?: Widget;
};

export type SectionWithBucket = {
  bucket_tabular: boolean;
  title_h2: string;
  buckets: BucketList;
  description: string;
  $: Object;
};

export type Cards = {
  cards: Card;
};

export type Banner = {
  banner_title: string;
  banner_description: string;
  bg_color: string;
  call_to_action: Action;
  banner_image: Image;
  text_color: string;
  $: Object;
};

export type ObjectProps = {
  html_code_alignment: string;
  title: string;
  $: Object;
  description: string;
  html_code: string;
};

export type SectionProps = {
  title_h2: String;
  description: string;
  call_to_action: Action;
  image: Image;
  image_alignment: string;
  $: Object;
};

export type TeamProps = {
  title_h2: string;
  description: string;
  $: Object;
  employees: [Employee];
};

export type FeaturedBlogData = {
  title_h2: string;
  view_articles: Article;
  featured_blogs: FeaturedBlog;
  $: Object;
};

export type FormElementConfig = {
  type: InputType | "select" | "textarea";
  label: string;
  placeholder: string;
  registerOptions: {
    required?: boolean;
    maxLength?: number | { value: number; message: string };
    minLength?: number | { value: number; message: string };
  };
  // selectOptions: Record<string, string>;
  // options: Record<string, string>;
  containerClass?: string;
  error: string;
  text?: string;
};

export interface FormInputElementConfig extends FormElementConfig {
  type: InputType;
}

export interface FormCheckboxElementConfig extends FormInputElementConfig {
  options: Record<string, string>;
}

export interface FormSelectElementConfig extends FormElementConfig {
  type: "select";
  options: Record<string, string>;
}

export interface FormTextareaElementConfig extends FormElementConfig {
  type: "textarea";
}

export type FormConfig = {
  [key: string]: FormElementConfig;
};

export type SuperHeroFromProps = {
  title?: string;
  description?: string;
  entryUid?: string;
  form_config: FormConfig;
  locale?: string;
  consent?: string;
};

export type RenderProps = {
  blogsPage?: boolean;
  contentTypeUid: string;
  entryUid: string;
  locale: string;
  pageComponents: Component[];
};
