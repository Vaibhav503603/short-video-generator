// convex/schema.js
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    pictureU: v.string(),
    credits: v.number(),
  }).index("by_email", ["email"]),

  videoData: defineTable({
    title: v.string(),
    topic: v.string(),
    script: v.string(),
    videoStyle: v.string(),
    captions: v.any(),
    voice: v.string(),
    audioUrl: v.optional(v.string()),
    images: v.optional(v.any()),
    captionJson: v.optional(v.any()),
    uid: v.id('users'),
    createdBy: v.string(),
    status:v.optional(v.string())

  })

});
