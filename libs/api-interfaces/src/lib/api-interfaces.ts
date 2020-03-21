export interface Volunteer {
  name: String;
  firstname: String;
  email: String;
  zipcode: Number;
  city: String;
  age: Number;
  phone: String;
  description: String;
}
export interface Institution {
  name: String;
  zipcode: Number;
  city: String;
  description: String;
  contact: {
    name: String;
    firstname: String;
    phone: String;
    email: String;
  };
}
