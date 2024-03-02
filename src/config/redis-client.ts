import RedisStore from "connect-redis";
import Redis from "ioredis";

export const redis = new Redis({
	host: process.env.VITE_REDIS_HOST as string, // service name
	port: process.env.VITE_REDIS_PORT as unknown as number, //  port
	enableAutoPipelining: true,
});
export const store = new RedisStore({
	client: redis,
});
