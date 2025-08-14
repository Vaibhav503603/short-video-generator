// convex/users.js
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    pictureUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUsers = await ctx.db.query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();

    if (!existingUsers[0]?.email) {
      const userData = {
        name: args.name,
        email: args.email,
        pictureUrl: args.pictureUrl,
        credits: 3
      };

      const insertedId = await ctx.db.insert("users", userData);
      const inserted = await ctx.db.get(insertedId);
      return inserted;
    }

    return existingUsers[0];
  },
});

