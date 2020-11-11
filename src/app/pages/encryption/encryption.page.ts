import {Component, OnInit } from '@angular/core';
import { MethodService } from 'src/app/service/method.service';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.page.html',
  styleUrls: ['./encryption.page.scss'],
})
export class EncryptionPage implements OnInit {
  formEncrypt = {
    textToEncrypt: '',
    textEncrypted: ''
  };

  formDecrypt = {
    textToDecrypt: '',
    textDecrypted: ''
  }

  constructor(
    private methodService: MethodService
  ) {}

  ngOnInit() {}

  doEncrypt(textToEncrypt: string) {
    this.formEncrypt.textEncrypted = this.methodService.encrypt(textToEncrypt);
    this.formDecrypt.textToDecrypt = this.formEncrypt.textEncrypted;
  }

  doDecrypt(textToDecrypt: string) {
    this.formDecrypt.textDecrypted = this.methodService.decrypt(textToDecrypt);
  }
}
