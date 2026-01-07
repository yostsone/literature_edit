import React, { useState } from 'react';
import { Button, Box, List, ListItemButton, ListItemText} from '@mui/material';
import Popover from '@mui/material/Popover';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { storageKeyForType, type HighlightSpanType, type SetBucketsByType } from '../../types/highlightTypes';
import { HIGHLIGHT_TYPES, STORAGE_PDF_TEXT } from '../../constants';
import { isMobileWidth } from '../../utils/globalUtils';

type ActionResetProps = {
  setPdfText: (text: string) => void;
  setBucketsByType: SetBucketsByType;
}

/**
 * Clear all highlights from localStorage and state
 * @param setPdfText
 * @param setBucketsByType
 */
const clearAll = (setPdfText: (text: string) => void, setBucketsByType: SetBucketsByType) => {
  if (!confirm('Tiks dzēsts augšupielādētais fails un burciņu dati!')) return;

  setPdfText('');
  const cleared: Record<string, HighlightSpanType[]> = {};

  for (const t of HIGHLIGHT_TYPES) {
    cleared[t.id] = [];
    localStorage.removeItem(storageKeyForType(t.id));
  }
  setBucketsByType(cleared);
  localStorage.removeItem(STORAGE_PDF_TEXT);
}

/**
 * Clear all highlights from localStorage and state
 * @param setSpansByType
 */
const clearAllHighlights = ( setSpansByType: SetBucketsByType) => {
  if (!confirm('Tiks dzēsti visi burciņu dati!')) return;

  const cleared: Record<string, HighlightSpanType[]> = {};

  for (const t of HIGHLIGHT_TYPES) {
    cleared[t.id] = [];
    localStorage.removeItem(storageKeyForType(t.id));
  }
  setSpansByType(cleared);
}

export default function ActionReset({ setPdfText, setBucketsByType }: ActionResetProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'delete-popover' : undefined;
  const isMobile = isMobileWidth();

  return (
    <Box>
      <Button
        variant="contained"
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        endIcon={<MoreVertIcon />}
        startIcon={<DeleteOutlineIcon />}
        sx={{ p: { xs: "10px", sm: "10px", md: "auto" } }}
      >
        { isMobile ? '' : 'Notīrīt' }
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        >
        <List>
        <ListItemButton
            onClick={() => clearAllHighlights(setBucketsByType)}
          >
            <ListItemText>
              Dzēst visas burciņas
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => clearAll(setPdfText, setBucketsByType)}
          >
            <ListItemText>
              Dzēst visus datus
            </ListItemText>
          </ListItemButton>
        </List>
      </Popover>
    </Box>
  );
}