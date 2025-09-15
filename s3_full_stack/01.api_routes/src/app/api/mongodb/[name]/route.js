import { MongoClient } from "mongodb";

const uri = "mongodb+srv://krutagyakaneriacg_db_user:YPCyaexNWZ9JDEtA@cluster0.avleiym.mongodb.net/";
const client = new MongoClient(uri);

export async function GET(req, { params }) {
  try {
    await client.connect();
    const db = client.db("test");               // database name
    const coll = db.collection("companies");    // collection name

    // Get the "name" from dynamic route
    const { name } = params;

    // Find company by name
    const doc = await coll.findOne({ name : name });

    if (!doc) {
      return new Response(JSON.stringify({ error: "Company not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Convert ObjectId -> string
    const cleanDoc = { ...doc, _id: doc._id.toString() };

    return new Response(JSON.stringify(cleanDoc), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in GET /api/company/[name]:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await client.close();
  }
}
