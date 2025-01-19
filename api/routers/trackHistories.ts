import express from "express";
import Track from "../models/Track";
import TrackHistory from "../models/TrackHistory";
import {Error} from "mongoose";
import Album from "../models/Album";
import Artist from "../models/Artist";
import auth, {RequestWithUser} from "../middleware/auth";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    const track = await Track.findById(req.body.track).populate('album');

    if (!track) {
        res.status(404).send({error: 'Not found this track!'});
        return;
    }

    const album = await Album.findById(track.album._id).populate('artist');
    const artist = await Artist.findById(album?.artist._id);

    const newTrackHistory = {
        user,
        artist,
        track: expressReq.body.track,
    };

    try {
        const trackHistory = new TrackHistory(newTrackHistory);
        await trackHistory.save();
        res.send(trackHistory);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

trackHistoryRouter.get("/", auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    try {
        const trackHistories = await TrackHistory.find({user: user._id}).sort({datetime: -1}).populate('track').populate('artist');
        res.send(trackHistories)
    } catch (error) {
        next(error);
    }
});

export default trackHistoryRouter;