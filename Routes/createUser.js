import db from '../Database'

export function insertUser(userId, name, login, password, gender) {
  db.transaction((tx) => {
    tx.executeSql(
      `
      INSERT INTO users (userId, name, login, password, gender)
      VALUES (?, ?, ?, ?, ?);
      `,
      [userId, name, login, password, gender],
      () => console.log('Usuário inserido com sucesso'),
      (error) => console.error('Erro ao inserir usuário:', error),
    )
  })
}
