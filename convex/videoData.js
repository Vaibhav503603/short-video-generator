import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateVideoData=mutation({
    args: {
        title: v.string(),
        topic: v.string(),
        script: v.string(),
        videoStyle: v.string(),
        captions: v.any(),
        voice: v.string(),
        uid: v.id('users'),
        createdBy: v.string()
    },
    handler:async (ctx, args) => {
        const result = await ctx.db.insert("videoData", {
            title: args.title,
            topic: args.topic,
            script: args.script,
            videoStyle: args.videoStyle,
            captions: args.captions,
            voice: args.voice,
            uid: args.uid,
            createdBy: args.createdBy
        });
        return result;
    }
}) 