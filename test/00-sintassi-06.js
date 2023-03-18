export default {
  step () {
    function getRandomInt (min, max) {
      return 5
    }
    const random = getRandomInt(0, 3)
  },
  verify () {
    if (typeof getRandomInt === 'undefined') {
      return 'La funzione getRandomInt non è presente'
    }
    if (typeof random === 'undefined') {
      return 'la variabile random non è presente'
    }
    if (random !== 0 && random !== 1 && random !== 2 && random !== 3) {
      return 'La variabile nome ha un valore sbagliato'
    }
    return null
  },
  help () {}
}
