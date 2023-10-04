import CustomError from './custom'

class ValidationError extends CustomError {
  constructor(message: string) {
    super(message)
    this.name = 'Validation Error'
  }
}

export default ValidationError