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

export class PermitInfoDto {
  hikerId: number;
  hikeStart: number;
  hikeEnd: number;
  permitId: number;
  guideName: string;
  guideContact: string;
  guideContact2: string;
  permitAccepted: string;
  acceptedTime: number;
  memo: string;
  hikeStarted: boolean;
  hikeFinished: boolean;
  hikeCancelled: boolean;
  constructor(hikerId: number, hikeStart: number, hikeEnd:number, permitId: number, 
    guideName: string, guideContact: string, guideContact2: string, permitAccepted: string, 
    acceptedTime: number ,memo :string, hikeStarted: boolean, hikeFinished: boolean, hikeCancelled: boolean) {
      this.hikerId = hikerId;
      this.hikeStart = hikeStart;
      this.hikeEnd = hikeEnd;
      this.permitId = permitId;
      this.guideName = guideName;
      this.guideContact = guideContact;
      this.guideContact2 = guideContact2;
      this.permitAccepted = permitAccepted;
      this.acceptedTime = acceptedTime;
      this.memo = memo;
      this.hikeStarted = hikeStarted;
      this.hikeFinished = hikeFinished;
      this.hikeCancelled = hikeCancelled;
  }
}

export class CheckinDto {
  hikerId: number;
  hikeId: number;
  fcmToken: string;
  constructor(hikerId :number, hikeId: number, fcmToken: string) {
    this.hikerId = hikerId;
    this.hikeId = hikeId;
    this.fcmToken = fcmToken;
  }
}

export class UpdateHikeDto {
  hikeId: number;
  permitAccepted: string;
  acceptTime: number;
  constructor(hikeId :number, permitAccepted: string, acceptTime: number) {
    this.hikeId = hikeId;
    this.permitAccepted = permitAccepted;
    this.acceptTime = acceptTime;
  }
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

  addPermit(permitInfo: PermitInfoDto) {
    console.log(permitInfo)
    // return this.http.get<AccountDto>(`/api/accounts`);
    return this.http.post<HikooResponse>('/api/hikes', permitInfo);
  }

  getUser(userEmail: string) {
    return this.http.get<AccountDto>(`/api/accounts/withemail/${userEmail}`);
  }

  checkin(checkin: CheckinDto) {
    return this.http.post<HikooResponse>('/api/checkin', checkin);
  }

  getHike(hikerId: number) {
    return this.http.get<AccountDto>(`/api/hikes/byHikerId/${hikerId}`);
  }

  updateHikeStatus(hike: UpdateHikeDto) {
    return this.http.put<HikooResponse>(`/api/hikes/acceptHike/${hike.hikeId}`, hike)
  }

}
