export interface UserData {
    username: string;
    password: string;
    role: string;
    token: string;
}
export interface IArtist {
    user: UserData;
    name: string;
    description: string;
    image: string | null;
    isPublished: boolean;
}

export interface IAlbum {
    user: UserData;
    artist: number;
    title: string;
    releaseDate: number;
    image: string | null;
}

export interface ITrack {
    user: UserData;
    album: number;
    title: string;
    trackDuration: string;
    number: number;
    url: string;
}

