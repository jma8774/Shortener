const chars = 'abcdefghijklmnopqrstuvwxyz'
let charToInt = {}
let intToChar = {}
const base = chars.length

for(let i = 0; i < chars.length; i ++) {
  const c = chars[i]
  charToInt[c] = i
  intToChar[i] = c
}

// Encodes the end of the URL to an ID number
function encode(s) {
  let digits = []
  let id = 0
  // Convert char to int
  for(const c of s) {
    digits.push(charToInt[c])
  }
  digits.reverse()
  // Transform base 26 back to base 10
  for(let i = 0; i < digits.length; i ++) {
    id += (digits[i]*Math.pow(base, i))
  }
  return id
}

// Decodes the ID number to a URL
function decode(id) {
  const digits = decToBaseLowercase(id)
  let URL = ''
  for(const d of digits) {
    URL += intToChar[d]
  }
  return URL
}

// Convert base 10 int to base 26 array
function decToBaseLowercase(id) {
  if(id == 0)
    return [0]

  let digits = []
  let remainder = 0
  while(id > 0) {
    remainder = id % base
    digits.push(remainder)
    id = Math.floor(id/base)
  }
  digits.reverse()
  return digits
}

module.exports = {encode, decode};
