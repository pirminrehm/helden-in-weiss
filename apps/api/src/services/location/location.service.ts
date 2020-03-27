import { Injectable, Logger } from '@nestjs/common';
import { customErrorCodes } from '@wir-vs-virus/api-interfaces';

import { Location } from './location.interface';
import { zipcodeInfos } from './zipcodes-germany';

@Injectable()
export class LocationService {
  constructor() {}

  private zipInfoMap: string[] = zipcodeInfos.map(zi => zi.fields.plz);

  async getLocationInfoByZipcode(zipcode: number): Promise<Location> {
    const zipInfoIndex = this.zipInfoMap.indexOf(zipcode.toString());

    if (zipInfoIndex === -1) {
      Logger.log('Zipcode not found: ' + zipcode);
      throw Error(customErrorCodes.ZIP_NOT_FOUND);
    }
    return {
      coordinates: zipcodeInfos[zipInfoIndex].geometry.coordinates,
      city: zipcodeInfos[zipInfoIndex].fields.note
    };
  }
}
