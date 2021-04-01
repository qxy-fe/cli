import { cac } from 'cac'
import { chalk } from '@qxy/cli-utils'
import { info } from './commands'

type $TODO = any

const wrapCommand = (cmd: (...args: any[]) => Promise<void>): $TODO => {
  const wrappedCommand: $TODO = (...args: any[]) => {
    cmd(...args).catch(err => {
      console.error(chalk.red(err.stack))
      process.exit(1)
    })
  }
  return wrappedCommand
}

/**
 * Qxy cli
 */
export const cli = (): void => {
  // create cac instance
  const program = cac('qxy')

  // display cli version
  const versionCli = require('../package.json').version
  program.version(`cli@${versionCli}`)

  // display help message
  program.help()

  // register command
  program
    .command('info', `Display environment infomation`)
    .action(wrapCommand(info))

  program.parse(process.argv)
}
