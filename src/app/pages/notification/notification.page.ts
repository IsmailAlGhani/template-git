import { Component, OnInit } from '@angular/core';
import { Plugins, LocalNotificationEnabledResult, LocalNotificationActionPerformed, LocalNotification, Device } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(
    private alertCtrl: AlertController
  ) { }

  async ngOnInit() {
    await LocalNotifications.requestPermission();
  }

  async scheduleBasic() {
    await LocalNotifications.schedule({
      notifications: [{
        title: 'Reminder',
        body: 'Hello',
        id: 1,

        // optional
        extra: {
          data: 'Pass data to your handler'
        },
        iconColor: '#0000FF'
      }]
    })
  }

  async scheduleAdvanced() {

  }
 
}
