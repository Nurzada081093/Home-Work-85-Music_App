import { Button, OutlinedInput, SelectChangeEvent, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { IAlbum, IArtist, ITrackMutation } from '../../../../types';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts';
import { SliceArtists } from '../../../artists/artistsSlice.ts';
import { getArtists } from '../../../artists/artistsThunk.ts';
import { SliceAlbums } from '../../../albums/albumsSlice.ts';
import { getAlbums } from '../../../albums/albumsThunk.ts';
import { SliceAddLoading } from '../../tracksSlice.ts';
import ButtonSpinner from '../../../../components/UI/ButtonSpinner/ButtonSpinner.tsx';

interface Props {
  addNewTrack: (track: ITrackMutation) => void;
}

interface IArtistTrack {
  artist: string;
}

const initialState = {
  album: '',
  title: '',
  trackDuration: '',
  number: '',
  url: '',
};

const TrackForm:React.FC<Props> = ({addNewTrack}) => {
  const [newTrack, setNewTrack] = useState<ITrackMutation>(initialState);
  const [newArtist, setNewArtist] = useState<IArtistTrack>({
    artist: '',
  });
  const artists = useAppSelector(SliceArtists);
  const albums = useAppSelector(SliceAlbums);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(SliceAddLoading);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAlbums(newArtist.artist));
  }, [dispatch, newArtist]);

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTrack.album.trim().length === 0 || newTrack.title.trim().length === 0 || newTrack.trackDuration.trim().length === 0 || newTrack.number.trim().length === 0) {
      toast.error('Fill in all fields!');
    } else {
      addNewTrack({...newTrack});
      setNewTrack(initialState);
      setNewArtist({artist: ''});
    }
  };

  const onChangeArtist = (e: SelectChangeEvent<string>) => {
    const {name, value} = e.target;

    setNewArtist((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChange = (e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setNewTrack((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit} style={{
      width: '50%',
      margin: '30px auto 40px',
      padding: '20px 0 30px',
      borderRadius: '20px',
      backgroundColor: 'rgba(244,241,241,0.89)',
    }}>
      <Typography variant="h4" sx={{flexGrow: 1, textAlign: 'center', marginBottom: '20px'}}>
        Add new track
      </Typography>
      <Grid container spacing={2} sx={{mx: 'auto', width: '80%'}}>
        <Grid size={12}>
          <FormControl sx={{width: '100%'}}>
            <InputLabel id="demo-multiple-name-label">Artist</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              variant="outlined"
              name="artist"
              value={newArtist.artist}
              onChange={onChangeArtist}
              input={<OutlinedInput label="Artist"/>}
            >
              {artists.map((artist: IArtist) => (
                <MenuItem
                  key={artist._id}
                  value={artist._id}
                >
                  {artist.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={12}>
          <FormControl sx={{width: '100%'}}>
            <InputLabel id="demo-multiple-name-label">Album</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              variant="outlined"
              name="album"
              value={newTrack.album}
              onChange={onChange}
              input={<OutlinedInput label="Artist"/>}
            >
              {albums.map((album: IAlbum) => (
                <MenuItem
                  key={album._id}
                  value={album._id}
                >
                  {album.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            id="outlined-basic"
            label="Title"
            name="title"
            variant="outlined"
            value={newTrack.title}
            onChange={onChange}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            id="outlined-basic"
            label="Track Duration"
            name="trackDuration"
            variant="outlined"
            value={newTrack.trackDuration}
            onChange={onChange}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            id="outlined-basic"
            label="Number"
            name="number"
            variant="outlined"
            value={newTrack.number}
            onChange={onChange}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            id="outlined-basic"
            label="URL"
            name="url"
            variant="outlined"
            value={newTrack.url}
            onChange={onChange}
          />
        </Grid>
        <Grid size={12}>
          <Button
            disabled={loading}
            sx={{
              width: '100%'
            }}
            variant="contained"
            type="submit">
            Create
            {loading ? <ButtonSpinner/> : null}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TrackForm;