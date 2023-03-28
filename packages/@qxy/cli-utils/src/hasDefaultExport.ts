import { isPlainObject } from '@qxy/cli-shared'

export const hasDefaultExport = <T = any>(mod: unknown): mod is { default: T } =>
  isPlainObject(mod) && !!mod.__esmodule && Object.prototype.hasOwnProperty.call(mod, 'default')
