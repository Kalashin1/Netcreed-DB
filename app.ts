import { IDatabase, ISchema } from './types/types';
import { CollectionC } from './types/class';
import main from './utils/bootstrap';
// import express from 'express';

// const app = express();

// app.get('/', (req, res) => {
  
// })


// app.listen(3000, () => console.log('App is running on port 3000'))


const userSchema:ISchema = {
  name: {
    type: String
  },
  age: {
    type: Number
  },
  isAdult: {
    type: Boolean
  },
  hobbies: {
    type: Array
  },
  socials: {
    type: Object
  },
  height: {
    type: Number,
    default: 10
  },
  gender: {
    type: String,
    required: [true, "Provide a gender"]
  }
}



const doc = {
  name: 'samson',
  age: 20,
  isAdult: true,
  hobbies: ["singing"],
  socials: {
    "youtube": "link",
    "facebook": "link"
  },
  gender: 'M',
}


const pam = {
  name: 'John',
  age: 30,
  isAdult: true,
  hobbies: ["music"],
  socials: {
    "youtube": "link",
    "facebook": "link"
  },
  gender: 'M',
  height: 20
}

const DB = main("DB")
const collection = DB.createCollection( "peoples", userSchema);

function addDoc(_doc: any, collection: CollectionC) {
  return collection.addDocument(_doc) 
}


function run (){
  const sam = addDoc(doc, collection);
  // console.log(collection)
  const userII = addDoc(pam, collection);

  const document = collection.getDocument(sam._id);

  console.log(document)
  // collection.save()
}

run()