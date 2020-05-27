import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export class AccountDto {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
  identification: string;
  gender: string;
  dob: Date;
  address: string;
  email: string;
  nationality: string;
  identificationNumber: string;
  homeNumber: string;
  mobileNumber: string;
  satelliteNumber: string;
  emergencyContact: string;
  emergencyNumber: string;
  fcmToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  getUser(userEmail: string) {
    return this.http.get<AccountDto>(`/api/accounts/withemail/${userEmail}`);
  }
}
