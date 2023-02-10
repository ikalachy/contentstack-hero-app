export enum HeroQuality {
  "Superhero for Justice" = "superhero for justice with a cape like superman or superwoman",
  "Magical Fantasy" = "magic, fantasy, golden light, cape, glowing",
  "Action Hero" = "action hero with an amazing dynamic background, Indiana Jones",
  "Ninja Warrior" = "Ninja Warrior with a dynamic background set on a ninja training dojo scene",
  "Mystical Wizard" = "an incredible magician with a wizard hat, magic long robes",
  "1920s Gangster" = "a tough-looking gangster in a Fedora"
}

export enum GenderQuality {
  Masculine = "Masculine",
  Feminine = "Feminine",
  Beautiful = "Beautiful",
  Handsome = "Handsome",
  LongHair = "Long hair",
  ShortHair = "Short hair"
}

export type Inputs = {
  name: string;
  job_title: string;
  job_description: string;
  superhero_qualities: HeroQuality;
  gender_qualities: [GenderQuality];
  original_image: File;
  background_story: string;
};
