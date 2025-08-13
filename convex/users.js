// convex/users.js
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewVideo = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    pictureURL: v.string(),
  },
  handler: async (ctx, args) => {
    // First check if user exists
    const user = await ctx.db.query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (!user[0]?.email) {
      const newUser = {
        name: args?.name,
        email: args?.email,
        pictureURL: args?.pictureURL,
        credits: 3 // Initial credits
    }

    const result = await ctx.db.insert("users", userData);

    return userData
    }
    return user[0];

  },
})

