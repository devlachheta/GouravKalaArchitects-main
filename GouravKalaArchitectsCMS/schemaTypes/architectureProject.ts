import { defineField, defineType } from "sanity";

export const architectureProject = defineType({
    name: "architectureProject",
    title: "Architecture Projects",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Project Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "location",
            title: "Location",
            type: "string",
        }),

        defineField({
            name: "plotArea",
            title: "Plot Area",
            type: "string",
        }),

        defineField({
            name: "builtUpArea",
            title: "Built-Up Area",
            type: "string",
        }),

        defineField({
            name: "status",
            title: "Status",
            type: "string",
            initialValue: "Completed",
        }),

        defineField({
            name: "coverImage",
            title: "Project Cover Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: "imagePosition",
            title: "Cover Image Position",
            type: "string",
            initialValue: "center",
        }),

        defineField({
            name: "bannerImage",
            title: "Banner Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: "bannerPosition",
            title: "Banner Image Position",
            type: "string",
            initialValue: "center",
        }),

        defineField({
            name: "description",
            title: "Project Description",
            type: "text",
            rows: 6,
        }),

        defineField({
            name: "gallery",
            title: "Project Gallery",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({
                            name: "image",
                            title: "Image",
                            type: "image",
                            options: {
                                hotspot: true,
                            },
                        }),

                        defineField({
                            name: "position",
                            title: "Image Position",
                            type: "string",
                            initialValue: "center",
                        }),
                    ],
                },
            ],
        }),

        defineField({
            name: "youtubeUrl",
            title: "YouTube URL",
            type: "url",
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "location",
            media: "coverImage",
        },
    },
});