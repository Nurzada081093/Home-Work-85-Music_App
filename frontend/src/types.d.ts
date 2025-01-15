export interface IArtist {
  _id: string;
  name: string;
  description: string;
  image: string | null;
}

export interface IAlbum {
  _id: string;
  artist: IArtist;
  title: string;
  releaseDate: number,
  image: string | null;
}

export interface ITrack {
  _id: string;
  album: IAlbum;
  title: string;
  trackDuration: string;
  number: number;
}