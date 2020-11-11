import { WorkMailMessageFlow } from 'aws-sdk';
import dynamoDB from '../libs/dynamodb-lib';

export const deleteItem = async (data: any, event: any) => {
  const userId = process.env.userId; // event.requestContext.identity.cognitoIdentityId;
  const {
    id
  } = data;
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId,
      id
    },
    ReturnValues: 'ALL_OLD'
  };
  try {
    const result = await dynamoDB.delete(params);
    return result;
  } catch (error) {
    return { error: error.message };
  };
};