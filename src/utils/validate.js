export function validPwd(str) {
    return /^(\w){6,20}$/.test(str)
}

export function validMb(str) {
    return /^[1][3,4,5,7,8,9][0-9]{9}$/.test(str)
}

export function validCode(str) {
    return /^[0-9]{4}$/.test(str)
}

export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

export function isNameUseful(path) {
    return /^[A-Za-z0-9_\u4e00-\u9fa5]+$/u.test(path)
}