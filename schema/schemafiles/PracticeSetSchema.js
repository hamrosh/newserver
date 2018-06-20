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
  }

  extend type Query {
    getPracticeSets(sectionID: String, subSectionID: String): [PracticeSet]
  }

  extend type Mutation {
    addPracticeSets(input: InputPracticeSet): PracticeSet
  }

  input InputPracticeSet {
    description: String
    questions: [String]
    quthorName: String
    sectionID: String
    subSectionID: String
    numberOfQuestion: Float
    rate: Float
    purchaseCount: Float
    isFree: Boolean
    createdBy: String
  }
`;

//Writing the resolvers for the queries in the schema file for queries
export const resolvers = {
  Query: {
    getPracticeSets: (root, { sectionID, subSectionID }, context) => {
      let filter = {};
      if (sectionID) filter.sectionID = sectionID;
      if (subSectionID) filter.subSectionID = subSectionID;
      return PracticeSet.find(filter);
    }
  },

  PracticeSet: {
    allQuestions: (PracticeSet, {}, context) => {
      return Question.find(
        {
          _id: { $in: PracticeSet.Questions }
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
