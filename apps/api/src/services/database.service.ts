import { Injectable } from '@nestjs/common';
import { Volunteer } from '@wir-vs-virus/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel('Volunteer') private volunteerModel: Model<Volunteer>) {}
  async getVolunteers(): Promise<[Volunteer]> {
    return this.volunteerModel.find().exec();
  }

  async saveVolunteer(volunteer: Volunteer): Promise<Volunteer> {
    const createdVolunteer = new this.volunteerModel(volunteer);
    return createdVolunteer.save();
  }
}
