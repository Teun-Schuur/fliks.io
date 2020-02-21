const consts = Object.freeze({
  MAP_WIDTH: 4200,
  MAP_HEIGHT: 4200,
  BACKGROUND: [200, 200, 200],

  FOOD_RADIUS: 10,


  PLAYER_SIZE: 33,
  PLAYER_SHOOTING_SPEED: 0.25,

  BEGIN_HP: 100,
  FOOD_SCORE: 1,
  FOOD_RESPAN_RATE: 0.9,



  COLORS: {
    bullet: [200, 200, 255],
    obstical: [200, 0, 210],
    player_self: [255, 0, 0],
    player_other: [10, 50, 200],
    food: [255, 100, 0]
  },


});
if (typeof module === 'object') module.exports = consts;
