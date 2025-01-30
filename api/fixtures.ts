import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";
import {randomUUID} from "node:crypto";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not presents, skipping drop!');
    }

    const [userMolly, userSally] = await User.create(
        {
            username: 'Molly',
            password: '123',
            role: 'admin',
            token: randomUUID(),
        },
        {
            username: 'Sally',
            password: '123',
            role: 'user',
            token: randomUUID(),
        },
    );

    const [EdSheeranArtist, InnaArtist, AdeleArtist, JustinTimberlakeArtist] = await Artist.create(
        {
            user: userSally._id,
            name: 'Ed Sheeran',
            description: 'Edward Christopher Sheeran was born 17 February 1991. He is an English singer-songwriter. Born in Halifax, West Yorkshire, and raised in Framlingham, Suffolk, he began writing songs around the age of eleven. In early 2011, Sheeran independently released the extended play No. 5 Collaborations Project. He signed with Asylum Records the same year.',
            image: 'fixtures/Ed_Sheeran.jpg',
            isPublished: true,
        },
        {
            user: userSally._id,
            name: 'Inna',
            description: 'Elena Alexandra Apostoleanu (born 16 October 1986), known professionally as Inna, is a Romanian singer. Born in Mangalia and raised in Neptun, she studied political science at Ovidius University before meeting the Romanian trio Play & Win and pursuing a music career. She adopted the stage name "Alessandra" and a pop-rock style in 2008; later that year, she changed her stage name to "Inna" and began releasing EDM, house and popcorn music.',
            image: 'fixtures/Inna.jpg',
            isPublished: true,
        },
        {
            user: userSally._id,
            name: 'Adele',
            description: 'Adele Laurie Blue Adkins (born 5 May 1988), known mononymously as Adele, is an English singer-songwriter. Regarded as a British icon, she is known for her mezzo-soprano vocals and sentimental songwriting. Her accolades include 16 Grammy Awards, 12 Brit Awards (including three for British Album of the Year), an Academy Award, a Primetime Emmy Award, and a Golden Globe Award.',
            image: 'fixtures/Adele.jpg',
            isPublished: true,
        },
        {
            user: userSally._id,
            name: 'Justin Timberlake',
            description: 'Justin Randall Timberlake (born January 31, 1981) is an American singer, songwriter, record producer, actor, and dancer. Dubbed the "Prince of Pop", Billboard honored him as the best performing solo act on Pop Airplay and one of the Greatest Pop Stars of the 21st Century. Timberlake remains among the best-selling recording artists of all time, with sales of over 117 million records worldwide.',
            image: 'fixtures/JustinTimberlake.jpg',
            isPublished: false,
        }
    );

    const [EditionFrancaiseAlbum, XAlbum, HotAlbum, ElPasadoAlbum, Adele21Album, Adele25Album, TheExperienceAlbum] = await Album.create(
        {
            user: userSally._id,
            artist: EdSheeranArtist._id,
            title: '= Édition Française',
            releaseDate: 2022,
            image: 'fixtures/L-Edition-Francaise.jpg',
            isPublished: true,
        },
        {
            user: userSally._id,
            artist: EdSheeranArtist._id,
            title: 'X',
            releaseDate: 2014,
            image: 'fixtures/Ed_Sheeran_X.jpg',
            isPublished: true,
        },
        {
            user: userSally._id,
            artist: InnaArtist._id,
            title: 'Hot',
            releaseDate: 2009,
            image: 'fixtures/Inna_hot.jpg',
            isPublished: true,
        },
        {
            user: userSally._id,
            artist: InnaArtist._id,
            title: 'El Pasado',
            releaseDate: 2023,
            image: 'fixtures/ElPasado.jpg',
            isPublished: true,
        },
        {
            user: userSally._id,
            artist: AdeleArtist._id,
            title: '21',
            releaseDate: 2011,
            image: 'fixtures/Adele21.jpg',
            isPublished: true,
        },
        {
            user: userSally._id,
            artist: AdeleArtist._id,
            title: '25',
            releaseDate: 2015,
            image: 'fixtures/Adele25.jpg',
            isPublished: true,
        },
        {
            user: userSally._id,
            artist: JustinTimberlakeArtist._id,
            title: 'The 20/20 Experience',
            releaseDate: 2013,
            image: 'fixtures/JT.jpeg',
            isPublished: false,
        }
    );


    await Track.create(
        {
            user: userSally._id,
            album: EditionFrancaiseAlbum._id,
            title: 'Tides',
            trackDuration: '3:16',
            number: 1,
            url: 'https://www.youtube.com/watch?v=P_kRTqaD8Mc',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: EditionFrancaiseAlbum._id,
            title: 'Shivers',
            trackDuration: '3:28',
            number: 2,
            url: 'https://www.youtube.com/watch?v=Il0S8BoucSA',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: EditionFrancaiseAlbum._id,
            title: 'First Times',
            trackDuration: '3:06',
            number: 3,
            url: 'https://www.youtube.com/watch?v=y6oryBG8xeQ',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: EditionFrancaiseAlbum._id,
            title: 'Bad Habits',
            trackDuration: '3:51',
            number: 4,
            url: 'https://www.youtube.com/watch?v=orJSJGHjBLI',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: EditionFrancaiseAlbum._id,
            title: '2step',
            trackDuration: '2:34',
            number: 5,
            url: 'https://www.youtube.com/watch?v=Z_MvkyuOJgk',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: XAlbum._id,
            title: 'Photograph',
            trackDuration: '4:16',
            number: 1,
            url: 'https://www.youtube.com/watch?v=nSDgHBxUbVQ',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: XAlbum._id,
            title: 'Bloodstream',
            trackDuration: '5:00',
            number: 2,
            url: 'https://www.youtube.com/watch?v=Vv-n0pgQ8zg',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: XAlbum._id,
            title: 'Don\'t',
            trackDuration: '3:39',
            number: 3,
            url: 'https://www.youtube.com/watch?v=iD2rhdFRehU',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: XAlbum._id,
            title: 'Thinking Out Loud',
            trackDuration: '4:37',
            number: 4,
            url: 'https://www.youtube.com/watch?v=lp-EO5I60KA',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: XAlbum._id,
            title: 'All of the Stars',
            trackDuration: '3:57',
            number: 5,
            url: 'https://www.youtube.com/watch?v=nkqVm5aiC28',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: HotAlbum._id,
            title: 'Hot (Play & Win Radio Version)',
            trackDuration: '3:37',
            number: 1,
            url: 'https://www.youtube.com/watch?v=Vh_3zdmaHbk',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: HotAlbum._id,
            title: 'Amazing',
            trackDuration: '3:27',
            number: 2,
            url: 'https://www.youtube.com/watch?v=gKHe12T6GMY',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: HotAlbum._id,
            title: 'Don\'t Let the Music Die',
            trackDuration: '3:38',
            number: 3,
            url: 'https://www.youtube.com/watch?v=L3EUJSRIC-4',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: HotAlbum._id,
            title: 'Deja Vu (Play & Win Radio Edit)',
            trackDuration: '4:21',
            number: 4,
            url: 'https://www.youtube.com/watch?v=zr_c5rqvSg4',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: HotAlbum._id,
            title: 'On & On',
            trackDuration: '4:38',
            number: 5,
            url: 'https://www.youtube.com/watch?v=S_D9UPJlKpE',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: ElPasadoAlbum._id,
            title: 'Primera Vez',
            trackDuration: '2:51',
            number: 1,
            url: 'https://www.youtube.com/watch?v=iG-q8aDjfhY',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: ElPasadoAlbum._id,
            title: 'Enferma',
            trackDuration: '3:43',
            number: 2,
            url: 'https://www.youtube.com/watch?v=fBedGAWqrmE',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: ElPasadoAlbum._id,
            title: 'Dame La Mano',
            trackDuration: '2:55',
            number: 3,
            url: 'https://www.youtube.com/watch?v=Aiszg_6B6cw'
        },
        {
            user: userSally._id,
            album: ElPasadoAlbum._id,
            title: 'Cora',
            trackDuration: '2:51',
            number: 4,
            url: 'https://www.youtube.com/watch?v=JAZxAsaNiv8',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: ElPasadoAlbum._id,
            title: 'LaLaLa',
            trackDuration: '2:32',
            number: 5,
            url: 'https://www.youtube.com/watch?v=WaKWLdAXrFs',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: Adele21Album._id,
            title: 'Rolling in the Deep',
            trackDuration: '3:48',
            number: 1,
            url: 'https://www.youtube.com/watch?v=rYEDA3JcQqw',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: Adele21Album._id,
            title: 'Set Fire to the Rain',
            trackDuration: '4:02',
            number: 2,
            url: 'https://www.youtube.com/watch?v=1twUUM0KxDg',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: Adele21Album._id,
            title: 'Take It All',
            trackDuration: '3:48',
            number: 3,
            url: 'https://www.youtube.com/watch?v=ELBQ_YYiTzs',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: Adele21Album._id,
            title: 'Someone Like You',
            trackDuration: '4:45',
            number: 4,
            url: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: Adele21Album._id,
            title: 'He Won’t Go',
            trackDuration: '4:38',
            number: 5,
            url: 'https://www.youtube.com/watch?v=Q78Rme59PTs',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: Adele25Album._id,
            title: 'Hello',
            trackDuration: '4:55',
            number: 1,
            url: 'https://www.youtube.com/watch?v=YQHsXMglC9A',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: Adele25Album._id,
            title: 'Send My Love (To Your New Lover)',
            trackDuration: '3:43',
            number: 2,
            url: 'https://www.youtube.com/watch?v=9KgKFtYit7s',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: Adele25Album._id,
            title: 'When We Were Young',
            trackDuration: '4:51',
            number: 3,
            url: 'https://www.youtube.com/watch?v=DDWKuo3gXMQ',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: Adele25Album._id,
            title: 'Remedy',
            trackDuration: '4:05',
            number: 5,
            url: 'https://www.youtube.com/watch?v=i4D3bVBB294',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: Adele25Album._id,
            title: 'Water Under the Bridge',
            trackDuration: '4:00',
            number: 4,
            url: 'https://www.youtube.com/watch?v=5aTttdUDmvI',
            isPublished: true,
        },
        {
            user: userSally._id,
            album: TheExperienceAlbum._id,
            title: 'Strawberry Bubblegum',
            trackDuration: '8:00',
            number: 1,
            url: 'https://www.youtube.com/watch?v=CUkHzz7687s',
            isPublished: false,
        },
        {
            user: userSally._id,
            album: TheExperienceAlbum._id,
            title: 'Mirrors',
            trackDuration: '8:05',
            number: 2,
            url: 'https://www.youtube.com/watch?v=uuZE_IRwLNI',
            isPublished: false,
        },
        {
            user: userSally._id,
            album: TheExperienceAlbum._id,
            title: 'TKO',
            trackDuration: '7:04',
            number: 3,
            url: 'https://www.youtube.com/watch?v=FyXtoTLLcDk',
            isPublished: false,
        },
        {
            user: userSally._id,
            album: TheExperienceAlbum._id,
            title: 'Take Back The Night',
            trackDuration: '5:53',
            number: 4,
            url: 'https://www.youtube.com/watch?v=DEzREJbln-o',
            isPublished: false,
        }
    );
};

run().catch(console.error);