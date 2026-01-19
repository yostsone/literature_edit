import { useState } from 'react';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type CopyButtonProps = {
  valueToCopy: string;
};

export default function CopyButton({ valueToCopy }: CopyButtonProps){
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    // Use the Clipboard API to write text to clipboard
    navigator.clipboard.writeText(valueToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch((err) => console.error('Failed to copy: ', err));
  };

  return (
    <IconButton
      size="small"
      onClick={handleCopy}
      sx={{ position: "absolute", top: 1, right: 1, }}
    >
      <ContentCopyIcon fontSize="inherit"/>
    </IconButton>
  );
};