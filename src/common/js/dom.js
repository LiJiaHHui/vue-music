export function addClass (el, className) {
    if (hasClass(el, className)) {
        return
    }
    // 先拆分成一个数组，push进去，再join连起来
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}
export function hasClass (el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
    // 获取classname
}
export function getData(el, name, val) {
    const prefix = 'data-'
    if (val) {
        return el.setAttribute(prefix + name, val)
    } else {
        return el.getAttribute(prefix + name)
    }
}
