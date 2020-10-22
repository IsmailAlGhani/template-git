import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
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

  constructor(
    private methodService: MethodService, 
    private navController: NavController, 
    private menuController: MenuController
  ) {
    localStorage.setItem('Auth', environment.auth);
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
      if (callback !== "ERROR") {
        localStorage.setItem('Token', callback.access_token);
  
        this.methodService.getUrlApi(apiProfile, localStorage.getItem('Token'), (result) => {
          console.log(result);
          localStorage.setItem('User', result);
          this.menuController.enable(true);
          this.navController.navigateForward('profile');
        })
      }
    }, 
    this.params);
  }
}
