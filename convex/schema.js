import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    users:defineTable({
        name: v.string(),
        email: v.string(),
        pictureUrl: v.string(),
        credits: v.number(),
    })
})