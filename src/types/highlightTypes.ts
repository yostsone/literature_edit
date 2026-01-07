export type HighlightType = {
  id: string;
  name: string;
  color: string;
};

export type HighlightSpanType = {
  id: number;
  start: number;   // inclusive
  end: number;     // exclusive
  typeId: string;
  color: string;   // any CSS color (#rgb, #rrggbb, #rrggbbaa, rgba(), hsla(), name)
  text?: string;
  characterId: number; // character ID
}

export type BucketType = Record<string, HighlightSpanType[]>;

export type SetBucketsByType = (spans: BucketType) => void;