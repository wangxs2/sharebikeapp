
/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 * 验证密码 至少8个字符，至少1个字母，1个数字和1个特殊字符
 * @param password
 * @returns {boolean}
 */
export function validatePwd(Pwd) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return re.test(Pwd)
}
/**
 * 验证联系方式（手机号或邮箱）
 * @param contact
 * @returns {boolean}
 */
export function validateContact(contact) {
  const re = /(^1[0-9]{10}$)|(^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/
  return re.test(contact)
}

/**
 * 验证密码 至少8个字符
 * @param password
 * @returns {boolean}
 */
export function LvalidatePwd(Pwd) {
  const re = /^[A-Za-z0-9]{6,16}$/
  return re.test(Pwd)
}

/**
 * 验证手机号
 * @param phoneNum
 * @returns {boolean}
 */
export function validatePhoneNum(phoneNum) {
  const re = /^1[0-9]{10}$/
  return re.test(phoneNum)
}
/**
 * 验证姓名（中文、英文、数字）
 * @param name
 * @returns {boolean}
 */
export function validateName(name) {
  const re = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
  return re.test(name)
}


