import { Grid } from '@mui/material';
import { HIGHLIGHT_TYPES } from '../../constants';
import BucketButton from '../Common/BucketButton';

type SelectBucketType = {
  setSelectedBucket: (typeId: string) => void;
}

export default function BucketHeader({ setSelectedBucket }: SelectBucketType) {
  const onBucketClick = (typeId: string) => {
    setSelectedBucket(typeId);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent={"space-between"}
      rowSpacing={4}
      sx={{ paddingTop: "24px", marginBottom: "24px" }}
    >
      { HIGHLIGHT_TYPES.map((t) => (
        <Grid
          key={t.id}
          sx={{width: { xs: "65px", md: "142px"}}}
        >
          <BucketButton onBucketClick={onBucketClick} typeId={t.id} title={t.name} color={t.color}/>
        </Grid>
      ))}
    </Grid>
  );
}