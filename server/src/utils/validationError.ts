class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'Validation Error'
  }
}

export default ValidationError