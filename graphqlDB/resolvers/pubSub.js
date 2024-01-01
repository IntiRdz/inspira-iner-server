import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
export default pubSub;



/* import mongoose from 'mongoose';
import { MongodbPubSub } from 'graphql-mongodb-subscriptions';

const connectionDb = mongoose.connection;
const pubSub = new MongodbPubSub({
  connectionDb
});

export default pubSub; */
