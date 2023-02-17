import Jimp from 'jimp'
import { fs, logger, ora, path } from '@qxy/cli-utils'
import type {
  IconCommand,
  IconCommandOptions,
} from './types.js'

const root = process.cwd()

export interface IconOption {
  file: string
  dest: string
  name: string
  size: number
}

export const resolveIconOptions = (options: IconCommandOptions) => {
  const defaultOptions = {
    name: 'icon',
    dest: 'icon-dist',
    sizes: [16, 32, 48, 64, 96, 100, 128, 196, 200, 256, 512, 1024],
  }
  const sizes = options.sizes?.split(',')
    .map(size => Number(size.trim()))
    .filter(size => !Number.isNaN(size)) ?? defaultOptions.sizes
  return { ...defaultOptions, ...options, sizes }
}

export async function genIcon(icon: IconOption) {
  const ext = path.extname(icon.file)
  const jimpIcon = await Jimp.read(icon.file)
  const destPath = path.isAbsolute(icon.dest) ? icon.dest : path.resolve(root, icon.dest)
  const iconName = `${icon.name}_${icon.size}${ext}`
  jimpIcon.resize(icon.size, Jimp.AUTO).write(`${destPath}/${iconName}`)
}

export const icon: IconCommand = async (icon, commandOptions = {}) => {
  if (!fs.existsSync(icon)) {
    logger.error(`Icon file not found: ${icon}`)
    throw new Error(`Icon file not found: ${icon}`)
  }
  const { name, dest, sizes = [] } = resolveIconOptions(commandOptions)
  const spiner = ora()
  spiner.start('Generating icons')
  await Promise.all(sizes.map(size => genIcon({ file: icon, name, dest, size })))
  spiner.stop()
  logger.success('Generated icons done')
}
