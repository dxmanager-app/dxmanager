import { Answer } from "../types";

export type Pair = {
  [questionNumber: string]: boolean;
};

export const ifPairMatches = (answers: Answer[], pair: Pair) => {
  const [[k1, v1], [k2, v2]] = Object.entries(pair);
  const a1 = answers[parseInt(k1, 10) - 1];
  const a2 = answers[parseInt(k2, 10) - 1];

  if (a1 === null || a2 === null) return false;

  const expected1: Answer = v1 ? "T" : "F";
  const expected2: Answer = v2 ? "T" : "F";

  const first = a1 === expected1;
  const second = a2 === expected2;
  return first && second;
};
