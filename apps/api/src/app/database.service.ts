import { Injectable } from '@nestjs/common';
import { Helper } from '@wir-vs-virus/api-interfaces';

@Injectable()
export class DatabaseService {

private listOfHelpers: [Helper] = [{
  name: 'Peter Pan',
  email: 'peter.pan@example.com',
  plz: 70569
}];

  async getHelpers(): Promise<[Helper]> {
    return this.listOfHelpers;
  }

  async saveHelper(helper: Helper): Promise<boolean> {
    // magic to save helper
    this.listOfHelpers.push(helper)
    const success = true;
    return success;
  }
}

