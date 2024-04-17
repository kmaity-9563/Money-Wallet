"use client"
import React, { useState } from 'react';
import { createTransaction } from '../app/lib/action/createTransaction';


const AddMoneyCard = () => {
    const AvailableBank = [
        { name: 'SBI bank', redirecturl: 'https://www.onlinesbi.sbi/' },
        { name: 'HDFC bank', redirecturl: 'https://www.hdfcbank.com/' },
        { name: 'Axis bank', redirecturl: 'https://www.axisbank.com/' }
    ];
    const [value, setValue] = useState('');
    const [redirecturl, setRedirecturl] = useState(AvailableBank[0].redirecturl);
    const [provider, setProvider] = useState(AvailableBank[0].name);

    const bankChange = (e) => {
        const bankname = e.target.value;
        const selectedBank = AvailableBank.find(bank => bank.name === bankname);
        setRedirecturl(selectedBank.redirecturl);
        setProvider(selectedBank.name);
    };

    return (
        <div>
            <div className='border-b-2 border-gray-400 p-2 rounded-lg bg-slate-300'>
                <div className='flex justify-center'>
                    <h2 className='align-sub border-b-2 border-black'>Add Money</h2>
                </div>
                <h4>Amount</h4>
                <input
                    className='border-b-2 border-black'
                    value={value}
                    type="text"
                    onChange={(e) => setValue(e.target.value)}
                />
                <h4>Bank</h4>
                <select
                    className='w-56'
                    value={provider}
                    onChange={bankChange}
                >
                    {AvailableBank.map((bank, index) => (
                        <option value={bank.name} key={index}>{bank.name}</option>
                    ))}
                </select>
                <div className='flex justify-center'>
                    <button
                        className='px-4 py-2 rounded-lg my-2 align-middle'
                        onClick={async () => {
                            await createTransaction((value * 100), provider);
                            window.location.href = redirecturl 
                        }}
                    >
                        Send Money
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMoneyCard;
