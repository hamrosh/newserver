import Question from '../../models/QuestionModel';
import { gql } from 'apollo-server';
import 'babel-polyfill';
// Type Defs

export const typeDef = gql`
  type Content {
    content: String
    contentType: String
  }

  type Option {
    option: String
    isCorrect: Boolean
  }

  type SingleQuestion {
    language: String
    question: Content
    subQuestion: Content
    options: [Option]
  }

  type Question {
    id: ID
    question: [SingleQuestion]
    categoryID: String
    subCategoryID: String
    sectionID: String
    subSectionID: String
    createdBy: String
    createddate: String
  }

  extend type Query {
    getQuestions(
      categoryID: String
      subCategoryID: String
      sectionID: String
      subSectionID: String
    ): [Question]
  }

  extend type Mutation {
    addQuestion(input: InputQuestion): Question
  }
  input InputQuestion {
    question: [InputSingleQuestion]
    categoryID: String
    subCategoryID: String
    sectionID: String
    subSectionID: String
    createdBy: String
  }

  input InputContent {
    content: String
    contentType: String
  }

  input InputOption {
    option: String
    isCorrect: Boolean
  }

  input InputSingleQuestion {
    language: String
    question: InputContent
    subQuestion: InputContent
    options: [InputOption]
  }
`;

//Writing the resolvers for the queries in the schema file for queries
export const resolvers = {
  Query: {
    getQuestions: (
      root,
      { categoryID, subCategoryID, sectionID, subSectionID },
      context
    ) => {
      return Question.find();
    }
  },
  Mutation: {
    addQuestion: (root, { input }, context) => {
      let q = new Question(input);
      return q.save();
    }
  }
};
