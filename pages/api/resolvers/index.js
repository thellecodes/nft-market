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

      console.log(user);

      return user;
    },
  } 
};
