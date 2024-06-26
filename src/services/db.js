const {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
  BatchWriteItemCommand,
  GetItemCommand,
  DeleteItemCommand,
} = require("@aws-sdk/client-dynamodb");
const DynamoDBDocumentClient =
  require("@aws-sdk/lib-dynamodb").DynamoDBDocumentClient;
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const { isEmpty } = require("lodash");

const REGION = "us-west-2"; // e.g. "us-east-1"
const client = new DynamoDBClient({ region: REGION });
const dynamo = DynamoDBDocumentClient.from(client);

// NOTE: these methods return promises

const put = (tableId, item) => {
  if (!item) return;
  return dynamo.send(
    new PutItemCommand({
      TableName: tableId,
      Item: marshall(item),
    }),
  );
};

const batchWrite = async function (tableId, items) {
  if (!items) return;
  const marshalledItems = items.map((x) => {
    const marshalled = marshall(x);
    return Object.assign({ PutRequest: { Item: marshalled } });
  });
  const batches = [];

  while (marshalledItems.length) {
    batches.push(marshalledItems.splice(0, 25));
  }

  return Promise.all(
    batches.map(async (batch) => {
      const requestItems = {};
      requestItems[tableId] = batch;

      const params = {
        RequestItems: requestItems,
      };

      await dynamo.send(new BatchWriteItemCommand(params));
    }),
  );
};

const scan = async (tableId) => {
  const res = await dynamo.send(new ScanCommand({ TableName: tableId }));
  const items = res?.["Items"];
  return items ? items.map(unmarshall) : [];
};

const getAll = async (tableId) => {
  let more = null;
  const allItems = [];
  do {
    const res = await dynamo.send(
      new ScanCommand({
        TableName: tableId,
        ...(more ? { ExclusiveStartKey: more } : {}),
      }),
    );
    more = res?.LastEvaluatedKey;
    allItems = [...allItems, ...res?.Items?.map(unmarshall)];
  } while (!isEmpty(more));
  return allItems;
};

const getItem = async (tableId, itemId) => {
  const res = await dynamo.send(
    new GetItemCommand({
      TableName: tableId,
      Key: {
        id: { S: `${itemId}` },
      },
    }),
  );
  const item = res?.["Item"];
  return item ? unmarshall(item) : null;
};

const clear = async (tableId) => {
  const items = await getAll(tableId);
  await Promise.all(
    items.map(async ({ id: itemId }) => {
      await dynamo.send(
        new DeleteItemCommand({
          TableName: tableId,
          Key: {
            id: { S: `${itemId}` },
          },
        }),
      );
    }),
  );
};

module.exports = { put, scan, batchWrite, getItem, clear, getAll };
