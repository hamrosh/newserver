import UserPracticeSet from '../../models/UserPracticeSetModel';
import AppUser from '../../models/AppUserModel';
import PracticeSet from '../../models/PracticeSetModel';
import { gql } from 'apollo-server';
import 'babel-polyfill';
// Type Defs

export const typeDef = gql`
  type UserPracticeSet {
    id: ID
    appUserID: String
    practiceSetID: String
    userInfo: AppUser
    setInfo: PracticeSet
    active: Boolean
    createdBy: String
  }

  extend type Query {
    getUserPracticeSet(
      AppUserID: String
      PracticeSetID: String
    ): [UserPracticeSet]
  }

  extend type Mutation {
    addUserPracticeSet(input: InputUserPracticeSet): UserPracticeSet
  }
  input InputUserPracticeSet {
    appUserID: String
    practiceSetID: String
    active: Boolean
    createdBy: String
  }
`;

//Writing the resolvers for the queries in the schema file for queries
export const resolvers = {
  Query: {
    getUserPracticeSet: (root, { appUserID, practiceSetID }, context) => {
      let filter = { active: true };
      if (appUserID) filter.appUserID = appUserID;
      if (practiceSetID) filter.practiceSetID = practiceSetID;
      return UserPracticeSet.find(filter);
    }
  },

  UserPracticeSet: {
    userInfo: (UserPracticeSet, {}, context) => {
      return AppUser.findById(UserPracticeSet.appUserID, function(err, user) {
        console.log(user);
      });
    },
    setInfo: (UserPracticeSet, {}, context) => {
      return PracticeSet.findById(UserPracticeSet.PracticeSetID, function(
        err,
        practiceset
      ) {
        console.log(practiceset);
      });
    }
  },

  Mutation: {
    addUserPracticeSet: (root, { input }, context) => {
      let q = new UserPracticeSet(input);
      return q.save();
    }
  }
};
