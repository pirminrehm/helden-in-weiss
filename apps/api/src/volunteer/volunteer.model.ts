// model must eqaul schema
// returned by DB
export interface VolunteerModel {
  privateUuid: string;
  publicUuid: string;
  name: string;
  email: string;
  zipcode: number;
  city: string;
  phone: string;
  description: string;
  qualification: string[];
  privacyAccepted: boolean;
  location: {
    type: string;
    coordinates: number[];
  };
  registeredAt?: Date; // default set by mongoose
  active?: boolean; // default set by mongoose
}
