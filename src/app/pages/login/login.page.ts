import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { MenuController, NavController } from '@ionic/angular';
import { MethodService } from 'src/app/service/method.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  params: HttpParams = new HttpParams();
  fingerAvailable: boolean;

  constructor(
    private fingerAuth: FingerprintAIO,
    private methodService: MethodService, 
    private navController: NavController, 
    private menuController: MenuController
  ) {
    localStorage.setItem('Auth', environment.auth);
    fingerAuth.isAvailable().then(() => {
      if (localStorage.getItem("fingerRegist")) {
        this.fingerAvailable = true;
      } else {
        this.fingerAvailable = false;
      }
    }).catch(() => {
      this.fingerAvailable = false;
    })
  }

  ngOnInit() {
    this.menuController.enable(false);
  }

  loginForm(form: Form) {
    const urlApi = "oauth/token";
    const apiProfile = "api/user/profile";
    const data = form["value"];
    this.params = this.params.set("grant_type", "password").set("password", data.password).set("username", data.email);
    

    this.methodService.postUrlApi(urlApi, localStorage.getItem('Token'), (callback) => {
      if (callback != 'Error') {
        localStorage.setItem('Token', callback.access_token);
        localStorage.setItem('refToken', callback.refresh_token)
  
        this.methodService.getUrlApi(apiProfile, localStorage.getItem('Token'), (result) => {
          if (result != 'Error') {
            console.log(result);
            localStorage.setItem('User', JSON.stringify(result, null, 2));
            // for (var i = 0; i < localStorage.length; i++) {
            //   console.log(JSON.stringify(localStorage.key(i)),null,2);
            //   console.log(JSON.stringify(localStorage.getItem(localStorage.key(i)),null,2));
            // }
            this.menuController.enable(true);
            this.navController.navigateRoot('profile');
          } 
        })
      }
    }, 
    this.params);
  }

  showFingerprintLoad() {
    const urlApi = "oauth/token";
    const apiProfile = "api/user/profile";
    const ref_token = localStorage.getItem('refToken');
    this.params = this.params.set("grant_type", "refresh_token").set("refresh_token", ref_token);
    
    this.fingerAuth.isAvailable().then((result) => {
      this.fingerAuth.loadBiometricSecret({
        description: "Biometric Authentication",
        cancelButtonTitle: 'Cancel',
        disableBackup: true,
      }).then((secret) => {
        console.log(JSON.stringify(secret, null, 2));

        this.methodService.postUrlApi(urlApi, localStorage.getItem('Token'), (callback) => {
          if (callback != 'Error') {
            localStorage.setItem('Token', callback.access_token);
            localStorage.setItem('refToken', callback.refresh_token);
            console.log(JSON.stringify(callback, null, 2));
            this.methodService.presentAlert("Success","Successfully Authenticated!");
      
            this.methodService.getUrlApi(apiProfile, localStorage.getItem('Token'), (result) => {
              if (result != 'Error') {
                console.log(JSON.stringify(result, null, 2));
                localStorage.setItem('User', JSON.stringify(result, null, 2));
                this.menuController.enable(true);
                this.navController.navigateRoot('profile');
              }
            })
          }
        }, 
        this.params);
      }).catch((error) => {
        console.log(JSON.stringify(error, null, 2));
        this.methodService.fingerAlert("Alert", error);
      })
    }).catch((err) => {
      console.log(JSON.stringify(err, null, 2));
      this.methodService.fingerAlert("Alert", err);
    });
  }
}
