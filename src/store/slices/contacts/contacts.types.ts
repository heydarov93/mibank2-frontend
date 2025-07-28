interface IContactInfo {
  id: number;
  email: string;
  phoneNumber: string;
  contactCenterWorkingDays: string;
  contactCenterShortenedDays: string;
  contactCenterWorkingDayBeginTime: string;
  contactCenterWorkingDayEndTime: string;
  contactCenterShortenedDayBeginTime: string;
  contactCenterShortenedDayEndTime: string;
}

export interface IContacts {
  info: IContactInfo;
}
