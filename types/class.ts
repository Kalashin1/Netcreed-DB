import { ArrayEquals, generateRandomId, saveDBSnapshot } from "../utils/bootstrap";
import { Collection, IDatabase, IDocument, ISchema } from "./types";

export const dbs: IDatabase[] = []

export class Database implements IDatabase {
  createCollection(name: string, schema: ISchema) {
    const collection: CollectionC = new CollectionC(this.name, this, name, schema)
    this.collections.push(collection);
    return collection;
  }

  constructor(collections: Collection[], readonly name: string) {
    this.collections.push(...collections)
  }

  getCollection(name: string) {
    const collection = this.collections.find((c) => c.name === name);
    if (collection) {
      return collection;
    }
    throw Error('Cannot find collection with that name');
  }

  collections: Collection[] = [];
}


export class CollectionC implements Collection {

  readonly createdAt = new Date().getTime()

  constructor(
    private db: string,
    DB: IDatabase,
    public name: string,
    readonly schema: ISchema,
  ) {
    dbs.push(DB);
  }

  addDocument(doc: any): IDocument {
    const keys = Object.keys(this.schema);

    let document: any = {
      _id: generateRandomId(),
      createdAt: new Date().getTime()
    }


    for (const key in this.schema) {
      if (Object.prototype.hasOwnProperty.call(this.schema, key)) {
        const element: typeof this.schema[typeof key] = this.schema[key];
        if (typeof element.default !== 'undefined' && !(doc[key])) {
          document[key] = element.default
          doc[key] = element.default
        } else {
          continue
        }
      }
    }

    const _K = Object.keys(doc);
    const [bool, notAmong] = ArrayEquals(keys.sort(), _K.sort())
    // console.log(notAmong)
    for (const key in doc) {
      if (
        Object.prototype.hasOwnProperty.call(doc, key) &&
        bool &&
        (doc[key]).constructor == this.schema[key].type &&
        (doc[key] !== 'undefined')
      ) {

        if (
          (doc[key]).constructor === String &&
          this.schema[key].maxLength && 
          (doc[key].length < this.schema[key].minLength![0])
        ) {
          throw Error(this.schema[key].minLength![1]);
        }

        if (
          (doc[key]).constructor === String &&
          this.schema[key].maxLength && 
          (doc[key].length > this.schema[key].maxLength![0])
        ) {
          throw console.error(this.schema[key].maxLength![1]);
        }

        if (
          (doc[key]).constructor === Number &&
          this.schema[key].max &&
          (doc[key]) < this.schema[key].min![0]
        ) {
          throw Error(this.schema[key].min![1]);
        }

        if (
          (doc[key]).constructor === Number &&
          this.schema[key].max &&
          (doc[key]) > this.schema[key].max![0]
        ) {
          throw Error(this.schema[key].max![1])
        }

        if (
          (doc[key]).constructor === String && 
          this.schema[key].validate &&
          !this.schema[key].validate![0](doc[key])
        ) {
          throw Error(this.schema[key].validate![1])
        }

        document[key] = doc[key]
        // console.log(this.schema[key].required)
      } else if (this.schema[key].type !== (doc[key]).constructor) {
        throw Error(`Value is of invalid type for ${keys.find(k => k == key)}`)
      }
      else {
        let i = 0
        for (i; i < notAmong.length; i++) {
          if (typeof this.schema[notAmong[i]].required !== 'undefined') {
            throw Error(`${this.schema[notAmong[i]].required![1]}`)
          }
        }

      }

    }

    document.collection = {
      name: this.name
    };
    this.documents.push(document);
    return document;
  }

  documents: IDocument[] = [];

  save() {
    saveDBSnapshot(dbs.find(db => db.name == this.db)!)
  }

  getDocument(id: string): IDocument {
    const document = this.documents.find((d) => d._id === id);
    if (document) {
      return document;
    }
    throw Error("No document found")
  }

}

export class Document implements IDocument {
  _id: string
  createdAt: number

  constructor(_id: string) {
    this._id = _id;
    this.createdAt = new Date().getTime()
  }


  collection = {
    name: ''
  }

}
