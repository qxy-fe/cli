import { cac } from 'cac'
import pkg from '../package.json'
import { wrapCommand } from './utils'
import { info } from './commands/index'

const cli = cac('qxy')

cli.help()
cli.version(pkg.version)

cli.command('').action(() => cli.outputHelp())

cli.command('info', 'Display environment infomation').action(wrapCommand(info))

cli.parse()
