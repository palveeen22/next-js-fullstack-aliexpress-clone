import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { hashText } from "../utils/hash";



// Mendefinisikan type dari UserModel
export type UserModel = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;

};

// Mendefinisikan type dari UserModelCreateInput yang tidak menggunakan _id
export type UserModelCreateInput = Omit<UserModel, "_id">;

// constant value
const database_name = process.env.MONGODB_DB_NAME || "test";
const user_collection = "User";

// Connect DB
export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(database_name);

  return db;
};

export const getUsers = async () => {
  const db = await getDb();

  const users = (await db
    .collection(user_collection)
    .find()
    .project({ password: 0 })
      .toArray())
    
    const data: UserModel[] = users.map((user) => {
        return {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            password:"" 
        }
    })

  return data;
};


export const createUser = async (user: UserModelCreateInput) => {
  const modifiedUser: UserModelCreateInput = {
    ...user,
    password: hashText(user.password),
  };
  const db = await getDb();
  const result = await db.collection(user_collection).insertOne(modifiedUser);
  return result;
};

export const getUserById = async (id: string) => {
  const db = await getDb();
  const objectId = new ObjectId(id);

  const user = (await db.collection(user_collection).findOne(
    { _id: objectId },
    {
      projection: {
        password: 0,
      },
    },
  )) as UserModel;

  

  return user;
};


export const getUserByEmail = async (email: string) => {
  const db = await getDb();
  const user = (await db
    .collection(user_collection)
    .findOne({ email: email })) as UserModel;

  return user;
};