import { Grid, Box, Typography } from '@mui/material';

type BucketIconProps = {
  fillColor: string;
  title: string;
  isMobile: boolean;
};

export default function BucketIcon({ fillColor, title, isMobile }: BucketIconProps) {
  return (
    <Grid>
      <Grid>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <svg fill={fillColor} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="80 0 449 386" xmlSpace="preserve">
            <g>
              <g transform="scale(1.6, 1)">
                <path d="M297.209,80.934V51.36H83.347v28.365c-22.312,14.323-33.62,37.431-33.62,68.758v145.688 c0,58.56,
                40.534,88.251,120.473,88.251h42.023c79.936,0,120.472-29.691,120.472-88.251V148.482 C332.695,118.258,
                320.76,95.56,297.209,80.934z M315.885,294.175c0,48.076-33.905,71.442-103.662,71.442H170.2 c-69.757,
                0-103.662-23.366-103.662-71.442V148.489c0-27.115,9.588-45.651,29.311-56.667l4.309-2.405V68.17H280.4v22.569
                l4.371,2.394c20.937,11.453,31.114,29.558,31.114,55.35V294.175z M78.098,27.316V11.207C78.098,5.021,83.118,0,
                89.304,0h203.819 c6.187,0,11.206,5.021,11.206,11.207v16.109c0,6.187-5.02,11.207-11.206,11.207H89.304C83.113,
                38.522,78.098,33.502,78.098,27.316z M81.744,132H304.68v182.102H81.744V132z"></path>
              </g>
            </g>
          </svg>
        </Box>
        <Typography
          sx={{
            fontWeight: "bold",
            position: "absolute",
            top: "53%",
            left: "51%",
            transform: "translate(-50%, -50%)",
          }}
        >
          { isMobile? title.slice(0,1) : title }
        </Typography>
      </Grid>
    </Grid>
  );
}