const consts = Object.freeze({
  // general
  MAP_WIDTH: 2200,
  MAP_HEIGHT: 2200,
  BACKGROUND: [35, 43, 43],
  FRAME_RATE: 60,
  NIGHT: true,


  FOOD_LOSES_IF_DIE: 80, // %


  // player
  PLAYER_HP: 100,
  PLAYER_SIZE: 40,
  PLAYER_SHOOTING_SPEED: 0.1,
  PLAYER_COLLITION_HP_LOSS: 3,
  BEGIN_HP: 100,
  SPEED: 1,
  RESISTENCE: 0.92, // 1 = nothing, 0 = cant move
  POINTS_GET_IF_KILED: 0.8, // 1 = everything, 0 = nothing

  // food
  FOOD_RADIUS: 10,
  FOOD_SCORE: 7,
  FOOD_RESPAN_RATE: 1,
  MAX_FOOD_SPAN_PER_PLAYER: 50,

  // bullet
  BULLET_SPEED: 13,
  BULLET_COST: 3,
  BULLET_RADIUS: 8,

  // view
  VIEW_CIRCLE_MIN: 200,
  VIEW_CIRCLE_MAX: 900,

  // colors
  COLORS: {
    bullet: [192, 192, 192],
    obstical: [200, 0, 210],
    player_self: [167, 229, 65],
  },


});
if (typeof module === 'object') module.exports = consts;
