const router = require("express").Router()
const UserReport = require("../models/userReport");
const AggregateReport = require("../models/aggregateReport");

router.post("/post/reports",async (req,res)=>{
    try{
        const newReport= new UserReport({
            "userID": req.body.userID,
            "marketID": req.body.marketID,
            "cmdtyID": req.body.cmdtyID,
            "marketName": req.body.marketName,
            "marketType": req.body.marketType,
            "cmdtyName": req.body.cmdtyName,
            "priceUnit": req.body.priceUnit,
            "convFctr": Number(req.body.convFctr),
            "price": Number(req.body.price),
            "username": new Date()
        })
        const savedReport=await newReport.save();
        console.log(savedReport);

        let reportID;

        const aggregateReport= await AggregateReport.findOne({"marketID":req.body.marketID,"cmdtyID":req.body.cmdtyID});
        if(aggregateReport){
            let user_array= aggregateReport.users;
            let add_price= Number(req.body.price/req.body.convFctr);
            let totalsum= Number(aggregateReport.price)*user_array.length;
            totalsum+=add_price;
            user_array.push(req.body.userID);
            aggregateReport.price=Number(totalsum/user_array.length);
            aggregateReport.users=user_array;
            aggregateReport.save();
            reportID=aggregateReport._id;
        }
        else{
            let array=[];
            array.push(req.body.userID);
            const newAggregateReport= new AggregateReport({
                "marketID": req.body.marketID,
                "cmdtyID": req.body.cmdtyID,
                "marketName": req.body.marketName,
                "cmdtyName": req.body.cmdtyName,
                "users": array,
                "priceUnit": "Kg",
                "price": Number(req.body.price/req.body.convFctr),
                "username": new Date()
            })
            const savedAggregateReport=await newAggregateReport.save();
            console.log(savedAggregateReport);
            reportID=savedAggregateReport._id;
        }

        res.status(200).json({
            "status": "success",
            "reportID": reportID,
        });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            "status": "failure",
            "message": "Some error occured!",
        });
    }
})

router.get("/get/aggregate/reports/:report_id",async (req,res)=>{
    try{
        const aggregateReport= await AggregateReport.findById(req.params.report_id);
        res.status(200).json(aggregateReport);
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            "status": "failure",
            "message": "Some error occured!",
        });
    }
});

module.exports = router;
