import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export class HikooResponse {
  success: boolean;
  errorMessage?: string;
}

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


export class CheckinDto {
  id: number;
  hikerId: number;
  hikeId: number;
  permitName: string;
  checkinTime: number;
}

export class AuthMeResponseResult {
  isLiveness: boolean;
  samePersion: boolean;
}

export class AuthMeError {
  code: number;
  message: string;
}

export class AuthMeResponse {
  success: boolean;
  result?: AuthMeResponseResult;
  error?: AuthMeError;
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

  checkin(checkin: CheckinDto) {
    return this.http.post<HikooResponse>('/api/checkin', checkin);
  }
}
