import Redis from "ioredis";

// Use environment variable for cloud Redis URL
const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
  console.log("Redis Connected");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redis;
