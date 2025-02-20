import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import process from 'node:process'
import consola from 'consola'

export function wrapCommand(
  cmd: (...args: any[]) => Promise<void>,
): typeof cmd {
  const wrappedCommand: typeof cmd = (...args) =>
    cmd(...args).catch(err => {
      consola.error(err)
      process.exit(1)
    })
  return wrappedCommand
}

export async function fsEnsureDir(path: string) {
  if (existsSync(path)) return
  await mkdir(path, { recursive: true }).catch(() => {})
}
