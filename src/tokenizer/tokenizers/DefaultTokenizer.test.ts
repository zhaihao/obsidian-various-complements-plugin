import { describe, expect, test } from "@jest/globals";
import { DefaultTokenizer } from "./DefaultTokenizer";

// The expectation for "::one::two" is not ideal probably.
describe.each<{
  content: string;
  expected: { word: string; offset: number }[];
}>`
  content         | expected
  ${"aa bb cc"}   | ${[{ word: "aa bb cc", offset: 0 }, { word: "bb cc", offset: 3 }, { word: "cc", offset: 6 }]}
  ${"aa:bb:cc"}   | ${[{ word: "aa:bb:cc", offset: 0 }, { word: "bb:cc", offset: 3 }, { word: "cc", offset: 6 }]}
  ${"## @smi"}    | ${[{ word: "## @smi", offset: 0 }, { word: "@smi", offset: 3 }]}
  ${"$\\alpha"}   | ${[{ word: "$\\alpha", offset: 0 }, { word: "\\alpha", offset: 1 }]}
  ${"::one::two"} | ${[{ word: "::one::two", offset: 0 }, { word: ":one::two", offset: 1 }, { word: "one::two", offset: 2 }, { word: ":two", offset: 6 }, { word: "two", offset: 7 }]}
`("recursiveTokenize", ({ content, expected }) => {
  test(`recursiveTokenize(${content}) = ${expected}`, () => {
    expect(new DefaultTokenizer().recursiveTokenize(content)).toStrictEqual(
      expected
    );
  });
});
