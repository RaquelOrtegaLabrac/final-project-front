import { User } from "./user";

export type Instrument = {
  id: string;
  name: string;
  inventor: string;
  developed: string;
  classification:
    | "aerophones"
    | "chordophones"
    | "membranophones"
    | "idiophones"
    | "electrophones"
    | "other";
  shortDescription: string;
  image: {
    urlOriginal: string;
    url: string;
    mimetype: string;
    size: number;
  };
  video: string;
  owner: User;
};
