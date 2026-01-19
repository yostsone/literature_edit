import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

type AddNewItemFormProps = {
  isAddActive: boolean;
  saveNewItem: (value: string) => void;
}

export default function AddNewItemForm({ isAddActive, saveNewItem }: AddNewItemFormProps) {
  const [newItem, setNewItem] = useState<string>('');
  const saveAction = (item:string) => {
    saveNewItem(item);
    setNewItem('');
  };

  return ( isAddActive &&
  <Box>
    <TextField
      id="final_plan_new_item"
      label="Jauns pārsprieduma punkts"
      placeholder="Pievieno jaunu pārsprieduma plāna punktu"
      multiline
      rows={6}
      value={newItem}
      onChange={(e) => {  setNewItem(e.target.value)}}
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        width: "100%",
        marginTop: "20px",
      })}
    />
    <Button
      variant="contained"
      sx={{   marginTop: "20px", width: "100%",}}
      onClick={() => saveAction(newItem)}
    >
      Saglabāt
    </Button>
  </Box>
  )
}