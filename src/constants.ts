import { HighlightType } from './types/highlightTypes';

// storage constants
export const STORAGE_PDF_HIGHLIGHTS_PREFIX = 'pdf_highlights_';
export const STORAGE_PDF_TEXT = 'pdf_text';
export const STORAGE_FINAL_PLAN = 'final_plan';

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

// temp constants
export const CHARACTERS = [
  { id: 1, name: 'Lāčplēšis' },
  { id: 2, name: 'Cibiņš' },
  { id: 3, name: 'Anna no zaļajiem jumtiem' }
];