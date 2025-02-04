import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url)

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist = () => {
    //fs.writeFile('db.json', JSON.stringify(this.#database))
    //create db.json according to actual address in terminal
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select = (table) => {
    const data = this.#database[table] ?? []; //returns [] if the arg is null/undefined

    return data;
  };

  insert = (table, data) => {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist()

    return data;
  };

  delete = (table, id) => {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1){
      this.#database[table].splice(rowIndex, 1)
      this.#persist()

      return true
    } else return false
  }

  update = (table, id, data) => {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1){
      this.#database[table][rowIndex] = { id, ...data }
      this.#persist()

      return true
    } else return false
  }
}
