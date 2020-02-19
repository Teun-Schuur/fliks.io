const consts = Object.freeze({
  MAP_WIDTH: 1000,
  MAP_HEIGHT: 1500,

  FOOD_RADIUS: 5,

  COLORS: {
    bullet: [200, 200, 255],
    obstical: [200, 0, 210],
    player_self: [255, 0, 0],
    player_other: [10, 50, 200],
    food: [100, 100, 100]
  },


});
if (typeof module === 'object') module.exports = consts;
