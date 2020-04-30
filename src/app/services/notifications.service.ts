import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders ({
    "Content-type": "application/json",
  });

  notifyCommittee(director, rapporteur, tutor) {
    const url_api = "http://localhost:3000/notifications/notify/committee";
    console.log('se deberia incrementar');
    return this.http
    .put(
      url_api, 
      {
        director,
        rapporteur,
        tutor 
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  getNotificationsProffesor(idProffesor) {
    const url_api = "http://localhost:3000/notifications/proffesors/" + idProffesor;
    return this.http.get(url_api).pipe(map(data => data));
  }

  clearTutorNotifications(idProffesor) {
    const url_api = "http://localhost:3000/notifications/proffesors/clear/tutor";
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
    const url_api = "http://localhost:3000/notifications/proffesors/clear/rapporteur";
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
    const url_api = "http://localhost:3000/notifications/proffesors/clear/all";
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
