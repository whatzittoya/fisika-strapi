"use strict";

module.exports = {
  register({ strapi }) {
    const extensionService = strapi.service("plugin::graphql.extension");
    extensionService.use(({ strapi }) => ({
      typeDefs: `
            type Query {
              post(slug: String!): PostEntityResponse
            }
          `,
      resolvers: {
        Query: {
          post: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const data = await strapi.services["api::post.post"].find({
                filters: { slug: args.slug },
              });

              const response = toEntityResponse(data.results[0]);

              return response;
            },
          },
        },
      },
    }));
  },
  bootstrap() {},
};
