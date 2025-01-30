export interface IArtist {
  _id: string;
  name: string;
  description: string;
  image: string | null;
  isPublished: boolean;
}

export interface IArtistMutation {
  name: string;
  description: string;
  image: File | null;
}

export interface IAlbum {
  _id: string;
  artist: IArtist;
  title: string;
  releaseDate: number,
  image: string | null;
  isPublished: boolean;
}

export interface IAlbumMutation {
  artist: string;
  title: string;
  releaseDate: string,
  image: File | null;
}

export interface ITrack {
  _id: string;
  album: IAlbum;
  title: string;
  trackDuration: string;
  number: number;
  url: string;
  isPublished: boolean;
}

export interface ITrackMutation {
  album: string;
  title: string;
  trackDuration: string;
  number: string;
  url: string;
}

export interface UserRegister {
  username: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface UserLoginResponse {
  user: IUser;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    },
    messages: string;
    name: string;
    _message: string;
  };
}

export interface GlobalError {
  error: string;
}

export interface ITrackHistory {
  artist: IArtist;
  user: IUser;
  track: ITrack;
  _id: string;
  datetime: string;
}