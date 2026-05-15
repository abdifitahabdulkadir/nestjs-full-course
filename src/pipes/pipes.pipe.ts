import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import z, { ZodError, ZodType } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown) {
    try {
      const parsed = this.schema.parse(value);
      return parsed;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: z.treeifyError(error),
          errors: error.issues,
        });
      }
      throw new BadRequestException('Validation failed');
    }
  }
}
