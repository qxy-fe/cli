import { extname, isAbsolute, resolve } from 'node:path'
import process from 'node:process'
import Jimp from 'jimp'
import consola from 'consola'
import fs from 'fs-extra'
import { oraPromise } from 'ora'

export interface IconCommandOptions {
  sizes?: string
  name?: string
  dest?: string
}

export interface IconOptions {
  file: string
  dest: string
  name: string
  size: number
  cwd?: string
}

export type IconCommand = (icon: string, commandOptions: IconCommandOptions) => Promise<void>

export function resolveIconOptions(options: IconCommandOptions) {
  const defaultOptions = {
    name: 'icon',
    dest: 'icon-dist',
    sizes: [16, 32, 48, 64, 96, 100, 128, 196, 200, 256, 512, 1024],
  }
  const sizes =
    options.sizes
      ?.split(',')
      .map(size => Number(size.trim()))
      .filter(size => !Number.isNaN(size)) ?? defaultOptions.sizes
  return { ...defaultOptions, ...options, sizes }
}

export async function genIcon({ file, dest, name, size, cwd = process.cwd() }: IconOptions) {
  const ext = extname(file)
  const jimpIcon = await Jimp.read(file)
  const destPath = isAbsolute(dest) ? dest : resolve(cwd, dest)
  const iconName = `${name}_${size}${ext}`
  jimpIcon.resize(size, Jimp.AUTO).write(`${destPath}/${iconName}`)
}

export const icon: IconCommand = async (icon, commandOptions) => {
  if (!fs.existsSync(icon)) {
    consola.error(`Icon file not found: ${icon}`)
    process.exit(1)
  }
  const { name, dest, sizes = [] } = resolveIconOptions(commandOptions)

  const pAll = Promise.all(sizes.map(size => genIcon({ file: icon, name, dest, size })))

  await oraPromise(pAll, 'Generating icons...')

  consola.success('Generated icons done')
}
