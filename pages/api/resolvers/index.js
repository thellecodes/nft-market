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
      const { tokenId } = args;
      const token = await db.collection("tokens").findOne({ tokenId });

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

    listToken: async (parent, args) => {
      const { db } = await connectToDatabase();
      console.log(args);

      const res = await db
        .collection("tokens")
        .findOneAndUpdate(
          { tokenId: args.tokenId },
          { $set: { listed: true } },
          { upsert: true, returnDocument: "after" }
        );

      return res.value;
    },

    auctionToken: async (parent, args) => {
      const { db } = await connectToDatabase();

      const res = await db
        .collection("tokens")
        .findOneAndUpdate(
          { tokenId: args.tokenId },
          { $set: { inAuction: true } },
          { upsert: true, returnDocument: "after" }
        );

      return res.value;
    },
  },
};
