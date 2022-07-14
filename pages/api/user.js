const { connectToDatabase } = require("../../lib/db");

export default async function handler(req, res) {
  // connect to the database
  const { db } = await connectToDatabase();
  //* Methods: GET, POST, PUT, DELETE

  // switch the methods
  switch (req.method) {
    case "GET": {
      //   try {
      //     // add the post
      //     await db.collection("users").find(JSON.parse(req.body));
      //     // return a message
      //     return res.json({
      //       message: "User added successfully",
      //       success: true,
      //     });
      //   } catch (error) {
      //     // return an error
      //     return res.json({
      //       message: new Error(error).message,
      //       success: false,
      //     });
      //   }
      return res.json({
        data: "user found",
      });
    }
  }
}
