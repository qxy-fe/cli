import c from 'picocolors'

export const tip = (...args: any[]): void => {
  console.log(c.blue(`tip`), ...args)
}

export const info = (...args: any[]): void => {
  console.log(c.cyan(`info`), ...args)
}

export const success = (...args: any[]): void => {
  console.log(c.green(`success`), ...args)
}

export const warn = (...args: any[]): void => {
  console.log(c.yellow(`warn`), ...args)
}

export const error = (...args: any[]): void => {
  console.log(c.red(`error`), ...args)
}

export const logger = {
  tip,
  info,
  success,
  warn,
  error,
}
