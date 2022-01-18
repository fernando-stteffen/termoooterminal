const STATE = {
  playing: false,
  hiddenWord: '',
  lifes: 6,
  firstWord: 0,
  secondWord: 0,
  thirdWord: 0,
  fourthWord: 0,
  fifthWord: 0
}

const setState = (option, value) => {
  STATE[option] = value
} 

const getState = () => {
  return STATE
}

const restartSate = (word) => {
  setState('hiddenWord', word)
  setState('lifes', 6),
  setState('playing', false)
  setState('firstLetter', 0)
  setState('secondLetter', 0)
  setState('thirdLetter', 0)
  setState('fourthLetter', 0)
  setState('fifthLetter', 0)
}

module.exports = {
  setState,
  getState,
  restartSate
}