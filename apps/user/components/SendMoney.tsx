"use client"
// import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { p2ptransfer } from "../app/lib/action/p2ptransfer";

export function SendMoney() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    return <div className="h-[90vh]">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <button onClick={async () => {
                            await p2ptransfer(number, Number(amount) * 100)
                        }}>Send</button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}