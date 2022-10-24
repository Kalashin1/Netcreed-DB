import { IDatabase, ISchema } from './types/types';
import { CollectionC } from './types/class';
import main, { Validators } from './utils/bootstrap';
// import express from 'express';

// const app = express();

// app.get('/', (req, res) => {
  
// })


// app.listen(3000, () => console.log('App is running on port 3000'))


const userSchema:ISchema = {
  name: {
    type: String,
    maxLength: [50, 'Exceeded the max length'],
    minLength: [5, 'Less than the min length for the value']
  },
  age: {
    type: Number,
    min: [5, 'Lowest possible value is 5'],
    max: [25, 'Highest possible value is 10']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    validate: [
      (v: string) => Validators.isEmail.test(v),
      'Invalid email'
    ]
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
  name: 'Kinanee',
  age: 20,
  isAdult: true,
  email: 'kinaneesamsonjohn@gmail.com',
  hobbies: ["singing"],
  socials: {
    "youtube": "link",
    "facebook": "link"
  },
  gender: 'M',
}


const pam = {
  name: 'Samson',
  age: 30,
  isAdult: true,
  hobbies: ["music"],
  socials: {
    "youtube": "link",
    "facebook": "link"
  },
  gender: 'M',
  height: 30
}

const DB = main("DB")
const collection = DB.createCollection( "peoples", userSchema);

function addDoc(_doc: any, collection: CollectionC) {
  return collection.addDocument(_doc) 
}


function run (){
  const sam = addDoc(doc, collection);
  // console.log(collection)
  // const userII = addDoc(pam, collection);

  const document = collection.getDocument(sam._id);

  console.log(document)
  collection.save()
}

run()