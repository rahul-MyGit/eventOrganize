import prisma from "@repo/db/client";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
 
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    })
} satisfies BetterAuthOptions);