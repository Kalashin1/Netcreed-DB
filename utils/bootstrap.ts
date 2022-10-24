import { Database } from "../types/class";
import { IDatabase, Validators as ValidatorType } from "../types/types";
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

export const Validators: ValidatorType = {
  isPassword: {
    typeOne: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    typeTwo: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    typeThree: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    typeFour: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    typeFive: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
  },
  isEmail: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
  isCreditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
}

export function ArrayEquals<T>(a: Array<T>, b: Array<T>): [boolean, T[]] {
  let notAmong: T[] = []
  a.forEach((i, _in) => {
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

  wS.write(JSON.stringify(DB, null, 2),(err) => {
    if (err) throw Error('Cannot write to disk')
  })
  dbS.write(JSON.stringify(DB, null, 2),(err) => {
    if (err) throw Error(err.message)
  })

  wS.close()
  dbS.close()
}