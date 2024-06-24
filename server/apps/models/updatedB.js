import mongoose from 'mongoose';
import Subscriber from './subscriberModel.js';

export const updatedB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const result = await Subscriber.updateMany(
      { 'subcriptionStatus.daysOptedOut': { $exists: true } },
      { $set: { 'subcriptionStatus.comments': '' } }
    );

    console.log('Documents updated:', result.nModified);
  } catch (error) {
    console.error('Error updating documents:', error);
  } finally {
    await mongoose.disconnect();
  }
};
