/**
 * Type of `icon` command function
 */
export type IconCommand = (icon: string, commandOptions?: IconCommandOptions) => Promise<void>

/**
 * CLI options of `icon` command
 */
export interface IconCommandOptions{
  sizes?: string
  name?: string
  dest?: string
}

/**
 * Type of `host` command function
 */
export type HostCommand = (region: string, commandOptions?: HostCommandOptions) => Promise<void>

/**
 * CLI options of `host` command
 */
export interface HostCommandOptions{
  delete?: boolean
}
