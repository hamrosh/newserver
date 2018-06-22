import PracticeSet from '../../models/PracticeSetModel';
import Question from '../../models/QuestionModel';
import { gql } from 'apollo-server';
import 'babel-polyfill';
// Type Defs

export const typeDef = gql`
  type PracticeSet {
    id: ID
    description: String
    questions: [String]
    allQuestions: [Question]
    authorName: String
    sectionID: String
    subSectionID: String
    numberOfQuestion: Float
    rate: Float
    purcahseCount: Float
    isFree: Boolean
    createdBy: String
    routeURL: String
  }

  extend type Query {
    getPracticeSets(
      id: String
      sectionID: String
      subSectionID: String
    ): [PracticeSet]
    practiceSetInfo(routeURL: String): PracticeSet
  }

  extend type Mutation {
    addPracticeSets(input: InputPracticeSet): PracticeSet
  }

  input InputPracticeSet {
    description: String
    questions: [String]
    authorName: String
    sectionID: String
    subSectionID: String
    numberOfQuestion: Float
    rate: Float
    purchaseCount: Float
    isFree: Boolean
    createdBy: String
    routeURL: String
  }
`;

//Writing the resolvers for the queries in the schema file for queries
export const resolvers = {
  Query: {
    getPracticeSets: (root, { id, sectionID, subSectionID }, context) => {
      console.log('test', context.user);
      let filter = {};
      if (id) filter._id = id;
      if (sectionID) filter.sectionID = sectionID;
      if (subSectionID) filter.subSectionID = subSectionID;
      return PracticeSet.find(filter)
        .sort({ createdDate: 'desc' })
        .limit(10)
        .exec();
    },
    practiceSetInfo: (root, { routeURL }, context) => {
      let filter = {};
      if (routeURL) filter.routeURL = routeURL;
      return PracticeSet.findOne(filter);
    }
  },

  PracticeSet: {
    allQuestions: (PracticeSet, {}, context) => {
      return Question.find(
        {
          _id: { $in: PracticeSet.questions }
        },
        function(err, docs) {
          console.log(docs);
        }
      );
    }
  },

  Mutation: {
    addPracticeSets: (root, { input }, context) => {
      let q = new PracticeSet(input);
      return q.save();
    }
  }
};
