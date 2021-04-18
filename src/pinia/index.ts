type GettersType<G extends Record<string, unknown>> = Readonly<
  {
    [K in keyof G]: G[K] extends () => infer R ? R : never
  }
>

type DefineStore<
  State,
  Getters extends Record<string, unknown>,
  Actions extends Record<string, unknown>
> = {
  id: string
  state: () => State
  getters?: Getters & ThisType<Readonly<State> & GettersType<Getters>>
  actions?: Actions & ThisType<State & GettersType<Getters> & Actions>
}

export declare function defineStore<
  S,
  G extends Record<string, unknown>,
  A extends Record<string, unknown>
>(store: DefineStore<S, G, A>): S & GettersType<G> & A
