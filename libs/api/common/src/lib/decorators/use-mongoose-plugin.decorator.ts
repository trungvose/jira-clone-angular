import { applyDecorators } from '@nestjs/common';
import { plugin } from '@typegoose/typegoose';
import autoPopulate from 'mongoose-autopopulate';
import leanVirtuals from 'mongoose-lean-virtuals';

export const useMongoosePlugin = () => applyDecorators(plugin(autoPopulate), plugin(leanVirtuals));
