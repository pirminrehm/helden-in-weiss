export interface Volunteer {
  name: string;
  email: string;
  zipcode: number;
  city: string;
  phone: string;
  description: string;
  qualification: string[];
  location?: {
    type: string;
    coordinates: number[];
  };
  active?: Boolean;
  registeredAt?: string;
  recaptcha: string;
  privacyAccepted: boolean;
}

export interface Institution {
  name: string;
  zipcode: number;
  city?: string;
  description: string;
  recaptcha: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  location?: {
    type: string;
    coordinates: number[];
  };
  privacyAccepted: boolean;
}

export interface ContactMessage {
  recieverId: string;
  senderEmailAddr: string;
  message: string;
}

export const customErrorCodes = {
  ZIP_NOT_FOUND: 'ZIP_NOT_FOUND',
  CAPTCHA_NOT_FOUND: 'CAPTCHA_NOT_FOUND'
};
