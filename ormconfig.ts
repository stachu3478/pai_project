import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { MysqlConnectionCredentialsOptions } from "typeorm/driver/mysql/MysqlConnectionCredentialsOptions";

let dbOptions: MysqlConnectionCredentialsOptions = {
   host: 'localhost',
   port: 3306,
   username: 'root',
   password: 'development',
   database: 'development',
}
if (process.env.NODE_ENV === 'production') {
   const nutshell = process.env.JAWSDB_MARIA_URL.split('://')[1]
   const [credentials, hostAndDatabase] = nutshell.split('@')
   const [username, password] = credentials.split(':')
   const [hostAndPost, database] = hostAndDatabase.split('/')
   const [host, port] = hostAndPost.split(':')
   dbOptions = {
      host,
      port: parseInt(port),
      username,
      password,
      database,
   };
}
const ormconfig: MysqlConnectionOptions = {
   ...dbOptions,
   type: 'mysql',
   synchronize: true,
   logging: false,
   entities: [
      'src/entity/**/*.ts'
   ],
   migrations: [
      'src/migration/**/*.ts'
   ],
   subscribers: [
      'src/subscriber/**/*.ts'
   ],
   cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
   }
}

export default ormconfig