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
    // First check if user exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      return existingUser;
    }

    // Create new user if doesn't exist
    const newUser = {
      name: args.name,
      email: args.email,
      pictureUrl: args.pictureUrl,
      credits: 3, // Initial credits
      createdAt: Date.now(), // Add creation timestamp
    };

    const userId = await ctx.db.insert("users", newUser);
    return { ...newUser, _id: userId }; // Return complete user data with ID
  },
});