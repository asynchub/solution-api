import * as uuid from 'uuid';
import dynamoDB from '../libs/dynamodb-lib';

export const createItem = async (data: any, event: any) => {
  const id = uuid.v1();
  const userId = process.env.userId; // event.requestContext.identity.cognitoIdentityId
  const createdAt = Date.now();
  const {
    modelNumber,
    serialNumber,
    dateWarrantyBegins,
    dateWarrantyExpires,
    attachment
  } = data;
  const item = {
    id,
    userId,
    createdAt,
    modelNumber,
    serialNumber,
    dateWarrantyBegins,
    dateWarrantyExpires,
    attachment
  };
  const params = {
    TableName: process.env.tableName,
    Item: item
  };
  try {
    await dynamoDB.put(params);
  } catch (error) {
    return { error: error.message };
  };
  return params.Item;
};