import { ApolloServer } from 'apollo-server';
import { makeSchema, objectType, queryType } from '@nexus/schema';
import { PrismaClient } from '@prisma/client';
var prisma = new PrismaClient();
// Definerar en Objekt typ
var Planet = objectType({
    name: 'Planet',
    definition: function (t) {
        t.id('id');
        t.string('name');
        t.string('type');
    },
});
// Anger våra olika Queries och hur dem ska resolveas
var Query = queryType({
    definition: function (t) {
        t.string('hello', { resolve: function () { return 'hello World'; } });
        t.list.field('planets', {
            type: Planet,
            resolve: function () { return [
                {
                    id: 1,
                    name: 'Earth',
                    type: 'Rocky',
                },
            ]; },
        });
    },
});
// Skapar schemat med typerna som anges
var schema = makeSchema({
    types: [Query, Planet],
});
// Skapar en server baserat på schemat
var server = new ApolloServer({
    schema: schema,
});
// Startar upp servern
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("Server ready at " + url);
});
//# sourceMappingURL=server.js.map