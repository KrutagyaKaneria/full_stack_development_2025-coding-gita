import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "test");
    const coll = db.collection('companies');

    const company = await coll.findOne({ _id: new ObjectId(id) });
    if (!company) return NextResponse.json({ error: 'Not Found' }, { status: 404 });

    return NextResponse.json(company, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
