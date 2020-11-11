import { listItems } from './functions/listItems';
import { getItem } from './functions/getItem';
import { createItem } from './functions/createItem';
import { updateItem } from './functions/updateItem';
import { deleteItem } from './functions/deleteItem';
 
export const resolvers = {
  Query: {
    // hello: () => console.log('hello world'),
    // listItems: () => ('listItems'),
    allItems: (root: any, data: any, context: any) => {
      return listItems(data, context.event);
    },
    getItem: (root: any, data: any, context: any) => {
      return getItem(data, context.event);
    }
  },
  Mutation: {
    createItem: (root: any, data: any, context: any, other: any) => {
      return createItem(data, context.event);
    },
    updateItem: (root: any, data: any, context: any, other: any) => {
      return updateItem(data, context.event);
    },
    deleteItem: (root: any, data: any, context: any, other: any) => {
      return deleteItem(data, context.event);
    }
  },
  Item: {
    id: (root: any) => (root.id || root._id)
  }
};