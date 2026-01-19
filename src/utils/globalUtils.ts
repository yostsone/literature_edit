import { useMediaQuery, useTheme } from '@mui/material';
import { STORAGE_PDF_HIGHLIGHTS_PREFIX, STORAGE_CHARACTERS } from '../constants';
import { CharacterItemType } from '../types/formTypes';

export function isMobileWidth() {
  const theme = useTheme(); // Access the theme object
  return useMediaQuery(theme.breakpoints.down('md')); // Use the theme's `breakpoints`
}

export function canBeNumber(value: string): boolean {
  if (value.trim() === '') return false;
  return !isNaN(Number(value));
}

// To be updated with local storage values in the future
export function getCharacterNameById(characterId: number): string {
  const charactersData = JSON.parse(localStorage.getItem(STORAGE_CHARACTERS) || 'null') || [];
  const character = charactersData.find((char: CharacterItemType) => char.id === characterId);
  return character ? character.text : 'Nezināms tēls';
}

export function storageKeyForType(typeId: string) {
  return `${STORAGE_PDF_HIGHLIGHTS_PREFIX}${typeId}`;
}

// Deletes an item from the specified storage by its ID (used for keys like characters, final plan, etc.)
export function deleteStorageItem<T extends { id: number }>(
    id: number, storageKey: string, setState: (data: T[]) => void
) {
  const planData = localStorage.getItem(storageKey);

  if (planData) {
    try {
      let parsedData: T[] = JSON.parse(planData);
      parsedData = parsedData.filter(item => item.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(parsedData));
      setState(parsedData); // Update state
    } catch (error) {
      console.error('Error parsing local storage data: ', error);
    }
  }
}

// Fetches data from the specified storage and updates the state
export function fetchStorageData<T>(storageKey: string, setState: (data: T[]) => void) {
  const planData = localStorage.getItem(storageKey);
  if (planData) {
    try {
      const parsedData: T[] = JSON.parse(planData);
      setState(parsedData); // Update state
    } catch (error) {
      console.error('Error parsing local storage data: ', error);
    }
  } else {
    setState([]);
  }
}

// Adds a new basic item with id and text to the specified storage
export function addNewBasicItem<T extends { id: number; text: string }>(storageKey: string, text: string) {
  const existingData = localStorage.getItem(storageKey);
  let parsedData: T[] = [];

  if (existingData) {
    try {
      parsedData = JSON.parse(existingData);
    } catch (error) {
      console.error('Error parsing local storage data: ', error);
    }
  }

  const newItem: T  = {
    id: Date.now(),
    text,
  } as T;

  parsedData.push(newItem);
  localStorage.setItem(storageKey, JSON.stringify(parsedData));
}