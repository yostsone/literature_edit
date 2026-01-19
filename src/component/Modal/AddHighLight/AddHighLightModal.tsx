import React, { useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import ModalBase from '../Base/Base';
import { addHighlightForType } from '../../../utils/saveHighlightUtils';
import { SetBucketsByType } from '../../../types/highlightTypes';
import type { BucketFormType  } from '../../../types/formTypes';
import AddNewCharacter from '../../Common/AddNewCharacter';

type AddEditBillProps = {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  bucketType: string;
  pdfText: string;
  setBucketsByType: SetBucketsByType;
  selection: { start: number; end: number } | null;
}

export default function AddHighLightModal({ isOpen, onClose, pdfText, setBucketsByType, bucketType, selection }: AddEditBillProps) {
  const [formData, setFormData] = useState<BucketFormType | {}>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    addHighlightForType(bucketType, pdfText, setBucketsByType, selection, formData);
    onClose(false);
    setFormData({});
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
        <AddNewCharacter
          formData={formData}
          setFormData={setFormData}
        />
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Button variant="contained" type="submit">
            Saglabāt
          </Button>
        </Box>
      </Box>
    </ModalBase>
  );
}