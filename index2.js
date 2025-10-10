// // index.js
// const express = require("express");
// const admin = require("firebase-admin");
// const crypto = require("crypto");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// const PORT = process.env.PORT || 8080;

// // ----------------------
// // 1️⃣ Initialize Firebase Admin with Service Account
// // ----------------------
// // const serviceAccountPath = path.join(__dirname, "./service-account.json"); // Path to your downloaded JSON
// // const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
// const serviceAccountPath = path.join("/etc/secrets", "service-account.json");
// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();
// console.log("✅ Firebase Admin initialized with Service Account");

// // ----------------------
// // 2️⃣ Middleware
// // ----------------------
// app.use(
//   cors({
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "candidatekey"],
//   })
// );
// app.use(express.json());

// // Log incoming requests
// app.use((req, res, next) => {
//   console.log(`🟡 Incoming Request → ${req.method} ${req.originalUrl}`);
//   next();
// });

// // ----------------------
// // 3️⃣ Test Endpoints
// // ----------------------
// app.get("/", (req, res) => {
//   res.send("Welcome to the Care Provider API!");
// });

// app.get("/ping", (req, res) => {
//   res.json({message: "pong"});
// });

// // ----------------------
// // 4️⃣ Exam Hash Endpoint
// // ----------------------
// app.get("/:examid_1/swiftrinityexam/v1/:examid_2", async (req, res) => {
//   try {
//     const {examid_1, examid_2} = req.params;
//     const candidatekey = req.headers["candidatekey"];

//     if (!candidatekey) {
//       return res
//         .status(403)
//         .json({error: "Forbidden: 'candidatekey' header is missing."});
//     }

//     // IP address
//     const ipAddress =
//       req.headers["x-forwarded-for"] || req.socket.remoteAddress;

//     // Generate HMAC-SHA256 hash
//     const message = `${examid_1}${examid_2}`;
//     const hmac = crypto.createHmac("sha256", candidatekey);
//     hmac.update(message);
//     const responseHash = hmac.digest("hex");
//     const executionDateTime = new Date().toISOString();

//     // Log to Firestore
//     const logData = {
//       authenticated_service_account: serviceAccount.client_email,
//       examid_1,
//       examid_2,
//       responseHash,
//       candidatekey_used: candidatekey,
//       ipAddress,
//       executionDateTime,
//     };

//     await db.collection("ExamLogs").add(logData);

//     console.log(`🟢 Exam hash logged: ${examid_1}/${examid_2}`);

//     res.status(200).json({
//       response: responseHash,
//       executionDateTime,
//     });
//   } catch (error) {
//     console.error("🔥 Error in endpoint:", error);
//     res
//       .status(500)
//       .json({error: "Internal server error", details: error.message});
//   }
// });

// // ----------------------
// // 5️⃣ Start Server
// // ----------------------
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
