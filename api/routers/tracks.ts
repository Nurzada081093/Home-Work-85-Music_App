import express from "express";
import Album from "../models/Album";
import {Error} from "mongoose";
import {ITrack} from "../types";
import Track from "../models/Track";
import Artist from "../models/Artist";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
    const albumIdQuery = req.query.album;
    const artistIdQuery = req.query.artist;

    try {
        if (albumIdQuery) {
            const tracks = await Track.find({album: albumIdQuery}).populate({
                path: 'album',
                populate: {
                    path: 'artist',
                    model: 'Artist'
                }
            }).sort({'number': 1});
            res.send(tracks);
            return;
        }

        if (artistIdQuery) {
            const artist = await Artist.findById(artistIdQuery);

            if (!artist) {
                res.status(404).send({error: 'Not found this artist!'});
                return;
            }

            const albums = await Album.find({artist: artistIdQuery});
            const albumsId = albums.map(album => album._id);
            const tracks = await Track.find({album: {$in: albumsId}}).sort({'number': 1});
            res.send(tracks);
            return;
        }

        const tracksAll = await Track.find().populate({
            path: 'album',
            populate: {
                path: 'artist',
                model: 'Artist'
            }
        }).sort({'number': 1});
        res.send(tracksAll);

    } catch (e) {
        next(e);
    }
});

tracksRouter.post('/', auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    if (req.body.album) {
        const album = await Album.findById(req.body.album);

        if (!album) {
            res.status(404).send({error: 'This album is not found!'});
            return;
        }
    }

    const newTrack: ITrack = {
        user,
        album: req.body.album,
        title: req.body.title,
        trackDuration: req.body.trackDuration,
        number: req.body.number,
        url: req.body.url || null,
    }

    try {
        const track = new Track(newTrack);
        await track.save();
        res.send(track);
    } catch (error) {

        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

tracksRouter.delete("/:id", auth, permit('admin', 'user'), async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const trackId = expressReq.params.id;
    const user = expressReq.user;

    try {

        const track = await Track.findById(trackId);

        if (!track) {
            res.status(404).send({error: 'This track not found!'});
            return;
        }

        if (user._id.toString() === track.user._id.toString()) {
            if (track.isPublished === false) {
                await track.deleteOne();
                res.send({message: "This track was successfully deleted by the user!"});
                return;
            }
        }

        if (user.role === 'admin') {
            await track.deleteOne();
            res.send({message: "This track was successfully deleted by admin!"});
            return;
        }

        res.status(403).send({error: 'Your role is not admin! You don\'t have access to delete this track!'});

    } catch (error) {
        next(error);
    }
});

tracksRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const trackId = expressReq.params.id;

    try {
        const track = await Artist.findById(trackId);

        if (!track) {
            res.status(404).send({error: 'This track not found!'});
            return;
        }

        track.isPublished = !track.isPublished;

        await track.save({validateModifiedOnly: true});
        res.send(track);
    } catch (error) {
        next(error);
    }
});

export default tracksRouter;