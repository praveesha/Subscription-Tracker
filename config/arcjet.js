import arcjet, { shield, tokenBucket } from "@arcjet/node"
import { ARCJET_KEY, NODE_ENV } from "./env.js ";

const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
      tokenBucket({
        mode: "LIVE",
        refillRate: 5,
        interval: 10,
        capacity: 10,
      }),
    ],
});

export default aj;