import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  PostContactMessage,
  customErrorCodes
} from '@wir-vs-virus/api-interfaces';
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
    senderEmailAddr: new FormControl(
      sessionStorage?.getItem('heldeninweiss.senderEmailAddr') || '',
      [Validators.required, Validators.email, Validators.maxLength(70)]
    ),
    recaptcha: new FormControl(null, [Validators.required])
  });

  @Input()
  data: any;

  @ViewChild(RecaptchaComponent)
  captchaRef: RecaptchaComponent;

  @Output() sendMessage = new EventEmitter();
  sendingMessage = false;

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

    const contactMessage: PostContactMessage = {
      recieverId: this.data.publicUuid,
      message: val.message,
      recaptcha: val.recaptcha,
      senderEmailAddr: val.senderEmailAddr
    };

    this.sendingMessage = true;
    this.messageService
      .send(contactMessage, this.isVolunteer())
      .pipe(first())
      .subscribe(
        res => {
          console.log(res);
          this.sendMessage.emit();

          // store current email address in session storage
          sessionStorage.setItem(
            'heldeninweiss.senderEmailAddr',
            val.senderEmailAddr
          );
        },
        err => {
          console.error(err.error.message);
          this.captchaRef.reset();
          this.sendingMessage = false;

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

  /**
   * check whether the data object is a volunteer or institution
   */
  isVolunteer() {
    return this.data.hasOwnProperty('qualification');
  }
}
