import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
    } catch (e) {
        console.log('Collections were not presents, skipping drop!');
    }

    const [EdSheeranArtist, InnaArtist, AdeleArtist] = await Artist.create(
        {
            name: 'Ed Sheeran',
            description: 'Edward Christopher Sheeran was born 17 February 1991. He is an English singer-songwriter. Born in Halifax, West Yorkshire, and raised in Framlingham, Suffolk, he began writing songs around the age of eleven. In early 2011, Sheeran independently released the extended play No. 5 Collaborations Project. He signed with Asylum Records the same year.',
            image: 'fixtures/Ed_Sheeran.jpg',
        },
        {
            name: 'Inna',
            description: 'Elena Alexandra Apostoleanu (born 16 October 1986), known professionally as Inna, is a Romanian singer. Born in Mangalia and raised in Neptun, she studied political science at Ovidius University before meeting the Romanian trio Play & Win and pursuing a music career. She adopted the stage name "Alessandra" and a pop-rock style in 2008; later that year, she changed her stage name to "Inna" and began releasing EDM, house and popcorn music.',
            image: 'fixtures/Inna.jpg',
        },
        {
            name: 'Adele',
            description: 'Adele Laurie Blue Adkins (born 5 May 1988), known mononymously as Adele, is an English singer-songwriter. Regarded as a British icon, she is known for her mezzo-soprano vocals and sentimental songwriting. Her accolades include 16 Grammy Awards, 12 Brit Awards (including three for British Album of the Year), an Academy Award, a Primetime Emmy Award, and a Golden Globe Award.',
            image: 'fixtures/Adele.jpg',
        }
    );

    const [EditionFrancaiseAlbum, XAlbum, HotAlbum, ElPasadoAlbum, Adele21Album, Adele25Album] = await Album.create(
        {
            artist: EdSheeranArtist._id,
            title: '= Édition Française',
            releaseDate: 2022,
            image: 'fixtures/L-Edition-Francaise.jpg',
        },
        {
            artist: EdSheeranArtist._id,
            title: 'X',
            releaseDate: 2014,
            image: 'fixtures/Ed_Sheeran_X.jpg',
        },
        {
            artist: InnaArtist._id,
            title: 'Hot',
            releaseDate: 2009,
            image: 'fixtures/Inna_hot.jpg',
        },
        {
            artist: InnaArtist._id,
            title: 'El Pasado',
            releaseDate: 2023,
            image: 'fixtures/ElPasado.jpg',
        },
        {
            artist: AdeleArtist._id,
            title: '21',
            releaseDate: 2011,
            image: 'fixtures/Adele21.jpg',
        },
        {
            artist: AdeleArtist._id,
            title: '25',
            releaseDate: 2015,
            image: 'fixtures/Adele25.jpg',
        }
    );

    await Track.create(
        {
            album: EditionFrancaiseAlbum._id,
            title: 'Tides',
            trackDuration: '3:16',
            number: 1,
            url: 'https://www.youtube.com/watch?v=P_kRTqaD8Mc'
        },
        {
            album: EditionFrancaiseAlbum._id,
            title: 'Shivers',
            trackDuration: '3:28',
            number: 2,
            url: 'https://www.youtube.com/watch?v=Il0S8BoucSA'
        },
        {
            album: EditionFrancaiseAlbum._id,
            title: 'First Times',
            trackDuration: '3:06',
            number: 3,
            url: 'https://www.youtube.com/watch?v=y6oryBG8xeQ'
        },
        {
            album: EditionFrancaiseAlbum._id,
            title: 'Bad Habits',
            trackDuration: '3:51',
            number: 4,
            url: 'https://www.youtube.com/watch?v=orJSJGHjBLI'
        },
        {
            album: EditionFrancaiseAlbum._id,
            title: '2step',
            trackDuration: '2:34',
            number: 5,
            url: 'https://www.youtube.com/watch?v=Z_MvkyuOJgk'
        },
        {
            album: XAlbum._id,
            title: 'Photograph',
            trackDuration: '4:16',
            number: 1,
            url: 'https://www.youtube.com/watch?v=nSDgHBxUbVQ'
        },
        {
            album: XAlbum._id,
            title: 'Bloodstream',
            trackDuration: '5:00',
            number: 2,
            url: 'https://www.youtube.com/watch?v=Vv-n0pgQ8zg'
        },
        {
            album: XAlbum._id,
            title: 'Don\'t',
            trackDuration: '3:39',
            number: 3,
            url: 'https://www.youtube.com/watch?v=iD2rhdFRehU'
        },
        {
            album: XAlbum._id,
            title: 'Thinking Out Loud',
            trackDuration: '4:37',
            number: 4,
            url: 'https://www.youtube.com/watch?v=lp-EO5I60KA'
        },
        {
            album: XAlbum._id,
            title: 'All of the Stars',
            trackDuration: '3:57',
            number: 5,
            url: 'https://www.youtube.com/watch?v=nkqVm5aiC28'
        },
        {
            album: HotAlbum._id,
            title: 'Hot (Play & Win Radio Version)',
            trackDuration: '3:37',
            number: 1,
            url: 'https://www.youtube.com/watch?v=Vh_3zdmaHbk'
        },
        {
            album: HotAlbum._id,
            title: 'Amazing',
            trackDuration: '3:27',
            number: 2,
            url: 'https://www.youtube.com/watch?v=gKHe12T6GMY'
        },
        {
            album: HotAlbum._id,
            title: 'Don\'t Let the Music Die',
            trackDuration: '3:38',
            number: 3,
            url: 'https://www.youtube.com/watch?v=L3EUJSRIC-4'
        },
        {
            album: HotAlbum._id,
            title: 'Deja Vu (Play & Win Radio Edit)',
            trackDuration: '4:21',
            number: 4,
            url: 'https://www.youtube.com/watch?v=zr_c5rqvSg4'
        },
        {
            album: HotAlbum._id,
            title: 'On & On',
            trackDuration: '4:38',
            number: 5,
            url: 'https://www.youtube.com/watch?v=S_D9UPJlKpE'
        },
        {
            album: ElPasadoAlbum._id,
            title: 'Primera Vez',
            trackDuration: '2:51',
            number: 1,
            url: 'https://www.youtube.com/watch?v=iG-q8aDjfhY'
        },
        {
            album: ElPasadoAlbum._id,
            title: 'Enferma',
            trackDuration: '3:43',
            number: 2,
            url: 'https://www.youtube.com/watch?v=fBedGAWqrmE'
        },
        {
            album: ElPasadoAlbum._id,
            title: 'Dame La Mano',
            trackDuration: '2:55',
            number: 3,
            url: 'https://www.youtube.com/watch?v=Aiszg_6B6cw'
        },
        {
            album: ElPasadoAlbum._id,
            title: 'Cora',
            trackDuration: '2:51',
            number: 4,
            url: 'https://www.youtube.com/watch?v=JAZxAsaNiv8'
        },
        {
            album: ElPasadoAlbum._id,
            title: 'LaLaLa',
            trackDuration: '2:32',
            number: 5,
            url: 'https://www.youtube.com/watch?v=WaKWLdAXrFs'
        },
        {
            album: Adele21Album._id,
            title: 'Rolling in the Deep',
            trackDuration: '3:48',
            number: 1,
            url: 'https://www.youtube.com/watch?v=rYEDA3JcQqw'
        },
        {
            album: Adele21Album._id,
            title: 'Set Fire to the Rain',
            trackDuration: '4:02',
            number: 2,
            url: 'https://www.youtube.com/watch?v=1twUUM0KxDg'
        },
        {
            album: Adele21Album._id,
            title: 'Take It All',
            trackDuration: '3:48',
            number: 3,
            url: 'https://www.youtube.com/watch?v=ELBQ_YYiTzs'
        },
        {
            album: Adele21Album._id,
            title: 'Someone Like You',
            trackDuration: '4:45',
            number: 4,
            url: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0'
        },
        {
            album: Adele21Album._id,
            title: 'He Won’t Go',
            trackDuration: '4:38',
            number: 5,
            url: 'https://www.youtube.com/watch?v=Q78Rme59PTs'
        },
        {
            album: Adele25Album._id,
            title: 'Hello',
            trackDuration: '4:55',
            number: 1,
            url: 'https://www.youtube.com/watch?v=YQHsXMglC9A'
        },
        {
            album: Adele25Album._id,
            title: 'Send My Love (To Your New Lover)',
            trackDuration: '3:43',
            number: 2,
            url: 'https://www.youtube.com/watch?v=9KgKFtYit7s'
        },
        {
            album: Adele25Album._id,
            title: 'When We Were Young',
            trackDuration: '4:51',
            number: 3,
            url: 'https://www.youtube.com/watch?v=DDWKuo3gXMQ'
        },
        {
            album: Adele25Album._id,
            title: 'Remedy',
            trackDuration: '4:05',
            number: 5,
            url: 'https://www.youtube.com/watch?v=i4D3bVBB294'
        },
        {
            album: Adele25Album._id,
            title: 'Water Under the Bridge',
            trackDuration: '4:00',
            number: 4,
            url: 'https://www.youtube.com/watch?v=5aTttdUDmvI'
        }
    );
};

run().catch(console.error);