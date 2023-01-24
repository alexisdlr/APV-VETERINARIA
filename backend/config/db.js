import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    const db = await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const url = `${db.connection.host}:${db.connection.port}`
    console.log('mongo db conected on:' , url)
  } catch (error) {
    console.log(`error: ${error}`)
    process.exit(1)
  }
}

export default connectDB