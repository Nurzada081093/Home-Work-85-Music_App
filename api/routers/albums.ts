import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import {IAlbum} from "../types";
import Artist from "../models/Artist";
import {Error} from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    const artistIdQuery = req.query.artist;

    try {
        const filter = artistIdQuery ? {artist: artistIdQuery} : {};
        const albums = await Album.find(filter).sort({releaseDate: -1}).populate('artist');
        res.send(albums);
    } catch (e) {
        next(e);
    }
});

albumsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error: 'Album id not found!'});
    }

    try {
        const album = await Album.findById(id).populate("artist");

        if (!album) {
            res.status(404).send({error: 'Album not found'});
        }

        res.send(album);
    } catch (e) {
        next(e);
    }
});

albumsRouter.post('/', imagesUpload.single('image'), auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    if (req.body.artist) {
        const artist = await Artist.findById(req.body.artist);

        if (!artist) {
            res.status(404).send({error: 'Not found this artist!'});
            return;
        }
    }

    const newAlbum: IAlbum = {
        user,
        artist: req.body.artist,
        title: req.body.title,
        releaseDate: req.body.releaseDate,
        image: req.file ? 'images' + req.file.filename : null,
    };

    try {
        const album = new Album(newAlbum);
        await album.save();
        res.send(album);
    } catch (error) {

        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

albumsRouter.delete("/:id", auth, permit('admin', 'user'), async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const albumId = expressReq.params.id;
    const user = expressReq.user;

    try {

        const album = await Album.findById(albumId);

        if (!album) {
            res.status(404).send({error: 'This album not found!'});
            return;
        }

        if (user._id.toString() === album.user._id.toString()) {
            if (album.isPublished === false) {
                await album.deleteOne();
                res.send({message: "This album was successfully deleted by the user!"});
                return;
            }
        }

        if (user.role === 'admin') {
            await album.deleteOne();
            res.send({message: "This album was successfully deleted by admin!"});
            return;
        }

        res.status(403).send({error: 'Your role is not admin! You don\'t have access to delete this album!'});

    } catch (error) {
        next(error);
    }
});

export default albumsRouter;