import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  API_URL = environment.APIEndpoint;
  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders ({
    "Content-type": "application/json",
  });

  notifyCommittee(idStudent) {
    const url_api = this.API_URL + "/notifications/notify/committee";
    return this.http
    .put(
      url_api, 
      {
        idStudent
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  getNotificationsProffesor(idProffesor) {
    const url_api = this.API_URL + "/notifications/proffesors/" + idProffesor;
    return this.http.get(url_api).pipe(map(data => data));
  }

  clearTutorNotifications(idProffesor) {
    const url_api = this.API_URL + "/notifications/proffesors/clear/tutor";
    return this.http
    .put(
      url_api, 
      {
        idProffesor,
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  clearRapporteurNotifications(idProffesor) {
    const url_api = this.API_URL + "/notifications/proffesors/clear/rapporteur";
    return this.http
    .put(
      url_api, 
      {
        idProffesor,
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  clearAllNotifications(idProffesor) {
    const url_api = this.API_URL + "/notifications/proffesors/clear/all";
    return this.http
    .put(
      url_api, 
      {
        idProffesor,
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }
}
