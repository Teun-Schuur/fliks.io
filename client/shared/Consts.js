const consts = Object.freeze({
  MAP_WIDTH: 2400,
  MAP_HEIGHT: 2400,
  BACKGROUND: [35, 43, 43],
  FRAME_RATE: 60,

  FOOD_RADIUS: 10,

  PLAYER_HP: 100,
  PLAYER_SIZE: 33,
  PLAYER_SHOOTING_SPEED: 0.1,

  BEGIN_HP: 100,
  FOOD_SCORE: 1,
  FOOD_RESPAN_RATE: 1,
  MAX_FOOD_SPAN: 1000,

  BULLET_SPEED: 16,



  COLORS: {
    bullet: [200, 200, 255],
    obstical: [200, 0, 210],
    player_self: [255, 0, 0],
    player_other: [10, 50, 200],
    food: [255, 100, 0]
  },


});
if (typeof module === 'object') module.exports = consts;
