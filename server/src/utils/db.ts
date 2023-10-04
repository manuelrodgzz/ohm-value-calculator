import { MongoClient, Db as MongoDb, WithId } from 'mongodb'
import fs from 'fs'
import DbError from './errors/db'
import { Color, ColorCodeCollectionSchema } from 'common'

class Db {
  private static userSecretPath = '/run/secrets/mongo_client_user'
  private static passSecretPath = '/run/secrets/mongo_client_pass'

  private static secretsExist() {
    return fs.existsSync(this.userSecretPath) && fs.existsSync(this.passSecretPath)
  }

  private static getCredentials = (): { dbName: string, user: string, password: string } => {
    if (!this.secretsExist()) {
      throw new DbError('Credentials were not found.')
    }
  
    const { DB_NAME } = process.env
  
    if (!DB_NAME) {
      throw new DbError('Db name was not set.')
    }
  
    const user = fs.readFileSync(this.userSecretPath).toString()
    const password = fs.readFileSync(this.passSecretPath).toString()
  
    return {
      user,
      password,
      dbName: DB_NAME
    }
  }

  private static async connect(): Promise<MongoDb> {
    const {user, password, dbName} = this.getCredentials()
    try {
      const client = new MongoClient(`mongodb://${user}:${password}@db:27017/${dbName}`)
      await client.connect()
    
      return client.db(dbName)
    } catch(e) {
      throw new DbError('Database authentication failed.')
    }
  }

  public static async getColorCodes (...colors: Color[]): Promise<WithId<ColorCodeCollectionSchema>[]> {
    const ohmDb = await this.connect()

    try {
      const collection = ohmDb.collection<ColorCodeCollectionSchema>('colorCodes')
      const query = !colors.length ? {} : {
        $or: colors.map(color => ({ color }))
      }
      return collection.find(query)
      .toArray()
    } catch(e) {
      throw e
    }
  }
}

export default Db