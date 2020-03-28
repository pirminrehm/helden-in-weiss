/**
 * @deprecated use GetVolunteer, PostVolunteer or VolunteerModel instead
 */
export interface Volunteer {
  privateUuid?: string;
  publicUuid?: string;
  title: string;
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
  active?: boolean;
  registeredAt?: string;
  recaptcha: string;
  privacyAccepted: boolean;
}

export interface GetVolunteer {
  publicUuid: string;
  zipcode: number;
  city: string;
  description: string;
  qualification: string[];
  registeredAt: string;
}

export interface PostVolunteer {
  name: string;
  email: string;
  zipcode: number;
  phone: string;
  description: string;
  qualification: string[];
  privacyAccepted: boolean;
  recaptcha: string;
}

/**
 * @deprecated use GetInstitution, PostInstitution or InstitutionModel instead
 */
export interface Institution {
  privateUuid?: string;
  publicUuid?: string;
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
  active?: Boolean;
  registeredAt?: string;
  privacyAccepted: boolean;
}

export interface PostInstitution {
  name: string;
  zipcode: number;
  description: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  privacyAccepted: boolean;
  recaptcha: string;
}

export interface GetInstitution {
  publicUuid: string;
  name: string;
  zipcode: number;
  city: string;
  description: string;
  registeredAt: string;
}

export interface ContactMessage {
  recieverId: string;
  senderEmailAddr: string;
  message: string;
  recaptcha: string;
}

export const customErrorCodes = {
  ZIP_NOT_FOUND: 'ZIP_NOT_FOUND',
  CONTACT_NOT_FOUND: 'CONTACT_NOT_FOUND',
  HTML_NOT_ALLOWED: 'HTML_NOT_ALLOWED',
  CAPTCHA_NOT_FOUND: 'CAPTCHA_NOT_FOUND'
};
