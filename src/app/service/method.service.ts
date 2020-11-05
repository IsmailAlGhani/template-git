import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MethodService {
  basicUrl: string = environment.apiUrl;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController
  ) {}

  async presentAlert(title: string,info: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: title,
      message: info,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  fingerAlert(title: string,err: any) {
    var description = err.code + "";
    const errorCode = err.code + ""
    switch (errorCode) {
      case "-101":
        description = "Silahkan login menggunakan email"
      case "-111":
        description = "Silahkan coba beberapa saat lagi"
      case "-112":
        description = "Terlalu banyak salah. fingerprint tidak dapat digunakan"
      default:
    }
    this.presentAlert(title, description);
  }

  postUrlApi(urlApi, token, callback, params?) {
    const accessToken = localStorage.getItem("Token")
    const head = (urlApi === 'oauth/token' ? localStorage.getItem("Auth") : "Bearer " + accessToken);
    this.headers = this.headers.set("Authorization", head);
    
    if (params == null || params == '') {
      this.http
        .post(this.basicUrl + urlApi, null, { headers: this.headers })
        .subscribe((data) => {
          callback(data);
        }, err => {
          var info;
          const status = err.status + ""
          switch (err.status) {
            case 400:
              //localStorage.setItem('fingerRegist', 'false');
              info = "Silahkan login menggunakan email";
            default:
              info = err.error.error_description;
          }
          this.presentAlert("Alert",info);
          console.log(JSON.stringify(err, null, 2));
          console.log(err.status);
          callback('Error');
        }
      );
    } else {
      this.http
        .post(this.basicUrl + urlApi, null, { headers: this.headers, params: params })
        .subscribe((data) => {
          callback(data);
        }, err => {
          var info;
          switch (err.status) {
            case 400:
              localStorage.setItem('fingerRegist', 'false');
              info = "Silahkan login menggunakan email";
            default:
              info = err.error.error_description;
          }
          this.presentAlert("Alert",info);
          console.log(JSON.stringify(err, null, 2));
          console.log(err.status);
          callback('Error');
        }
      );
    } 
  }

  getUrlApi(urlApi, token, callback, params?) {
    const accessToken = localStorage.getItem("Token")
    const head = (urlApi === 'oauth/token' ? localStorage.getItem("Auth") : "Bearer " + accessToken);
    this.headers = this.headers.set("Authorization", head);

    if (params == null || params == '') {
      this.http.get(this.basicUrl + urlApi, {headers: this.headers })
        .subscribe((data) => {
          callback(data);
        }, err => {
          var info;
          switch (err.status) {
            case 400:
              localStorage.setItem('fingerRegist', 'false');
              info = "Silahkan login menggunakan email";
            default:
              info = err.error.error_description;
          }
          this.presentAlert("Alert",info);
          console.log(JSON.stringify(err, null, 2));
          console.log(err.status);
          callback('Error');
        }
      );
    } else {
      this.http.get(this.basicUrl + urlApi, {headers: this.headers, params: params})
        .subscribe((data) => {
          callback(data);
        }, err => {
          var info;
          switch (err.status) {
            case 400:
              localStorage.setItem('fingerRegist', 'false');
              info = "Silahkan login menggunakan email";
            default:
              info = err.error.error_description;
          }
          this.presentAlert("Alert",info);
          console.log(JSON.stringify(err, null, 2));
          console.log(err.status);
          callback('Error');
        }
      );
    }
  }
}
