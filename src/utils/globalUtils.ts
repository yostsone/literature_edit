import { useMediaQuery, useTheme } from '@mui/material';
import { CHARACTERS, STORAGE_PDF_HIGHLIGHTS_PREFIX } from '../constants';

export function isMobileWidth() {
  const theme = useTheme(); // Access the theme object
  return useMediaQuery(theme.breakpoints.down('md')); // Use the theme's `breakpoints`
}

export function canBeNumber(value: string): boolean {
  if (value.trim() === "") return false;
  return !isNaN(Number(value));
}

// To be updated with local storage values in the future
export function getCharacterNameById(characterId: number): string {
  const character = CHARACTERS.find(char => char.id === characterId);
  return character ? character.name : 'Nezināms varonis';
}

export function storageKeyForType(typeId: string) {
  return `${STORAGE_PDF_HIGHLIGHTS_PREFIX}${typeId}`;
}