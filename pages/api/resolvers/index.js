import { connectToDatabase } from "../../../lib/db";

export const resolvers = {
  Query: {
    getUsers: async () => {
      return [];
    },
    getUser: async (parent, args) => {
      const { db } = await connectToDatabase();
      const { walletAddress } = args;

      const user = await db.collection("users").findOne({
        walletAddress,
      });

      // console.log({ ...user, id: user._id });

      return { ...user, id: user._id };
    },
    getToken: async (parent, args) => {
      const { db } = await connectToDatabase();
      const { cid } = args;
      const token = await db.collection("tokens").findOne({ cid });

      if (!token) return {};
      return {
        ...token,
        id: token._cid,
      };
    },
    tokens: async () => {
      const { db } = await connectToDatabase();
      const tokens = await db.collection("tokens").find({});
      return await tokens.toArray();
    },
  },
  Mutation: {
    createToken: async (parent, args) => {
      const { db } = await connectToDatabase();

      const { insertedId } = await db.collection("tokens").insertOne(args);
      const token = await db.collection("tokens").findOne({ _id: insertedId });

      return { ...token };
    },
  },
};
