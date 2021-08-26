import type { UserConfig } from './types'

export const defineUserConfig = <T extends {} = {}, U extends {} = {}>(
  config: UserConfig<T, U>,
): UserConfig<T, U> => config
