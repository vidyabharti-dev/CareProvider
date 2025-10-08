const express = require("express");
const admin = require("firebase-admin");
const crypto = require("crypto");
const cors = require("cors"); // Import CORS
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: 'http://localhost:8080',  // Allow your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));


admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
});

const db = admin.firestore();





// Initialize Firebase Admin SDK with service account credentials
// admin.initializeApp({
//   credential: admin.credential.cert({
//     type: "service_account",
//     projectId: "online-2f802",  // Your Firebase Project ID
//     privateKeyId: "e5593f7a8c01ff9fd21c21bc9c8a218d966ed006",  // Private key ID
//     privateKey: `-----BEGIN PRIVATE KEY-----
// MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCq1ev4zgMwgaHp
// UuLP1l8emTKwO7G2/G9+Ul/F2m54TBbTPFeRy/2Pdw2+8Qz/MfG5Nv9rcfOLmfoU
// tiQvyBQ+ay5ZHA6e3uVZBWBYx7DU21Gl/b/NYrNa+d0sRJg/xb3B/c8mJd1b22EB
// 39SIKuCZ/O2a78LnPIFhdgFk9WWapxYxUfZWEcuHMLz6BlRhvEinNQo8alX487W/
// bWAfZ/oHzFa9IYfYNjseyaKom6ZLWy7Gb6cxakkUjQl4xjXrpOj3hMq1mlfm7Aba
// MPRQxknb4jVU/XRFMX936/XwaR/Fuc2NMmhEwiMaPznkU+AiIqnBWU1EiAfz1FZ9
// uvEvdNCBAgMBAAECggEAAg7YrGMi87MkFbD7bYCKHc6/pxLZBbjNyQpKABKtEQLt
// pXbNIUMBV3iaMEosG2jpHg+VDSDOy8g7lINLNU4mPEhDQyyM2ooZ3jQr4HXrYe0Q
// czz20g0V1ws6iF19Lgt+STd7Bt0e6QvgA8tD/q3xjblXzW2E/g8jCd8HjkVMh4vl
// sm27JJ4VT3eSQGnxJOa5jx8lzfYjJmwIAN+W8ZoYLurE1pdU55JM3ISJ7rOZvVI9
// aq3bAByhsVAMOhEVsbeh/a1yVOXv9IgQD+npcdY6/TyWNeRKwo5UVHsP2yfYURRP
// RhHWHpbh5evRcv0Cr8u6lkiLl7H90i9pZe9hSZgwNwKBgQDfLofA7OyVKcb9VvTO
// JJ8uNR5oddmvzLVc53hi1vW3PdKhsjWk2y5v0Mg20kk32oyEhtLqz1OCGOTEetab
// DYxZB1Ls0hZ7aoSDMNcBL593aT2mVyfDHXYItvizAXq/YIEKAnTbl6SZDqdYWPyg
// K6vwZa/sbgSWRZ49eB8i/S42BwKBgQDD9N7GkHgVRkRjZBmcqcgpP8L/c0AJDTfi
// 2GnH4XuSY9mvad+Q+6rBJlEKzod3Yg9wZSM+a5yYoewwM9LS3apo7Uv3ZKTSHrBH
// hQsKEi3Zl5VV7fID48WNg2BtLZwGRtzijCnzpsqyJ5I/pCjTE1mUOg7pHAoBRMCw
// qUSCKqnjNwKBgQCfd1TCccc9cWNgYwB6RsqCLqwygXpwVXmFD1MCdIuPSZo1tOsF
// hyKv/GMCYNC2Gu9qRhdwdYE6pOTYytiKY2zTtBr5Ycd0mZBjWMNXcpqjrMvDDeU4
// UdWjtnEPHlCBa8fnygeLW9fdEQ5bXwHqxCmPlGjWK2oVoVrGmwzMaFDbgwKBgQCi
// 0v2pkLG3O8Pnsm11t74SSGEHUgSLgOhHHfwHklzTrxRapWaXWgbwp53/lM0LbffW
// NLOsUk60pRdUljs/6+CFf2f4ETDDR6zCQNKDc8eVXldAJ49JnCGzDM866QMUVB2G
// QWE6jAUxM6BaMVWaziFJAVUSbbICi9Zw9LVwU3MG0QKBgQCEwnz0acrUogyKBX+s
// CtdR2pha1XaZ2FLW1wa+iM1fp0L9JpjJJjVuR0YB6BGq8KMm0tgGZpyvPGRipeaN
// PWaiHWfs/gwjvmzPUAUkA0nJvwRO/P5KvO/z6iFJIHr6Y8c+zxODTw/kgKQc4wOD
// ffPduwbdBoqVsebJw93OfOdGtQ==
// -----END PRIVATE KEY-----`,  // Add the private key here directly
//     clientEmail: "firebase-adminsdk-2q6so@online-2f802.iam.gserviceaccount.com",  // Client Email
//     clientId: "114630557108245892265",  // Client ID
//     authUri: "https://accounts.google.com/o/oauth2/auth",
//     tokenUri: "https://oauth2.googleapis.com/token",
//     authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
//     clientX509CertUrl: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2q6so%40online-2f802.iam.gserviceaccount.com"
//   })
// });


// Middleware to parse JSON request bodies
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Care Provider API!");
  });

// New Endpoint Implementation: Swiftrinity Exam Hash Generator
// Endpoint: https://<baseurl>/<examid_1>/swiftrinityexam/v1/{examid_2}
app.get("/:examid_1/swiftrinityexam/v1/:examid_2", async (req, res) => {
  // -----------------------------------------------------------
  // 🔑 STEP 1: OAuth Authentication Check (ID Token / Bearer)
  // -----------------------------------------------------------
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Missing or malformed OAuth token
    return res
      .status(401)
      .send({error: "Unauthorized: Bearer token is missing or malformed."});
  }

  const idToken = authHeader.split("Bearer ")[1];
  let decodedToken;

  try {
    decodedToken = await admin.auth().verifyIdToken(idToken);
  } catch (error) {
    console.error("Token verification error:", error.message);
    // Token is invalid, expired, or tampered with
    return res
      .status(401)
      .send({error: "Unauthorized: Invalid or expired access token."});
  }

  // -----------------------------------------------------------
  // 🔑 STEP 2: HMAC Credential Check and Logic
  // -----------------------------------------------------------
  const {examid_1, examid_2} = req.params;
  const candidatekey = req.headers["candidatekey"]; // Header: candidatekey (HMAC Secret Key)

  // Check for the required HMAC Secret Key
  if (!candidatekey) {
    // Change status code from 400 to 403 (Forbidden) for a missing required secret credential
    return res.status(403).send({
      error:
        "Forbidden: 'candidatekey' header is missing. A required secret credential is not provided.",
    });
  }

  // Get the caller's IP address
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // 2. Generate HMAC-SHA256 Hash
  try {
    const message = `${examid_1}${examid_2}`;
    const hmac = crypto.createHmac("sha256", candidatekey);
    hmac.update(message);
    const responseHash = hmac.digest("hex");
    const executionDateTime = new Date().toISOString();

    // 3. Save to Database (Firestore)
    const logData = {
      authenticated_uid: decodedToken.uid, // Log the UID from the validated OAuth token
      examid_1,
      examid_2,
      responseHash: responseHash,
      // WARNING: While sensitive, you were logging this key. Ensure your DB is highly secure.
      candidatekey_used: candidatekey,
      ipAddress: ipAddress,
      executionDateTime: executionDateTime,
    };

    await db.collection("ExamLogs").add(logData);

    console.log(
      `Exam hash generated and logged for: ${examid_1}/${examid_2} by UID ${decodedToken.uid}`
    );

    // 4. Return the Required Response
    res.status(200).json({
      response: responseHash,
      executionDateTime: executionDateTime,
    });
  } catch (error) {
     console.error("Full error object in endpoint:");
  console.error(error); // This will log the complete error with stack trace
    // console.error("HMAC Hash or DB Log Error:", error);
    res.status(500).send({
      error: "Internal server error during hash generation or logging.",
    details: error.message // Sending the actual error message to the client
    });
  }
});


// Define the GET API for fetching Care Provider by pyGUID
app.get("/getCareProvider", async (req, res) => {
  const pyGUID = req.query.pyGUID;
  if (!pyGUID) return res.status(400).send("pyGUID is required");

  try {
    const doc = await db.collection("CareProviders").doc(pyGUID).get();
    if (!doc.exists) return res.status(404).send("Care Provider not found");

    res.json(doc.data());
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// GET API for fetching all Care Providers

  app.get("/getAllCareProviders", async (req, res) => {
  try {
    const snapshot = await db.collection("CareProviders").get(); // Fetch all documents in the "CareProviders" collection

    if (snapshot.empty) {
      return res.status(404).send("No Care Providers found");
    }

    const careProviders = [];
    snapshot.forEach(doc => {
      careProviders.push(doc.data());
    });

    res.json(careProviders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching Care Providers: " + err.message);
  }
});


// POST API for adding a new Care Provider
app.post("/addCareProvider", async (req, res) => {
  const careProviderData = req.body; // Expected to send JSON body

  if (!careProviderData.pyGUID) {
    return res.status(400).send("pyGUID is required");
  }

  try {
    const docRef = await db.collection("CareProviders").doc(careProviderData.pyGUID).set(careProviderData);
    res.status(201).send({ message: "Care Provider added successfully", id: docRef.id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding Care Provider: " + err.message);
  }
});


// POST API for adding a payment
// app.post("/transaction", async (req, res) => {
//   const transaction = req.body; // Expected to send JSON body
//   console.log('Received transaction request:', req.body); // Add this line


//   // Validate required fields
//   if (!transaction.AccountID || !transaction.TransactionType || !transaction.Amount|| !transaction.RecipientID|| !transaction.Description|| !transaction.UserID) {
//     return res.status(400).send("AccountID, TransactionType,RecipientID,Amount and Name are required.");
//   }

//   try {
//     // Use Firestore's `add` method to automatically generate an ID
//     const docRef = await db.collection("Transaction").add(transaction);
    
//    // Then, update the newly created doc with the pyGUID (same as the doc ID)
//     await docRef.update({ pyGUID: docRef.id });

//     // Respond with the auto-generated ID
//     res.status(201).send({
//       message: "successfully transaction",
//       pyGUID: docRef.id, // Firestore automatically generates the ID
//     });
//   } catch (err) {
//     res.status(500).send("Error in transaction: " + err.message);
//   }
// });




app.post("/transaction", async (req, res) => {
  const transaction = req.body;
  console.log('Received transaction request:', transaction);

  // Validate required fields
  const requiredFields = ["AccountID", "TransactionType", "Amount", "RecipientID", "Description", "UserID"];
  for (const field of requiredFields) {
    if (!transaction[field]) {
      return res.status(400).send(`${field} is required.`);
    }
  }

  // Generate TransactionID
  const generateTransactionID = () => {
    const random = Math.floor(1000 + Math.random() * 9000); // Random 4-digit
    return `TXN${Date.now().toString().slice(-6)}${random}`;
  };
  transaction.TransactionID = generateTransactionID();

  try {
    const docRef = await db.collection("Transaction").add(transaction);

    // Optionally add doc ID as pyGUID
    await docRef.update({ pyGUID: docRef.id });

    res.status(201).send({
      message: "Transaction successfully created",
      pyGUID: docRef.id,
      TransactionID: transaction.TransactionID
    });
  } catch (err) {
    res.status(500).send("Error in transaction: " + err.message);
  }
});


// GET API for fetching all Care Providers
app.get("/GetAllTransaction", async (req, res) => {
  try {
    const snapshot = await db.collection("Transaction").get(); // Fetch all documents in the "Transaction" collection

    if (snapshot.empty) {
      return res.status(404).send("No Data found");
    }

    const transactions = [];
    snapshot.forEach(doc => {
      transactions.push({
        pyGUID: doc.id,
        ...doc.data()
      });
    });

    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching transactions: " + err.message);
  }
});

app.get("/getTransaction", async (req, res) => {
  const pyGUID = req.query.pyGUID;
  if (!pyGUID) return res.status(400).send("pyGUID is required");

  try {
    const doc = await db.collection("Transaction").doc(pyGUID).get();
    if (!doc.exists) return res.status(404).send("pyGUID not found");
   // Combine the data with pyGUID
    const transaction = {
      pyGUID: doc.id,
      ...doc.data()
    };
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
// PUT API for updating an existing Care Provider
app.put("/updateCareProvider", async (req, res) => {
  const { pyGUID, data } = req.body; // Expecting pyGUID and the data to update

  if (!pyGUID || !data) {
    return res.status(400).send("pyGUID and data are required");
  }

  try {
    const docRef = db.collection("CareProviders").doc(pyGUID);

    // Update the Care Provider data
    await docRef.update(data);

    res.status(200).send({ message: "Care Provider updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating Care Provider: " + err.message);
  }
});

// DELETE API for removing a Care Provider by pyGUID
app.delete("/deleteCareProvider/:pyGUID", async (req, res) => {
  const pyGUID = req.params.pyGUID;

  if (!pyGUID) {
    return res.status(400).send("pyGUID is required");
  }

  try {
    const docRef = db.collection("CareProviders").doc(pyGUID);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("Care Provider not found");
    }

    await docRef.delete();

    res.status(200).json({ message: `Care Provider with pyGUID ${pyGUID} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting Care Provider: " + err.message);
  }
});


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/*
get 

fetch("http://localhost:8080/getCareProvider?pyGUID=67890")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));


  post

  fetch("http://localhost:8080/addCareProvider", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    pyGUID: "67890",
    name: "Jane Smith",
    specialization: "Dermatology",
    email: "janesmith@example.com",
    phone: "123-456-7890"
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));


put

fetch("http://localhost:8080/updateCareProvider", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    pyGUID: "12345",
    data: { specialization: "Neurology" }
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));


delete

fetch("http://localhost:8080/deleteCareProvider/12345", {
  method: "DELETE"
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));


*/
