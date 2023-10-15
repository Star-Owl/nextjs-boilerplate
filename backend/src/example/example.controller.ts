import { Controller, Get } from '@nestjs/common';

@Controller('example')
export class ExampleController {
    @Get('data')
    getData() {
        return {
            message: 'Hello from NestJS backend!',
            data: {
                exampleKey: 'exampleValue',
            },
        };
    }
}
