import {ExpressAdapter} from "@nestjs/platform-express";
import {Express} from "express";
import {AppModule} from "./app.module";
import {NestFactory} from "@nestjs/core";
import * as express from "express";

export const expressServer = express()

export const createApi = async (expressInstance: Express): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
    {
      cors: {
        origin: "*",
        methods: "*"
      }
    }
  );

  await app.init();
};
