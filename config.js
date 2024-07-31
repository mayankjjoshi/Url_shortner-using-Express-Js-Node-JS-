import mongoose from "mongoose";

async function connectTOMongoDB(url) {
    return mongoose.connect(url);
}

export default connectTOMongoDB;