import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {IArtist} from "../types";
import {Error} from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const artistsRouter = express.Router();

artistsRouter.get("/", async (_req: express.Request, res: express.Response, next) => {
    try {
        const artist = await Artist.find();
        res.send(artist);
    } catch (e) {
        next(e);
    }
});

artistsRouter.post('/', imagesUpload.single('image'), auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    const newArtist: IArtist = {
        user,
        name: req.body.name,
        description: req.body.description || null,
        image: req.file ? 'images' + req.file.filename : null,
        isPublished: false,
    };

    try {
        const artist = new Artist(newArtist);
        await artist.save();
        res.send(newArtist);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

artistsRouter.delete("/:id", auth, permit('admin', 'user'), async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const artistId = expressReq.params.id;
    const user = expressReq.user;

    try {

        const artist = await Artist.findById(artistId);

        if (!artist) {
            res.status(404).send({error: 'This artist not found!'});
            return;
        }

        if (user._id.toString() === artist.user._id.toString()) {
            if (artist.isPublished === false) {
                await artist.deleteOne();
                res.send({message: "This artist was successfully deleted by the user!"});
                return;
            }
        }

        if (user.role === 'admin') {
            await artist.deleteOne();
            res.send({message: "This artist was successfully deleted by admin!"});
            return;
        }

        res.status(403).send({error: 'You aren\'t an admin! You don\'t have access to delete this artist!'});

    } catch (error) {
        next(error);
    }
});

export default artistsRouter;