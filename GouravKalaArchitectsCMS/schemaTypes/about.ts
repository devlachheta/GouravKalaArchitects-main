import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Social Statistics",
  type: "document",

  fields: [
    defineField({
      name: "instagramFollowers",
      title: "Instagram Followers",
      type: "number",
      initialValue: 100000,
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "facebookFollowers",
      title: "Facebook Followers",
      type: "number",
      initialValue: 98000,
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "youtubeSubscribers",
      title: "YouTube Subscribers",
      type: "number",
      initialValue: 67000,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "About Social Statistics",
        subtitle: "Instagram • Facebook • YouTube",
      };
    },
  },
});