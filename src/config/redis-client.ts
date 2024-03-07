import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST, // service name
  port: process.env.REDIS_PORT, //  port
  enableAutoPipelining: true,
});
