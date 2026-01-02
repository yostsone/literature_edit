export interface HighlightType {
  id: string;
  name: string;
  color: string;
}

/**
 * Static highlight types. Add more if needed.
 * Keep ids stable (localStorage persistence depends on them).
 */
export const HIGHLIGHT_TYPES: HighlightType[] = [
  { id: 'characters', name: 'Tēli',         color: '#e8d3b4' }, // light brown
  { id: 'time',       name: 'Vide & laiks', color: '#ffc1b6' }, // light red
  { id: 'events',     name: 'Notikumi',     color: '#bae6fd' }, // light blue
  { id: 'language',   name: 'Valoda',       color: '#fde68a' }, // light yellow
  { id: 'symbols',    name: 'Simboli',      color: '#d0f0c0' }, // light green
];

export function storageKeyForType(typeId: string) {
  return `pdf_highlights_${typeId}`;
}