import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { randomUUID } from "node:crypto";
import sanitizeData from "../helpers/sanitized-data.helper";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger("LoggingInterceptor");
  private readonly excludedRoutes: string[] = ["/api/health"];

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const correlationHeader = request.header("x-correlation-id") || randomUUID();
    const start = Date.now();

    request.headers["x-correlation-id"] = correlationHeader;
    request.headers["x-start-time"] = start.toString();
    response.setHeader("X-Correlation-Id", correlationHeader);

    const { method, originalUrl, body: reqBody, headers: reqHeaders } = request;
    if (this.excludedRoutes.includes(originalUrl)) {
      return next.handle();
    }

    this.logger.log(
      `Incoming Request [${correlationHeader}]: ${method} ${originalUrl}`,
      JSON.stringify({
        headers: sanitizeData(reqHeaders),
        body: sanitizeData(reqBody),
      })
    );

    return next.handle().pipe(
      tap((data: { [key: string]: unknown }) => {
        const { statusCode } = response;
        const responseTime = Date.now() - start;
        response.setHeader("X-Duration-Time", responseTime);

        const sanitizedData = Array.isArray(data)
          ? data.map((item) => sanitizeData(item))
          : sanitizeData(data);

        this.logger.log(
          `Outgoing Response [${correlationHeader}]: ${method} ${originalUrl} ${statusCode} - ${responseTime}ms`,
          JSON.stringify({
            statusCode,
            headers: sanitizeData(response.getHeaders()),
            body: sanitizedData,
          })
        );
      })
    );
  }
}
