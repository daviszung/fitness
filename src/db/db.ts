import { MongoClient, ServerApiVersion, Db, Collection } from "mongodb";

require("dotenv").config();

const userPassword = process.env.DB_USER_PASSWORD;
const uri = `mongodb+srv://daviszung:${userPassword}@cluster0.olgvew1.mongodb.net/?retryWrites=true&w=majority`;
console.log("uri", uri);

let cachedClient: null | MongoClient = null;
let cachedDB: null | Db = null;
let cachedCollection: null | Collection = null;

export async function connectDB() {

	if (cachedClient && cachedDB && cachedCollection) {
		return {
			client: cachedClient,
			db: cachedDB,
			collection: cachedCollection
		}
	};

	let client = new MongoClient(uri, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		},
	})
	try {
		await client.connect();
		console.log("Connected to DB");
	} catch (err) {
		console.log("ERROR CONNECTING TO SERVER: ", err);
	}

	let db = client.db('fitness');
	let collection = db.collection("Cluster0")

	cachedClient = client;
	cachedDB = db;
	cachedCollection = collection;
	

	return {
		client: client,
		db: db,
		collection: collection
	}
}
