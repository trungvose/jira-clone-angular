import { modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

export enum ProjectLaneConditionOperand {
  Eq = 'eq',
  Neq = 'neq',
  Gt = 'gt',
  Gte = 'gte',
  Lt = 'lt',
  Lte = 'lte',
  Ne = 'ne', // not exist aka null/undefined
}

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class ProjectLaneCondition {
  @prop({ required: true })
  issueField: string;
  @prop({ required: true, type: Schema.Types.Mixed })
  value: unknown;
  @prop({ enum: ProjectLaneConditionOperand, required: true })
  operand: ProjectLaneConditionOperand;
}
