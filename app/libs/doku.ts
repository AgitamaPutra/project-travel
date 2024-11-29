import crypto from "crypto"
import { v4 as uuidv4 } from "uuid";
import axios from "axios"


// const url = "/checkout/v1/payment"; 
const requestTimestamp = getCurrentTimestamp();
const client_id = process.env.DOKU_CLIENT_ID; // change with your client-id "BRN-...."
const secret_key = process.env.DOKU_SECRET_KEY; // change with your secret-key "SK-...."

// Generate Digest
function generateDigest(jsonBody: any) {
  let jsonStringHash256 = crypto
    .createHash("sha256")
    .update(jsonBody, "utf-8")
    .digest();

  let bufferFromJsonStringHash256 = Buffer.from(jsonStringHash256);
  return bufferFromJsonStringHash256.toString("base64");
}

function generateSignature(clientId: string, requestId: string, requestTarget: string, digest: string, secret: string) {
  // Prepare Signature Component
  let componentSignature = "Client-Id:" + clientId;
  componentSignature += "\n";
  componentSignature += "Request-Id:" + requestId;
  componentSignature += "\n";
  componentSignature += "Request-Timestamp:" + requestTimestamp;
  componentSignature += "\n";
  componentSignature += "Request-Target:" + requestTarget;
  if (digest) {
    componentSignature += "\n";
    componentSignature += "Digest:" + digest;
  }

  // Calculate HMAC-SHA256 base64 from all the components above
  let hmac256Value = crypto
    .createHmac("sha256", secret)
    .update(componentSignature.toString())
    .digest();

  let bufferFromHmac256Value = Buffer.from(hmac256Value);
  let signature = bufferFromHmac256Value.toString("base64");
  return "HMACSHA256=" + signature;
}

// Fungsi untuk mendapatkan timestamp terbaru
function getCurrentTimestamp() {
  return new Date().toISOString().slice(0, 19) + "Z";
}

export const integrateDoku = async (jsonBody: any, url: string, method: string, request_id: string) => {
  let digest = generateDigest(jsonBody);

  // Generate Header Signature
  let headerSignature = generateSignature(
    client_id!,
    request_id,
    url,
    digest,
    secret_key!
  );

  let config = {
    method: method,
    maxBodyLength: Infinity,
    url: "https://api-sandbox.doku.com" + url,
    headers: {
      "Client-Id": client_id,
      "Request-Id": request_id,
      "Request-Timestamp": requestTimestamp,
      Signature: headerSignature,
      "Content-Type": "application/json",
    },
    data: jsonBody,
  };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //       console.log();
  //       console.log(response.data.response.payment.url);
  //       return JSON.stringify(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });


  try {
    const response = await axios.request(config)
    return response.data
  } catch (err) {
    console.log(err)
    return null
  }

}



