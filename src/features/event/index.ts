export interface CalendarRecursiveEvent {
  name: string;
  description: string;
  day: number;
  startHour: number;
  endHour: number;
  place?: string;
}

export interface UniversityLectureEvent extends CalendarRecursiveEvent {
  
}