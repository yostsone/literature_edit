import { Badge, Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FinalPlanItemType } from '../../types/formTypes';

type ItemListProps = {
  items: FinalPlanItemType[];
  removeItem: (id: number) => void;
};

export default function ItemList({ items, removeItem }: ItemListProps) {
  if (items.length === 0) {
    return (
        <Box>
          <Typography sx={{ fontStyle: "italic"}}>
            Šobrīd nav pievienotu pārsprieduma plāna punktu.
          </Typography>
        </Box>
    )
  }

  return (
    <Grid container gap={3} direction="column">
      {items.map((item, index) => (
        <Badge
          key={item.id}
          badgeContent={index + 1}
          color="primary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Paper
            elevation={3}
            sx={(theme) => ({
              backgroundColor: theme.palette.background.paper,
              padding: "15px 15px 25px",
              textAlign: "justify",
              width: "100%",
            })}
          >
            <Typography
              component="pre"
              sx={{ textWrap: "auto"}}
            >
              {item.text}
            </Typography>
            <IconButton
              size="small"
              sx={{ position: "absolute", bottom: "2px", right: "2px" }}
              aria-label="delete"
              onClick={() => { removeItem(item.id)} }
            >
              <DeleteIcon fontSize="inherit"/>
            </IconButton>
          </Paper>
        </Badge>
      ))}
    </Grid>
  );
}