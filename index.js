// // server.js (MODIFIED for Single Port / Cloud Deployment)
// const express = require("express");
// const bodyParser = require("body-parser");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const crypto = require("crypto");

// // Load environment variables from .env file
// dotenv.config();
// const { writeToCollection } = require("./db"); // <-- Import helper
// // --- Configuration Constants ---
// const {CLIENT_REGISTRY} = require("./clients");
// const LOCAL_PORT = 3000; // Use this for local fallback
// const JWT_SECRET = process.env.JWT_SECRET;
// const TOKEN_AUDIENCE = process.env.TOKEN_AUDIENCE;
// const CANDIDATE_KEY = process.env.CANDIDATE_KEY; // For temporary script

// // =============================================================
// // I. AUTHORIZATION SERVER (TOKEN SERVER) ROUTES
// // =============================================================
// const app = express();
// // app.set('trust proxy', true); 
// // The token endpoint uses urlencoded body, so we set that up first.
// app.use(bodyParser.urlencoded({extended: true}));

// // The OAuth 2.0 Token Endpoint
// app.post("/oauth/token", (req, res) => {
//   const {grant_type, client_id, client_secret} = req.body;
// console.log(req.body+" req.body");
//   if (grant_type !== "client_credentials") {
//     return res.status(400).json({error: "unsupported_grant_type"});
//   }
//   if (!client_id || !client_secret) {
//     return res.status(400).json({
//       error: "invalid_request",
//       error_description: "Missing client_id or client_secret",
//     });
//   }

//   const client = CLIENT_REGISTRY[client_id];
//   if (!client || client.client_secret !== client_secret) {
//     return res.status(401).json({error: "invalid_client"});
//   }

//   const payload = {
//     sub: client_id,
//     aud: TOKEN_AUDIENCE,
//     scopes: client.scopes,
//   };

//   const accessToken = jwt.sign(payload, JWT_SECRET, {
//     expiresIn: "1h",
//     issuer: "swift-auth-server",
//   });

//   res.json({
//     access_token: accessToken,
//     token_type: "Bearer",
//     expires_in: 3600,
//     scope: client.scopes.join(" "),
//   });
// });

// // =============================================================
// // II. RESOURCE SERVER (API ENDPOINT) ROUTES
// // =============================================================

// // Since the Resource Server uses JSON body, we add the JSON body parser.
// // Placing it here ensures it applies to subsequent routes (the resource endpoint).
// app.use(bodyParser.json());

// /**
//  * Generates the expected HMAC-SHA256 hash (the signature).
//  * ... (Function remains unchanged)
//  */
// function generateVerificationHash(examid_1, examid_2, secretKey) {
//   if (!secretKey) {
//     throw new Error(
//       "Internal error: Secret key not provided to hashing function."
//     );
//   }
//   const message = `${examid_1}${examid_2}`;
//   const hmac = crypto.createHmac("sha256", secretKey);
//   hmac.update(message);
//   return hmac.digest("hex");
// }

// /**
//  * Middleware to check the OAuth 2.0 Bearer Token (Layer 1 Security)
//  * ... (Function remains unchanged)
//  */

// // Use a new collection name

// function verifyToken(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       error: "unauthorized",
//       description: "Bearer token missing or malformed.",
//     });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET, {
//       audience: process.env.TOKEN_AUDIENCE,
//     });
//     req.client = decoded;
//     next();
//   } catch (err) {
//     return res
//       .status(401)
//       .json({error: "invalid_token", description: err.message});
//   }
// }
// const NEW_COLLECTION_NAME = "SwiftrinityExamLogs";

// // -------------------------------------------------------------
// // Temporary Hash Script for Initial Test Output
// // -------------------------------------------------------------
// const TEMP_EXAMID_1 = "T101";
// const TEMP_EXAMID_2 = "E202";

// try {
//   const tempHash = generateVerificationHash(
//     TEMP_EXAMID_1,
//     TEMP_EXAMID_2,
//     CANDIDATE_KEY
//   );
//   console.log("-----------------------------------------");
//   console.log(
//     `RESOURCE URL (Example Path): /${TEMP_EXAMID_1}/swiftrinityexam/v1/${TEMP_EXAMID_2}`
//   );
//   console.log("HASH GENERATED (For Reference):");
//   console.log(tempHash);
//   console.log("-----------------------------------------");
// } catch (e) {
//   console.error(`ERROR: Could not run hash generator: ${e.message}`);
// }
// // -------------------------------------------------------------

// // *** RESOURCE SERVER ROUTE IS NOW MOUNTED ON THE MAIN 'app' INSTANCE ***
// app.post(
//   "/:examid_1/swiftrinityexam/v1/:examid_2", // Dynamic URL IDs
//   verifyToken, // Layer 1: OAuth Token Check
//   async (req, res) => {
//     // 1. Extract inputs
//     const {examid_1, examid_2} = req.params;
//     const receivedCandidateKey = req.headers.candidatekey;
//     console.log(receivedCandidateKey+"  canddiate key");

//     // --- Validation Checks ---
//     if (!receivedCandidateKey) {
//       return res.status(400).json({
//         error: "missing_header",
//         description: "The candidatekey header is required.",
//       });
//     }
//     console.log(req.params+" req.params");

//     const executionDateTime = new Date().toISOString();
//  // const ipAddress =
//  //      req.headers["x-forwarded-for"] || req.socket.remoteAddress;

//         const ipHeader = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
//     const ipAddressArray = ipHeader
//       ? ipHeader.split(",").map((ip) => ip.trim())
//       : [];
    
//     try {
//       // 2. Generate the required hash (Signature generation logic)
//       const generatedHash = generateVerificationHash(
//         examid_1,
//         examid_2,
//         receivedCandidateKey
//       );

//       console.log(
//         `[LOG] SUCCESS: Request from client ${req.client.sub} validated. Signature calculated.`
//       );
// const apiResponse = {
//   status: "success",
//   message: "Signature generated successfully.",
//   ipAddress: ipAddressArray,
//   exam_info: { examid_1, examid_2, executionDateTime },
//   candidatekey:receivedCandidateKey,
//   response: generatedHash,
// };

//       const logData = {
//   authenticated_client: req.client.sub,
//   examid_1,
//   examid_2,
//   responseHash: generatedHash,
//   candidatekey: receivedCandidateKey,
//   ipAddressArray,
//   executionDateTime,
// };

//     await writeToCollection(NEW_COLLECTION_NAME, apiResponse);

// // Log the response
// console.log(`[LOG] API Response:`, apiResponse);
//       // 3. Final API Response
//       return res.json({
//         status: "success",
//         message: "Signature generated successfully.",
//         ipAddress: ipAddressArray,
//           candidatekey: receivedCandidateKey,
//         exam_info: {examid_1, examid_2, executionDateTime},
//         response: generatedHash,
//       });
//     } catch (error) {
//       console.error("API Error:", error.message);
//       return res
//         .status(500)
//         .json({error: "server_error", description: error.message});
//     }
//   }
// );

// // =============================================================
// // III. SINGLE LISTEN CALL FOR DEPLOYMENT
// // =============================================================

// // Use the port provided by the hosting environment (Render), or fallback to LOCAL_PORT (3000)
// const FINAL_PORT = process.env.PORT || LOCAL_PORT;

// app.listen(FINAL_PORT, () => {
//   console.log(`Unified Server running on http://localhost:${FINAL_PORT}`);
//   console.log(`TOKEN_URL: http://localhost:${FINAL_PORT}/oauth/token`);
// });
