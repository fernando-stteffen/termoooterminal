const randomBetween = (min, max) => {
  console.log(`min:${min} max:${max}`)
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

module.exports = {
  randomBetween
}