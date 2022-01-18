const fs = require('fs')
const path = require('path')
const { randomBetween } = require('../utils/functions')

const wordsFile = '5_letters_words.txt'

const loadWords = () => {
  let words = [];
  const filePath = path.join(__dirname, '..' , 'words', wordsFile)
  return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
      .on('data', (word) => {
        let wordNormalized = word.toString().split(/\r?\n/)
        words.push(wordNormalized)
      })
      .on('error', (err) => {
        reject(err)
      })
      .on('end', () => {
        resolve(words[0])
      })
  })
}

const getWords = async () => {
  try {
      return await loadWords()
  } catch (err) {
    console.error(`Failed to load words!: ${err}`)
  }
}

const getOneRandomWord = async () => {
    let wordsList = await getWords()
    const randomNumber = randomBetween(0, wordsList.length)
    return wordsList[randomNumber]
}



module.exports = {
  getOneRandomWord
}

