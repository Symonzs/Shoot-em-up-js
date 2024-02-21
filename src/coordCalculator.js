export function calcCoord(sprite, cursor) {
  return (cursor + sprite) / 2;
}
export function calcDistance(sprite, cursor) {
  return sprite - cursor;
}

const time = 5;

export function velocity(distance) {
  return distance / time;
}
