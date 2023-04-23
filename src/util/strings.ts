import { uniq } from "./collection-helper";
import diacriticsMap from "./diacritics-map";

const regEmoji = new RegExp(
  /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]|[\uFE0E-\uFE0F]/,
  "g"
);

export function equalsAsLiterals(one: string, another: string): boolean {
  return one.replace(/[ \t]/g, "") === another.replace(/[ \t]/g, "");
}

export function allAlphabets(text: string): boolean {
  return Boolean(text.match(/^[a-zA-Z0-9_-]+$/));
}

export function excludeEmoji(text: string): string {
  return text.replace(regEmoji, "");
}

export function excludeSpace(text: string): string {
  return text.replace(/ /g, "");
}

export function encodeSpace(text: string): string {
  return text.replace(/ /g, "%20");
}

export function normalizeAccentsDiacritics(text: string): string {
  // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
  return text.replace(/[^\u0000-\u007E]/g, (x) => diacriticsMap[x] ?? x);
}

export function synonymAliases(
  value: string,
  option: { emoji: boolean; accentsDiacritics: boolean }
): string[] {
  let synonym = value;

  if (option.emoji) {
    synonym = excludeEmoji(synonym);
  }

  if (option.accentsDiacritics) {
    synonym = normalizeAccentsDiacritics(synonym);
  }

  return synonym === value ? [] : [synonym];
}

export function lowerIncludes(one: string, other: string): boolean {
  return one.toLowerCase().includes(other.toLowerCase());
}

export function lowerIncludesWithoutSpace(one: string, other: string): boolean {
  return lowerIncludes(excludeSpace(one), excludeSpace(other));
}

export function lowerStartsWith(a: string, b: string): boolean {
  return a.toLowerCase().startsWith(b.toLowerCase());
}

export function lowerStartsWithoutSpace(one: string, other: string): boolean {
  return lowerStartsWith(excludeSpace(one), excludeSpace(other));
}

export function lowerFuzzy(a: string, b: string): FuzzyResult {
  return microFuzzy(a.toLowerCase(), b.toLowerCase());
}

export function lowerFuzzyStarsWith(a: string, b: string): FuzzyResult {
  const aLower = a.toLowerCase();
  const bLower = b.toLowerCase();
  return aLower[0] !== bLower[0] ? false : microFuzzy(aLower, bLower);
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function startsSmallLetterOnlyFirst(str: string): boolean {
  return Boolean(str.match(/^[A-Z][^A-Z]+$/));
}

export function smartLineBreakSplit(text: string): string[] {
  return text.split("\n").filter((x) => x);
}

export function* splitRaw(
  text: string,
  regexp: RegExp
): IterableIterator<string> {
  let previousIndex = 0;
  for (let r of text.matchAll(regexp)) {
    if (previousIndex !== r.index!) {
      yield text.slice(previousIndex, r.index!);
    }
    yield text[r.index!];
    previousIndex = r.index! + 1;
  }

  if (previousIndex !== text.length) {
    yield text.slice(previousIndex, text.length);
  }
}

export function findCommonPrefix(strs: string[]): string | null {
  if (strs.length === 0) {
    return null;
  }

  const min = Math.min(...strs.map((x) => x.length));
  for (let i = 0; i < min; i++) {
    if (uniq(strs.map((x) => x[i].toLowerCase())).length > 1) {
      return strs[0].substring(0, i);
    }
  }

  return strs[0].substring(0, min);
}

export type FuzzyResult = boolean | "fuzzy";

export function microFuzzy(value: string, query: string): FuzzyResult {
  let i = 0;
  let lastMatchIndex = null;
  let isFuzzy = false;

  for (let j = 0; j < value.length; j++) {
    if (value[j] === query[i]) {
      if (lastMatchIndex != null && j - lastMatchIndex > 1) {
        isFuzzy = true;
      }
      lastMatchIndex = j;
      i++;
    }
    if (i === query.length) {
      return isFuzzy ? "fuzzy" : true;
    }
  }
  return false;
}
