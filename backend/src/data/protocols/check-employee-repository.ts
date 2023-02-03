export interface CheckEmployeeRepository {
  check: (id: string) => Promise<boolean>
}
