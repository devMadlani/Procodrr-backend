import { SlowBuffer } from "buffer";
import crypto from "crypto";

const salt = crypto.randomBytes(16);

crypto.pbkdf2("Mdr@111", salt, 100000, 32, "sha256", (err, data) => {
  console.log(data.toString("base64url") + "." + salt.toString("base64url"));
});
