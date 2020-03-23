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
  async getAllVolunteers(): Promise<Volunteer[]> {
    return this.volunteerModel.find().exec();
  }

  getVolunteers(searchTerm: string, searchPLZ: string): Promise<Volunteer[]> {
    const query: any = {
      $and: [
        {
          $or: [
            { title: new RegExp(searchTerm, 'i') },
            { description: new RegExp(searchTerm, 'i') }
          ]
        }
      ]
    };
    if (searchPLZ) {
      query.$and.push({ zipcode: Number(searchPLZ) || undefined });
    }
    return this.volunteerModel.find(query);
  }

  async getLatestsVolunteers(): Promise<Volunteer[]> {
    return this.volunteerModel
      .find()
      .limit(10)
      .exec();
  }

  async getAllVolunteersWithinRadius(
    coordinates: number[],
    radius: number
  ): Promise<Volunteer[]> {
    const radiusNormalized: number = radius / 6371;
    return this.volunteerModel
      .find({
        location: {
          $geoWithin: { $centerSphere: [coordinates, radiusNormalized] }
        }
      })
      .exec();
  }

  async getAllVolunteersByZipCode(zipcode: number): Promise<Volunteer[]> {
    return this.volunteerModel.find({ zipcode: zipcode }).exec();
  }

  async getAllInstitutions(): Promise<Institution[]> {
    return this.institutionModel.find().exec();
  }

  async getInstitutions(
    searchTerm: string,
    searchPLZ: number
  ): Promise<Institution[]> {
    const query: any = {
      $and: [
        {
          $or: [
            { name: new RegExp(searchTerm, 'i') },
            { description: new RegExp(searchTerm, 'i') }
          ]
        }
      ]
    };
    if (searchPLZ) {
      query.$and.push({ zipcode: Number(searchPLZ) || undefined });
    }
    return this.institutionModel.find(query).exec();
  }

  async getAllInstitutionsByZipCode(zipcode: number): Promise<Institution[]> {
    return this.institutionModel.find({ zipcode: zipcode }).exec();
  }

  getAllInstitutionsWithinRadius(
    coordinates: number[],
    radius: number
  ): Promise<Institution[]> {
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
