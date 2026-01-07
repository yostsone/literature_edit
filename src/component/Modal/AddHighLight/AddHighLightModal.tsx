import React, { useState } from 'react';
import { Button, Box, FormControl, InputLabel, Select, MenuItem, TextField, SelectChangeEvent } from '@mui/material';
import ModalBase from '../Base/Base';
import { addHighlightForType } from '../../../utils/saveHighlightUtils';
import { SetBucketsByType } from '../../../types/highlightTypes';
import { BucketSaveFormType } from '../../../types/formTypes';
import { CHARACTERS } from '../../../constants';

type AddEditBillProps = {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  bucketType: string;
  pdfText: string;
  setBucketsByType: SetBucketsByType;
  selection: { start: number; end: number } | null;
}

export default function AddHighLightModal({ isOpen, onClose, pdfText, setBucketsByType, bucketType, selection }: AddEditBillProps) {
  const [formData, setFormData] = useState<BucketSaveFormType>({character: ''});

  const handleCharChange = (e: SelectChangeEvent) => {
    setFormData((prevState => {
      return { ...prevState, character: e.target.value as string };
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    addHighlightForType(bucketType, pdfText, setBucketsByType, selection, formData);
    onClose(false);
  };

  const title = `Pievienot burciņai - ${bucketType}`;

  return (
    <ModalBase isOpen={isOpen} onClose={() => onClose(false)} title={title}>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <TextField
          id="outlined-required"
          label="Ekstra lauks kaut kam"
          placeholder="Šis neko nedara"
        />
        <FormControl fullWidth>
          <InputLabel id="character-select-label">Izvēlies tēlu</InputLabel>
          <Select
            labelId="character-select-label"
            id="character-select-label"
            value={formData.character}
            label="Izvēlies tēlu"
            onChange={handleCharChange}
          >
            {CHARACTERS.map((character) => (
              <MenuItem key={character.id} value={String(character.id)}>{character.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Button variant="contained" type="submit">
            Saglabāt
          </Button>
        </Box>
      </Box>
    </ModalBase>
  );
}