export default {
  step () {
    /*
    * Inizia a scrivere
    * */
  },
  verify () {
    if (typeof a === 'undefined') {
      return 'La variabile a non è presente'
    }
    if (a !== 12) {
      if (a === '12') {
        return 'La variabile a non è del formato corretto'
      } else {
        return 'La variabile a non ha il valore corretto'
      }
    }
    if (typeof b === 'undefined') {
      return 'La variabile b non è presente'
    }
    if (b !== 42) {
      if (b === '42') {
        return 'La variabile b non è del formato corretto'
      } else {
        return 'La variabile b non ha il valore corretto'
      }
    }
    if (typeof c === 'undefined') {
      return 'La variabile c non è presente'
    }
    if (c !== 'Hello') {
      return 'La variabile c non ha il valore corretto'
    }
    if (typeof sub === 'undefined') {
      return 'La variabile sub non è presente'
    }
    if (sub !== 30) {
      return 'La variabile sub non ha il valore corretto'
    }
    if (typeof result === 'undefined') {
      return 'La variabile result non è presente'
    }
    if (result === false) {
      return 'La variabile result non ha il valore corretto'
    }
    return null
  },
  help () {
    const a = 12
    const b = 42
    const c = 'Hello'
    const sub = b - a
    const result = sub === 30
  }
}
