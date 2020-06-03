'use strict';

module.exports = ({ app }, { GraphqlCompose }) => {
  const { schemaComposer } = GraphqlCompose;
  const TestTC = app.graphqlTC.TestTC;
  schemaComposer.Query.addFields({
    TestById: TestTC.getResolver('findById'),
    TestByIds: TestTC.getResolver('findByIds'),
    TestOne: TestTC.getResolver('findOne'),
    TestMany: TestTC.getResolver('findMany'),
    // TestCount: TestTC.getResolver('count'),
    TestConnection: TestTC.getResolver('connection'),
    TestPagination: TestTC.getResolver('pagination'),
  });

  schemaComposer.Mutation.addFields({
    TestCreateOne: TestTC.getResolver('createOne'),
    TestCreateMany: TestTC.getResolver('createMany'),
    TestUpdateById: TestTC.getResolver('updateById'),
    TestUpdateOne: TestTC.getResolver('updateOne'),
    TestUpdateMany: TestTC.getResolver('updateMany'),
    TestRemoveById: TestTC.getResolver('removeById'),
    TestRemoveOne: TestTC.getResolver('removeOne'),
    TestRemoveMany: TestTC.getResolver('removeMany'),
  });
};
