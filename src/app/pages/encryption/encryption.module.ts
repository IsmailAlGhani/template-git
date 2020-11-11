import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncryptionPageRoutingModule } from './encryption-routing.module';

import { EncryptionPage } from './encryption.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncryptionPageRoutingModule
  ],
  declarations: [EncryptionPage]
})
export class EncryptionPageModule {}
