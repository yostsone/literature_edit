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
        sx={{ display: "block", width: { xs: "60px", sm: "85px", md: "150px" } }}
    >
      <BucketIcon fillColor={color} title={title} isMobile={isMobile}/>
    </Button>
);
}