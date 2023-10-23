import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase(
  { name: 'app.db', location: 'default' },
  () => console.log('Banco de dados aberto com sucesso'),
  (error) => console.error('Erro ao abrir o banco de dados:', error),
)

export default db
