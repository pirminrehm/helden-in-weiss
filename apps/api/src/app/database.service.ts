import { Injectable } from '@nestjs/common';
import { Helper } from '@wir-vs-virus/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel('Helper') private helperModel: Model<Helper>) {}

  private listOfHelpers: [Helper] = [{
    name: 'Peter Pan',
    email: 'peter.pan@example.com',
    plz: 70569
  }];

  async getHelpers(): Promise<[Helper]> {
    return this.helperModel.find().exec();
  }

  async saveHelper(helper: Helper): Promise<Helper> {
    // save helper does not work yet?!?
    // -> use this mock
    helper = this.listOfHelpers[0];
    const helperName = 'Peter Pan __' + Math.round(Math.random()*100);
    helper.name = helperName;
    const createdHelper = new this.helperModel(helper);
    return createdHelper.save();
  }
}

