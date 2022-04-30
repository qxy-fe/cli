import { cac } from 'cac'
import { chalk } from '@qxy/cli-utils'
import { info, host } from './commands'

const wrapCommand = (cmd: (...args: any[]) => Promise<void>) => {
  const wrappedCommand = (...args: any[]) => {
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
export const cli = () => {
  // create cac instance
  const program = cac(`qxy`)

  // display cli version
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const versionCli = require(`../package.json`).version
  program.version(`cli@${versionCli}`)

  // display help message
  program.help()

  // register command
  program
    .command(`info`, `Display environment infomation`)
    .action(wrapCommand(info))

  program
    .command(`host [region]`, `Manipulating /etc/hosts for dev`)
    .option(`--delete`, `Delete the matched region if set`)
    .action(wrapCommand(host))

  program.parse(process.argv)
}
