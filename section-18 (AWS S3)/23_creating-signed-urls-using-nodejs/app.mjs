import { getSignedS3Url } from "./urlSigner.js";

const signedUrl = getSignedS3Url({
  bucketName: "procodrr-nodejs-bucket",
  objectKey: "img/backend.webp",
  method: 'GET',
  // contentType: 'image/png'
});

console.log(signedUrl);
