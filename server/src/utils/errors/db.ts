class DbError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'Db Error'
  }
}

export default DbError