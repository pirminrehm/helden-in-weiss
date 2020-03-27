// model must eqaul schema
// returned by DB
export interface InstitutionModel {
  privateUuid: string;
  publicUuid: string;
  name: string;
  zipcode: number;
  city: string;
  description: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  privacyAccepted: boolean;
  location: {
    type: string;
    coordinates: number[];
  };
  registeredAt?: Date; // default set by mongoose
  active?: boolean; // default set by mongoose
}
