import { HighlightSpanType } from '../types/highlightTypes';

import { STORAGE_PDF_HIGHLIGHTS_PREFIX } from '../constants';

export function getAllPdfHighlights(): HighlightSpanType[] {
  const favorites: HighlightSpanType[] = [];

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(STORAGE_PDF_HIGHLIGHTS_PREFIX)) {
      const data = localStorage.getItem(key);
      if (data) {
        try {
            const parsedData = JSON.parse(data);
            const filteredFavorites = parsedData.filter((item: HighlightSpanType) => item.isFavorite);
            favorites.push(...filteredFavorites);
        } catch (e) {
          console.error(`Error parsing data for key: ${key}`, e);
        }
      }
    }
  });

  return favorites;
}