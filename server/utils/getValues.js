import imageSize from "image-size";
import { readFileSync } from "fs";
import { readdirSync, writeFileSync } from "fs";

export function getValues(path) {
  const values = imageSize(path);
  return {
    path: path,
    width: values.width,
    height: values.height,
  };
}

export function getImageValue(path) {
  let values = readFileSync("res/images.json");
  values = JSON.parse(values);
  console.log(values.image.find((element) => element.path === path));
}

export function updateImageValues() {
  const pathToImage = "client/public";
  const file = readdirSync(`${pathToImage}/images`);
  let allValues = { image: [] };
  file.forEach((subFile) => {
    if (subFile === "readme") return;
    readdirSync(`${pathToImage}/images/${subFile}`).forEach((subSubFile) => {
      allValues.image.push(
        getValues(`${pathToImage}/images/${subFile}/${subSubFile}`)
      );
    });
  });
  writeFileSync(`server/res/images.json`, JSON.stringify(allValues, null, 2));
  console.log("Images values updated");
}
