import { ApiOperation, ApiOperationOptions } from '@nestjs/swagger';

export const ApiOperationId = (options?: ApiOperationOptions) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const controllerName = target.constructor.name;
    const operationId = `${controllerName.substr(0, controllerName.indexOf('Controller'))}_${propertyKey}`;

    ApiOperation({
      ...options,
      operationId,
    })(target, propertyKey, descriptor);
  };
};
