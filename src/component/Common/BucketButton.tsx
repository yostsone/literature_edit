import { Button } from '@mui/material';
import { isMobileWidth } from '../../utils/globalUtils';
import BucketIcon from './BucketIcon';

type BucketButtonProps = {
  typeId: string;
  title: string;
  color: string;
  onBucketClick: (typeId: string) => void;
}

export default function BucketButton({ typeId, title, color, onBucketClick}: BucketButtonProps) {
  const isMobile = isMobileWidth();
  return (
    <Button
        onClick={() => onBucketClick(typeId)}
        sx={{ display: "block", width: { xs: "100%", sm: "85px", md: "150px" }, padding: { xs: 0, md: "revert" } }}
    >
      <BucketIcon fillColor={color} title={title} isMobile={isMobile}/>
    </Button>
);
}