'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function FilterBar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [topic, setTopic] = useState<string>('all');

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    // Implement filter logic
  };

  const handleTopicChange = (newTopic: string) => {
    setTopic(newTopic);
    // Implement filter logic
  };

  return (
    <div className="flex space-x-4 mb-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Select onValueChange={handleTopicChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a topic" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Topics</SelectItem>
          <SelectItem value="nature">Nature</SelectItem>
          <SelectItem value="urban">Urban</SelectItem>
          <SelectItem value="people">People</SelectItem>
          <SelectItem value="technology">Technology</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}