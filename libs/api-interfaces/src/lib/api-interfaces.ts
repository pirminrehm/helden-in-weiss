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
  qualification: string;
  active?: Boolean;
  registeredAt?: string;
}

export interface Institution {
  name: string;
  zipcode: number;
  city: string;
  title: string;
  description: string;
  contact: {
    name: string;
    firstname: string;
    phone: string;
    email: string;
  };
  location?: {
    type: string;
    coordinates: [number];
  };
}
