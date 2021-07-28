const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const aggregateReportSchema = new mongoose.Schema({
    username: {
        type: Date,
        unique: true,
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
    cmdtyName:{
        type: String,
    },
    users:{
        type: Array,
        default: [],
    },
    priceUnit:{
        type: String,
        default: "Kg"
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
aggregateReportSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("aggregateReport",aggregateReportSchema);