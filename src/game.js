const { restartSate, setState, getState } = require('../utils/states')
const { getOneRandomWord } = require('../utils/words')
const readline = require('readline');
const { exit } = require('process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let wordsUsed = []

const Start = async () => {
  console.log('Starting the game...')
  const hiddenWord = await getOneRandomWord()
  restartSate(hiddenWord)
  wordsUsed = []
  setState('playing', true)
  engine()
}


const engine = () => {
  const state = getState()
  if (state.lifes === 0) { 
    console.log('')
    console.log(`\r\n`)
    rl.question(` GAME OVER! 
    
    A palavra era |       ${state.hiddenWord}       |
    Deseja jogar novamente? (s/n): `, (word) => {
      if (word.toLowerCase() == 's') {
          Start()
      } else {
        rl.close()
        exit()
      }
    })
    
  }

  console.log(`\n\r\n\r\n\r _________ Termo Game ______ \n\r\n\r\n\r`)

  console.log(`vidas restante: ${state.lifes} \n\r\n\r`)

  wordsUsed.forEach((item) => {
    console.log(`${item.letterA}_${item.letterB}_${item.letterC}_${item.letterD}_${item.letterE}`)
    console.log(`${item.word.charAt(0)}_${item.word.charAt(1)}_${item.word.charAt(2)}_${item.word.charAt(3)}_${item.word.charAt(4)}`)
    console.log(`\r\n`) 
  })

  console.log(`\n\r\n\r\n\r`)

  //console.log(`---(HiddenWord: ${state.hiddenWord})`)
  rl.question(`Termo: `, (word) => {
    if (word.length !== 5) {
      console.log(`\n\rPalavra invalida '${word}'`)
      console.log(`A palavra deve ter 5 caracteres`)
      rl.question(`pressione uma tecla para continuar...`, (input) => {
        engine()
      })
    } else {
      const result = compareWords(word, state.hiddenWord)
      let win = true
      for (letter in result) {
        if (result[letter] !== 2) {
          win = false
        }
      }
      
      if (win) {
        console.log(`You winnnnnn!!!!`)
        rl.close()
      } else {
        wordsUsed.push({ 
          word: word,
          letterA: result.letterA,
          letterB: result.letterB,
          letterC: result.letterC,
          letterD: result.letterD,
          letterE: result.letterE,
           
        })
        setState('lifes', state.lifes - 1)
        engine()
      }
    }
  });
}

const compareWords = (word, hiddenWord) => {
  // 0 = there is no such letter
  // 1 = exists but in another position
  // 2 = perfect letter position
  const resultWord = {
    letterA: 0,
    letterB: 0,
    letterC: 0,
    letterD: 0,
    letterE: 0,
  }
  const schemaLetter = ['letterA', 'letterB', 'letterC', 'letterD', 'letterE']
  for (var x = 0; x < 5; x++) {
    if (word.charAt(x) === hiddenWord.charAt(x)) {
        resultWord[schemaLetter[x]] = 2
    } else if (resultWord[schemaLetter[x]] !== 2 && hiddenWord.includes(word.charAt(x))) {
      resultWord[schemaLetter[x]] = 1
    } 
  }
  return resultWord
} 


module.exports = { Start } 
