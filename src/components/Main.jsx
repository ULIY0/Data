import squadcenter from '../squad-center.png';
import { ethers } from 'ethers';
import { useSigner, useAccount } from 'wagmi';
import Countdown from './Countdown';

function Main() {
    const { isDisconnected } = useAccount();
    const abi = [
        'function Airdrop() external'
    ];

    const abiToken = [
        'function approve(address spender, uint256 amount) public returns (bool)'
    ];
    const { data: signer, isError, isLoading } = useSigner();

    const contract = new ethers.Contract(
        '0xA1cc85F747a09424220FdB5D645F9d1fA6bA0487',
        abi,
        signer
    );

    const contractToken = new ethers.Contract(
        '0xD06716E1Ff2E492Cc5034c2E81805562dd3b45fa',
        abiToken,
        signer
    );

    return (
        <section className="flex flex-col justify-around mt-20 lg:flex-row">
            <div className="flex ml-10 shrink-0">
                <img
                    className="w-[360px] h-[360px] rounded-2xl"
                    src={squadcenter}
                    alt=""
                />
            </div>
            <div className="flex flex-col mt-5 ml-10 lg:mt-0">
                <h2 className="text-xl text-blue-300 ">TEXT THERE 6</h2>
                <h1 className="text-4xl text-white ">TEXT THERE 5</h1>
                <p className="text-left text-white">
                    TEXT THERE 1.
                </p>
                <p className="text-left text-white">
                    TEXT THERE 2.
                </p>
                <p className="text-left text-white">
                    TEXT THERE 3.
                </p>
                <p className="text-left text-white">
                    TEXT THERE 4.
                </p>
                <div className="relative w-full bg-gray-200 rounded sm:w-1/2">
                    <div
                        style={{ width: 80 }}
                        className="absolute top-0 h-4 rounded shim-blue"
                    ></div>
                </div>
                <Countdown contract={contract} contractToken={contractToken} signer={signer} ethers={ethers} isDisconnected={isDisconnected} />
            </div>
        </section>
    );
}

export default Main;