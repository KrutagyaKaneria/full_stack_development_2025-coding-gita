import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    const client = await clientPromise;

    const db = client.db(process.env.MONGODB_DB || "test");
    const coll = db.collection('companies');

    const filter = name ? { name: { $regex: new RegExp(name, 'i') } } : {};
    const items = await coll.find(filter).toArray();

    return NextResponse.json({ count: items.length, items }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
