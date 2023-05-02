import {DatePipe} from "@angular/common";

export function transformDateToString(datePipe: DatePipe,date: Date): string | null{
  return datePipe.transform(date,"yyyy-MM-dd HH:mm:ss")
}

export function transformDateToStringWithoutTime(datePipe: DatePipe,date: Date): string | null{
  return datePipe.transform(date,"yyyy-MM-dd")
}
