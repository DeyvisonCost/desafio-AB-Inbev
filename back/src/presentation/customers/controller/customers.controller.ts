import { BadRequestException, Body, ConflictException, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { CurrentUser } from 'src/infra/auth/current-user-decorator';
import { FetchCustomersUseCase } from 'src/domain/usecases/customers/fetch-customers';
import { CustomerNotFoundError } from 'src/domain/errors';


@Controller('customers')
export class FetchCustomersController {
  constructor(private fetchCustomersUseCase: FetchCustomersUseCase) {}

  @Get()
  async create(
    @CurrentUser() user: UserPayload 
  ) {

    const result = await this.fetchCustomersUseCase.execute();

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case CustomerNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
    
    return result.value
  }
}