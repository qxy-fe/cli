import * as chalk from 'chalk'

export const info = (...args: any[]): void => {
  console.log(chalk.cyan(`info`), ...args)
}

export const tip = (...args: any[]): void => {
  console.log(chalk.blue(`tip`), ...args)
}

export const success = (...args: any[]): void => {
  console.log(chalk.green(`success`), ...args)
}

export const warn = (...args: any[]): void => {
  console.log(chalk.yellow(`warn`), ...args)
}
export const error = (...args: any[]): void => {
  console.log(chalk.red(`error`), ...args)
}

export const logger = {
  info,
  tip,
  success,
  warn,
  error,
}
