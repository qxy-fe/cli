import { cac } from 'cac'
import pkg from '../package.json'
import { wrapCommand } from './utils'
import { icon, info } from './commands'

// create cac instance
const cli = cac('qxy')

cli.help()
cli.version(pkg.version)

// display help message if no command
cli.command('').action(() => cli.outputHelp())

// register `info` command
cli.command('info', 'Display environment infomation').action(wrapCommand(info))

// register `icon` command
cli
  .command('icon [icon]', 'Generate different sizes icon files')
  .option('-s, --sizes [sizes]', 'Icon sizes, separated by comma')
  .option('-n, --name [name]', 'Icon name')
  .option('--prefix [prefix]', 'Icon name prefix')
  .option('--suffix [suffix]', 'Icon name suffix')
  .option('-n, --name [name]', 'Icon name')
  .option('-d, --dest [dir]', 'Icon dest directory')
  .action(wrapCommand(icon))

cli.parse()
