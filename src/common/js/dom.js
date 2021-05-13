//给dom元素添加className
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  el.classList.add(className)
}

//判断该dom元素是否存在className
export function hasClass(el, className) {
  return el.classList.contains(className)
}

//设置或者获取属性值
export function getData(el, name, val) {
  let prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  }else {
    return el.getAttribute(name)
  }
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
  if (vendor===false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)

}

