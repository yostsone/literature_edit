import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = (pdfFonts as any).vfs;

import type { FinalPlanItemType } from '../types/formTypes.js';

export function generatePDF(data: FinalPlanItemType[]) {
  const listContent = data.map((item) => `${item.text}`);
  const docDefinition = {
    content: [
      { text: 'Pārsprieduma plāns', style: 'header' },
      { ol: listContent },
    ],
    styles: {
      header: {
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 10],
      },
    },
    defaultStyle: {
      font: 'Roboto',
    },
  };

  // Generate and download the PDF
  pdfMake.createPdf(docDefinition).download("data.pdf");
};