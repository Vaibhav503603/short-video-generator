import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Create a new video record
 */
export const CreateVideoData = mutation({
  args: {
    title: v.string(),
    topic: v.string(),
    script: v.string(),
    videoStyle: v.string(),
    captions: v.any(),
    voice: v.string(),
    uid: v.id("users"),        // must be a valid user doc _id
    createdBy: v.string(),
    credits: v.number(),
  },
  handler: async (ctx, args) => {
    // Insert video record
    const insertedId = await ctx.db.insert("videoData", {
      title: args.title,
      topic: args.topic,
      script: args.script,
      videoStyle: args.videoStyle,
      captions: args.captions,
      voice: args.voice,
      uid: args.uid,
      createdBy: args.createdBy,
      status: "pending",
    });

    // Deduct one credit from the user
    await ctx.db.patch(args.uid, {
      credits: args.credits - 1,
    });

    return insertedId;
  },
});

/**
 * Update an existing video record with results
 */
export const UpdateVideoRecord = mutation({
  args: {
    recordId: v.id("videoData"),
    audioUrl: v.string(),
    images: v.any(),
    captionJson: v.any(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.recordId, {
      audioUrl: args.audioUrl,
      images: args.images,
      captionJson: args.captionJson,
      status: "completed",
    });
  },
});

/**
 * Get all videos for a specific user
 */
export const GetUserVideos = query({
  args: { uid: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("videoData")
      .withIndex("by_uid", (q) => q.eq("uid", args.uid))
      .order("desc")
      .collect();
  },
});

/**
 * Get a single video by its ID
 */
export const GetVideoById = query({
  args: { videoId: v.id("videoData") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.videoId);
  },
});
