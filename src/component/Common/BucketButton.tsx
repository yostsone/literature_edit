import { Button, Typography } from '@mui/material';
import { isMobileWidth } from '../../utils/globalUtils';

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
      sx={{
        width: "100%",
        backgroundColor: color,
        fontWeight: "bold",
        borderRadius: { xs: "15px 15px", md: "30px 30px" },
        padding: { xs: "10px", md: "16px 20px" },
        position: "relative",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "box-shadow 0.2s",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-12px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "40%",
          height: "12px",
          borderRadius: "4px 4px 0 0",
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255, 0, 0, 0.5) 0%, rgba(255, 0, 0, 0.5) 2px, transparent 4px, transparent 8px),
            repeating-linear-gradient(90deg, rgba(255, 0, 0, 0.5) 0%, rgba(255, 0, 0, 0.5) 2px, transparent 4px, transparent 8px)
          `,
          backgroundSize: "7px 7px",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: { xs: "-4px", md: "-7px" },
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: { xs: "4px", md: "8px" },
          backgroundColor: color,
          borderRadius: { xs: "5px", md: "0 0 5px 5px" },
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)",
        },
        "&:hover": {
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
        },
      }}
      onClick={() => onBucketClick(typeId)}
      >
        <Typography
          sx={{
            padding: "0 5px",
            border: "2px solid white",
            borderRadius: "2px",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.4)"
          }}
        >
          { isMobile ? title.slice(0,1) : title}
        </Typography>
    </Button>
  );
}