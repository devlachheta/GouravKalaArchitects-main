import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage Statistics",
  type: "document",

  fields: [
    defineField({
      name: "years",
      title: "Years of Thoughtful Design",
      type: "string",
      initialValue: "07+",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "projects",
      title: "Projects Shaped With Care",
      type: "string",
      initialValue: "48+",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "cities",
      title: "Cities Across India",
      type: "string",
      initialValue: "06+",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Homepage Statistics",
        subtitle: "Years • Projects • Cities",
      };
    },
  },
});