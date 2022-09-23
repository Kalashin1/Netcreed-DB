export interface Collection {
  name: string;
  documents?: Array<IDocument>;
  readonly schema?: ISchema;
  addDocument:(doc: any) => IDocument
  getDocument: (id: string) => IDocument
  save: () => void;
  readonly createdAt: number;
}

export type ColRef = {
  name: string
  db: {
    name: string
  }
  timestamp: number
}

export type DocRef = {
  _id: string
  collection: {
    name: string
  }
  timestamp: number
}

export interface IDocument {
  readonly _id: string
  [key: string]: any
  readonly createdAt: number
  collection: {
    name: string
  }
} 

export interface IDatabase {
  collections: Collection[];
  readonly name: string;
  getCollection: (name: string) => Collection
  createCollection: (name: string, schema: ISchema) => Collection
}


export interface ISchema {
  [Key: string]:  schemaProp
}

type schemaProp = {
  type: schmeValueType
  required?: [boolean, string]
  default?: schmeValueType
}

type schmeValueType = String |  Number | Boolean | Object | Array<any> | null