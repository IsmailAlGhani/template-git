import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EncryptionPage } from './encryption.page';

const routes: Routes = [
  {
    path: '',
    component: EncryptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncryptionPageRoutingModule {}
