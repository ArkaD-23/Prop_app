import { Controller, Get } from '@nestjs/common';
import { AuthServiceService } from './auth_service.service';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @Get()
  getHello(): string {
    return this.authServiceService.getHello();
  }
}
