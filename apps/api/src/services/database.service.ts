import { Injectable, Logger } from '@nestjs/common';
import { Institution } from '@wir-vs-virus/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel('Institution') private institutionModel: Model<Institution>
  ) {}

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

  async saveInstitution(institution: Institution): Promise<Institution> {
    const createdInstitution = new this.institutionModel(institution);
    return createdInstitution.save();
  }
}
