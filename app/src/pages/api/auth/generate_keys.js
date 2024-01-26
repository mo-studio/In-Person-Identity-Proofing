#!/usr/bin/env node

// From https://github.com/18F/identity-oidc-nodejs-express

const jose = require("node-jose");
const fs = require("fs");

// Set the properties used in generating the keys
const props = {
  kty: "RSA",
  e: "AQAB",
  kid: "my_rsa_key", // set this to whatever you'd like your key id to be
  alg: "RS256",
};

const pub_key_file = "../pub_key.jwk";
const full_key_file = "../full_key.jwk";

// Create a keystore
keystore = jose.JWK.createKeyStore();

// Generate the key using 2048 bits
keystore
  .generate("RSA", 2048, props)
  .then((result) => {
    key = result;
    // write out the public key
    fs.writeFileSync(pub_key_file, JSON.stringify({ keys: [key.toJSON()] }));
    // write out the public/private key (DO NOT SHARE!)
    fs.writeFileSync(
      full_key_file,
      JSON.stringify({ keys: [key.toJSON(true)] })
    );
  })
  .catch((err) => {
    console.log(err);
  });
