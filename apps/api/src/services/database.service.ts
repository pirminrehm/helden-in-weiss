import { Injectable } from '@nestjs/common';
import { Volunteer } from '@wir-vs-virus/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel('Volunteer') private volunteerModel: Model<Volunteer>) {}

  // private listOfVolunteers: [Volunteer] = [{
  //   name: 'Peter Pan',
  //   email: 'peter.pan@example.com',
  //   plz: 70569
  // }];

  async getVolunteers(): Promise<[Volunteer]> {
    return this.volunteerModel.find().exec();
  }

  async saveVolunteer(volunteer: Volunteer): Promise<Volunteer> {
    // save volunteer does not work yet?!?
    // -> use this mock
    // volunteer = this.listOfVolunteers[0];
    // const volunteerName = 'Peter Pan __' + Math.round(Math.random()*100);
    // volunteer.name = volunteerName;
    const createdVolunteer = new this.volunteerModel(volunteer);
    return createdVolunteer.save();
  }
}

