const { connectToDatabase } = require("../../lib/db");

export default async function handler(req, res) {
  // connect to the database
  const { db } = await connectToDatabase();

  // switch the methods
  switch (req.method) {
    case "POST": {
      try {
        // add the post
        await db.collection("users").insertOne(JSON.parse(req.body));
        // return a message
        return res
          .json({
            message: "User added successfully",
            success: true,
          })
          .status(200);
      } catch (error) {
        // return an error
        return res.json({
          message: new Error(error).message,
          success: false,
        });
      }
    }
  }
}
