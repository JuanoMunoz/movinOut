import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URI as string).then(() => {
    console.log('conectado a atlas')
}).catch(e=>console.error(e))