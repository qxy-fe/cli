import envinfo from 'envinfo'
import { ora } from '@qxy/cli-utils'

export const info = async () => {
  const spiner = ora()

  spiner.start(`Collecting Environment Info`)

  const result = await envinfo.run(
    {
      System: [`OS`, `CPU`, `Memory`, `Shell`],
      Binaries: [`Node`, `Yarn`, `npm`],
      Utilities: [`Git`],
      IDEs: [`VSCode`],
      Browsers: [`Chrome`, `Edge`, `Firefox`, `Safari`],
      npmGlobalPackages: [`qxy`, `@qxy/cli`],
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
