import { Button, Chip, Grid, Divider } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type AddNewItemProps = {
  isAddActive: boolean;
  setIsAddActive: (value: boolean) => void;
}

export default function AddNewItem({ isAddActive, setIsAddActive }: AddNewItemProps) {
  return (
    <Grid>
      <Divider
        sx={{ mt: "25px"}}
      >
        <Chip label="Jauna punkta pievienošana" size="small" />
      </Divider>
      { !isAddActive &&
        <Button
          variant="outlined"
          startIcon={<AddCircleIcon/>}
          sx={{marginTop: "20px", width: "100%",}}
          onClick={() => setIsAddActive(true)}
      >
        Pievienot jaunu
      </Button>
      }
    </Grid>
  );
}