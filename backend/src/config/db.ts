import mongoose from 'mongoose'

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("db connected")
    } catch (error) {
        console.log("error duing connection to db ",error)
    }
}
export default connectDB;