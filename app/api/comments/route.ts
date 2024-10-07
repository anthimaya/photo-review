import { NextResponse } from 'next/server';
import { db, comments } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { photoId, userId, content } = body;

  const newComment = await db.insert(comments).values({
    photoId,
    userId,
    content,
  }).returning();

  return NextResponse.json(newComment[0]);
}