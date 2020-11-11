import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertController, ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import * as CryptoJS from 'crypto-js';

const { Modals, Toast } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class MethodService {
  basicUrl: string = environment.apiUrl;
  private headers: HttpHeaders = new HttpHeaders();
  secureKey: string = '1234567890987654';

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  async successInfo(info: string) {
    // const refSuccess = await Toast.show({
    //   text: info,
    //   duration: "short",
    //   position: "top"
    // })
    // await refSuccess;
    
    const toast = await this.toastCtrl.create({
      message: info,
      color: "success",
      duration: 2000
    });
    toast.present();
  
  }

  async presentAlert(title: string,info: string) {
    // const refAlert = await Modals.alert({
    //   title: title,
    //   message: info,
    //   buttonTitle: 'OK'
    // });
    // await refAlert;

    // const alert = await this.alertCtrl.create({
    //   header: 'Alert',
    //   subHeader: title,
    //   message: info,
    //   buttons: ['OK']
    // });
    // await alert.present();

    const toast = await this.toastCtrl.create({
      header: title,
      message: info,
      color: "danger",
      duration: 3500
    });
    toast.present();
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

  encrypt(plainText: string) {
    var encryptedStr = CryptoJS.AES.encrypt(plainText, this.secureKey.trim()).toString();
    return encryptedStr;
  }

  decrypt(encryptedText: string) {
    var decryptedStr = CryptoJS.AES.decrypt(encryptedText, this.secureKey.trim()).toString(CryptoJS.enc.Utf8);
    return decryptedStr;
  }
}
