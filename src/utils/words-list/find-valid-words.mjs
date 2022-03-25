import { promises as fs } from "fs";

const file = await fs.readFile("./all-words.json", "utf-8");

const data = await JSON.parse(file);

const validWords = {};

for (const key in data) {
  if (key.length === 5) {
    validWords[key] = 1;
  }
}

// for (const key in validWords) {
//   console.log(key);
// }

const allOutput = JSON.stringify(validWords);

await fs.writeFile("./valid-words.json", allOutput);

const allFileContents = await fs.readFile("./common-words.txt", "utf-8");

const commonWords = {};

allFileContents.split(/\r?\n/).forEach((line) => {
  if (line.length === 5) commonWords[line] = 1;
});

const commonOutput = JSON.stringify(commonWords);
await fs.writeFile("common-words.json", commonOutput);
