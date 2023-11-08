import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('app.db')

const initDB = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS transactions (
        transactionId TEXT PRIMARY KEY NOT NULL,
        mode TEXT,
        type TEXT,
        value REAL,
        date TEXT,
        source TEXT,
        description TEXT
      );`,
      )
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
        userId TEXT PRIMARY KEY NOT NULL,
        name TEXT,
        login TEXT,
        password TEXT,
        gender TEXT
      );`,
      )
    },
    (error) => {
      console.log('Erro ao inicializar o banco de dados: ', error)
    },
    () => {
      console.log('Banco de dados inicializado com sucesso.')
    },
  )
}

export default initDB
