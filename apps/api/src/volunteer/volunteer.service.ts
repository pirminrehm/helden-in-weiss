import { Injectable, Logger } from '@nestjs/common';
import { GetVolunteer } from '@wir-vs-virus/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VolunteerModel } from '../volunteer/volunteer.model';
import { LocationInfo } from '../services/location/location.interface';

@Injectable()
export class VolunteerService {
  constructor(
    @InjectModel('Volunteer') private volunteerModel: Model<VolunteerModel>
  ) {}

  private maxReturnDocuments = process.env.MAX_RETURN_DOCS || 100;

  async getVolunteers(
    zipcode: number,
    locatinData: LocationInfo,
    radius: number,
    searchTerm: string
  ): Promise<VolunteerModel[]> {
    const radiusNormalized: number = radius / 6371;
    const searchTermCleaned = searchTerm?.replace(/[ \t]+$/, '');

    const query: any = {
      $and: [{ active: true }]
    };
    if (zipcode && radius && locatinData?.coordinates) {
      query.$and.push({
        location: {
          $geoWithin: {
            $centerSphere: [locatinData.coordinates, radiusNormalized]
          }
        }
      });
    }

    if (zipcode && !radius) {
      query.$and.push({ zipcode: Number(zipcode) || undefined });
    }

    if (searchTerm) {
      query.$and.push({
        $or: [
          { city: new RegExp(searchTermCleaned, 'i') },
          { qualification: new RegExp(searchTermCleaned, 'i') },
          { description: new RegExp(searchTermCleaned, 'i') }
        ]
      });
    }

    return this.volunteerModel
      .find(query)
      .sort({ registeredAt: -1 })
      .limit(this.maxReturnDocuments)
      .exec();
  }

  async getVolunteerByPublicUuid(publicUuid: string): Promise<VolunteerModel> {
    return this.volunteerModel.findOne({ publicUuid: publicUuid });
  }

  async saveVolunteer(volunteer: VolunteerModel): Promise<VolunteerModel> {
    const createdVolunteer = new this.volunteerModel(volunteer);
    return createdVolunteer.save();
  }

  mapModelToInterfaceArary(volunteers: VolunteerModel[]): GetVolunteer[] {
    return volunteers.map(v => this.mapModelToInterface(v));
  }

  mapModelToInterface(volunteer: VolunteerModel): GetVolunteer {
    return {
      city: volunteer.city,
      description: volunteer.description,
      publicUuid: volunteer.publicUuid,
      qualification: volunteer.qualification,
      zipcode: volunteer.zipcode,
      registeredAt: volunteer.registeredAt.toISOString()
    };
  }
}
