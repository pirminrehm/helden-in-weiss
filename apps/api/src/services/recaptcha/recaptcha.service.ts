import { Injectable, Logger } from '@nestjs/common';
import { post } from 'request';
import { promisify } from 'util';

const [postAsync] = [post].map(promisify);

@Injectable()
export class RecaptchaService {
  constructor() {}

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
      const { statusCode, body } = await postAsync(url, null);
      const parsedBody = JSON.parse(body);
      if (statusCode !== 200 || parsedBody['error-codes']?.length) {
        Logger.warn(statusCode);
        Logger.warn(parsedBody);
        return { success: false, message: 'Invalide reCAPTCHA' };
      }
      return { success: parsedBody.success };
    } catch (error) {
      Logger.error(error);
      return { success: false, message: 'Cannot validate reCAPTCHA' };
    }
  }
}
