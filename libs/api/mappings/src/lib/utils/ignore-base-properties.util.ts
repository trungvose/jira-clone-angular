import { CreateMapFluentFunction } from '@nartc/automapper';
import { BaseDto, BaseModel } from '@ngvn/api/common';
import { ignore } from 'nestjsx-automapper';

export function ignoreBaseProperties(createMapFluentFunction: CreateMapFluentFunction): CreateMapFluentFunction {
  (createMapFluentFunction as CreateMapFluentFunction<BaseModel, BaseDto>)
    .forMember((s) => s.createdAt, ignore())
    .forMember((s) => s.updatedAt, ignore())
    .forMember((s) => s.id, ignore())
    .forMember((s) => s.isActive, ignore());
  return createMapFluentFunction;
}
