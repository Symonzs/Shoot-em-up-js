import file from "../../images.json" with { type: "json" };

export function getJSONValues(path) {
  return file.image.filter((imageValue) => imageValue.path === path)[0];
}

export function getRenderValues(path, x, y) {
  let jsonvalues = getJSONValues(path);
  return {
    x: x,
    y: y,
    path: jsonvalues.path,
    width: jsonvalues.width,
    height: jsonvalues.height,
  };
}
