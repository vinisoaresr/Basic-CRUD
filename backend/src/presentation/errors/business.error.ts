export class BusinessError extends Error {
  constructor(additionalInfo: string) {
    super(`Unknown error: ${additionalInfo}`)
    this.name = `Unknown error: ${additionalInfo}`
  }
}
