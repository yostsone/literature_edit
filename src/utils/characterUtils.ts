import { STORAGE_CHARACTERS } from '../constants';
import { CharacterItemType } from '../types/formTypes';
import type { HighlightSpanType } from '../types/highlightTypes';


export function getCharacterNameById(characterId: number): string {
  const charactersData = JSON.parse(localStorage.getItem(STORAGE_CHARACTERS) || 'null') || [];
  return locateCharacterNameById(characterId, charactersData);
}

function locateCharacterNameById(characterId: number, charactersData: CharacterItemType[]): string {
  const character = charactersData.find((char) => char.id === characterId);
  return character ? character.text : 'Nezināms tēls';
}

type CountResult = {
  character: string;
  count: number;
  fontSize: number;
};

function countCharacterIds(characters: HighlightSpanType[]): Record<string, number> {
  const charactersData = JSON.parse(localStorage.getItem(STORAGE_CHARACTERS) || 'null') || [];
  return characters.reduce((acc, item) => {
    const character = locateCharacterNameById(item.characterId, charactersData);
    if (character in acc) {
      acc[character]++;
    } else {
      acc[character] = 1;
    }
    return acc;
  }, {} as Record<string, number>);
}

function prepareCharactersWithFontSizes(counts: Record<string, number>): CountResult[] {
  const getFontScale = (count:number) => {
    const maxCount = Math.max(...Object.values(counts));
    const minCount = Math.min(...Object.values(counts));
    if (maxCount === minCount) {
      return 36; // If all counts are the same, return the max increase
    }
    return Math.floor(((count - minCount) / (maxCount - minCount)) * 36); // Scale between 0 and 36
  }

  return Object.keys(counts).map(character => ({
    character: character,
    count: counts[character],
    fontSize: 12 + getFontScale(counts[character]),
  }));
}

export function getCharacterCounts(characters: HighlightSpanType[]): CountResult[] {
  const characterCounts = countCharacterIds(characters);
  return prepareCharactersWithFontSizes(characterCounts);
}