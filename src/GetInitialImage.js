export default function getInitialImageValues(path) {
    const image = new Image();
    image.src = path;
    const imageInfo = {
      "path": path,
      "width": image.width,
      "height": image.height
    }
    return imageInfo;
  
  }