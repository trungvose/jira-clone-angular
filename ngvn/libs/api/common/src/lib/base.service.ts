import { BaseModel } from '@ngvn/api/common';
import { DocumentType } from '@typegoose/typegoose';
import { CreateQuery } from 'mongoose';
import { BaseRepository } from './base.repository';

export abstract class BaseService<TModel extends BaseModel> {
  protected repository: BaseRepository<TModel>;

  protected constructor(repository: BaseRepository<TModel>) {
    this.repository = repository;
  }

  createModel(doc?: Partial<TModel>): TModel {
    return this.repository.createModel(doc);
  }

  async create(item: CreateQuery<TModel>): Promise<DocumentType<TModel>> {
    return await this.repository.create(item);
  }
}
