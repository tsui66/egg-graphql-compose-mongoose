'use strict';

module.exports = (graphqlTC, schemaComposer) => {
  const { TestTC } = graphqlTC;
  schemaComposer.Query.addFields({
    TestById: TestTC.getResolver('findById'),
  });

  schemaComposer.Mutation.addFields({
    TestCreateOne: TestTC.getResolver('createOne'),
  });
};
