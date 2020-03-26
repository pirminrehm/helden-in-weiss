export interface Volunteer {
  title: string;
  name: string;
  firstname: string;
  email: string;
  zipcode: number;
  city: string;
  age: number;
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
}

export interface Institution {
  name: string;
  zipcode: number;
  city: string;
  title: string;
  description: string;
  recaptcha: string;
  contact: {
    name: string;
    firstname: string;
    phone: string;
    email: string;
  };
  location?: {
    type: string;
    coordinates: number[];
  };
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
