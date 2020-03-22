import { HttpService, Response, Injectable } from '@nestjs/common';
import { customErrorCodes } from '@wir-vs-virus/api-interfaces';

@Injectable()
export class LocationService {
  constructor(private readonly httpservice: HttpService) {}

  async getCoordinatesFromZipcode(zipcode: number): Promise<[number]> {
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
    return response.data.records[0].geometry.coordinates;
  }
}
