import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Workers } from './workers/models/workers.model';
import { WorkersModule } from './workers/workers.module';
import { Branches } from './branches/schemas/branch.schema';
import { BranchesModule } from './branches/branches.module';
import { Order } from './orders/schemas/order.schema';
import { OrdersModule } from './orders/orders.module';
import { Users } from './users/schemas/user.schema';
import { UsersModule } from './users/users.module';
import { Cards } from './cards/schemas/card.schema';
import { CardsModule } from './cards/cards.module';
import { Payment } from './payments/schemas/payment.schema';
import { PaymentsModule } from './payments/payments.module';
import { Reviews } from './reviews/schemas/review.schema';
import { ReviewsModule } from './reviews/reviews.module';
import { Room } from './rooms/schemas/room.schema';
import { RoomsModule } from './rooms/rooms.module';
import { Tables } from './tables/schemas/table.schema';
import { TablesModule } from './tables/tables.module';
import { OrderMeal } from './order_meals/schemas/order_meal.schema';
import { OrderMealsModule } from './order_meals/order_meals.module';
import { Meal } from './meals/schemas/meal.schema';
import { MealsModule } from './meals/meals.module';
import { Category } from './category/schemas/category.schema';
import { CategoryModule } from './category/category.module';
import { Menu } from './menu/schemas/menu.schema';
import { MenuModule } from './menu/menu.module';
import { OrderTable } from './order_table/schemas/order_table.schema';
import { OrderTableModule } from './order_table/order_table.module';
import { Roles } from './roles/schemas/role.schema';
import { RolesModule } from './roles/roles.module';
import { WorkersRoles } from './workers/models/workers-roles.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Workers, Branches, Order, Roles,Meal, WorkersRoles, Users,OrderTable, Cards, Payment, Reviews, Room, Tables, OrderMeal, Category, Menu],
      autoLoadModels: true,
      sync: { alter: true }, // force
      logging: false,
    }),
    WorkersModule,
    OrderMealsModule,
    RolesModule,
    AuthModule,
    OrderTableModule,
    CategoryModule,
    MealsModule,
    BranchesModule,
    OrdersModule,
    UsersModule,
    CardsModule,
    MenuModule,
    PaymentsModule,
    ReviewsModule,
    RoomsModule,
    TablesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
