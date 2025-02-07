import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { schema } from  "../schema";
import { createContext } from "../context";

const server = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: createContext,
});

export { handler as GET, handler as POST };