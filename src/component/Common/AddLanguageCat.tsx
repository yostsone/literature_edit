import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { BucketFormType } from '../../types/formTypes';
import { LANGUAGE_CAT } from '../../constants';

type AddNewCharacterProps = {
  formData: BucketFormType | {};
  setFormData: React.Dispatch<React.SetStateAction<BucketFormType | {}>>;
}

export default function AddLanguageCat({ setFormData, formData }: AddNewCharacterProps) {
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      langCat: value as string,
    }));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="lang-cat-select-label">Izvēlies kategoriju</InputLabel>
      <Select
        labelId="lang-cat-select-label"
        id="lang-cat-select-label"
        value={'langCat' in formData ? formData.langCat || '' : ''}
        label="Izvēlies kategoriju"
        onChange={handleSelectChange}
      >
        {LANGUAGE_CAT.map((category) => (
          <MenuItem key={category.id} value={String(category.id)}>{category.text}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}