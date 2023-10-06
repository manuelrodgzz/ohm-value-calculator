const fs = require('fs')

const DOCUMENTS = [
  {
    color: 'black',
    significant: 0,
    multiplier: 1
  },
  {
    color: 'brown',
    significant: 1,
    multiplier: 10,
    tolerancePercentage: 0.01
  },
  {
    color: 'red',
    significant: 2,
    multiplier: 100,
    tolerancePercentage: 0.02
  },
  {
    color: 'orange',
    significant: 3,
    multiplier: 1000,
    tolerancePercentage: 0.0005
  },
  {
    color: 'yellow',
    significant: 4,
    tolerancePercentage: 0.0002,
    multiplier: 10_000
  },
  {
    color: 'green',
    significant: 5,
    multiplier: 100_000,
    tolerancePercentage: 0.005
  },
  {
    color: 'blue',
    significant: 6,
    multiplier: 1_000_000,
    tolerancePercentage: 0.0025
  },
  {
    color: 'violet',
    significant: 7,
    multiplier: 10_000_000,
    tolerancePercentage: 0.001
  },
  {
    color: 'grey',
    significant: 8,
    multiplier: 100_000_000,
    tolerancePercentage: 0.0001
  },
  {
    color: 'white',
    significant: 9,
    multiplier: 1_000_000_000
  },
  {
    color: 'gold',
    multiplier: 	0.1,
    tolerancePercentage: 0.05
  },
  {
    color: 'silver',
    multiplier: 	0.01,
    tolerancePercentage: 0.1
  },
  {
    color: 'pink',
    multiplier: 0.001
  },
  {
    color: 'none',
    tolerancePercentage: 0.2
  }
]

const {
  MONGO_CLIENT_USER_FILE,
  MONGO_CLIENT_PASSWORD_FILE,
  MONGO_INITDB_DATABASE
} = process.env

if (!MONGO_CLIENT_USER_FILE) {
  throw new Error(`Missing env variable: MONGO_CLIENT_USER_FILE`)
}

if (!MONGO_CLIENT_PASSWORD_FILE) {
  throw new Error(`Missing env variable: MONGO_CLIENT_PASSWORD_FILE`)
}

if (!MONGO_INITDB_DATABASE) {
  throw new Error(`Missing env variable: MONGO_INITDB_DATABASE`)
}

const linebreaksRegex = new RegExp(/[\r\n]/gm)

const CLIENT_USER = fs.readFileSync(process.env.MONGO_CLIENT_USER_FILE).toString().replace(linebreaksRegex, '')
const CLIENT_PASSWORD = fs.readFileSync(process.env.MONGO_CLIENT_PASSWORD_FILE).toString().replace(linebreaksRegex, '')

db.getSiblingDB('admin').auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD
)

const res = db.createUser(
  {
    user: CLIENT_USER,
    pwd: CLIENT_PASSWORD,
    roles: [{ role: 'read', db: process.env.MONGO_INITDB_DATABASE }]
  },
)

db.createCollection('colorCodes')

console.log('===== Populating DB ====')
db.colorCodes.insertMany(DOCUMENTS)
console.log('===== DB population finished ====')