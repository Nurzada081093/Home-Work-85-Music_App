import mongoose from "mongoose";
import {IArtist} from "../types";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        unique: true,
        validate: {
            validator: async function (value: string): Promise<boolean> {
                const artistName: IArtist | null = await Artist.findOne({name: value});
                return !artistName;
            },
            message: 'This artist name is already in taken!',
        },
    },
    description: {
        type: String,
        default: null,
    },
    image: String,
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;

