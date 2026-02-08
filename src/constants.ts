import { HighlightType } from './types/highlightTypes';

// storage constants
export const STORAGE_PDF_HIGHLIGHTS_PREFIX = 'pdf_highlights_';
export const STORAGE_PDF_TEXT = 'pdf_text';
export const STORAGE_FINAL_PLAN = 'final_plan';
export const STORAGE_CHARACTERS = 'characters';

// highlight constants
export const HIGHLIGHT_TYPES: HighlightType[] = [
  { id: 'characters', name: 'Tēli',         color: '#e8d3b4' }, // light brown
  { id: 'time',       name: 'Vide&laiks',   color: '#ffc1b6' }, // light red
  { id: 'events',     name: 'Notikumi',     color: '#bae6fd' }, // light blue
  { id: 'language',   name: 'Valoda',       color: '#fde68a' }, // light yellow
  { id: 'symbols',    name: 'Simboli',      color: '#d0f0c0' }, // light green
];

// menu constants
export const MENU_ITEMS = [
  { id: 1, title: 'Augšupielāde', link: '/literature_edit/upload' },
  { id: 2, title: 'Teksta analīze', link: '/literature_edit/analysis' },
  { id: 3, title: 'Piezīmes', link: '/literature_edit/notes' }
];

// language categories constant
export const LANGUAGE_CAT = [
  { id: 1, text: 'Metafora' },
  { id: 2, text: 'Epitets' },
  { id: 3, text: 'Salīdzinājums' },
  { id: 4, text: 'Personifikācija' },
  { id: 5, text: 'Paralēlisms' },
  { id: 6, text: 'Metonīmija' },
  { id: 0, text: 'Cits' },
];