export type HomepageTimelineItem = Readonly<{
  id: string;
  content: string;
  authorName: string;
  authorId: string; 
  authorFirstName: string;  
  authorTitle: string; 
  creationDate: Date;
  startDate: Date;
  endDate: Date;
  target: any[];  
  targetSchools: any[];  
  colorName: string;
}>;
