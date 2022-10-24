export interface Collection {
  name: string;
  documents?: Array<IDocument>;
  readonly schema?: ISchema;
  addDocument:(doc: any) => IDocument;
  getDocument: (id: string) => IDocument;
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
  minLength?: [number, string]
  maxLength?: [number, string]
  min?: [number, string]
  max?: [number, string]
  validate?: [(v: string) => boolean, string];
}

type schmeValueType = String |  Number | Boolean | Object | Array<any> | null

export type Validators = {
  isPassword: isPasswordValidator
  isEmail: RegExp
  isCreditCard: RegExp
}

export type isPasswordValidator = {
  typeOne: RegExp, // Minimum eight characters, at least one letter and one number:
  typeTwo: RegExp // Minimum eight characters, at least one letter, one number and one special character:
  typeThree: RegExp // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
  typeFour: RegExp // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  typeFive: RegExp // Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
}