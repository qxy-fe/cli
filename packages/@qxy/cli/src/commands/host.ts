import Hosts from 'hosts-so-easy'
import { ora, logger } from '@qxy/cli-utils'

export interface CommandOptions {
  delete?: boolean
}

// https://github.com/sindresorhus/is-root
export const isRoot = (): boolean => process.getuid && process.getuid() === 0

export const host = async (
  region: string,
  commandOptions: CommandOptions = {}
): Promise<void> => {
  const spiner = ora()
  const hostsPrefixList = [
    `oa`,
    `es`,
    `api`,
    `netoa`,
    `share`,
    `portal`,
    `phpadmin`,
  ]
  if (!isRoot()) {
    logger.error(`😭 Permission check failed!`)
    logger.tip(`👉 Try run 'sudo qxy host [region]'.`)
    process.exit(1)
  }
  const hosts = new Hosts({
    header: `Config for ${region}:`,
  })

  spiner.start(
    `${
      commandOptions.delete ? `Deleting` : `Adding`
    } hosts record for ${region}\n`
  )

  hosts.on(`updateStart`, () => {
    logger.success(`Started!`)
  })

  hosts.on(`updateFinish`, () => {
    spiner.stop()
    logger.success(`Done!`)
  })

  hostsPrefixList.forEach(name => {
    commandOptions.delete
      ? hosts.remove(`*`, `${name}.${region}.com`)
      : hosts.add(`127.0.0.1`, `${name}.${region}.com`)
  })
}
