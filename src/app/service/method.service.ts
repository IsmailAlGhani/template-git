import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MethodService {
  basicUrl: string = environment.apiUrl;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient,
  ) {}

  postUrlApi(urlApi, token, callback, params?) {
    const accessToken = localStorage.getItem("Token")
    const head = (accessToken ? "Bearer " + accessToken : localStorage.getItem("Auth"));
    this.headers = this.headers.set("Authorization", head);
    
    if (params == null || params == '') {
      this.http
        .post(this.basicUrl + urlApi, null, { headers: this.headers })
        .subscribe((data) => {
          callback(data);
        }, err => {
          console.log(err);
          callback('ERROR');
        }
      );
    } else {
      this.http
        .post(this.basicUrl + urlApi, null, { headers: this.headers, params: params })
        .subscribe((data) => {
          callback(data);
        }, err => {
          console.log(err);
          callback('ERROR');
        }
      );
    } 
  }

  getUrlApi(urlApi, token, callback, params?) {
    const accessToken = localStorage.getItem("Token")
    const head = (accessToken ? "Bearer " + accessToken : localStorage.getItem("Auth"));
    this.headers = this.headers.set("Authorization", head);

    if (params == null || params == '') {
      this.http.get(this.basicUrl + urlApi, {headers: this.headers })
        .subscribe((data) => {
          callback(data);
        }, err => {
          console.log(err);
          callback('ERROR');
        }
      );
    } else {
      this.http.get(this.basicUrl + urlApi, {headers: this.headers, params: params})
        .subscribe((data) => {
          callback(data);
        }, err => {
          console.log(err);
          callback('ERROR');
        }
      );
    }
  }
}
