import { HttpService, Response, Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
  constructor(private readonly httpservice: HttpService) {}
  
  async getCoordinatesFromZipcode(zipcode: number): Promise<[number]> {
    const url = 'https://public.opendatasoft.com/api/records/1.0/search//?dataset=postleitzahlen-deutschland&q=plz%3D' + zipcode;
    const response = await this.httpservice.get(url).toPromise();
    return response.data.records[0].geometry.coordinates;
  }
}
