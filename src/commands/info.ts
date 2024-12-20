import consola from 'consola'
import envinfo from 'envinfo'
import ora from 'ora'

export async function info() {
  const spiner = ora()

  spiner.start('Collecting environment info...')

  const result = await envinfo.run(
    {
      System: ['OS', 'CPU', 'Memory', 'Shell'],
      Binaries: ['Node', 'Yarn', 'npm', 'pnpm', 'bun'],
      Utilities: ['Git'],
      IDEs: ['VSCode'],
      Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
      npmGlobalPackages: ['qxy'],
    },
    {
      showNotFound: true,
      duplicates: true,
      fullTree: true,
    },
  )

  spiner.stop()

  consola.info(result)
}
