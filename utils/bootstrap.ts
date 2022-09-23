import { Database } from "../types/class";
import { IDatabase } from "../types/types";
import { randomBytes } from "crypto";
import fs from 'fs';

export default function main(name: string) {
  
  const databaseString = fs.readFileSync('./db.json', {
    encoding: 'utf8'
  });
  let database: IDatabase;

  database = JSON.parse(databaseString);
  let DB = new Database(database.collections, name);

  return DB

}

export function ArrayEquals<T>(a: Array<T>, b: Array<T>): [boolean, T[]] {
  let notAmong: T[] = []
  a.forEach((i, _in) => {
    // console.log(i, b[_in])
    if (!b.find((bI) => (bI == i))) {
        notAmong.push(i)
    }
  })

  return [Array.isArray(a) && 
    Array.isArray(b) &&
    a.length === b.length && 
    a.every((val: T, index) => val === b[index]), notAmong]
}

export function generateRandomId(): string  {
  return randomBytes(16).toString('hex')
}

export function saveDBSnapshot (DB: IDatabase) {
  const timeStamp = new Date().getTime();
  const wS = fs.createWriteStream(`./snapshots/${timeStamp}.json`)
  const dbS = fs.createWriteStream('./db.json');
  wS.write(JSON.stringify(DB, null, 2),(err) =>{
    if (err) throw Error('Cannot write to disk')
    dbS.write(JSON.stringify(DB, null, 2),(err) => {
      if (err) throw Error('Cannot write to disk')
    })
  })
  wS.close()
  // console.log(JSON.stringify(DB, null, 2))
  
}