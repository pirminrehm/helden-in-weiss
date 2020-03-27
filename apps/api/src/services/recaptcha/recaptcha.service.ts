import { Injectable, Logger, HttpService } from '@nestjs/common';
import { post } from 'request';
import { promisify } from 'util';

const [postAsync] = [post].map(promisify);

@Injectable()
export class RecaptchaService {
  constructor(private readonly httpservice: HttpService) {}

  private secretKey = process.env.RECAPTCHA_KEY;

  public async validate(token: string) {
    if (token === null || token === undefined) {
      Logger.error('token empty');
      return { success: false, message: 'Token is empty or invalid' };
    }

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${this.secretKey}&response=${token}`;
    // user-ip
    //&remoteip=${req.connection.remoteAddress}`

    try {
      const response = await this.httpservice.get(url).toPromise();
      if (response.status !== 200 || response.data['error-codes']?.length) {
        Logger.warn(response.status);
        Logger.warn(response.data);
        return { success: false, message: 'Invalide reCAPTCHA' };
      }
      return { success: response.data.success };
    } catch (error) {
      Logger.error(error);
      return { success: false, message: 'Cannot validate reCAPTCHA' };
    }
  }
}
