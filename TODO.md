# Todo

[] Criar rota [GET] /api/v1/users/sync?cursor={cursor} //deve retornar todos os usuarios da organização ativa do usuario atual e o usuario atual, se não tiver organização ativa, restornar apenas o usuario logado.
[] Criar rota [POST] /api/v1/users/sync // recebe patches de atualizações e retorna o novo cursor

```ts
export type PatchOperation = "insert" | "update" | "delete"

export interface Patch<T extends Record<string, any> = any> {
  version: string
  table: string
  rowId: string
  operation: PatchOperation
  data: T | Partial<T> | null
  timestamp?: string
  actorEmail?: string | null
}

export interface PatchResponse<T = any> {
  patches: Patch<T>[]
  cursor: string
}
```