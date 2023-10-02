import { MongoClient, Db, WithId } from 'mongodb'
import fs from 'fs'
import DbError from './errors/db'
import { ColorCodeCollectionSchema } from 'common'

const userSecretPath = '/run/secrets/mongo_client_user'
const passSecretPath = '/run/secrets/mongo_client_pass'

const secretsExist = () => {
  return fs.existsSync(userSecretPath) && fs.existsSync(passSecretPath)
}

const getDbCredentials = (): { dbName: string, user: string, password: string } => {
  if (!secretsExist()) {
    throw new DbError('Credentials were not found.')
  }

  const { DB_NAME } = process.env

  if (!DB_NAME) {
    throw new DbError('Db name was not set.')
  }

  const user = fs.readFileSync(userSecretPath).toString()
  const password = fs.readFileSync(passSecretPath).toString()

  return {
    user,
    password,
    dbName: DB_NAME
  }
}

const connectToDb = async (): Promise<Db> => {
  const {user, password, dbName} = getDbCredentials()
  try {
    const client = new MongoClient(`mongodb://${user}:${password}@db:27017/${dbName}`)
    await client.connect()
  
    return client.db(dbName)
  } catch(e) {
    throw new DbError('Database authentication failed.')
  }
}
type Test = {
  name: string
}
const getColorCodes = async (): Promise<WithId<ColorCodeCollectionSchema>[]> => {
  const ohmDb = await connectToDb()

  const collection = ohmDb.collection<ColorCodeCollectionSchema>('colorCodes')
  return collection.find().toArray()
}

export default getColorCodes