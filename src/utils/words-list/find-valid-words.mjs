import { promises as fs } from "fs";
import _ from "lodash";

const file = await fs.readFile("./all-words.json", "utf-8");

const data = await JSON.parse(file);

const validWords = {};

for (const key in data) {
  if (key.length === 5) {
    validWords[key] = 1;
  }
}

const allOutput = JSON.stringify(validWords);

await fs.writeFile("./valid-words.json", allOutput);

const allFileContents = await fs.readFile("./common-words.txt", "utf-8");

const commonWords = new Set();

allFileContents.split(/\r?\n/).forEach((line) => {
  if (line.length === 5) commonWords.add(line);
});

const shuffled = _.shuffle(Array.from(commonWords));

const objectMap = shuffled.reduce((acc, curr) => {
  acc[curr] = 1;
  return acc;
}, {});

const commonOutput = JSON.stringify(objectMap);
await fs.writeFile("common-words.json", commonOutput);
