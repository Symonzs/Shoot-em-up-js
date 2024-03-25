import file from "../../images.json" with { type: "json" };

export function getJSONValues(path) {
  return file.image.filter((imageValue) => imageValue.path === path);
}
