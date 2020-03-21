export interface Volunteer {
  title: String,
  name: String,
  firstname: String,
  email: String,
  zipcode: number,
  city: String,
  age: number,
  phone: String,
  description: String,
  qualification: String,
  active?: Boolean,
  registeredAt?: Date
}

export interface Institution {
  name: String,
  zipcode: number,
  city: String,
  title: String,
  description: String,
  contact: {
    name: String,
    firstname: String,
    phone: String,
    email: String,
  },
  location?: {
    type: String,
    coordinates: [number]
  }
}
