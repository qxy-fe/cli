import { extname, isAbsolute, resolve } from 'node:path'
import process from 'node:process'
import Jimp from 'jimp'
import consola from 'consola'
import fs from 'fs-extra'
import { oraPromise } from 'ora'

export interface IconCommandOptions {
  sizes?: string
  dest?: string
  name?: string
  prefix?: string
  suffix?: string
}

export type GenerateIconOptions = Required<
  Pick<IconCommandOptions, 'dest' | 'name' | 'prefix' | 'suffix'>
> & {
  file: string
  size: number
  cwd?: string
}

export type IconCommand = (icon: string, commandOptions: IconCommandOptions) => Promise<void>

export function resolveIconCommandOptions(options: IconCommandOptions) {
  const defaultOptions = {
    name: '',
    dest: 'icon-dist',
    prefix: '',
    suffix: '',
    sizes: [16, 32, 48, 64, 96, 100, 128, 196, 200, 256, 512, 1024],
  }
  const sizes =
    options.sizes
      ?.split(',')
      .map(size => Number(size.trim()))
      .filter(size => !Number.isNaN(size)) ?? defaultOptions.sizes
  return { ...defaultOptions, ...options, sizes }
}

export async function genIcon({
  file,
  dest,
  name,
  prefix,
  suffix,
  size,
  cwd = process.cwd(),
}: GenerateIconOptions) {
  const ext = extname(file)
  const jimpIcon = await Jimp.read(file)
  const destPath = isAbsolute(dest) ? dest : resolve(cwd, dest)
  const iconName = [prefix, name, suffix, size, ext].filter(Boolean).join('')
  jimpIcon.resize(size, Jimp.AUTO).write(`${destPath}/${iconName}`)
}

export const icon: IconCommand = async (icon, commandOptions) => {
  if (!fs.existsSync(icon)) {
    consola.error(`Icon file not found: ${icon}`)
    process.exit(1)
  }
  const { name, prefix, suffix, dest, sizes = [] } = resolveIconCommandOptions(commandOptions)

  const pAll = Promise.all(
    sizes.map(size => genIcon({ file: icon, name, prefix, suffix, dest, size })),
  )

  await oraPromise(pAll, 'Generating icons...')

  consola.success('Generated icons done')
}
