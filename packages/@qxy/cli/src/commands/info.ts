import * as envinfo from 'envinfo'
import { ora } from '@qxy/cli-utils'

export const info = async () => {
  const spiner = ora()

  spiner.start(`Collecting Environment Info`)

  const result = await envinfo.run(
    {
      System: [`OS`, `CPU`, `Memory`, `Shell`],
      Binaries: [`Node`, `Yarn`, `npm`],
      Utilities: [`Git`],
      Browsers: [`Chrome`, `Edge`, `Firefox`, `Safari`],
      npmPackages: [`qxy`, `@qxy/cli`, `@qxy/cli-utils`],
    },
    {
      showNotFound: true,
      duplicates: true,
      fullTree: true,
    },
  )

  spiner.stop()

  console.info(result)
}
