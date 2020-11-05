import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { MethodService } from 'src/app/service/method.service';

@Component({
  selector: 'app-auth-finger-face',
  templateUrl: './auth-finger-face.component.html',
  styleUrls: ['./auth-finger-face.component.scss'],
})
export class AuthFingerFaceComponent implements OnInit {

  constructor(
    private fingerAuth: FingerprintAIO,
    private method: MethodService
    ) { 
  }

  ngOnInit() {}

  activateFingerprint() {
    if (localStorage.getItem("fingerRegist") == "true") {
      this.method.presentAlert("Alert","You have registered");
    } else {
      this.method.presentAlert("Success","Biometric Activate!");
      localStorage.setItem("fingerRegist","true");
      const user = JSON.parse(localStorage.getItem('User'));
      for (const key in user) {
        if (key == 'employee') {
          localStorage.setItem("userId",user[key].employeeId + "");
        }
      }
    }
  }
  
  showFingerprintAuthentication() {

    this.fingerAuth.isAvailable().then((result: any) => {
      console.log(JSON.stringify(result, null, 2));

      this.fingerAuth.show({
        cancelButtonTitle: 'Cancel',
        description: "Some biometric description",
        disableBackup: true,
        title: 'Scanner Title',
        fallbackButtonTitle: 'FB Back Button',
        subtitle: 'This SubTitle'
      })
        .then((result: any) => {
          console.log(JSON.stringify(result, null, 2));
          this.method.presentAlert("Success","Successfully Authenticated! " + result);
        })
        .catch((error: any) => {
          console.log(JSON.stringify(error, null, 2));
          this.method.presentAlert("Error","Cannot Match! " + error.message);
        });
      })
      .catch((error: any) => {
        console.log(JSON.stringify(error, null, 2));
        this.method.presentAlert("Error","Cannot Found! " + error.message);
      });
  }

  showFingerprintRegister() {
    var employeeID;
    const user = JSON.parse(localStorage.getItem('User'));
    for (const key in user) {
      if (key == 'employee') {
        employeeID = user[key].employeeId;
      }
    }

    if (localStorage.getItem("fingerRegist") == "true") {
      this.method.presentAlert("Alert","You have registered");
    } else {
      this.fingerAuth.isAvailable().then((result) => {
        this.fingerAuth.registerBiometricSecret({
          description: "Register Biometric",
          secret: employeeID,
          cancelButtonTitle: 'Cancel',
          invalidateOnEnrollment: true,
          disableBackup: true,
        }).then((success) => {
          console.log(JSON.stringify(success, null, 2));
          this.method.presentAlert("Success","Successfully Register! " + success);
          localStorage.setItem("fingerRegist","true");
          // for (var i = 0; i < localStorage.length; i++) {
          //   console.log(JSON.stringify(localStorage.key(i)),null,2);
          //   console.log(JSON.stringify(localStorage.getItem(localStorage.key(i)),null,2));
          // }
        }).catch((error) => {
          console.log(JSON.stringify(error, null, 2));
          this.method.fingerAlert("Alert", error);
        })
      }).catch((err) => {
        console.log(JSON.stringify(err, null, 2));
        this.method.fingerAlert("Alert",err);
      });
    }
  }
}
