import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import type { FinalPlanItemType } from '../../types/formTypes';
import { generatePDF } from '../../utils/pdfUtils'

type PdfDownloadProps = {
  isVisible: boolean;
  data: FinalPlanItemType[]
}

export default function PdfDownload({ isVisible, data } : PdfDownloadProps) {
  return (
      isVisible && data.length > 0 && <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          onClick={() => generatePDF(data)}
          sx={{mt: "16px", width: "100%",}}
      >
        Lejupielādēt PDF
      </Button>
  );
}