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
        createdBy: v.string(),
        credits: v.number()
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
            createdBy: args.createdBy,
            status: "pending"
        });

        await ctx.db.patch(Average.uid, {
            credits: (args?.credits)-1
        })

        return result;
    }
}) 

export const UpdateVideoRecord=mutation({
    args: {
        recordId: v.id('videoData'),
        audioUrl: v.string(),
        images: v.string(),
        captionJson: v.string(),
    },
    handler:async (ctx, args) => {
        const result = await ctx.db.patch(args.recordId, {
            audioUrl: args.audioUrl,
            images: args.images,
            captionJson: args.captionJson,
            status: "completed"
        });
        return result;
    }

})

export const GetVideoData=query({
    args: {
        uid: v.id('users'),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query("videoData")
            filter(q=>(q.field("uid").args.uid))
            .order('desc')
            .collect();

        return result;
    }
})  

export const GetVideoById=query({
    args: {
        videoId: v.id('videoData')
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.get(args.videoId);
        return result;
    }
})