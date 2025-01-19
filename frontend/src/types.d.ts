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
}

export interface UserRegisterResponse {
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