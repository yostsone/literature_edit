import { alpha, Grid } from '@mui/material';
import { HIGHLIGHT_TYPES } from '../../constants';
import BucketButton from '../Common/BucketButton';

type SelectBucketType = {
  selectedBucket: string;
  setSelectedBucket: (typeId: string) => void;
}

export default function BucketHeader({ selectedBucket, setSelectedBucket }: SelectBucketType) {
  const onBucketClick = (typeId: string) => {
    setSelectedBucket(typeId);
  };

  const isActiveBucket = (activeBucket: string, bucket: string):boolean => {
    return activeBucket === bucket;
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent={"space-between"}
      rowSpacing={4}
      sx={{ paddingTop: "24px", marginBottom: { xs: "20px", md: "40px"} }}
    >
      { HIGHLIGHT_TYPES.map((t) => (
        <Grid
          key={t.id}
          sx={{width: { xs: "65px", md: "142px"}}}
        >
          <BucketButton
            onBucketClick={onBucketClick}
            typeId={t.id}
            title={t.name}
            color={isActiveBucket(selectedBucket, t.id) ? t.color : alpha('#a9a9a9', 0.3)}
          />
        </Grid>
      ))}
    </Grid>
  );
}