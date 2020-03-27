import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactMessage, customErrorCodes } from '@wir-vs-virus/api-interfaces';
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
    recaptcha: new FormControl(null, [Validators.required])
  });

  @Input()
  data: any;

  @ViewChild(RecaptchaComponent)
  captchaRef: RecaptchaComponent;

  @Output() sendMessage = new EventEmitter();

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.sendMessageForm.get('recaptcha').markAllAsTouched();
    console.log(this.sendMessageForm.value);
    const val = this.sendMessageForm.value;

    console.log(this.data);

    if (!this.sendMessageForm.valid) {
      return;
    }

    // check whether the data object is a volunteer or institution
    const isVolunteer = this.data.hasOwnProperty('qualification');

    const contactMessage: ContactMessage = {
      recieverId: this.data.publicUuid,
      message: val.message,
      recaptcha: val.recaptcha,
      senderEmailAddr: 'jon.doe@test.de'
    };

    this.messageService
      .send(contactMessage, isVolunteer)
      .pipe(first())
      .subscribe(
        res => {
          console.log(res);
          this.sendMessage.emit();
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
