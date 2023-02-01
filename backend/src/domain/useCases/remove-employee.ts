export interface RemoveEmployee {
  delete: (id: string) => Promise<boolean>
}
