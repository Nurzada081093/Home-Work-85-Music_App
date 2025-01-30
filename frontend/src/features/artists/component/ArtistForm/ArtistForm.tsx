import { Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Textarea from '@mui/joy/Textarea';
import React, { useState } from 'react';
import FileInput from '../../../../components/FileInput/FileInput.tsx';
import { IArtistMutation } from '../../../../types';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../app/hooks.ts';
import { SliceAddError, SliceLoadingAdd } from '../../artistsSlice.ts';
import ButtonSpinner from '../../../../components/UI/ButtonSpinner/ButtonSpinner.tsx';

interface Props {
  addNewArtist: (artist: IArtistMutation) => void;
}

const initialState = {
  name: '',
  description: '',
  image: null,
};

const ArtistForm:React.FC<Props> = ({addNewArtist}) => {
  const [newArtist, setNewArtist] = useState<IArtistMutation>(initialState);
  const loading = useAppSelector(SliceLoadingAdd);
  const addError = useAppSelector(SliceAddError);

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newArtist.name.trim().length === 0) {
      toast.error("Enter artist name!");
    } else {
      addNewArtist({...newArtist});
      setNewArtist(initialState);
    }
  };

  const onChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setNewArtist((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setNewArtist((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const getError = (fieldName: string) => {
    try {
      return addError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form onSubmit={onSubmit} style={{
      width: '50%',
      margin: '20px auto',
      padding: '30px 0',
      borderRadius: '20px',
      backgroundColor: 'rgba(244,241,241,0.89)',
    }}>
      <Typography variant="h4" sx={{flexGrow: 1, textAlign: 'center', marginBottom: '20px'}}>
        Add new artist
      </Typography>
      <Grid container spacing={2} sx={{mx: 'auto', width: '80%'}}>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            id="outlined-basic"
            label="Name"
            name="name"
            variant="outlined"
            value={newArtist.name}
            onChange={onChange}
            error={Boolean(getError('name'))}
            helperText={getError('name')}
          />
        </Grid>
        <Grid size={12}>
          <Textarea
            sx={{backgroundColor: 'transparent', border: '1px solid grey'}}
            id="outlined-basic"
            variant="outlined"
            placeholder="Description..."
            minRows={5}
            value={newArtist.description}
            name="description"
            onChange={onChange}
          />
        </Grid>
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
            sx={{width: '100%'}}
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

export default ArtistForm;