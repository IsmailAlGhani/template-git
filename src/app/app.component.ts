import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'My Profile',
      url: 'profile',
      icon: 'person'
    },
    {
      title: 'Self Services',
      url: 'selfservice',
      icon: 'create'
    },
    {
      title: 'My Request',
      url: 'myrequest',
      icon: 'file-tray'
    },
    {
      title: 'Check In / Out',
      url: 'checkinout',
      icon: 'checkmark-circle'
    },
    {
      title: 'Timesheet',
      url: 'timesheet',
      icon: 'time'
    },
    {
      title: 'HR Library',
      url: 'hrlibrary',
      icon: 'bookmarks'
    },
    {
      title: 'Settings',
      url: 'settings',
      icon: 'settings'
    },
    {
      title: 'Log Out',
      url: 'logout',
      icon: 'log-out'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  logout() {
    if(typeof(Storage) !== 'undefined'){
      if(localStorage.getItem('Token') !== null)
      {
        this.menuCtrl.enable(false);
        localStorage.removeItem('User');
        localStorage.removeItem('Token');
      }
    }
    this.router.navigate(['/'])
  }
}
