import { Injectable } from '@nestjs/common';
import { Volunteer, Institution } from '@wir-vs-virus/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseService {

  constructor(@InjectModel('Volunteer') private volunteerModel: Model<Volunteer>, @InjectModel('Institution') private institutionModel: Model<Institution>) {}
  async getAllVolunteers(): Promise<[Volunteer]> {
    return this.volunteerModel.find().exec();
  }

  async getAllInstitutions(): Promise<[Institution]> {
    return this.institutionModel.find().exec();
  }

  async getAllInstitutionsByZipCode(zipcode: Number): Promise<[Institution]> {
    return this.institutionModel.find({ zipcode: zipcode }).exec();
  }

  async saveVolunteer(volunteer: Volunteer): Promise<Volunteer> {
    const createdVolunteer = new this.volunteerModel(volunteer);
    return createdVolunteer.save();
  }
  
  async saveInstitution(institution: Institution): Promise<Institution> {
    const createdInstitution = new this.institutionModel(institution);
    return createdInstitution.save();
  }
}
