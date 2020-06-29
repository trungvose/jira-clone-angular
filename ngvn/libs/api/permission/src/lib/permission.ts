import { prop } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { Privilege } from './privilege';

export class Permission {
  @prop({ required: true, index: true, text: true })
  @AutoMap()
  group: string;
  @prop({
    required: true,
    min: 0,
    max: Privilege.Read | Privilege.Create | Privilege.Update | Privilege.Delete,
  })
  @AutoMap()
  score: number;
}
