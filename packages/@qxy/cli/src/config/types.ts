export interface AppOptions<T, U> {
  config: T
  userConfig: U
}

export type UserConfig<T extends {} = {}, U extends {} = {}> = Partial<
  AppOptions<T, U>
>
