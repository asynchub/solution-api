import dynamoDB from '../libs/dynamodb-lib';

export const updateItem = async (data: any, event: any) => {
  const userId = process.env.userId; // event.requestContext.identity.cognitoIdentityId;
  const {
    id,
    modelNumber,
    serialNumber,
    dateWarrantyBegins,
    dateWarrantyExpires,
    attachment
  } = data;
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: userId, // event.requestContext.identity.cognitoIdentityId,
      id
    },
    UpdateExpression: 'SET modelNumber = :modelNumber, serialNumber = :serialNumber, dateWarrantyBegins = :dateWarrantyBegins, dateWarrantyExpires = :dateWarrantyExpires, attachment = :attachment',
    ExpressionAttributeValues: {
      'modelNumber': modelNumber || null,
      'serialNumber': serialNumber || null,
      'dateWarrantyBegins': dateWarrantyBegins || null,
      'dateWarrantyExpires': dateWarrantyExpires || null,
      'attachment': attachment || null
    },
    ReturnValues: 'ALL_NEW'
  };
  try {
    const result = await dynamoDB.put(params);
    return result;
  } catch (error) {
    return { error: error.message };
  };
};