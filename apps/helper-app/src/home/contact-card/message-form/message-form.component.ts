import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { customErrorCodes } from '@wir-vs-virus/api-interfaces';
import { RecaptchaComponent } from 'ng-recaptcha';
import { first } from 'rxjs/operators';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'wir-vs-virus-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {
  sendMessageForm = new FormGroup({
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000)
    ]),
    recaptcha: new FormControl(null, [Validators.required]),
  });

  @ViewChild(RecaptchaComponent)
  captchaRef: RecaptchaComponent;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.sendMessageForm.get('recaptcha').markAllAsTouched();
    console.log(this.sendMessageForm.value);
    const val = this.sendMessageForm.value;

    if (!this.sendMessageForm.valid) {
      return;
    }

    const data = {
      message: val.message,
      recaptcha: val.recaptcha,
    };

    this.messageService
      .send(data)
      .pipe(first())
      .subscribe(
        res => {
          console.log(res);
          // this.router.navigate(['/register-institution/success']);
        },
        err => {
          console.error(err.error.message);
          this.captchaRef.reset();

          switch (err.error.message) {
            case customErrorCodes.CAPTCHA_NOT_FOUND:
              break;

            default:
              alert('Etwas ist schief gelaufen, versuchs später nochmal.');
              break;
          }
        }
      );
  }
}
