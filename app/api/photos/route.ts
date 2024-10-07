import { NextResponse } from 'next/server';
import { db, photos } from '@/lib/db';
import { desc, eq, and } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const topic = searchParams.get('topic');

  let query = db.select().from(photos).orderBy(desc(photos.createdAt)).limit(20);

  if (date) {
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setDate(endOfDay.getDate() + 1);
    query = query.where(and(
      photos.createdAt.gte(startOfDay),
      photos.createdAt.lt(endOfDay)
    ));
  }

  if (topic && topic !== 'all') {
    query = query.where(eq(photos.topic, topic));
  }

  const result = await query;

  return NextResponse.json(result);
}