// src/config/redisClient.ts
import {createClient} from 'redis';

const redisClient = createClient({
 url: process.env.REDIS_URL
});

redisClient.on('connect', () => {
  console.log('🔌 Connected to Redis');
});

redisClient.on('error', (err: any) => {
  console.error('❌ Redis connection error:', err);
});
redisClient.connect()
export default redisClient;
