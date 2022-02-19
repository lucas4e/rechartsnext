export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export interface SeriesData {
  series_data?: TVMazeRes;
}

export interface TVMazeRes {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: Date;
  ended: Date;
  officialSite: string;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network;
  webChannel: null;
  dvdCountry: null;
  externals: Externals;
  image: Image;
  summary: string;
  updated: number;
  _links: TVMazeResLinks;
  _embedded: Embedded;
}

export interface Embedded {
  episodes: Episode[];
}

export interface Episode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: Type;
  airdate: Date;
  airtime: Time;
  airstamp: Date;
  runtime: number;
  rating: Rating;
  image: Image;
  summary: string;
  _links: EpisodeLinks;
}

export interface EpisodeLinks {
  self: Previousepisode;
}

export interface Previousepisode {
  href: string;
}

export enum Time {
  The2100 = '21:00',
  The2200 = '22:00',
  The2205 = '22:05',
  The2230 = '22:30',
  The2240 = '22:40',
}

export interface Image {
  medium: string;
  original: string;
}

export interface Rating {
  average: number;
}

export enum Type {
  Regular = 'regular',
}

export interface TVMazeResLinks {
  self: Previousepisode;
  previousepisode: Previousepisode;
}

export interface Externals {
  tvrage: number;
  thetvdb: number;
  imdb: string;
}

export interface Network {
  id: number;
  name: string;
  country: Country;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}

export interface Schedule {
  time: Time;
  days: string[];
}
