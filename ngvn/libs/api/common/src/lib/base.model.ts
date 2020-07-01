import { Field, ObjectType } from '@nestjs/graphql';
import { ModelDefinition } from '@nestjs/mongoose';
import { buildSchema, modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { AutoMap } from 'nestjsx-automapper';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class BaseModel {
  protected static _schema: Schema;

  @prop()
  @AutoMap()
  createdAt?: Date;
  @prop()
  @AutoMap()
  updatedAt?: Date;
  @prop({ required: true, default: true, index: true })
  @AutoMap()
  isActive: boolean;
  @AutoMap()
  id?: string;

  static get schema(): Schema {
    if (this._schema) {
      return this._schema;
    }
    return (this._schema = buildSchema(this, {
      timestamps: true,
      toJSON: {
        getters: true,
        virtuals: true,
      },
      id: true,
    }));
  }

  static get modelName(): string {
    return this.name;
  }

  static get featureConfig(): ModelDefinition {
    return { name: this.modelName, schema: this.schema };
  }
}

@ObjectType({ isAbstract: true })
export abstract class BaseDto {
  @Field()
  @AutoMap()
  createdAt?: Date;

  @Field()
  @AutoMap()
  updatedAt?: Date;

  @Field({ nullable: true })
  @AutoMap()
  id?: string;

  @Field()
  @AutoMap()
  isActive: boolean;
}
