import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { TasksModule } from './tasks/tasks.module'
import { ProcessesModule } from './processes/processes.module'
// import { ActivitiesModule } from './activities/activities.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECTION, {
      dbName: process.env.DB_NAME,
    }),
    UsersModule,
    AuthModule,
    TasksModule,
    ProcessesModule,
    // ActivitiesModule,
  ],
})
export class AppModule {}
