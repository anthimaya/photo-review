'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data - replace with actual data fetching logic
const mockPhotos = [
  { id: 1, user: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1', image: 'https://source.unsplash.com/random/800x600?sig=1', likes: 15, comments: 3 },
  { id: 2, user: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2', image: 'https://source.unsplash.com/random/800x600?sig=2', likes: 10, comments: 2 },
];

export default function PhotoFeed() {
  const [photos, setPhotos] = useState(mockPhotos);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch photos from API
  }, []);

  const handleLike = (id: number) => {
    setPhotos(photos.map(photo => 
      photo.id === id ? { ...photo, likes: photo.likes + 1 } : photo
    ));
    toast({
      title: "Liked!",
      description: "You've liked this photo.",
    });
  };

  const handleComment = (id: number, comment: string) => {
    // Implement comment logic
    toast({
      title: "Comment posted!",
      description: "Your comment has been added.",
    });
  };

  return (
    <div className="space-y-8">
      {photos.map((photo) => (
        <Card key={photo.id} className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={photo.avatar} alt={photo.user} />
                <AvatarFallback>{photo.user[0]}</AvatarFallback>
              </Avatar>
              <CardTitle>{photo.user}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <img src={photo.image} alt="User post" className="w-full h-auto rounded-md" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={() => handleLike(photo.id)}>
              <ThumbsUp className="mr-2 h-4 w-4" /> {photo.likes}
            </Button>
            <Button variant="ghost">
              <MessageCircle className="mr-2 h-4 w-4" /> {photo.comments}
            </Button>
          </CardFooter>
          <CardFooter>
            <form onSubmit={(e) => {
              e.preventDefault();
              const comment = (e.target as HTMLFormElement).comment.value;
              handleComment(photo.id, comment);
              (e.target as HTMLFormElement).reset();
            }} className="w-full flex space-x-2">
              <Input name="comment" placeholder="Add a comment..." className="flex-grow" />
              <Button type="submit">Post</Button>
            </form>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}