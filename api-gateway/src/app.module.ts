import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.modules';
import { OrdersModule } from './orders/orders.modules';

@Module({
    imports: [UsersModule, OrdersModule],
})
export class AppModule {}