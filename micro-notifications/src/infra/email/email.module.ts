//app.module.ts
import { EmailService } from "@/domain/application/email/email";
import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { EnvModule } from "../env/env.module";
import { EnvService } from "../env/env.service";
import { NodemailerService } from "./email.service";

@Module({
  imports: [
    EnvModule,
    MailerModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (env: EnvService) => ({
        transport: {
          pool: true,
          host: env.get("EMAIL_HOST"),
          port: Number(env.get("EMAIL_PORT")),
          secure: env.get("EMAIL_SECURE") === "true",
          auth: {
            user: env.get("EMAIL_USER"),
            pass: env.get("EMAIL_PASSWORD"),
          },
        },
        defaults: {
          from: '"Felipe Dornelles" <f.dornelles@desafio.tech>',
        },
      }),
    }),
  ],
  providers: [
    {
      provide: EmailService,
      useClass: NodemailerService,
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
