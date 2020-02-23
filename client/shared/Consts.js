const consts = Object.freeze({
  // view
  MAP_WIDTH: 2200,
  MAP_HEIGHT: 2200,
  FRAME_RATE: 60,
  VIEW_CIRCLE_MIN: 200,
  VIEW_CIRCLE_MAX: 700,
  NIGHT: true,
  DAY_NIGHT_TIME: 100, // in seconds

  // player
  PLAYER_HP: 100,
  PLAYER_SIZE: 52,
  PLAYER_SHOOTING_SPEED: 0.05,
  PLAYER_COLLITION_HP_LOSS: 4,
  BEGIN_HP: 100,
  SPEED: 1,
  RESISTENCE: 0.92, // 1 = nothing, 0 = cant move
  POINTS_GET_IF_KILED: 0.8, // 1 = everything, 0 = nothing

  // food
  FOOD_RADIUS: 10,
  FOOD_SCORE: 4,
  FOOD_RESPAN_RATE: 1,
  MAX_FOOD_SPAN_PER_PLAYER: 70,
  FOOD_LOSES_IF_DIE: 77, // %

  // bullet
  BULLET_SPEED: 15,
  BULLET_COST: 2,
  BULLET_RADIUS: 10,

  // colors
  COLORS: {
    bullet: [192, 192, 192],
    obstical: [200, 0, 210],
    player_self: [167, 229, 65],
    background: [35, 43, 43],
  },

  // User Interface
  UI: {
    MESSAGES: {
      Y: 85, // - height
      SPEED: 6, // seconds
    }
  }


});
if (typeof module === 'object') module.exports = consts;
