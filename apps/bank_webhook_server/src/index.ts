import express from 'express';
import db from '@repo/prisma/client';
const app = express();
app.use(express.json())
// listening feedbck from banks
app.post('/axisbank', async (req, res) => {
    console.log('request', req.body)
    const TransInformation = {
        token: req.body.token,
        userId: req.body.id,
        amount: req.body.amount ,
        balanceId : req.body.balanceId
    };

    try {
        console.log('TransInformation.userId', TransInformation.userId)
        // await db.$transaction([
        //     db.balance.update({
        //         where: {
        //             // user : TransInformation.userId
        //             userId: TransInformation.balanceId,
        //             // userId : TransInformation.balanceId
        //         },
        //         data: {
        //             amount: {
        //                 increment: TransInformation.amount
        //             }
        //         }
        //     }),
        //     db.onRampTransaction.update({
        //         where: {
        //             userId: TransInformation.userId,
        //             token: TransInformation.token
        //         },
        //         data: {
        //             status: "success"
        //         }
        //     })
        // ]);

        res.status(200).json({
            message: "captured transaction feedback from webhook"
        });
    } catch (err) {
        console.log(err);
        res.status(411).json({
            message: "transaction failed"
        });
    }
});

app.listen(3003)
