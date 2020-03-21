export interface Volunteer {
  title: String,
  name: String,
  firstname: String,
  email: String,
  zipcode: Number,
  city: String,
  age: Number,
  phone: String,
  description: String,
  qualification: String,
  active?: Boolean,
  registeredAt?: Date
}

export interface Institution {
  name: String,
  zipcode: Number,
  city: String,
  title: String,
  description: String,
  contact: {
    name: String,
    firstname: String,
    phone: String,
    email: String,
  }
}
