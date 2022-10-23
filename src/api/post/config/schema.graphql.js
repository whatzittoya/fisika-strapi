module.exports = {
  query: `
    postBySlug(slug: String): Post
  `,
  resolver: {
    Query: {
      articleBySlug: {
        resolverOf: "Post.findOne",
        async resolver(_, { slug }) {
          const entity = await strapi.services.post.findOne({ slug });
          //   return sanitizeEntity(entity, { model: strapi.models.article });
          return entity;
        },
      },
    },
  },
};
