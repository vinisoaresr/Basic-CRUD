export interface DeleteEmployeeByIdRepository {
  delete (id: string): Promise<Boolean>
}
