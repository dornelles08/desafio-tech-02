import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { envSchema } from "./infra/env/env";
import { EnvModule } from "./infra/env/env.module";
import { HttpModule } from "./infra/http/http.module";
import { LoggingInterceptor } from "./infra/interceptors/logger.interceptor";
import { LoggerService } from "./infra/logger/logger.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModule,
    EnvModule,
  ],
  controllers: [],
  providers: [
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
