module.exports = Object.freeze({
  PLAYER_SPEED = 4,
  PLAYER_SIZE = 18,
  PLAYER_MAX_HP: 100,
  PLAYER_FIRE_COOLDOWN: 0.20,

  MULLET_SIZE: 3,
  BULLET_SPEED: 700,
  BULLET_DAMAGE: 8,
  SCORE_DEAD: 0.25, // based on the score of that player

  OBJECT_SIZE_1: 15, // random(1, 2)
  OBJECT_SIZE_2: 45, // random(1, 2)
  OBJECT_SCORE_DESTROID: 0.8, // based on object size
  OBJECT_HP: 1.3, // based on object size

  MAP_SIZE: 1000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
  }
});
