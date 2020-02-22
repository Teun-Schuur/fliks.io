const consts = Object.freeze({
  MAP_WIDTH: 2200,
  MAP_HEIGHT: 2200,
  BACKGROUND: [35, 43, 43],
  FRAME_RATE: 60,
  NIGHT: true,

  FOOD_RADIUS: 10,

  PLAYER_HP: 100,
  PLAYER_SIZE: 40,
  PLAYER_SHOOTING_SPEED: 0.1,

  BEGIN_HP: 100,
  FOOD_SCORE: 7,
  FOOD_RESPAN_RATE: 1,
  MAX_FOOD_SPAN: 30,

  BULLET_SPEED: 13,
  BULLET_COST: 3,

  VIEW_CIRCLE_MIN: 200,
  VIEW_CIRCLE_MAX: 900,

  COLORS: {
    bullet: [192, 192, 192],
    obstical: [200, 0, 210],
    player_self: [167, 229, 65],
    food: [255, 100, 0]
  },


});
if (typeof module === 'object') module.exports = consts;
