export function getInitialImageValues(path) {
    const image = new Image();
    image.src = path;
    const imageInfo = {
      "path": path,
      "width": image.width,
      "height": image.height
    }
    return imageInfo;
  }

export function getRenderValues(imageValues, x, y) {
  const values = {
    "x": x,
    "y": y,
    "width": imageValues.width,
    "height": imageValues.height
  }
  return values;
}



export function getHitBoxValues(x, y, height, width) {
  const values = {
    "x": x,
    "y": y,
    "height": height,
    "width": width
  }
  return values;
}