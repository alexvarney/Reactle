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

const output = JSON.stringify(validWords);

await fs.writeFile("./valid-words.json", output);
