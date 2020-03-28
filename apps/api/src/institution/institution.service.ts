import { Injectable } from '@nestjs/common';
import { GetInstitution } from '@wir-vs-virus/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InstitutionModel } from './institution.model';
import { LocationInfo } from '../services/location/location.interface';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectModel('Institution')
    private institutionModel: Model<InstitutionModel>
  ) {}

  private maxReturnDocuments = process.env.MAX_RETURN_DOCS || 100;

  async getInstitutions(
    zipcode: number,
    locatinData: LocationInfo,
    radius: number,
    searchTerm: string
  ): Promise<InstitutionModel[]> {
    const radiusNormalized: number = radius / 6371;
    const searchTermCleaned = searchTerm?.replace(/[ \t]+$/, '');
    const searchTermRegExp = new RegExp(searchTermCleaned, 'i');

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
          { city: searchTermRegExp },
          { name: searchTermRegExp },
          { description: searchTermRegExp }
        ]
      });
    }

    return this.institutionModel
      .find(query)
      .sort({ registeredAt: -1 })
      .limit(this.maxReturnDocuments)
      .exec();
  }

  async getInstitutionByPublicUuid(
    publicUuid: string
  ): Promise<InstitutionModel> {
    return this.institutionModel.findOne({ publicUuid: publicUuid });
  }

  async saveInstitution(
    institution: InstitutionModel
  ): Promise<InstitutionModel> {
    const createdInstitution = new this.institutionModel(institution);
    return createdInstitution.save();
  }

  mapModelToInterfaceArary(institutions: InstitutionModel[]): GetInstitution[] {
    return institutions.map(i => this.mapModelToInterface(i));
  }

  mapModelToInterface(institution: InstitutionModel): GetInstitution {
    return {
      city: institution.city,
      description: institution.description,
      publicUuid: institution.publicUuid,
      zipcode: institution.zipcode,
      name: institution.name,
      registeredAt: institution.registeredAt.toISOString()
    };
  }
}
