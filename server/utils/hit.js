export default function detectCollision(hitting, hit, isPlayer) {
    if (hit.canBeTouched === false) {
      return false;
    }
    const isHit = hitting.hitboxCoordinates.x < hit.hitboxCoordinates.x + hit.hitboxCoordinates.width &&
    hitting.hitboxCoordinates.x + hitting.hitboxCoordinates.width > hit.hitboxCoordinates.x &&
    hitting.hitboxCoordinates.y < hit.hitboxCoordinates.y + hit.hitboxCoordinates.height &&
    hitting.hitboxCoordinates.y + hitting.hitboxCoordinates.height > hit.hitboxCoordinates.y
    if (isHit) {
      hit.hp -= 1;
      hit.canBeTouched = false;
      if (isPlayer) {
        setTimeout(() => {
          hit.canBeTouched = true;
        }, 500);
      } else {
        setTimeout(() => {
          hit.canBeTouched = true;
        }, 10);
      }
    }
    return isHit;
  }