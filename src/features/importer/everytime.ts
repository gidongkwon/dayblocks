import { xmlToObject } from '../utils/xml-to-object';
import type { UniversityLectureEvent } from '../event';

export function parseEverytimeXML(xml: string): UniversityLectureEvent[] {
  const parsedXML = new DOMParser().parseFromString(xml, 'text/xml');
  const jsonObject = xmlToObject(parsedXML);

  // console.log(jsonObject);

  const subjects = jsonObject?.response?.table?.subject.map((subject: Record<string, any>) => {
    let day = parseInt(subject.time.data._attributes.day);
    // js는 0이 일요일인데 에브리타임은 0이 월요일이다.
    day++;
    if (day > 6) {
      day -= 7;
    }
    return {
      name: subject.name._attributes.value,
      place: subject.place._attributes.value,
      day,
      startHour: subject.time.data._attributes.starttime / 12,
      endHour: subject.time.data._attributes.endtime / 12,
      description: `${subject.professor._attributes.value}, ${subject.time._attributes.value}`
    }
  }) ?? [];

  return subjects;
}
