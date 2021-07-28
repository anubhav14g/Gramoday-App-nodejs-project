const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const userReportSchema = new mongoose.Schema({
    username: {
        type: Date,
        unique: true,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    marketID: {
        type: String,
        required: true,
    },
    cmdtyID: {
        type: String,
        required: true,
    },
    marketName:{
        type: String,
    },
    marketType:{
        type: String,
    },
    cmdtyName:{
        type: String,
    },
    priceUnit:{
        type: String,
    },
    convFctr:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    }
}
,
{
  timestamps: true
});
userReportSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("userReport",userReportSchema);