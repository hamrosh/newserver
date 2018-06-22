import ShoppingCart from '../../models/ShoppingCartModel';
import AppUser from '../../models/AppUserModel';
import PracticeSet from '../../models/PracticeSetModel';
import { gql } from 'apollo-server';
import 'babel-polyfill';
// Type Defs

export const typeDef = gql`
  type ShoppingCart {
    id: ID
    appUserID: String
    itemID: String
    type: String
    status: String
    purchaseID: String
    createdBy: String
  }

  extend type Query {
    getShoppingCart(AppUserID: String): [UserPracticeSet]
  }

  extend type Mutation {
    addToShoppingCart(input: InputUserPracticeSet): UserPracticeSet
  }
  input InputShoppingCart {
    appUserID: String
    itemID: String
    type: String
    status: String

    createdBy: String
  }
`;

//Writing the resolvers for the queries in the schema file for queries
export const resolvers = {
  Query: {
    getShoppingCart: (root, { appUserID }, context) => {
      let filter = { status: 'inProcess' };
      if (appUserID) filter.appUserID = appUserID;
      return ShoppingCart.find(filter);
    }
  },

  Mutation: {
    addShoppingCart: (root, { input }, context) => {
      let q = new ShoppingCart(input);
      return q.save();
    }
  }
};
