export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//节流函数
export function debounce(fn, delay) {
  let timer
  return function (...arg) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arg)
    },delay)
  }
}
