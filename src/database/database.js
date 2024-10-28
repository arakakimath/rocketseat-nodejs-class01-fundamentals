export class Database {
  #database = {};

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

    return data;
  };
}
