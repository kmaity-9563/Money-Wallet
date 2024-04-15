import express from 'express';
import db from '@repo/prisma/client';

const app = express();

app.post('/axisbank', async (req, res) => {
    const TransInformation = {
        token: req.body.token,
        userId: req.body.id,
        amount: req.body.amount
    };

    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: TransInformation.userId
                },
                data: {
                    amount: {
                        increment: TransInformation.amount
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                    userId: TransInformation.userId
                },
                data: {
                    status: "success"
                }
            })
        ]);

        res.status(200).json({
            message: "captured transaction"
        });
    } catch (err) {
        console.log(err);
        res.status(411).json({
            message: "transaction failed"
        });
    }
});

export default app;
