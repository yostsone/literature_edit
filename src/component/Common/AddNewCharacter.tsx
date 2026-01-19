import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  alpha,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import { STORAGE_CHARACTERS} from '../../constants';
import { CharacterItemType, BucketFormType } from '../../types/formTypes';
import { addNewBasicItem, fetchStorageData} from '../../utils/globalUtils';

type AddNewCharacterProps = {
  formData: BucketFormType | {};
  setFormData: React.Dispatch<React.SetStateAction<BucketFormType | {}>>;
}

export default function AddNewCharacter({ setFormData, formData }: AddNewCharacterProps) {
  const [isAddActive, setIsAddActive] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharacterItemType[] | []>([]);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      tempChar: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      character: value as string,
    }));
  };

  const saveNewItem = (text: string) => {
    addNewBasicItem<CharacterItemType>(STORAGE_CHARACTERS, text);
    setIsAddActive(false);
    fetchStorageData<CharacterItemType>(STORAGE_CHARACTERS, setCharacters);
  };

  useEffect(() => {
   fetchStorageData<CharacterItemType>(STORAGE_CHARACTERS, setCharacters);
  }, []);


  return (
    <FormControl fullWidth>
      <InputLabel id="character-select-label">Izvēlies tēlu</InputLabel>
      <Select
        labelId="character-select-label"
        id="character-select-label"
        value={'character' in formData ? formData.character || '' : ''}
        label="Izvēlies tēlu"
        onChange={handleSelectChange}
        disabled={characters.length === 0}
        sx={{
          "&.Mui-disabled": {
            backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.5),
          },
        }}
      >
        {characters.map((character) => (
          <MenuItem key={character.id} value={String(character.id)}>{character.text}</MenuItem>
        ))}
      </Select>
      <Typography
        sx={{
          display: "block",
          width: "100%",
          textAlign: "center",
          marginTop: "10px",
          marginBottom: "10px",
          fontWeight: "bold"
        }}
      >
        vai
      </Typography>
      {!isAddActive &&
        <Button variant="outlined" startIcon={<AddCircleIcon/>} onClick={() => {setIsAddActive(true)}}>
          Pievieno jaunu
        </Button>
      }
      {isAddActive &&
        <Box
          sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            required
            id="new_character"
            label="Jauns tēls"
            variant="outlined"
            value={'tempChar' in formData ? formData.tempChar || '' : ''}
            onChange={handleTextFieldChange}
          />
          <Button
            variant="contained"
            onClick={() => saveNewItem('tempChar' in formData ? formData.tempChar || '' : '')}
          >
            Pievienot
          </Button>
          <Button variant="outlined" color="error" onClick={() => {setIsAddActive(false)}}>
            Atcelt
          </Button>
        </Box>
      }
    </FormControl>
  )
}