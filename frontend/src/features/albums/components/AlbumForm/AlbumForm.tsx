import { Button, OutlinedInput, SelectChangeEvent, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import React, { useEffect, useState } from 'react';
import { IAlbumMutation, IArtist } from '../../../../types';
import FileInput from '../../../../components/FileInput/FileInput.tsx';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts';
import { SliceArtists } from '../../../artists/artistsSlice.ts';
import { getArtists } from '../../../artists/artistsThunk.ts';
import { toast } from 'react-toastify';
import { SliceAddLoading } from '../../albumsSlice.ts';
import ButtonSpinner from '../../../../components/UI/ButtonSpinner/ButtonSpinner.tsx';

interface Props {
  addNewAlbum: (album: IAlbumMutation) => void;
}

const initialState = {
  artist: '',
  title: '',
  releaseDate: '',
  image: null,
};

const AlbumForm:React.FC<Props> = ({addNewAlbum}) => {
  const [newAlbum, setNewAlbum] = useState<IAlbumMutation>(initialState);
  const artists = useAppSelector(SliceArtists);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(SliceAddLoading);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newAlbum.artist.trim().length === 0 || newAlbum.title.trim().length === 0 || newAlbum.releaseDate.trim().length === 0) {
      toast.error('Fill in all fields!');
    } else {
      addNewAlbum({...newAlbum});
      setNewAlbum(initialState);
    }
  };

  const onChange = (e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setNewAlbum((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setNewAlbum((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
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
        Add new album
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
              value={newAlbum.artist}
              onChange={onChange}
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
          <TextField
            sx={{width: '100%'}}
            id="outlined-basic"
            label="Title"
            name="title"
            variant="outlined"
            value={newAlbum.title}
            onChange={onChange}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{width: '100%', marginBottom: '10px'}}
            id="outlined-basic"
            label="Release Date"
            name="releaseDate"
            variant="outlined"
            value={newAlbum.releaseDate}
            onChange={onChange}
          />
          <Grid size={{xs: 12}}>
            <FileInput
              name="image"
              label="Image"
              onGetFile={fileEventChange}
            />
          </Grid>
          <Grid size={12}>
            <Button
              disabled={loading}
              sx={{
                width: '100%',
                mt: 1
              }}
              variant="contained"
              type="submit">
              Create
              {loading ? <ButtonSpinner/> : null}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AlbumForm;