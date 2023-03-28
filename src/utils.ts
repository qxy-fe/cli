import consola from 'consola'

export function wrapCommand(cmd: (...args: any[]) => Promise<void>): typeof cmd {
  const wrappedCommand: typeof cmd = (...args) =>
    cmd(...args).catch(err => {
      consola.error(err)
      process.exit(1)
    })
  return wrappedCommand
}
