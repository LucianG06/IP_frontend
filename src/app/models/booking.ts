export class Booking {
  emailUser:string;
  nameDesk:string;
  checkIn:Date;
  checkOut:Date;

  constructor(emailUser: string, nameDesk: string, checkIn: Date, checkOut: Date) {
    this.emailUser = emailUser;
    this.nameDesk = nameDesk;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
  }
}
