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
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (!user[0]?.email) {
      const userData={{
        name: args.name,
        email: args.email,
        pictureUrl: args.pictureUrl,
        credits: 3,
      }}
      const result = await ctx.db.insert("users", userData);

      return userData
    }

    return user[0]; // Return existing user
  },
});
