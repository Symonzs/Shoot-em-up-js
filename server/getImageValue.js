import { readFileSync } from "fs";

export function getImageValue(path) {
  const values = readFileSync("res/images.json");
  values = JSON.parse(values);
  console.log(values);
}
