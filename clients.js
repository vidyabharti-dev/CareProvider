// clients.js
const CLIENT_REGISTRY = {
    // This is the client ID you will give to your consumers
    "swft-client-prod": {
        // This is the client secret you will give to your consumers
        client_secret: "a1b2c3d4e5f6g7h8", 
        scopes: ["read:data", "write:hash"]
    },
    // You can add more clients here if needed
    // "another-client": {
    //     client_secret: "some-other-secret-key",
    //     scopes: ["read:data"]
    // }
};

module.exports = {CLIENT_REGISTRY};
