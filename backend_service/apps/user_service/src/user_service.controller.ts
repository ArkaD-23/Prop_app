import { Controller, Get } from '@nestjs/common';
import { UserServiceService } from './user_service.service';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Get()
  getHello(): string {
    return this.userServiceService.getHello();
  }
}
