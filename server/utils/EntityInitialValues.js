import images from "../res/images.json" with { type: "json" };

export function getValuesFromFile(path) {
  console.log(images.image.find((element) => element.path === path));
}
