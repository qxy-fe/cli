import { cac } from 'cac'
import { c } from '@qxy/cli-utils'
import { icon, info } from './commands/index.js'

/**
 * Wrap raw command to catch errors and exit process
 */
const wrapCommand = (cmd: (...args: any[]) => Promise<void>): typeof cmd => {
  const wrappedCommand: typeof cmd = (...args) =>
    cmd(...args).catch(err => {
      console.error(c.red(err.stack))
      process.exit(1)
    })
  return wrappedCommand
}

/**
 * Qxy cli
 */
export const cli = () => {
  // create cac instance
  const program = cac('qxy')

  // display cli version
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const versionCli = require('../package.json').version
  program.version(`cli@${versionCli}`)

  // display help message
  program.help()

  // register `icon` command
  program
    .command('icon [icon]', 'Generate different sizes icon files')
    .option('-s, --sizes [sizes]', 'Icon sizes, separated by comma')
    .option('-n, --name [name]', 'Icon name')
    .option('-d, --dest [dir]', 'Icon dest directory')
    .action(wrapCommand(icon))

  // register `info` command
  program
    .command('info', 'Display environment infomation')
    .action(wrapCommand(info))

  program.parse(process.argv)
}
