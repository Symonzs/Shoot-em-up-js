export function calcCoord(sprite, cursor) {
  return (cursor + sprite) / 2;
}
export function calcDistance(sprite, cursor) {
  return sprite - cursor;
}

export function velocity(distance, maxSpeed, time) {
  let negative = false;
  const speed = distance / time;
  if (speed < 0) {
    negative = true;
  }
  if (Math.abs(speed) + -0.5 < 0) {
    return 0;
  }
  if (Math.abs(speed) > maxSpeed) {
    if (negative) {
      return -maxSpeed;
    }
    return maxSpeed;
  } else {
    return speed;
  }
}

export function Motion(entity){
  if(!entity.secondPhase){
    if(entity.hp > 0) {
      entity.renderCoordinates.x -= entity.movement.xSpeed;
      entity.renderCoordinates.y -= entity.movement.ySpeed;
    }
  }
  else {
    if(entity.transition) {
    if(entity.hp > 0) {
      entity.renderCoordinates.x += entity.movement.xSpeed1;
      entity.renderCoordinates.y += entity.movement.ySpeed1;
    }
  }
}
}