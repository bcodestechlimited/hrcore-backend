import mongoose from 'mongoose';
import log from '../logger';
import dotenv from 'dotenv';
dotenv.config();
const option: mongoose.ConnectOptions = {
  socketTimeoutMS: 30000,
  dbName:
    process.env.NODE_ENV === 'development' ? 'HRCore-Staging' : 'HRCore-Main',
};

mongoose.set('strictQuery', false);
// mongoose.set('debug', true);
mongoose.Promise = Promise;

const connectDb = async (): Promise<void> => {
  try {
    log.info('Database connecting...');
    await mongoose.connect(process.env.MONGODB_URI, option);
    log.info('Database connected successfully');
    // mongoose.plugin(uniqueValidator);
  } catch (error) {
    log.error(error);
    throw error;
  }
};

export default connectDb;
