(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apollo-server.ts":
/*!******************************!*\
  !*** ./src/apollo-server.ts ***!
  \******************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used in src/apollo-server (runtime-defined)] [usage prevents renaming] */
/*! export graphqlHandler [provided] [maybe used in src/apollo-server (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in src/apollo-server (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.graphqlHandler = void 0;
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/resolvers.ts");
const type_defs_1 = __webpack_require__(/*! ./type-defs */ "./src/type-defs.ts");
const apolloServer = new apollo_server_lambda_1.ApolloServer({
    resolvers: resolvers_1.resolvers,
    typeDefs: type_defs_1.typeDefs,
    context: ({ event, context }) => ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
    })
});
exports.graphqlHandler = apolloServer.createHandler();


/***/ }),

/***/ "./src/functions/createItem.ts":
/*!*************************************!*\
  !*** ./src/functions/createItem.ts ***!
  \*************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createItem = void 0;
const uuid = __importStar(__webpack_require__(/*! uuid */ "uuid"));
const dynamodb_lib_1 = __importDefault(__webpack_require__(/*! ../libs/dynamodb-lib */ "./src/libs/dynamodb-lib.ts"));
exports.createItem = (data, event) => __awaiter(void 0, void 0, void 0, function* () {
    const id = uuid.v1();
    const userId = process.env.userId;
    const createdAt = Date.now();
    const { modelNumber, serialNumber, dateWarrantyBegins, dateWarrantyExpires, attachment } = data;
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
        yield dynamodb_lib_1.default.put(params);
    }
    catch (error) {
        return { error: error.message };
    }
    ;
    return params.Item;
});


/***/ }),

/***/ "./src/functions/deleteItem.ts":
/*!*************************************!*\
  !*** ./src/functions/deleteItem.ts ***!
  \*************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteItem = void 0;
const dynamodb_lib_1 = __importDefault(__webpack_require__(/*! ../libs/dynamodb-lib */ "./src/libs/dynamodb-lib.ts"));
exports.deleteItem = (data, event) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = process.env.userId;
    const { id } = data;
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId,
            id
        },
        ReturnValues: 'ALL_OLD'
    };
    try {
        const result = yield dynamodb_lib_1.default.delete(params);
        return result;
    }
    catch (error) {
        return { error: error.message };
    }
    ;
});


/***/ }),

/***/ "./src/functions/getItem.ts":
/*!**********************************!*\
  !*** ./src/functions/getItem.ts ***!
  \**********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getItem = void 0;
const dynamodb_lib_1 = __importDefault(__webpack_require__(/*! ../libs/dynamodb-lib */ "./src/libs/dynamodb-lib.ts"));
exports.getItem = (data, event) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = process.env.userId;
    const { id } = data;
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId,
            id
        }
    };
    try {
        const result = yield dynamodb_lib_1.default.get(params);
        if (!result.Item) {
            throw new Error('Item not found');
        }
        return result.Item;
    }
    catch (error) {
        return { error: error.message };
    }
});


/***/ }),

/***/ "./src/functions/listItems.ts":
/*!************************************!*\
  !*** ./src/functions/listItems.ts ***!
  \************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.listItems = void 0;
const dynamodb_lib_1 = __importDefault(__webpack_require__(/*! ../libs/dynamodb-lib */ "./src/libs/dynamodb-lib.ts"));
exports.listItems = (data, event) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = process.env.userId;
    const params = {
        TableName: process.env.tableName,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    };
    const result = yield dynamodb_lib_1.default.query(params);
    return result.Items;
});


/***/ }),

/***/ "./src/functions/updateItem.ts":
/*!*************************************!*\
  !*** ./src/functions/updateItem.ts ***!
  \*************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateItem = void 0;
const dynamodb_lib_1 = __importDefault(__webpack_require__(/*! ../libs/dynamodb-lib */ "./src/libs/dynamodb-lib.ts"));
exports.updateItem = (data, event) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = process.env.userId;
    const { id, modelNumber, serialNumber, dateWarrantyBegins, dateWarrantyExpires, attachment } = data;
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: userId,
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
        const result = yield dynamodb_lib_1.default.put(params);
        return result;
    }
    catch (error) {
        return { error: error.message };
    }
    ;
});


/***/ }),

/***/ "./src/libs/dynamodb-lib.ts":
/*!**********************************!*\
  !*** ./src/libs/dynamodb-lib.ts ***!
  \**********************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const aws_sdk_1 = __webpack_require__(/*! aws-sdk */ "aws-sdk");
const client = new aws_sdk_1.DynamoDB.DocumentClient();
exports.default = {
    get: (params) => client.get(params).promise(),
    put: (params) => client.put(params).promise(),
    query: (params) => client.query(params).promise(),
    update: (params) => client.update(params).promise(),
    delete: (params) => client.delete(params).promise()
};


/***/ }),

/***/ "./src/resolvers.ts":
/*!**************************!*\
  !*** ./src/resolvers.ts ***!
  \**************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export resolvers [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolvers = void 0;
const listItems_1 = __webpack_require__(/*! ./functions/listItems */ "./src/functions/listItems.ts");
const getItem_1 = __webpack_require__(/*! ./functions/getItem */ "./src/functions/getItem.ts");
const createItem_1 = __webpack_require__(/*! ./functions/createItem */ "./src/functions/createItem.ts");
const updateItem_1 = __webpack_require__(/*! ./functions/updateItem */ "./src/functions/updateItem.ts");
const deleteItem_1 = __webpack_require__(/*! ./functions/deleteItem */ "./src/functions/deleteItem.ts");
exports.resolvers = {
    Query: {
        allItems: (root, data, context) => {
            return listItems_1.listItems(data, context.event);
        },
        getItem: (root, data, context) => {
            return getItem_1.getItem(data, context.event);
        }
    },
    Mutation: {
        createItem: (root, data, context, other) => {
            return createItem_1.createItem(data, context.event);
        },
        updateItem: (root, data, context, other) => {
            return updateItem_1.updateItem(data, context.event);
        },
        deleteItem: (root, data, context, other) => {
            return deleteItem_1.deleteItem(data, context.event);
        }
    },
    Item: {
        id: (root) => (root.id || root._id)
    }
};


/***/ }),

/***/ "./src/type-defs.ts":
/*!**************************!*\
  !*** ./src/type-defs.ts ***!
  \**************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export typeDefs [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeDefs = void 0;
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
exports.typeDefs = apollo_server_lambda_1.gql `
  scalar Date

  type Item {
    id: ID!
    userId: String
    createdAt: Date
    modelNumber: String
    serialNumber: String
    dateWarrantyBegins: Date
    dateWarrantyExpires: Date
    attachment: String
  }

  type Query {
    # hello: String

    # listItems: [Item]

    allItems(
      id: String
      serialNumber: String
    ): [Item]
    
    getItem(
      id: String
      serialNumber: String
    ): Item
  }
  
  type Mutation {
    createItem(
      # userId: String
      # createdAt: Date
      # modelNumber: String
      serialNumber: String
      dateWarrantyBegins: Date
      dateWarrantyExpires: Date
      # attachment: String
    ): Item

    updateItem(
      id: String!
      # userId: String
      # createdAt: Date
      # modelNumber: String
      serialNumber: String
      dateWarrantyBegins: Date
      dateWarrantyExpires: Date
      attachment: String
    ): Item
    
    deleteItem(
      id: String!
    ): Item
  }
`;


/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = require("apollo-server-lambda");;

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = require("aws-sdk");;

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = require("uuid");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/apollo-server.ts");
/******/ })()

));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjL2Fwb2xsby1zZXJ2ZXIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2x1dGlvbi8uL3NyYy9hcG9sbG8tc2VydmVyLnRzIiwid2VicGFjazovL3NvbHV0aW9uLy4vc3JjL2Z1bmN0aW9ucy9jcmVhdGVJdGVtLnRzIiwid2VicGFjazovL3NvbHV0aW9uLy4vc3JjL2Z1bmN0aW9ucy9kZWxldGVJdGVtLnRzIiwid2VicGFjazovL3NvbHV0aW9uLy4vc3JjL2Z1bmN0aW9ucy9nZXRJdGVtLnRzIiwid2VicGFjazovL3NvbHV0aW9uLy4vc3JjL2Z1bmN0aW9ucy9saXN0SXRlbXMudHMiLCJ3ZWJwYWNrOi8vc29sdXRpb24vLi9zcmMvZnVuY3Rpb25zL3VwZGF0ZUl0ZW0udHMiLCJ3ZWJwYWNrOi8vc29sdXRpb24vLi9zcmMvbGlicy9keW5hbW9kYi1saWIudHMiLCJ3ZWJwYWNrOi8vc29sdXRpb24vLi9zcmMvcmVzb2x2ZXJzLnRzIiwid2VicGFjazovL3NvbHV0aW9uLy4vc3JjL3R5cGUtZGVmcy50cyIsIndlYnBhY2s6Ly9zb2x1dGlvbi9leHRlcm5hbCBcImFwb2xsby1zZXJ2ZXItbGFtYmRhXCIiLCJ3ZWJwYWNrOi8vc29sdXRpb24vZXh0ZXJuYWwgXCJhd3Mtc2RrXCIiLCJ3ZWJwYWNrOi8vc29sdXRpb24vZXh0ZXJuYWwgXCJ1dWlkXCIiLCJ3ZWJwYWNrOi8vc29sdXRpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc29sdXRpb24vd2VicGFjay9zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwb2xsb1NlcnZlciB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItbGFtYmRhJztcblxuaW1wb3J0IHsgcmVzb2x2ZXJzIH0gZnJvbSAnLi9yZXNvbHZlcnMnO1xuaW1wb3J0IHsgdHlwZURlZnMgfSBmcm9tICcuL3R5cGUtZGVmcyc7XG5cbmNvbnN0IGFwb2xsb1NlcnZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoe1xuICByZXNvbHZlcnMsXG4gIHR5cGVEZWZzLFxuICBjb250ZXh0OiAoeyBldmVudCwgY29udGV4dCB9KSA9PiAoe1xuICAgIGhlYWRlcnM6IGV2ZW50LmhlYWRlcnMsXG4gICAgZnVuY3Rpb25OYW1lOiBjb250ZXh0LmZ1bmN0aW9uTmFtZSxcbiAgICBldmVudCxcbiAgICBjb250ZXh0LFxuICB9KVxufSk7XG5cbmV4cG9ydCBjb25zdCBncmFwaHFsSGFuZGxlciA9IGFwb2xsb1NlcnZlci5jcmVhdGVIYW5kbGVyKCk7IiwiaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCBkeW5hbW9EQiBmcm9tICcuLi9saWJzL2R5bmFtb2RiLWxpYic7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVJdGVtID0gYXN5bmMgKGRhdGE6IGFueSwgZXZlbnQ6IGFueSkgPT4ge1xuICBjb25zdCBpZCA9IHV1aWQudjEoKTtcbiAgY29uc3QgdXNlcklkID0gcHJvY2Vzcy5lbnYudXNlcklkOyAvLyBldmVudC5yZXF1ZXN0Q29udGV4dC5pZGVudGl0eS5jb2duaXRvSWRlbnRpdHlJZFxuICBjb25zdCBjcmVhdGVkQXQgPSBEYXRlLm5vdygpO1xuICBjb25zdCB7XG4gICAgbW9kZWxOdW1iZXIsXG4gICAgc2VyaWFsTnVtYmVyLFxuICAgIGRhdGVXYXJyYW50eUJlZ2lucyxcbiAgICBkYXRlV2FycmFudHlFeHBpcmVzLFxuICAgIGF0dGFjaG1lbnRcbiAgfSA9IGRhdGE7XG4gIGNvbnN0IGl0ZW0gPSB7XG4gICAgaWQsXG4gICAgdXNlcklkLFxuICAgIGNyZWF0ZWRBdCxcbiAgICBtb2RlbE51bWJlcixcbiAgICBzZXJpYWxOdW1iZXIsXG4gICAgZGF0ZVdhcnJhbnR5QmVnaW5zLFxuICAgIGRhdGVXYXJyYW50eUV4cGlyZXMsXG4gICAgYXR0YWNobWVudFxuICB9O1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgVGFibGVOYW1lOiBwcm9jZXNzLmVudi50YWJsZU5hbWUsXG4gICAgSXRlbTogaXRlbVxuICB9O1xuICB0cnkge1xuICAgIGF3YWl0IGR5bmFtb0RCLnB1dChwYXJhbXMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7IGVycm9yOiBlcnJvci5tZXNzYWdlIH07XG4gIH07XG4gIHJldHVybiBwYXJhbXMuSXRlbTtcbn07IiwiaW1wb3J0IHsgV29ya01haWxNZXNzYWdlRmxvdyB9IGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IGR5bmFtb0RCIGZyb20gJy4uL2xpYnMvZHluYW1vZGItbGliJztcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUl0ZW0gPSBhc3luYyAoZGF0YTogYW55LCBldmVudDogYW55KSA9PiB7XG4gIGNvbnN0IHVzZXJJZCA9IHByb2Nlc3MuZW52LnVzZXJJZDsgLy8gZXZlbnQucmVxdWVzdENvbnRleHQuaWRlbnRpdHkuY29nbml0b0lkZW50aXR5SWQ7XG4gIGNvbnN0IHtcbiAgICBpZFxuICB9ID0gZGF0YTtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYudGFibGVOYW1lLFxuICAgIEtleToge1xuICAgICAgdXNlcklkLFxuICAgICAgaWRcbiAgICB9LFxuICAgIFJldHVyblZhbHVlczogJ0FMTF9PTEQnXG4gIH07XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZHluYW1vREIuZGVsZXRlKHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBlcnJvcjogZXJyb3IubWVzc2FnZSB9O1xuICB9O1xufTsiLCJpbXBvcnQgZHluYW1vREIgZnJvbSAnLi4vbGlicy9keW5hbW9kYi1saWInO1xuXG5leHBvcnQgY29uc3QgZ2V0SXRlbSA9IGFzeW5jIChkYXRhOiBhbnksIGV2ZW50OiBhbnkpID0+IHtcbiAgY29uc3QgdXNlcklkID0gcHJvY2Vzcy5lbnYudXNlcklkOyAvLyBldmVudC5yZXF1ZXN0Q29udGV4dC5pZGVudGl0eS5jb2duaXRvSWRlbnRpdHlJZDtcbiAgY29uc3Qge1xuICAgIGlkXG4gIH0gPSBkYXRhO1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgVGFibGVOYW1lOiBwcm9jZXNzLmVudi50YWJsZU5hbWUsXG4gICAgS2V5OiB7XG4gICAgICB1c2VySWQsXG4gICAgICBpZFxuICAgIH1cbiAgfTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkeW5hbW9EQi5nZXQocGFyYW1zKTtcbiAgICBpZiAoIXJlc3VsdC5JdGVtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0l0ZW0gbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQuSXRlbTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBlcnJvcjogZXJyb3IubWVzc2FnZSB9O1xuICB9XG59OyIsImltcG9ydCBkeW5hbW9EQiBmcm9tICcuLi9saWJzL2R5bmFtb2RiLWxpYic7XG5cbmV4cG9ydCBjb25zdCBsaXN0SXRlbXMgPSBhc3luYyAoZGF0YTogYW55LCBldmVudDogYW55KSA9PiB7XG4gIGNvbnN0IHVzZXJJZCA9IHByb2Nlc3MuZW52LnVzZXJJZDsgLy8gZXZlbnQucmVxdWVzdENvbnRleHQuaWRlbnRpdHkuY29nbml0b0lkZW50aXR5SWQ7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LnRhYmxlTmFtZSxcbiAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiAndXNlcklkID0gOnVzZXJJZCcsXG4gICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgJzp1c2VySWQnOiB1c2VySWRcbiAgICB9XG4gIH07XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGR5bmFtb0RCLnF1ZXJ5KHBhcmFtcyk7XG4gIHJldHVybiByZXN1bHQuSXRlbXM7XG59OyIsImltcG9ydCBkeW5hbW9EQiBmcm9tICcuLi9saWJzL2R5bmFtb2RiLWxpYic7XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVJdGVtID0gYXN5bmMgKGRhdGE6IGFueSwgZXZlbnQ6IGFueSkgPT4ge1xuICBjb25zdCB1c2VySWQgPSBwcm9jZXNzLmVudi51c2VySWQ7IC8vIGV2ZW50LnJlcXVlc3RDb250ZXh0LmlkZW50aXR5LmNvZ25pdG9JZGVudGl0eUlkO1xuICBjb25zdCB7XG4gICAgaWQsXG4gICAgbW9kZWxOdW1iZXIsXG4gICAgc2VyaWFsTnVtYmVyLFxuICAgIGRhdGVXYXJyYW50eUJlZ2lucyxcbiAgICBkYXRlV2FycmFudHlFeHBpcmVzLFxuICAgIGF0dGFjaG1lbnRcbiAgfSA9IGRhdGE7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LnRhYmxlTmFtZSxcbiAgICBLZXk6IHtcbiAgICAgIHVzZXJJZDogdXNlcklkLCAvLyBldmVudC5yZXF1ZXN0Q29udGV4dC5pZGVudGl0eS5jb2duaXRvSWRlbnRpdHlJZCxcbiAgICAgIGlkXG4gICAgfSxcbiAgICBVcGRhdGVFeHByZXNzaW9uOiAnU0VUIG1vZGVsTnVtYmVyID0gOm1vZGVsTnVtYmVyLCBzZXJpYWxOdW1iZXIgPSA6c2VyaWFsTnVtYmVyLCBkYXRlV2FycmFudHlCZWdpbnMgPSA6ZGF0ZVdhcnJhbnR5QmVnaW5zLCBkYXRlV2FycmFudHlFeHBpcmVzID0gOmRhdGVXYXJyYW50eUV4cGlyZXMsIGF0dGFjaG1lbnQgPSA6YXR0YWNobWVudCcsXG4gICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgJ21vZGVsTnVtYmVyJzogbW9kZWxOdW1iZXIgfHwgbnVsbCxcbiAgICAgICdzZXJpYWxOdW1iZXInOiBzZXJpYWxOdW1iZXIgfHwgbnVsbCxcbiAgICAgICdkYXRlV2FycmFudHlCZWdpbnMnOiBkYXRlV2FycmFudHlCZWdpbnMgfHwgbnVsbCxcbiAgICAgICdkYXRlV2FycmFudHlFeHBpcmVzJzogZGF0ZVdhcnJhbnR5RXhwaXJlcyB8fCBudWxsLFxuICAgICAgJ2F0dGFjaG1lbnQnOiBhdHRhY2htZW50IHx8IG51bGxcbiAgICB9LFxuICAgIFJldHVyblZhbHVlczogJ0FMTF9ORVcnXG4gIH07XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZHluYW1vREIucHV0KHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBlcnJvcjogZXJyb3IubWVzc2FnZSB9O1xuICB9O1xufTsiLCJpbXBvcnQgeyBEeW5hbW9EQiB9IGZyb20gJ2F3cy1zZGsnO1xuXG5jb25zdCBjbGllbnQgPSBuZXcgIER5bmFtb0RCLkRvY3VtZW50Q2xpZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0OiAocGFyYW1zOiBhbnkpID0+IGNsaWVudC5nZXQocGFyYW1zKS5wcm9taXNlKCksXG4gIHB1dDogKHBhcmFtczogYW55KSA9PiBjbGllbnQucHV0KHBhcmFtcykucHJvbWlzZSgpLFxuICBxdWVyeTogKHBhcmFtczogYW55KSA9PiBjbGllbnQucXVlcnkocGFyYW1zKS5wcm9taXNlKCksXG4gIHVwZGF0ZTogKHBhcmFtczogYW55KSA9PiBjbGllbnQudXBkYXRlKHBhcmFtcykucHJvbWlzZSgpLFxuICBkZWxldGU6IChwYXJhbXM6IGFueSkgPT4gY2xpZW50LmRlbGV0ZShwYXJhbXMpLnByb21pc2UoKVxufTsiLCJpbXBvcnQgeyBsaXN0SXRlbXMgfSBmcm9tICcuL2Z1bmN0aW9ucy9saXN0SXRlbXMnO1xuaW1wb3J0IHsgZ2V0SXRlbSB9IGZyb20gJy4vZnVuY3Rpb25zL2dldEl0ZW0nO1xuaW1wb3J0IHsgY3JlYXRlSXRlbSB9IGZyb20gJy4vZnVuY3Rpb25zL2NyZWF0ZUl0ZW0nO1xuaW1wb3J0IHsgdXBkYXRlSXRlbSB9IGZyb20gJy4vZnVuY3Rpb25zL3VwZGF0ZUl0ZW0nO1xuaW1wb3J0IHsgZGVsZXRlSXRlbSB9IGZyb20gJy4vZnVuY3Rpb25zL2RlbGV0ZUl0ZW0nO1xuIFxuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IHtcbiAgUXVlcnk6IHtcbiAgICAvLyBoZWxsbzogKCkgPT4gY29uc29sZS5sb2coJ2hlbGxvIHdvcmxkJyksXG4gICAgLy8gbGlzdEl0ZW1zOiAoKSA9PiAoJ2xpc3RJdGVtcycpLFxuICAgIGFsbEl0ZW1zOiAocm9vdDogYW55LCBkYXRhOiBhbnksIGNvbnRleHQ6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIGxpc3RJdGVtcyhkYXRhLCBjb250ZXh0LmV2ZW50KTtcbiAgICB9LFxuICAgIGdldEl0ZW06IChyb290OiBhbnksIGRhdGE6IGFueSwgY29udGV4dDogYW55KSA9PiB7XG4gICAgICByZXR1cm4gZ2V0SXRlbShkYXRhLCBjb250ZXh0LmV2ZW50KTtcbiAgICB9XG4gIH0sXG4gIE11dGF0aW9uOiB7XG4gICAgY3JlYXRlSXRlbTogKHJvb3Q6IGFueSwgZGF0YTogYW55LCBjb250ZXh0OiBhbnksIG90aGVyOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiBjcmVhdGVJdGVtKGRhdGEsIGNvbnRleHQuZXZlbnQpO1xuICAgIH0sXG4gICAgdXBkYXRlSXRlbTogKHJvb3Q6IGFueSwgZGF0YTogYW55LCBjb250ZXh0OiBhbnksIG90aGVyOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiB1cGRhdGVJdGVtKGRhdGEsIGNvbnRleHQuZXZlbnQpO1xuICAgIH0sXG4gICAgZGVsZXRlSXRlbTogKHJvb3Q6IGFueSwgZGF0YTogYW55LCBjb250ZXh0OiBhbnksIG90aGVyOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiBkZWxldGVJdGVtKGRhdGEsIGNvbnRleHQuZXZlbnQpO1xuICAgIH1cbiAgfSxcbiAgSXRlbToge1xuICAgIGlkOiAocm9vdDogYW55KSA9PiAocm9vdC5pZCB8fCByb290Ll9pZClcbiAgfVxufTsiLCJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tc2VydmVyLWxhbWJkYSc7XG5cbmV4cG9ydCBjb25zdCB0eXBlRGVmcyA9IGdxbGBcbiAgc2NhbGFyIERhdGVcblxuICB0eXBlIEl0ZW0ge1xuICAgIGlkOiBJRCFcbiAgICB1c2VySWQ6IFN0cmluZ1xuICAgIGNyZWF0ZWRBdDogRGF0ZVxuICAgIG1vZGVsTnVtYmVyOiBTdHJpbmdcbiAgICBzZXJpYWxOdW1iZXI6IFN0cmluZ1xuICAgIGRhdGVXYXJyYW50eUJlZ2luczogRGF0ZVxuICAgIGRhdGVXYXJyYW50eUV4cGlyZXM6IERhdGVcbiAgICBhdHRhY2htZW50OiBTdHJpbmdcbiAgfVxuXG4gIHR5cGUgUXVlcnkge1xuICAgICMgaGVsbG86IFN0cmluZ1xuXG4gICAgIyBsaXN0SXRlbXM6IFtJdGVtXVxuXG4gICAgYWxsSXRlbXMoXG4gICAgICBpZDogU3RyaW5nXG4gICAgICBzZXJpYWxOdW1iZXI6IFN0cmluZ1xuICAgICk6IFtJdGVtXVxuICAgIFxuICAgIGdldEl0ZW0oXG4gICAgICBpZDogU3RyaW5nXG4gICAgICBzZXJpYWxOdW1iZXI6IFN0cmluZ1xuICAgICk6IEl0ZW1cbiAgfVxuICBcbiAgdHlwZSBNdXRhdGlvbiB7XG4gICAgY3JlYXRlSXRlbShcbiAgICAgICMgdXNlcklkOiBTdHJpbmdcbiAgICAgICMgY3JlYXRlZEF0OiBEYXRlXG4gICAgICAjIG1vZGVsTnVtYmVyOiBTdHJpbmdcbiAgICAgIHNlcmlhbE51bWJlcjogU3RyaW5nXG4gICAgICBkYXRlV2FycmFudHlCZWdpbnM6IERhdGVcbiAgICAgIGRhdGVXYXJyYW50eUV4cGlyZXM6IERhdGVcbiAgICAgICMgYXR0YWNobWVudDogU3RyaW5nXG4gICAgKTogSXRlbVxuXG4gICAgdXBkYXRlSXRlbShcbiAgICAgIGlkOiBTdHJpbmchXG4gICAgICAjIHVzZXJJZDogU3RyaW5nXG4gICAgICAjIGNyZWF0ZWRBdDogRGF0ZVxuICAgICAgIyBtb2RlbE51bWJlcjogU3RyaW5nXG4gICAgICBzZXJpYWxOdW1iZXI6IFN0cmluZ1xuICAgICAgZGF0ZVdhcnJhbnR5QmVnaW5zOiBEYXRlXG4gICAgICBkYXRlV2FycmFudHlFeHBpcmVzOiBEYXRlXG4gICAgICBhdHRhY2htZW50OiBTdHJpbmdcbiAgICApOiBJdGVtXG4gICAgXG4gICAgZGVsZXRlSXRlbShcbiAgICAgIGlkOiBTdHJpbmchXG4gICAgKTogSXRlbVxuICB9XG5gOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItbGFtYmRhXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhd3Mtc2RrXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dWlkXCIpOzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIG1vZHVsZSBleHBvcnRzIG11c3QgYmUgcmV0dXJuZWQgZnJvbSBydW50aW1lIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbnJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBvbGxvLXNlcnZlci50c1wiKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QkE7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QkE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUVBO0FBQ0E7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBOzs7Ozs7Ozs7Ozs7Ozs7QUNwQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBOzs7Ozs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdEQTtBQUNBO0FBQ0E7QTs7Ozs7Ozs7Ozs7QUM1REE7QUFDQTtBOzs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QTs7Ozs7Ozs7Ozs7QUNEQTtBQUNBO0E7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTs7O0EiLCJzb3VyY2VSb290IjoiIn0=