import CustomError from './custom'

class DbError extends CustomError {
  constructor(message: string) {
    super(message)
    this.name = 'Db Error'
  }
}

export default DbError