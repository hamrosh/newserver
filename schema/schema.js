import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import {
  typeDef as Category,
  resolvers as categoryResolvers
} from './schemafiles/CategorySchema';
import {
  typeDef as AppUser,
  resolvers as AppUserResolvers
} from './schemafiles/AppUserSchema';
import {
  typeDef as Question,
  resolvers as QuestionResolvers
} from './schemafiles/QuestionSchema';
import {
  typeDef as PracticeSet,
  resolvers as PracticeSetResolvers
} from './schemafiles/PracticeSetSchema';
import {
  typeDef as UserPracticeSet,
  resolvers as UserPracticeSetResolvers
} from './schemafiles/UserPracticeSetSchema';

// merging all resolvers together with the merge function from lodash
const resolvers = merge(
  categoryResolvers,
  AppUserResolvers,
  QuestionResolvers,
  PracticeSetResolvers,
  UserPracticeSetResolvers
);

// creating the schema using te typedef and resolvers together
const schema = makeExecutableSchema({
  typeDefs: [Category, AppUser, Question, PracticeSet, UserPracticeSet],
  resolvers: resolvers
});

export default schema;
