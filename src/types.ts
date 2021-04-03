import { Connection } from "@mikro-orm/core/connections/Connection";
import { IDatabaseDriver } from "@mikro-orm/core/drivers/IDatabaseDriver";
import { EntityManager } from "@mikro-orm/core/EntityManager";
import { ObjectId } from "@mikro-orm/mongodb";
import { Request, Response } from "express";
import { Session } from "express-session";
declare module "express-session" {
    interface Session {
      userId: ObjectId;
    }
}

export type MyContext = {
    em: EntityManager<IDatabaseDriver<Connection>>;
    req: Request & {session?: Session };
    res: Response;
}

