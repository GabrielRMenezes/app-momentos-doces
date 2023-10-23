import db from '../Database'

export function loginUser(login, password, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      `
      SELECT * FROM users
      WHERE login = ? AND password = ?;
      `,
      [login, password],
      (_, { rows }) => {
        const user = rows.item(0)
        callback(user)
      },
      (error) => console.error('Erro ao fazer login:', error),
    )
  })
}
