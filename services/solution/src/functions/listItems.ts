import dynamoDB from '../libs/dynamodb-lib';

export const listItems = async (data: any, event: any) => {
  const userId = process.env.userId; // event.requestContext.identity.cognitoIdentityId;
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  };
  const result = await dynamoDB.query(params);
  return result.Items;
};