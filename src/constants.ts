import { HighlightType } from './types/highlightTypes';

export const STORAGE_PDF_TEXT = 'pdf_text';
export const HIGHLIGHT_TYPES: HighlightType[] = [
  { id: 'characters', name: 'Tēli',         color: '#e8d3b4' }, // light brown
  { id: 'time',       name: 'Vide&laiks', color: '#ffc1b6' }, // light red
  { id: 'events',     name: 'Notikumi',     color: '#bae6fd' }, // light blue
  { id: 'language',   name: 'Valoda',       color: '#fde68a' }, // light yellow
  { id: 'symbols',    name: 'Simboli',      color: '#d0f0c0' }, // light green
];

export const MENU_ITEMS = [
  { id: 1, title: 'Augšupielāde', link: '/literature_edit/upload' },
  { id: 2, title: 'Teksta analīze', link: '/literature_edit/analysis' },
  { id: 3, title: 'Piezīmes', link: '/literature_edit/notes' }
];

export const CHARACTERS = [
  { id: 1, name: 'Lāčplēšis' },
  { id: 2, name: 'Cibiņš' },
  { id: 3, name: 'Anna no zaļajiem jumtiem' }
];

export const FAVORITE_QUOTES = [
  { id: 1, character: 'Lāčplēšis', text: 'Tā bija vislabākā no visām iespējām, tā bija visļaunākā no visām iespējām...' },
  { id: 2, character: 'Laimdota',  text: 'Brīvība ir atbildība; tāpēc daudzi to baidās.' },
  { id: 3, character: 'Juris',     text: 'Dzīve ir tas, kas notiek, kamēr tu esi aizņemts ar citiem plāniem.' }
]