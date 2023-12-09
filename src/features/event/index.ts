export interface TaskPlacement {
  day: number;
  startHour: number;
  endHour: number;
}

export interface CalendarRepetitiveEvent extends TaskPlacement {
  name: string;
  description: string;
  place?: string;
}

export interface UniversityLectureEvent extends CalendarRepetitiveEvent {
  
}