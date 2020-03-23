import { HttpService, Injectable } from '@nestjs/common';
import { customErrorCodes } from '@wir-vs-virus/api-interfaces';

import { Location } from './location.interface';

@Injectable()
export class LocationService {
  constructor(private readonly httpservice: HttpService) {}

  async getLocationInfoByZipcode(zipcode: number): Promise<Location> {
    const url =
      'https://public.opendatasoft.com/api/records/1.0/search//?dataset=postleitzahlen-deutschland&q=plz%3D' +
      zipcode;
    const response = await this.httpservice.get(url).toPromise();
    console.log('Zip code:', zipcode);
    console.log('Zip code res');
    console.log(response.data.records);

    if (response.data.records.length === 0) {
      throw Error(customErrorCodes.ZIP_NOT_FOUND);
    }
    return {
      coordinates: response.data.records[0].geometry.coordinates,
      city: response.data.records[0].fields.note
    };
  }
}
