import { ApolloServer } from 'apollo-server';
import { makeSchema, objectType, queryType } from '@nexus/schema';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Definerar en Objekt typ
const Planet = objectType({
  name: 'Planet',
  definition(t) {
    t.id('id');
    t.string('name');
    t.string('type');
  },
});

// Anger våra olika Queries och hur dem ska resolveas
const Query = queryType({
  definition(t) {
    t.string('hello', { resolve: () => 'hello World' });
    t.list.field('planets', {
      type: Planet,
      resolve: () => {
        return prisma.planet.findMany();
      },
    });
  },
});

// Skapar schemat med typerna som anges
const schema = makeSchema({
  types: [Query, Planet],
  // Tar fram types och schemat baserat på en Code First Approach
  outputs: {
    schema: `${__dirname}/generated/schema.graphql`,
    typegen: `${__dirname}/generated/types.ts`,
  },
});

// Skapar en server baserat på schemat
const server = new ApolloServer({
  schema,
});

// Startar upp servern
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
