import mongoose from "mongoose";
mongoose.connect(`mongodb+srv://juanMunoz:Amoelanime1@apirest.glytkh2.mongodb.net/movinout?retryWrites=true&w=majority&appName=ApiRest`).then(() => {
    console.log('conectado a atlas')
}).catch(e=>console.error(e))