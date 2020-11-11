import dynamoDB from '../libs/dynamodb-lib';

export const getItem = async (data: any, event: any) => {
  const userId = process.env.userId; // event.requestContext.identity.cognitoIdentityId;
  const {
    id
  } = data;
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId,
      id
    }
  };
  try {
    const result = await dynamoDB.get(params);
    if (!result.Item) {
      throw new Error('Item not found');
    }
    return result.Item;
  } catch (error) {
    return { error: error.message };
  }
};