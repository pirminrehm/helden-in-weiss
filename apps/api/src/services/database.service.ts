import { Injectable } from '@nestjs/common';
import { Volunteer, Institution } from '@wir-vs-virus/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel('Volunteer') private volunteerModel: Model<Volunteer>,
    @InjectModel('Institution') private institutionModel: Model<Institution>
  ) {}
  async getAllVolunteers(): Promise<[Volunteer]> {
    return this.volunteerModel.find().exec();
  }

  async getLatestsVolunteers(): Promise<[Volunteer]> {
    return this.volunteerModel
      .find()
      .limit(10)
      .exec();
  }

  async getAllInstitutions(): Promise<[Institution]> {
    return this.institutionModel.find().exec();
  }

  async getAllInstitutionsByZipCode(zipcode: number): Promise<[Institution]> {
    return this.institutionModel.find({ zipcode: zipcode }).exec();
  }

  getAllInstitutionsWithinRadius(
    coordinates: [number],
    radius: number
  ): Promise<[Institution]> {
    const radiusNormalized: number = radius / 6371;
    return this.institutionModel
      .find({
        location: {
          $geoWithin: { $centerSphere: [coordinates, radiusNormalized] }
        }
      })
      .exec();
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
