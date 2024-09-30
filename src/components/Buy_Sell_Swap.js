import React, { useState, useEffect } from 'react';
// import { getContract } from 'viem';
import { concat, numberToHex, size } from 'viem';
import { ethers } from 'ethers';
import { PERMIT2_ADDRESS, POLYGON_TOKENS } from '../utils/constants';
import { erc20Abi } from 'viem';
// import { signTypedData } from 'viem/actions';

// import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
import Web3 from 'web3';
const qs = require('qs');

/* global BigInt */
/* global ethereum */


// import '../../public/assets/index-kxuGfZR8.js';
// import '../../public/assets/index-Baf4H4x6.css';


const BuySellSwap = () => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [showCurrencyModal, setShowCurrencyModal] = useState(false); // Added state for showCurrencyModal

    const [showCurrencyModal1, setShowCurrencyModal1] = useState(false); // Added state for showCurrencyModal
    // const [selectedCurrency, setSelectedCurrency] = useState(null);
    // const [selectedCurrency1, setSelectedCurrency1] = useState(null);
    const [sellAmount, setSellAmount] = useState(0);
    const [buyAmount, setBuyAmount] = useState(0);
    const [fetched, setFetched] = useState(null)
    const [isConnected, setIsConnected] = useState(false)
    const [accountAddress, setAccountAddress] = useState(null)
    // const [signer, setSigner] = useState(null)
    const [provider, setProvider] = useState(null);
    const [currency, setCurrency] = useState(POLYGON_TOKENS[0])
    const [buyCurrency, setbuyCurrency] = useState(POLYGON_TOKENS[1])


    const checkMetaMask = async () => {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(provider)
          try {
            const accounts = await provider.listAccounts();
            // console.log(signer);
            
            // const signer = provider.getSigner()
            // setSigner(signer)
            if (accounts.length > 0) {
              setIsConnected(true);
            //   console.log(accounts[0].address);
              
              setAccountAddress(accounts[0].address); 
              // console.log(accountAddress);
              console.log(accounts[0]);   

              const network = await provider.getNetwork();


              if(network.chainId !== BigInt(137)){

              await window.ethereum.request(
                {
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x89' }],
                }
            );
          }
              
              
              
            } else {
              setIsConnected(false);
            }
          } catch (error) {
            console.error('Error checking MetaMask connection:', error);
            setIsConnected(false);
          }
        } else {
          setIsConnected(false);
        }
      };
      
      


      const connectWallet = async () => {
        try {
          await ethereum.request({ method: 'eth_requestAccounts' });
          console.log(provider);
          
          checkMetaMask();
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      };



const fetchIndicativePrice = async (sell) => {

    try{
  const priceParams = new URLSearchParams({
    chainId: currency.chainId, // Ethereum mainnet
    sellToken: currency.address, // WETH
    buyToken: buyCurrency.address, // DAI
    // sellAmount: '100000000000000000000', // 100 WETH (with 18 decimals)
    sellAmount: sell * Math.pow(10, currency.decimals),
    taker: accountAddress, // Address that will make the trade
  });
  console.log(currency.chainId, currency.address, buyCurrency.address, accountAddress.address);
  

  const headers = {
    '0x-api-key': '702e42e4-a1e1-466a-9d57-16aaea9ae2cf',
  };

  const response = await fetch(`https://api.0x.org/swap/permit2/price?${priceParams.toString()}`, { headers });
  const priceData = await response.json();
  setFetched(priceData);
  console.log(fetched);
  
  setBuyAmount((priceData.buyAmount / Math.pow(10, buyCurrency.decimals)).toFixed(3))
  console.log('Price data:', priceData);
  return priceData;
}
catch(err){
    console.log(err);
}
};

useEffect(() => {
//   fetchIndicativePrice();
}, []);


const onSellChange = async(e) =>{
    const amount = e.target.value;
    setSellAmount(amount)
    if(!amount == 0){
    fetchIndicativePrice(amount)
    }
}





const web3 = new Web3(window.ethereum);

const setAllowance = async () => {
  const tokenAddress = currency.address; // ERC20 token contract address
  const spender = PERMIT2_ADDRESS; // Permit2 contract address
//   const amount = web3.utils.toWei('100', 'ether'); // Amount of tokens (in wei)
  const amount = sellAmount * Math.pow(10, currency.decimals)
  console.log(amount);

  const tokenAbi = [
    {
      constant: false,
      inputs: [
        {
          name: 'spender',
          type: 'address',
        },
        {
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [
        {
          name: '',
          type: 'bool',
        },
      ],
      type: 'function',
    },
  ];

  const tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress);
  const accounts = await web3.eth.getAccounts();
  const fromAddress = accounts[0];

  tokenContract.methods
    .approve(spender, amount)
    .send({ from: fromAddress })
    .on('transactionHash', (hash) => {
      console.log('Transaction Hash:', hash);
    //   const signature = await signer.signTypedData(quote.permit2.eip712);
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      console.log('Transaction confirmed :', confirmationNumber, receipt);
    })
    .on('error', (error) => {
      console.error('Error in transaction:', error);
    });
};


const executeSwap = async (quote) => {
    try {

        // const gasEstimate = await web3.eth.estimateGas({
        //     from: accountAddress,
        //     to: quote?.transaction.to,
        //     data: quote?.transaction.data,
        //     value: sellAmount * Math.pow(10, currency.decimals), // If no ETH is being sent along with the transaction
        //   });
          

    const transactionParameters = {
        from: accountAddress,
        gas: quote?.transaction.gas,
        // gas: web3.utils.toHex(gasEstimate),
        to: quote?.transaction.to,
        data: quote?.transaction.data,
        chainId: 137,
      };
      console.log(quote);
      
      console.log(transactionParameters);
      console.log(quote.transaction.data);
      
      
  
      // Send transaction
      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
  
      console.log('Transaction Hash:', txHash);
      return txHash;
    } catch (error) {
      console.error('Error executing swap transaction:', error);
      throw error;
    }
  };
  

  


const handleProceedClick = async() => {
    if(isConnected){
        console.log('press');
        const resu = await setAllowance();
        const params = {
            sellToken: currency.address, //WETH
            buyToken: buyCurrency.address, //DAI
            sellAmount: sellAmount * Math.pow(10, currency.decimals), // Note that the WETH token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
            taker: accountAddress, //Address that will make the trade
            chainId: currency.chainId, // / Ethereum mainnet. See the 0x Cheat Sheet for all supported endpoints: https://0x.org/docs/introduction/0x-cheat-sheet
        };
        
        const headers = {'0x-api-key': '702e42e4-a1e1-466a-9d57-16aaea9ae2cf'}; // Get your live API key from the 0x Dashboard (https://dashboard.0x.org/apps)
        
        const response = await fetch(
            `https://api.0x.org/swap/permit2/quote?${qs.stringify(params)}`, { headers }
        ); 
        const res = await response.json();
        console.log(res);
        

        // const signature = await signer.signTypedData(res.permit2.eip712);
        const signature = await window.ethereum.request({
            method: 'eth_signTypedData_v4',
            params: [accountAddress, JSON.stringify(res.permit2.eip712)]
        });
        console.log(signature);
        const signatureLengthInHex = numberToHex(size(signature), {
            signed: false,
            size: 32,
        });
        const newData = concat([res.transaction.data, signatureLengthInHex, signature]);
        // const newData = res.transaction.data + signatureLengthInHex + signature;

        res.transaction.data = newData       
        
        
        // console.log(await response.json());
        executeSwap(res)
    }
};









    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg2-CVOv_7YU.svg')" }}>
            <div className="flex justify-center">
                <div className="bg-white shadow-lg rounded-lg p-8 mt-[40px] h-[590px] relative w-full max-w-[375px] transition-all">
                    <div className="flex justify-between items-center mb-6">
                        <img src="/assets/acebit-logo-D9crurlZ.webp" alt="Ramp Logo" className="h-[24px]" />
                        <div className="flex space-x-2"><button className="bg-green-700 text-white rounded-2xl px-4 py-1 rounded-lg">Buy</button><button className="border border-grey-100 rounded-2xl px-4 py-1 rounded-lg">Sell</button></div>
                        
                        {isConnected? 
                        (<>
                        {`${accountAddress.slice(0, 3)}...${accountAddress.slice(-3)}`}
                        </>)
                        :
                        (
                        <div className="flex space-x-2"><button className="bg-green-700 text-white rounded-2xl px-4 py-1 rounded-lg" onClick={connectWallet}>Connect Wallet</button></div>

                        )
                        }
                        

                    </div>
                    <div className="mb-4 border border-grey-100 px-[15px] py-[13px]">
                        <label className="block text-[10px] font-bold font-mulish">You Pay</label>
                        <div className="flex items-center justify-between rounded-lg">
                            <input className="w-full text-[38px] font-mulish outline-none border-white" placeholder="300.00" value={sellAmount} onChange={onSellChange} />
                            <button className="flex justify-between items-center space-x-2 border px-[16px] py-[12px] rounded-md" onClick={() => setShowCurrencyModal(true)}>
                                {currency ? (
                                    <>
                                        {/* <img src={selectedCurrency.image} alt="" className="w-[24px] h-[24px]" />
                                        <span>{selectedCurrency.code}</span> */}
                                        <img src={currency.logoURI} alt="" className="w-[24px] h-[24px]" />
                                        <span>{currency.symbol}</span>
                                    </>
                                ) : (
                                    <>
                                        <img src="/assets/usd-DnqvXUZ0.png" alt="" className="w-[24px] h-[24px]" />
                                        <span>WETH</span>
                                    </>
                                )}
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" className="h-[30px] w-[35px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                                    ></path>
                                </svg>
                            </button>
                            {showCurrencyModal && (
                                <div className="absolute top-[-7%] left-[0%] bg-white shadow-lg rounded-lg w-full max-w-[400px] mx-auto mt-[40px] h-[590px] p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-[18px] font-mulish font-bold">Fiat Currency</span>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 352 512" className="cursor-pointer h-[18px] w-[18px] font-mulish text-[#e2e4e7]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" onClick={() => setShowCurrencyModal(false)}>
                                            <path
                                                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input type="text" placeholder="Find your currency" className="border w-full p-3 rounded-lg mb-4" />
                                    <div>


                                        {POLYGON_TOKENS.map((token, index)=>(

                                            <div key={index} className="flex justify-between items-center p-3 border-b cursor-pointer" onClick={() => { setCurrency(token); setShowCurrencyModal(false); setShowCheckout(false); }}>
                                            <div className="flex items-center space-x-2">
                                                <img src={token.logoURI} alt="" className="w-[40px] h-[40px]" />
                                                <div className="flex flex-col"><span className="text-[16px] font-mulish">{token.symbol}</span><span className="text-[12px] font-mulish text-[#677689]">USD</span></div>
                                            </div>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" className="text-[#677689] h-[12px] w-[7px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                                                ></path>
                                            </svg>
                                            </div>


                                        ))}




                                        {/* <div className="flex justify-between items-center p-3 border-b cursor-pointer" onClick={() => { setSelectedCurrency({ code: 'USD', image: '/assets/usd-DnqvXUZ0.png' }); setShowCurrencyModal(false); setShowCheckout(false); }}>
                                            <div className="flex items-center space-x-2">
                                                <img src="/assets/usd-DnqvXUZ0.png" alt="" className="w-[40px] h-[40px]" />
                                                <div className="flex flex-col"><span className="text-[16px] font-mulish">USD</span><span className="text-[12px] font-mulish text-[#677689]">USD</span></div>
                                            </div>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" className="text-[#677689] h-[12px] w-[7px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="flex justify-between items-center p-3 border-b cursor-pointer" onClick={() => { setSelectedCurrency({ code: 'EUR', image: '/assets/eur-C8cMjgLb.png' }); setShowCurrencyModal(false); setShowCheckout(false); }}>
                                            <div className="flex items-center space-x-2">
                                                <img src="/assets/eur-C8cMjgLb.png" alt="" className="w-[40px] h-[40px]" />
                                                <div className="flex flex-col"><span className="text-[16px] font-mulish">EUR</span><span className="text-[12px] font-mulish text-[#677689]">EUR</span></div>
                                            </div>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" className="text-[#677689] h-[12px] w-[7px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="flex justify-between items-center p-3 border-b cursor-pointer" onClick={() => { setSelectedCurrency({ code: 'GBP', image: '/assets/gbp-BgLpP3jO.png' }); setShowCurrencyModal(false); setShowCheckout(false); }}>
                                            <div className="flex items-center space-x-2">
                                                <img src="/assets/gbp-BgLpP3jO.png" alt="" className="w-[40px] h-[40px]" />
                                                <div className="flex flex-col"><span className="text-[16px] font-mulish">GBP</span><span className="text-[12px] font-mulish text-[#677689]">GBP</span></div>
                                            </div>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" className="text-[#677689] h-[12px] w-[7px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                                                ></path>
                                            </svg>
                                        </div> */}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mb-4 border border-grey-100 px-[15px] py-[13px]">
                        <label className="block text-[10px] font-bold font-mulish">You Get</label>
                        <div className="flex items-center justify-between rounded-lg">
                            <input className={`w-full outline-none font-mulish border-white ${isConnected ? 'text-[38px]' : 'text-[16px]'}`} placeholder="" value={isConnected?buyAmount:'Connect Wallet'} disabled/>
                            <button className="flex justify-between items-center space-x-2 border px-[16px] py-[12px] rounded-md" onClick={() => setShowCurrencyModal1(true)}>
                                {buyCurrency ? (
                                    <>
                                        {/* <img src={selectedCurrency1.image} alt="" className="w-[24px] h-[24px]" />
                                        <span>{selectedCurrency1.code}</span> */}
                                        <img src={buyCurrency.logoURI} alt="" className="w-[24px] h-[24px]" />
                                        <span>{buyCurrency.symbol}</span>
                                    </>
                                ) : (
                                    <>
                                        <img src={buyCurrency.logoURI} alt="" className="w-[24px] h-[24px]" />
                                        <span>USDC</span>
                                    </>
                                )}
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" className="h-[30px] w-[35px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                                    ></path>
                                </svg>
                            </button>
                            {showCurrencyModal1 && (
                                <div className="absolute top-[-7%] left-[0%] bg-white shadow-lg rounded-lg w-full max-w-[400px] mx-auto mt-[40px] h-[590px] p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-[18px] font-mulish font-bold">Select Asset</span>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 352 512" className="cursor-pointer h-[18px] w-[18px] font-mulish text-[#e2e4e7]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" onClick={() => setShowCurrencyModal1(false)}>
                                            <path
                                                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input type="text" placeholder="Find your asset" className="border w-full p-3 rounded-lg mb-4" />
                                    <div>


                                        {POLYGON_TOKENS.map((token, index)=>(

                                            <div className="flex justify-between items-center p-3 border-b cursor-pointer" onClick={() => { setbuyCurrency(token); setShowCurrencyModal1(false); setShowCheckout(false); }}>
                                            <div className="flex items-center space-x-2">
                                                <img
                                                    src={token.logoURI}
                                                    alt=""
                                                    className="w-[40px] h-[40px]"
                                                />
                                                <div className="flex flex-col"><span className="text-[16px] font-mulish">{token.symbol}</span><span className="text-[12px] font-mulish text-[#677689]">Bitcoin</span></div>
                                            </div>
                                            <span className="text-[12px] font-mulish p-1 text-[#1E1E1E] rounded-xl bg-[#d3d5d8]">{token.name}</span>
                                        </div>
                                        ))}



                                        {/* <div className="flex justify-between items-center p-3 border-b cursor-pointer" onClick={() => { setSelectedCurrency1({ code: 'BTC', image: "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M39.4016%2024.8381C36.7301%2035.5525%2025.877%2042.0731%2015.1601%2039.4012C4.44772%2036.7301%20-2.07358%2025.8775%200.599038%2015.1639C3.26931%204.44838%2014.1225%20-2.07268%2024.836%200.598468C35.5521%203.26961%2042.073%2014.1234%2039.4013%2024.8383L39.4015%2024.8381H39.4016Z'%20fill='%23F7931A'/%3e%3cpath%20d='M28.9504%2017.2512C29.3456%2014.5718%2027.3336%2013.1315%2024.5824%2012.1706L25.4749%208.54109L23.2957%207.99055L22.4269%2011.5245C21.854%2011.3797%2021.2657%2011.2432%2020.6809%2011.1079L21.5561%207.55054L19.3783%207L18.4853%2010.6284C18.0112%2010.5189%2017.5456%2010.4108%2017.0938%2010.2968L17.0964%2010.2854L14.0913%209.52455L13.5116%2011.8844C13.5116%2011.8844%2015.1283%2012.2601%2015.0943%2012.2832C15.9767%2012.5065%2016.1363%2013.0988%2016.1098%2013.5682L15.0931%2017.7032C15.1539%2017.7188%2015.2327%2017.7414%2015.3197%2017.7769C15.2469%2017.7586%2015.1696%2017.7386%2015.0893%2017.7191L13.6643%2023.5115C13.5564%2023.7834%2013.2827%2024.1913%2012.6657%2024.0364C12.6876%2024.0685%2011.0819%2023.6356%2011.0819%2023.6356L10%2026.1647L12.8358%2026.8815C13.3634%2027.0156%2013.8803%2027.1559%2014.3895%2027.2879L13.4877%2030.9591L15.6643%2031.5096L16.5574%2027.8774C17.152%2028.0411%2017.729%2028.1921%2018.294%2028.3344L17.404%2031.9495L19.5832%2032.5L20.4849%2028.8357C24.2008%2029.5487%2026.9949%2029.2612%2028.1709%2025.8535C29.1186%2023.1099%2028.1237%2021.5274%2026.1688%2020.4954C27.5927%2020.1625%2028.6652%2019.2129%2028.9511%2017.2515L28.9505%2017.251L28.9504%2017.2512ZM23.9715%2024.3299C23.2981%2027.0735%2018.7419%2025.5904%2017.2648%2025.2184L18.4614%2020.3548C19.9385%2020.7286%2024.6753%2021.4685%2023.9716%2024.3299H23.9715ZM24.6454%2017.2115C24.0311%2019.7071%2020.239%2018.4392%2019.0089%2018.1283L20.0938%2013.7172C21.3239%2014.0281%2025.2854%2014.6084%2024.6456%2017.2115H24.6454Z'%20fill='white'/%3e%3c/svg%3e" }); setShowCurrencyModal1(false); setShowCheckout(false); }}>
                                            <div className="flex items-center space-x-2">
                                                <img
                                                    src="data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M39.4016%2024.8381C36.7301%2035.5525%2025.877%2042.0731%2015.1601%2039.4012C4.44772%2036.7301%20-2.07358%2025.8775%200.599038%2015.1639C3.26931%204.44838%2014.1225%20-2.07268%2024.836%200.598468C35.5521%203.26961%2042.073%2014.1234%2039.4013%2024.8383L39.4015%2024.8381H39.4016Z'%20fill='%23F7931A'/%3e%3cpath%20d='M28.9504%2017.2512C29.3456%2014.5718%2027.3336%2013.1315%2024.5824%2012.1706L25.4749%208.54109L23.2957%207.99055L22.4269%2011.5245C21.854%2011.3797%2021.2657%2011.2432%2020.6809%2011.1079L21.5561%207.55054L19.3783%207L18.4853%2010.6284C18.0112%2010.5189%2017.5456%2010.4108%2017.0938%2010.2968L17.0964%2010.2854L14.0913%209.52455L13.5116%2011.8844C13.5116%2011.8844%2015.1283%2012.2601%2015.0943%2012.2832C15.9767%2012.5065%2016.1363%2013.0988%2016.1098%2013.5682L15.0931%2017.7032C15.1539%2017.7188%2015.2327%2017.7414%2015.3197%2017.7769C15.2469%2017.7586%2015.1696%2017.7386%2015.0893%2017.7191L13.6643%2023.5115C13.5564%2023.7834%2013.2827%2024.1913%2012.6657%2024.0364C12.6876%2024.0685%2011.0819%2023.6356%2011.0819%2023.6356L10%2026.1647L12.8358%2026.8815C13.3634%2027.0156%2013.8803%2027.1559%2014.3895%2027.2879L13.4877%2030.9591L15.6643%2031.5096L16.5574%2027.8774C17.152%2028.0411%2017.729%2028.1921%2018.294%2028.3344L17.404%2031.9495L19.5832%2032.5L20.4849%2028.8357C24.2008%2029.5487%2026.9949%2029.2612%2028.1709%2025.8535C29.1186%2023.1099%2028.1237%2021.5274%2026.1688%2020.4954C27.5927%2020.1625%2028.6652%2019.2129%2028.9511%2017.2515L28.9505%2017.251L28.9504%2017.2512ZM23.9715%2024.3299C23.2981%2027.0735%2018.7419%2025.5904%2017.2648%2025.2184L18.4614%2020.3548C19.9385%2020.7286%2024.6753%2021.4685%2023.9716%2024.3299H23.9715ZM24.6454%2017.2115C24.0311%2019.7071%2020.239%2018.4392%2019.0089%2018.1283L20.0938%2013.7172C21.3239%2014.0281%2025.2854%2014.6084%2024.6456%2017.2115H24.6454Z'%20fill='white'/%3e%3c/svg%3e"
                                                    alt=""
                                                    className="w-[40px] h-[40px]"
                                                />
                                                <div className="flex flex-col"><span className="text-[16px] font-mulish">BTC</span><span className="text-[12px] font-mulish text-[#677689]">Bitcoin</span></div>
                                            </div>
                                            <span className="text-[12px] font-mulish p-1 text-[#1E1E1E] rounded-xl bg-[#d3d5d8]">Bitcoin</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 border-b cursor-pointer" onClick={() => { setSelectedCurrency1({ code: 'ETH', image: "data:image/svg+xml,%3csvg%20width='38'%20height='38'%20viewBox='0%200%2038%2038'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='19'%20cy='19'%20r='19'%20fill='url(%23paint0_linear)'/%3e%3cpath%20d='M26.5%2019L19%207L11.5%2019L19%2023.5L26.5%2019Z'%20fill='white'/%3e%3cpath%20d='M26.5%2020.5L19%2025L11.5%2020.5L19%2030.5L26.5%2020.5Z'%20fill='%23A5ABC1'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear'%20x1='19'%20y1='0'%20x2='19'%20y2='38'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%2334457F'/%3e%3cstop%20offset='1'%20stop-color='%23142356'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e" }); setShowCurrencyModal1(false); setShowCheckout(false); }}>
                                            <div className="flex items-center space-x-2">
                                                <img
                                                    src="data:image/svg+xml,%3csvg%20width='38'%20height='38'%20viewBox='0%200%2038%2038'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='19'%20cy='19'%20r='19'%20fill='url(%23paint0_linear)'/%3e%3cpath%20d='M26.5%2019L19%207L11.5%2019L19%2023.5L26.5%2019Z'%20fill='white'/%3e%3cpath%20d='M26.5%2020.5L19%2025L11.5%2020.5L19%2030.5L26.5%2020.5Z'%20fill='%23A5ABC1'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear'%20x1='19'%20y1='0'%20x2='19'%20y2='38'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%2334457F'/%3e%3cstop%20offset='1'%20stop-color='%23142356'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
                                                    alt=""
                                                    className="w-[40px] h-[40px]"
                                                />
                                                <div className="flex flex-col"><span className="text-[16px] font-mulish">ETH</span><span className="text-[12px] font-mulish text-[#677689]">Ethereum</span></div>
                                            </div>
                                            <span className="text-[12px] font-mulish p-1 text-[#1E1E1E] rounded-xl bg-[#d3d5d8]">Ethereum</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 border-b cursor-pointer" onClick={() => { setSelectedCurrency1({ code: 'USDT', image: "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='40'%20height='40'%20rx='20'%20fill='white'/%3e%3cpath%20d='M39.4016%2024.8381C36.7301%2035.5525%2025.877%2042.0731%2015.1601%2039.4012C4.44772%2036.7301%20-2.07358%2025.8775%200.599038%2015.1639C3.26931%204.44838%2014.1225%20-2.07268%2024.836%200.598468C35.5521%203.26961%2042.073%2014.1234%2039.4013%2024.8383L39.4015%2024.8381H39.4016Z'%20fill='%2350AF95'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M22.5433%2021.3637C22.4013%2021.3743%2021.6673%2021.4181%2020.0302%2021.4181C18.728%2021.4181%2017.8035%2021.379%2017.4792%2021.3637C12.447%2021.1426%208.69086%2020.2677%208.69086%2019.2201C8.69086%2018.1726%2012.447%2017.2988%2017.4792%2017.0742V20.4923C17.8082%2020.5159%2018.7505%2020.5715%2020.0527%2020.5715C21.6152%2020.5715%2022.3977%2020.5065%2022.5386%2020.4935V17.0765C27.5601%2017.3%2031.3079%2018.1749%2031.3079%2019.2201C31.3079%2020.2653%2027.5613%2021.1402%2022.5386%2021.3625L22.5433%2021.3637ZM22.5433%2016.723V13.6643H29.5512V9H10.4713V13.6643H17.478V16.7218C11.7829%2016.9831%207.5%2018.1099%207.5%2019.4601C7.5%2020.8104%2011.7829%2021.9359%2017.478%2022.1984V32H22.5421V22.1949C28.2242%2021.9336%2032.5%2020.808%2032.5%2019.459C32.5%2018.1099%2028.2278%2016.9843%2022.5421%2016.7218L22.5433%2016.723Z'%20fill='white'/%3e%3c/svg%3e" }); setShowCurrencyModal1(false); setShowCheckout(false); }}>
                                            <div className="flex items-center space-x-2">
                                                <img
                                                    src="data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='40'%20height='40'%20rx='20'%20fill='white'/%3e%3cpath%20d='M39.4016%2024.8381C36.7301%2035.5525%2025.877%2042.0731%2015.1601%2039.4012C4.44772%2036.7301%20-2.07358%2025.8775%200.599038%2015.1639C3.26931%204.44838%2014.1225%20-2.07268%2024.836%200.598468C35.5521%203.26961%2042.073%2014.1234%2039.4013%2024.8383L39.4015%2024.8381H39.4016Z'%20fill='%2350AF95'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M22.5433%2021.3637C22.4013%2021.3743%2021.6673%2021.4181%2020.0302%2021.4181C18.728%2021.4181%2017.8035%2021.379%2017.4792%2021.3637C12.447%2021.1426%208.69086%2020.2677%208.69086%2019.2201C8.69086%2018.1726%2012.447%2017.2988%2017.4792%2017.0742V20.4923C17.8082%2020.5159%2018.7505%2020.5715%2020.0527%2020.5715C21.6152%2020.5715%2022.3977%2020.5065%2022.5386%2020.4935V17.0765C27.5601%2017.3%2031.3079%2018.1749%2031.3079%2019.2201C31.3079%2020.2653%2027.5613%2021.1402%2022.5386%2021.3625L22.5433%2021.3637ZM22.5433%2016.723V13.6643H29.5512V9H10.4713V13.6643H17.478V16.7218C11.7829%2016.9831%207.5%2018.1099%207.5%2019.4601C7.5%2020.8104%2011.7829%2021.9359%2017.478%2022.1984V32H22.5421V22.1949C28.2242%2021.9336%2032.5%2020.808%2032.5%2019.459C32.5%2018.1099%2028.2278%2016.9843%2022.5421%2016.7218L22.5433%2016.723Z'%20fill='white'/%3e%3c/svg%3e"
                                                    alt=""
                                                    className="w-[40px] h-[40px]"
                                                />
                                                <div className="flex flex-col"><span className="text-[16px] font-mulish">USDT</span><span className="text-[12px] font-mulish text-[#677689]">Tether</span></div>
                                            </div>
                                            <span className="text-[12px] font-mulish p-1 text-[#1E1E1E] rounded-xl bg-[#d3d5d8]">Tether</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 border-b cursor-pointer" onClick={() => { setSelectedCurrency1({ code: 'ABT', image: "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='40'%20height='40'%20rx='20'%20fill='white'/%3e%3cpath%20d='M39.4016%2024.8381C36.7301%2035.5525%2025.877%2042.0731%2015.1601%2039.4012C4.44772%2036.7301%20-2.07358%2025.8775%200.599038%2015.1639C3.26931%204.44838%2014.1225%20-2.07268%2024.836%200.598468C35.5521%203.26961%2042.073%2014.1234%2039.4013%2024.8383L39.4015%2024.8381H39.4016Z'%20fill='%2350AF95'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M22.5433%2021.3637C22.4013%2021.3743%2021.6673%2021.4181%2020.0302%2021.4181C18.728%2021.4181%2017.8035%2021.379%2017.4792%2021.3637C12.447%2021.1426%208.69086%2020.2677%208.69086%2019.2201C8.69086%2018.1726%2012.447%2017.2988%2017.4792%2017.0742V20.4923C17.8082%2020.5159%2018.7505%2020.5715%2020.0527%2020.5715C21.6152%2020.5715%2022.3977%2020.5065%2022.5386%2020.4935V17.0765C27.5601%2017.3%2031.3079%2018.1749%2031.3079%2019.2201C31.3079%2020.2653%2027.5613%2021.1402%2022.5386%2021.3625L22.5433%2021.3637ZM22.5433%2016.723V13.6643H29.5512V9H10.4713V13.6643H17.478V16.7218C11.7829%2016.9831%207.5%2018.1099%207.5%2019.4601C7.5%2020.8104%2011.7829%2021.9359%2017.478%2022.1984V32H22.5421V22.1949C28.2242%2021.9336%2032.5%2020.808%2032.5%2019.459C32.5%2018.1099%2028.2278%2016.9843%2022.5421%2016.7218L22.5433%2016.723Z'%20fill='white'/%3e%3c/svg%3e" }); setShowCurrencyModal1(false); setShowCheckout(false); }}>
                                            <div className="flex items-center space-x-2">
                                                <img
                                                    src="data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='40'%20height='40'%20rx='20'%20fill='white'/%3e%3cpath%20d='M39.4016%2024.8381C36.7301%2035.5525%2025.877%2042.0731%2015.1601%2039.4012C4.44772%2036.7301%20-2.07358%2025.8775%200.599038%2015.1639C3.26931%204.44838%2014.1225%20-2.07268%2024.836%200.598468C35.5521%203.26961%2042.073%2014.1234%2039.4013%2024.8383L39.4015%2024.8381H39.4016Z'%20fill='%2350AF95'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M22.5433%2021.3637C22.4013%2021.3743%2021.6673%2021.4181%2020.0302%2021.4181C18.728%2021.4181%2017.8035%2021.379%2017.4792%2021.3637C12.447%2021.1426%208.69086%2020.2677%208.69086%2019.2201C8.69086%2018.1726%2012.447%2017.2988%2017.4792%2017.0742V20.4923C17.8082%2020.5159%2018.7505%2020.5715%2020.0527%2020.5715C21.6152%2020.5715%2022.3977%2020.5065%2022.5386%2020.4935V17.0765C27.5601%2017.3%2031.3079%2018.1749%2031.3079%2019.2201C31.3079%2020.2653%2027.5613%2021.1402%2022.5386%2021.3625L22.5433%2021.3637ZM22.5433%2016.723V13.6643H29.5512V9H10.4713V13.6643H17.478V16.7218C11.7829%2016.9831%207.5%2018.1099%207.5%2019.4601C7.5%2020.8104%2011.7829%2021.9359%2017.478%2022.1984V32H22.5421V22.1949C28.2242%2021.9336%2032.5%2020.808%2032.5%2019.459C32.5%2018.1099%2028.2278%2016.9843%2022.5421%2016.7218L22.5433%2016.723Z'%20fill='white'/%3e%3c/svg%3e"
                                                    alt=""
                                                    className="w-[40px] h-[40px]"
                                                />
                                                <div className="flex flex-col"><span className="text-[16px] font-mulish">ABT</span><span className="text-[12px] font-mulish text-[#677689]">Acebit Token</span></div>
                                            </div>
                                            <span className="text-[12px] font-mulish p-1 text-[#1E1E1E] rounded-xl bg-[#d3d5d8]">Acebit Token</span>
                                        </div> */}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="text-gray-500 text-[12px] font-mulish text-center mb-2">1 BTC ≈ 60718.89 USD</p>
                    <div className="border px-[16px] py-[11px] rounded-sm">
                        <div className="flex justify-between items-center font-mulish text-sm mb-2">
                            <p className="text-gray-600 text-[12px] font-mulish"><span className="text-black">300 USD</span> is all you pay, fees included</p>
                            <button className="text-[12px] font-mulish font-semibold">Details</button>
                        </div>
                    </div>

                    {isConnected?
                    (
                        <button onClick={handleProceedClick} className="bg-green-700 text-white w-[83%] py-3 rounded-lg absolute bottom-10 left-8 flex items-center justify-between px-4">
                        Proceed
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                            ></path>
                        </svg>
                    </button>
                    )
                    :
                    (
                        <button onClick={connectWallet} className="bg-green-700 text-white w-[83%] py-3 rounded-lg absolute bottom-10 left-8 flex items-center justify-between px-4">
                        Connect Wallet
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                            ></path>
                        </svg>
                    </button>
                    )
                }
                    {/* <button onClick={handleProceedClick} className="bg-green-700 text-white w-[83%] py-3 rounded-lg absolute bottom-10 left-8 flex items-center justify-between px-4">
                        Proceed
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                            ></path>
                        </svg>
                    </button> */}
                    <p className="text-center text-[12px] font-mulish mt-4 pt-2 border-t absolute bottom-1 left-0 w-full">Powered by <span className="font-bold">Acebit</span></p>
                </div>
                {showCheckout && (
                    <div className="bg-white shadow-lg rounded-lg p-8 mt-[40px] w-[516px] h-[590px] ml-2 relative">
                        <div className="flex flex-col justify-center items-center mb-6">
                            <h2 className="text-[20px] text-[#2a3037] mt-[20px] font-bold">Checkout with Acebit</h2>
                            <h2 className="text-[14px] font-mulish text-[#515d6c] mt-[8px] mb-[32px] font-semibold">Login to complete your fast and secure checkout</h2>
                        </div>
                        <div className="flex gap-1">
                            <button className="flex items-center justify-center text-[16px] border border-[#cdd4dd] font-mulish text-[#515d6c] py-[12px] px-[16px] rounded-md mb-4">
                                <img
                                    src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24'%20viewBox='0%200%2024%2024'%20width='24'%20aria-hidden='true'%20focusable='false'%20tabindex='-1'%3e%3cpath%20d='M22.56%2012.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26%201.37-1.04%202.53-2.21%203.31v2.77h3.57c2.08-1.92%203.28-4.74%203.28-8.09z'%20fill='%234285F4'%3e%3c/path%3e%3cpath%20d='M12%2023c2.97%200%205.46-.98%207.28-2.66l-3.57-2.77c-.98.66-2.23%201.06-3.71%201.06-2.86%200-5.29-1.93-6.16-4.53H2.18v2.84C3.99%2020.53%207.7%2023%2012%2023z'%20fill='%2334A853'%3e%3c/path%3e%3cpath%20d='M5.84%2014.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43%208.55%201%2010.22%201%2012s.43%203.45%201.18%204.93l2.85-2.22.81-.62z'%20fill='%23FBBC05'%3e%3c/path%3e%3cpath%20d='M12%205.38c1.62%200%203.06.56%204.21%201.64l3.15-3.15C17.45%202.09%2014.97%201%2012%201%207.7%201%203.99%203.47%202.18%207.07l3.66%202.84c.87-2.6%203.3-4.53%206.16-4.53z'%20fill='%23EA4335'%3e%3c/path%3e%3cpath%20d='M1%201h22v22H1z'%20fill='none'%3e%3c/path%3e%3c/svg%3e"
                                    alt="Google"
                                    className="w-6 h-6 mr-2"
                                />
                                Continue with Google
                            </button>
                            <button className="flex items-center justify-center text-[16px] border border-[#cdd4dd] font-mulish text-[#515d6c] py-[12px] px-[16px] rounded-md mb-4">
                                <img
                                    src="data:image/svg+xml,%3csvg%20fill='%23000000'%20height='24px'%20width='24px'%20id='Capa_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2022.773%2022.773'%20xml:space='preserve'%20aria-hidden='true'%20focusable='false'%20tabindex='-1'%3e%3cg%3e%3cg%3e%3cpath%20d='M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573%20c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z'%3e%3c/path%3e%3cpath%20d='M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334%20c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0%20c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019%20c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464%20c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648%20c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z'%3e%3c/path%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/g%3e%3c/svg%3e"
                                    alt="Apple"
                                    className="w-6 h-6 mr-2"
                                />
                                Continue with Apple
                            </button>
                        </div>
                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="mx-2 text-gray-400">OR</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        <input type="email" placeholder="Your email address" className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none" />
                        <button className="bg-green-700 text-white w-full py-3 rounded-lg mt-4 flex items-center justify-between px-4">
                            Proceed
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                                ></path>
                            </svg>
                        </button>
                        <p className="text-[12px] font-mulish text-[#2a3037] mt-4">By continuing I agree to Acebit's <a href="/" className="underline">Terms of Service</a> and <a href="/" className="underline">Privacy Policy</a>.</p>
                        <div className="flex items-center mt-4 absolute bottom-3">
                            <input type="checkbox" id="newsletter" className="mr-2 bg-green-700" />
                            <div className="flex flex-col">
                                <label for="newsletter" className="text-[14px] font-mulish">Sign up for news, offers, and tips about Acebit</label><label for="newsletter" className="text-[12px] font-mulish text-[#515d6c]">optional</label>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="text-center mt-[40px]">
                <h2 className="text-[56px] font-semibold leading-[130%] text-white">
                    Buy <span className="text-[#21bf73]">crypto</span> directly to <br />
                    your cryptocurrency wallet
                </h2>
                <h2 className="text-[18px] font-mulish text-center mt-[40px] pb-[80px] text-white">
                    At Acebit you can buy crypto with credit cards, debit cards, bank transfers, and more. <br />
                    Just choose your asset, then buy and send crypto directly to your own crypto wallet.
                </h2>
            </div>
        </div>
    )
}




const main = () => {
    return (
        <div>
            <BuySellSwap />



            <section className="bg-white py-16">
                <div className="container mx-auto max-w-[1200px] px-4">
                    <div className="grid md:grid-cols-2 gap-[40px]">
                        <div className="sticky top-0 self-start">
                            <p className="text-[#21bf73] text-[14px] mb-[12px] font-bold uppercase tracking-wide">Buying Crypto Made Easy</p>
                            <h2 className="text-[48px] font-bold leading-[120%]">Buy crypto without an exchange with Acebit</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-x-[40px] gap-y-[32px]">
                            <div className="flex flex-col items-start">
                                <div className="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_6243_6589)'%3e%3cpath%20d='M10.4%2020.6479C5.83839%2020.6479%202.0352%2019.2671%200%2017.1335V19.8479C0%2022.9879%204.56799%2025.4479%2010.4%2025.4479C16.232%2025.4479%2020.8%2022.9879%2020.8%2019.8479V17.1335C18.7648%2019.2671%2014.9616%2020.6479%2010.4%2020.6479Z'%20fill='%2300B35A'/%3e%3cpath%20d='M10.4%2014.248C5.83839%2014.248%202.0352%2012.8672%200%2010.7336V13.448C0%2016.588%204.56799%2019.048%2010.4%2019.048C16.232%2019.048%2020.8%2016.588%2020.8%2013.448V10.7336C18.7648%2012.8672%2014.9616%2014.248%2010.4%2014.248Z'%20fill='%2300B35A'/%3e%3cpath%20d='M10.4%201.448C4.56799%201.448%200%203.90799%200%207.04799C0%2010.188%204.56799%2012.648%2010.4%2012.648C16.232%2012.648%2020.8%2010.188%2020.8%207.04799C20.8%203.90799%2016.232%201.448%2010.4%201.448Z'%20fill='%2300B35A'/%3e%3cpath%20d='M22.3046%2028.7814C26.8911%2028.7814%2030.6092%2025.0505%2030.6092%2020.4481C30.6092%2015.8457%2026.8911%2012.1147%2022.3046%2012.1147C17.7181%2012.1147%2014%2015.8457%2014%2020.4481C14%2025.0505%2017.7181%2028.7814%2022.3046%2028.7814Z'%20fill='%238FD9AD'/%3e%3cpath%20d='M19.5364%2019.0593C20.3009%2019.0593%2020.9205%2018.4374%2020.9205%2017.6704C20.9205%2016.9033%2020.3009%2016.2815%2019.5364%2016.2815C18.772%2016.2815%2018.1523%2016.9033%2018.1523%2017.6704C18.1523%2018.4374%2018.772%2019.0593%2019.5364%2019.0593Z'%20fill='%238FD9AD'%20stroke='%23165034'%20stroke-miterlimit='10'%20stroke-linecap='square'/%3e%3cpath%20d='M25.0726%2024.6147C25.837%2024.6147%2026.4567%2023.9929%2026.4567%2023.2258C26.4567%2022.4587%2025.837%2021.8369%2025.0726%2021.8369C24.3082%2021.8369%2023.6885%2022.4587%2023.6885%2023.2258C23.6885%2023.9929%2024.3082%2024.6147%2025.0726%2024.6147Z'%20fill='%238FD9AD'%20stroke='%23165034'%20stroke-miterlimit='10'%20stroke-linecap='square'/%3e%3cpath%20d='M18.7056%2024.0591L25.9029%2016.8369'%20stroke='%23165034'%20stroke-miterlimit='10'%20stroke-linecap='round'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_6243_6589'%3e%3crect%20width='32'%20height='32'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Competitive fees"
                                        className="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 className="text-[24px] max-w-[250px] mt-[32px] mb-[12px] font-semibold">Competitive fees</h3>
                                <div className="h-[50px]"><p className="text-[#6c7689] text-[14px] font-semibold max-w-[210px] font-mulish">Purchase cryptocurrency at affordable fees with Acebit</p></div>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M16.0879%2031.4084C24.549%2031.4084%2031.4081%2024.5493%2031.4081%2016.0881C31.4081%207.62694%2024.549%200.767822%2016.0879%200.767822C7.6267%200.767822%200.767578%207.62694%200.767578%2016.0881C0.767578%2024.5493%207.6267%2031.4084%2016.0879%2031.4084Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M16.0884%200.767822V31.4084'%20stroke='%23165034'/%3e%3cpath%20d='M0.767578%2016.0881H31.4081'%20stroke='%23165034'/%3e%3cpath%20d='M2.66895%208.69214H29.509'%20stroke='%23165034'/%3e%3cpath%20d='M2.66895%2023.4841H29.509'%20stroke='%23165034'/%3e%3cpath%20d='M16.0885%2031.4084C20.8831%2031.4084%2024.7699%2024.5493%2024.7699%2016.0881C24.7699%207.62694%2020.8831%200.767822%2016.0885%200.767822C11.294%200.767822%207.40723%207.62694%207.40723%2016.0881C7.40723%2024.5493%2011.294%2031.4084%2016.0885%2031.4084Z'%20stroke='%23165034'%20stroke-linecap='square'/%3e%3cpath%20d='M15.9121%2031.2324C24.3732%2031.2324%2031.2324%2024.3732%2031.2324%2015.9121C31.2324%207.45092%2024.3732%200.591797%2015.9121%200.591797C7.45092%200.591797%200.591797%207.45092%200.591797%2015.9121C0.591797%2024.3732%207.45092%2031.2324%2015.9121%2031.2324Z'%20stroke='%23165034'%20stroke-linecap='square'/%3e%3c/svg%3e"
                                        alt="Where to buy crypto"
                                        className="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 className="text-[24px] max-w-[250px] mt-[32px] mb-[12px] font-semibold">Where to buy crypto</h3>
                                <div className="h-[50px]"><p className="text-[#6c7689] text-[14px] font-semibold max-w-[210px] font-mulish">Buy cryptocurrency from 150+ countries and territories</p></div>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M6.70968%2013.387C3.76671%2013.387%201.31303%2012.4961%200%2011.1196V12.8709C0%2014.8967%202.9471%2016.4838%206.70968%2016.4838C10.4723%2016.4838%2013.4194%2014.8967%2013.4194%2012.8709V11.1196C12.1063%2012.4961%209.65264%2013.387%206.70968%2013.387Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M6.70968%209.25808C3.76671%209.25808%201.31303%208.36724%200%206.99072V8.74195C0%2010.7678%202.9471%2012.3549%206.70968%2012.3549C10.4723%2012.3549%2013.4194%2010.7678%2013.4194%208.74195V6.99072C12.1063%208.36724%209.65264%209.25808%206.70968%209.25808Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M25.2902%2013.387C22.3473%2013.387%2019.8936%2012.4961%2018.5806%2011.1196V12.8709C18.5806%2014.8967%2021.5277%2016.4838%2025.2902%2016.4838C29.0528%2016.4838%2031.9999%2014.8967%2031.9999%2012.8709V11.1196C30.6869%2012.4961%2028.2332%2013.387%2025.2902%2013.387Z'%20fill='%23165034'/%3e%3cpath%20d='M25.2902%205.12891C21.5277%205.12891%2018.5806%206.716%2018.5806%208.74181C18.5806%2010.7676%2021.5277%2012.3547%2025.2902%2012.3547C29.0528%2012.3547%2031.9999%2010.7676%2031.9999%208.74181C31.9999%206.716%2029.0528%205.12891%2025.2902%205.12891Z'%20fill='%23165034'/%3e%3cpath%20d='M6.70968%201C2.9471%201%200%202.5871%200%204.6129C0%206.63871%202.9471%208.22581%206.70968%208.22581C10.4723%208.22581%2013.4194%206.63871%2013.4194%204.6129C13.4194%202.5871%2010.4723%201%206.70968%201Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M25.2901%2021.645C24.7538%2021.645%2024.2392%2021.6089%2023.7417%2021.5496V24.636C24.2392%2024.699%2024.7523%2024.7418%2025.2901%2024.7418C29.0527%2024.7418%2031.9998%2023.1547%2031.9998%2021.1289V19.3777C30.6867%2020.7542%2028.2331%2021.645%2025.2901%2021.645Z'%20fill='%23165034'/%3e%3cpath%20d='M25.2901%2017.5161C24.5722%2017.5161%2023.8847%2017.4614%2023.2349%2017.3613C23.559%2017.8847%2023.7417%2018.456%2023.7417%2019.0645V20.5092C24.2392%2020.5716%2024.7528%2020.6129%2025.2901%2020.6129C29.0527%2020.6129%2031.9998%2019.0258%2031.9998%2017V15.2488C30.6867%2016.6253%2028.2331%2017.5161%2025.2901%2017.5161Z'%20fill='%23165034'/%3e%3cpath%20d='M16.0002%2027.8386C13.0572%2027.8386%2010.6036%2026.9478%209.29053%2025.5713V27.3225C9.29053%2029.3483%2012.2376%2030.9354%2016.0002%2030.9354C19.7628%2030.9354%2022.7099%2029.3483%2022.7099%2027.3225V25.5713C21.3968%2026.9478%2018.9432%2027.8386%2016.0002%2027.8386Z'%20fill='%2321BF73'/%3e%3cpath%20d='M16.0002%2023.7097C13.0572%2023.7097%2010.6036%2022.8189%209.29053%2021.4424V23.1936C9.29053%2025.2194%2012.2376%2026.8065%2016.0002%2026.8065C19.7628%2026.8065%2022.7099%2025.2194%2022.7099%2023.1936V21.4424C21.3968%2022.8189%2018.9432%2023.7097%2016.0002%2023.7097Z'%20fill='%2321BF73'/%3e%3cpath%20d='M16.0002%2015.4517C12.2376%2015.4517%209.29053%2017.0388%209.29053%2019.0646C9.29053%2021.0904%2012.2376%2022.6775%2016.0002%2022.6775C19.7628%2022.6775%2022.7099%2021.0904%2022.7099%2019.0646C22.7099%2017.0388%2019.7628%2015.4517%2016.0002%2015.4517Z'%20fill='%2321BF73'/%3e%3cpath%20d='M8.25806%2021.5496C7.75845%2021.6058%207.24594%2021.645%206.70968%2021.645C3.76671%2021.645%201.31303%2020.7542%200%2019.3777V21.1289C0%2023.1547%202.9471%2024.7418%206.70968%2024.7418C7.24542%2024.7418%207.76155%2024.7062%208.25806%2024.6453V21.5496Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M8.25807%2019.0645C8.25807%2018.456%208.44077%2017.8847%208.7649%2017.3613C8.1151%2017.4614%207.42761%2017.5161%206.70968%2017.5161C3.76671%2017.5161%201.31303%2016.6253%200%2015.2488V17C0%2019.0258%202.9471%2020.6129%206.70968%2020.6129C7.24697%2020.6129%207.76052%2020.5716%208.25807%2020.5092V19.0645Z'%20fill='%23B0E8CD'/%3e%3c/svg%3e"
                                        alt="Broad crypto selection"
                                        className="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 className="text-[24px] max-w-[250px] mt-[32px] mb-[12px] font-semibold">Broad crypto selection</h3>
                                <div className="h-[50px]">
                                    <p className="text-[#6c7689] text-[14px] font-semibold max-w-[210px] font-mulish">Purchase 110+</p>
                                    <p className="text-[#6c7689] text-[14px] font-semibold max-w-[200px] font-mulish">leading</p>
                                    <p className="text-[#6c7689] text-[14px] font-semibold max-w-[200px] font-mulish">cryptocurrencies</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_6243_4438)'%3e%3cpath%20d='M8.99836%2031.5719L2.32381%2020.0113C2.2412%2019.8679%202.21886%2019.6975%202.26169%2019.5377C2.30452%2019.3778%202.40903%2019.2415%202.55228%2019.1586L5.51652%2017.4472C5.65993%2017.3646%205.83025%2017.3422%205.99011%2017.3851C6.14997%2017.4279%206.2863%2017.5324%206.36918%2017.6757L13.0437%2029.2363C13.1263%2029.3797%2013.1487%2029.55%2013.1058%2029.7099C13.063%2029.8698%2012.9585%2030.0061%2012.8153%2030.089L9.85101%2031.8004C9.70761%2031.883%209.53729%2031.9053%209.37743%2031.8625C9.21757%2031.8197%209.08124%2031.7152%208.99836%2031.5719Z'%20fill='%23165034'/%3e%3cpath%20d='M24.6509%2022.4818C24.5221%2022.2479%2024.3211%2022.0618%2024.0779%2021.9515C23.8347%2021.8411%2023.5623%2021.8123%2023.3014%2021.8693C23.6357%2021.6475%2023.8705%2021.3041%2023.9559%2020.912C24.0413%2020.52%2023.9707%2020.1101%2023.759%2019.7692L23.7321%2019.7227C23.578%2019.445%2023.3441%2019.2198%2023.0607%2019.0764C22.7773%2018.9329%2022.4573%2018.8777%2022.1422%2018.918C22.4988%2018.7024%2022.7565%2018.3556%2022.86%2017.952C22.9635%2017.5484%2022.9045%2017.1204%2022.6957%2016.7598L22.6709%2016.7168C22.5195%2016.3962%2022.2541%2016.1434%2021.9265%2016.0078C21.5989%2015.8721%2021.2325%2015.8632%2020.8988%2015.983L27.6242%2012.1C28.0964%2011.8413%2028.4525%2011.4127%2028.6204%2010.9011C28.7882%2010.3895%2028.7553%209.83323%2028.5282%209.34503C28.4024%209.09728%2028.2274%208.87778%2028.0139%208.69995C27.8004%208.52213%2027.5528%208.38972%2027.2864%208.31081C27.02%208.23189%2026.7403%208.20815%2026.4643%208.24101C26.1884%208.27387%2025.9221%208.36266%2025.6817%208.50194L16.0527%2014.0612C15.8408%2014.1835%2015.596%2014.2362%2015.3526%2014.2119C15.1092%2014.1876%2014.8796%2014.0874%2014.6961%2013.9256C14.5127%2013.7638%2014.3848%2013.5484%2014.3303%2013.31C14.2758%2013.0715%2014.2976%2012.822%2014.3926%2012.5965L15.2533%2010.5536C15.472%2010.0624%2015.496%209.50655%2015.3206%208.99833C15.1452%208.4901%2014.7834%208.0674%2014.3083%207.81566C14.0587%207.69426%2013.7869%207.625%2013.5095%207.61211C13.2322%207.59922%2012.9552%207.64298%2012.6953%207.74071C12.4354%207.83843%2012.1982%207.98808%2011.9981%208.18052C11.798%208.37296%2011.6392%208.60416%2011.5314%208.86L6.64078%2018.1467L12.7069%2028.6536C12.7069%2028.6536%2020.6005%2026.2685%2024.2666%2024.1519C24.5328%2023.9761%2024.7212%2023.7046%2024.7927%2023.3937C24.8643%2023.0828%2024.8135%2022.7563%2024.6509%2022.4818Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M19.8452%207.15233C19.7452%207.21004%2019.6303%207.2368%2019.5151%207.22924C19.3999%207.22167%2019.2895%207.18012%2019.1979%207.10982C19.1063%207.03953%2019.0376%206.94365%2019.0004%206.83432C18.9633%206.72498%2018.9595%206.60709%2018.9893%206.49556L20.4854%200.912215C20.5041%200.836987%2020.5377%200.766248%2020.5841%200.704128C20.6305%200.642007%2020.6888%200.589748%2020.7556%200.5504C20.8224%200.511052%2020.8964%200.485402%2020.9732%200.474948C21.05%200.464494%2021.1282%200.469445%2021.203%200.489512C21.2779%200.509579%2021.3481%200.54436%2021.4094%200.591826C21.4707%200.639291%2021.5219%200.698491%2021.5601%200.765971C21.5983%200.83345%2021.6226%200.907857%2021.6318%200.984852C21.6409%201.06185%2021.6346%201.13989%2021.6132%201.21442L20.1172%206.79776C20.0771%206.94733%2019.9793%207.07488%2019.8452%207.15233Z'%20fill='%2300B35A'/%3e%3cpath%20d='M17.0251%208.10593C16.9913%208.12577%2016.9554%208.14195%2016.9182%208.15421C16.8454%208.17852%2016.7686%208.18825%2016.6921%208.18286C16.6156%208.17748%2016.5409%208.15707%2016.4723%208.1228C16.4036%208.08854%2016.3424%208.04109%2016.2922%207.98317C16.2419%207.92525%2016.2035%207.85799%2016.1792%207.78524L15.2252%204.96493C15.1816%204.81995%2015.1961%204.66372%2015.2655%204.5292C15.3349%204.39468%2015.4539%204.29237%2015.5973%204.24386C15.7407%204.19535%2015.8973%204.20443%2016.0341%204.26918C16.171%204.33393%2016.2773%204.44929%2016.3307%204.59094L17.2848%207.41124C17.3287%207.53919%2017.3268%207.6784%2017.2794%207.8051C17.2321%207.93181%2017.1422%208.03814%2017.0251%208.10593Z'%20fill='%2300B35A'/%3e%3cpath%20d='M21.8107%209.3886C21.6854%209.46112%2021.5376%209.48449%2021.396%209.45417C21.2544%209.42385%2021.1291%209.342%2021.0445%209.22451C20.9599%209.10702%2020.9219%208.96227%2020.938%208.81837C20.9541%208.67446%2021.023%208.54166%2021.1315%208.44576L23.3679%206.48034C23.485%206.38438%2023.6348%206.33764%2023.7857%206.34998C23.9365%206.36232%2024.0767%206.43278%2024.1767%206.54649C24.2766%206.6602%2024.3285%206.80827%2024.3213%206.95949C24.3142%207.1107%2024.2486%207.25323%2024.1384%207.35701L21.902%209.32243C21.8739%209.34751%2021.8433%209.36968%2021.8107%209.3886Z'%20fill='%2300B35A'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_6243_4438'%3e%3crect%20width='32'%20height='32'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Easy to use"
                                        className="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 className="text-[24px] max-w-[250px] mt-[32px] mb-[12px] font-semibold">Easy to use</h3>
                                <div className="h-[50px]"><p className="text-[#6c7689] text-[14px] font-semibold max-w-[210px] font-mulish">Buy crypto without an exchange in just a few steps</p></div>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M28.243%204.03L16.243%201.03C16.0836%200.989023%2015.9164%200.989023%2015.757%201.03L3.757%204.03C3.54075%204.08417%203.34881%204.20905%203.21166%204.38479C3.0745%204.56054%203.00001%204.77707%203%205V19C3%2022.4478%204.36964%2025.7544%206.80761%2028.1924C9.24558%2030.6304%2012.5522%2032%2016%2032C19.4478%2032%2022.7544%2030.6304%2025.1924%2028.1924C27.6304%2025.7544%2029%2022.4478%2029%2019V5C29%204.77707%2028.9255%204.56054%2028.7883%204.38479C28.6512%204.20905%2028.4592%204.08417%2028.243%204.03ZM22%2023C22%2023.2652%2021.8946%2023.5196%2021.7071%2023.7071C21.5196%2023.8946%2021.2652%2024%2021%2024H11C10.7348%2024%2010.4804%2023.8946%2010.2929%2023.7071C10.1054%2023.5196%2010%2023.2652%2010%2023V16C10%2015.7348%2010.1054%2015.4804%2010.2929%2015.2929C10.4804%2015.1054%2010.7348%2015%2011%2015H12V13C12%2011.9391%2012.4214%2010.9217%2013.1716%2010.1716C13.9217%209.42143%2014.9391%209%2016%209C17.0609%209%2018.0783%209.42143%2018.8284%2010.1716C19.5786%2010.9217%2020%2011.9391%2020%2013V15H21C21.2652%2015%2021.5196%2015.1054%2021.7071%2015.2929C21.8946%2015.4804%2022%2015.7348%2022%2016V23Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M22%2023C22%2023.2652%2021.8946%2023.5196%2021.7071%2023.7071C21.5196%2023.8946%2021.2652%2024%2021%2024H11C10.7348%2024%2010.4804%2023.8946%2010.2929%2023.7071C10.1054%2023.5196%2010%2023.2652%2010%2023V16C10%2015.7348%2010.1054%2015.4804%2010.2929%2015.2929C10.4804%2015.1054%2010.7348%2015%2011%2015H12V13C12%2011.9391%2012.4214%2010.9217%2013.1716%2010.1716C13.9217%209.42143%2014.9391%209%2016%209C17.0609%209%2018.0783%209.42143%2018.8284%2010.1716C19.5786%2010.9217%2020%2011.9391%2020%2013V15H21C21.2652%2015%2021.5196%2015.1054%2021.7071%2015.2929C21.8946%2015.4804%2022%2015.7348%2022%2016V23Z'%20fill='%23165034'/%3e%3cpath%20d='M16%2011C15.4696%2011%2014.9609%2011.2107%2014.5858%2011.5858C14.2107%2011.9609%2014%2012.4696%2014%2013V15H18V13C18%2012.4696%2017.7893%2011.9609%2017.4142%2011.5858C17.0391%2011.2107%2016.5304%2011%2016%2011Z'%20fill='%23B0E8CD'/%3e%3c/svg%3e"
                                        alt="Secure crypto purchases"
                                        className="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 className="text-[24px] max-w-[250px] mt-[32px] mb-[12px] font-semibold">Secure crypto purchases</h3>
                                <div className="h-[50px]"><p className="text-[#6c7689] text-[14px] font-semibold max-w-[210px] font-mulish">Acebit is non-custodial by design and audited by security experts.</p></div>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M18.887%2019.3854H10.6739C5.76793%2019.3854%201.77637%2023.3769%201.77637%2028.2829V29.6517C1.77637%2029.9495%201.96869%2030.213%202.25204%2030.304C2.43136%2030.3608%206.72407%2031.705%2014.7804%2031.705C22.8368%2031.705%2027.1295%2030.3608%2027.3088%2030.304C27.5922%2030.213%2027.7845%2029.9495%2027.7845%2029.6517V28.2829C27.7845%2023.3769%2023.7929%2019.3854%2018.887%2019.3854Z'%20fill='%2300B35A'/%3e%3cpath%20d='M14.7806%2016.6476C19.0206%2016.6476%2022.3093%2011.8649%2022.3093%207.7501C22.3093%203.59907%2018.9317%200.221436%2014.7806%200.221436C10.6296%200.221436%207.25195%203.59907%207.25195%207.7501C7.25195%2011.8649%2010.5406%2016.6476%2014.7806%2016.6476Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M30.6968%2020.3092C30.6968%2025.0714%2024.574%2027.1123%2024.574%2027.1123C24.574%2027.1123%2018.4512%2025.0714%2018.4512%2020.3092V14.1863L24.574%2012.8257L30.6968%2014.1863V20.3092Z'%20fill='%23165034'/%3e%3cpath%20d='M22.2012%2019.5903L24.0103%2021.3994L27.6285%2017.1782'%20stroke='%23B0E8CD'%20stroke-width='1.16625'%20stroke-miterlimit='10'%20stroke-linecap='square'/%3e%3c/svg%3e"
                                        alt="Smart KYC"
                                        className="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 className="text-[24px] max-w-[250px] mt-[32px] mb-[12px] font-semibold">Smart KYC</h3>
                                <div className="h-[50px]"><p className="text-[#6c7689] text-[14px] font-semibold max-w-[210px] font-mulish">Get verified easily and enjoy high limits.</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-cover bg-center py-[87px] relative rounded-bl-[32px] rounded-br-[32px]" style={{ backgroundImage: "url('/assets/bg2-CVOv_7YU.svg')" }}>
                <div className="container mx-auto max-w-[1200px] text-center">
                    <p className="text-[#21bf73] text-[14px] font-bold uppercase tracking-wide mb-[12px]">Buying Cryptocurrency</p>
                    <h2 className="text-[48px] font-semibold text-white mt-4 mb-[80px]">How to buy crypto online with Acebit</h2>
                    <div className="flex justify-between items-center space-x-4 max-w-[1120px]">
                        <div className="flex flex-col z-20 items-center text-center">
                            <img
                                src="data:image/svg+xml,%3csvg%20width='65'%20height='64'%20viewBox='0%200%2065%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20filter='url(%23filter0_ii_1274_60035)'%3e%3crect%20x='0.5'%20width='64'%20height='64'%20rx='32'%20fill='black'%3e%3c/rect%3e%3cpath%20d='M22.7582%2031.36V34.64C22.7582%2038.32%2024.9182%2040.28%2028.1182%2040.28C31.3182%2040.28%2033.4782%2038.32%2033.4782%2034.64V31.36C33.4782%2027.8%2031.3182%2025.72%2028.1182%2025.72C24.9182%2025.72%2022.7582%2027.8%2022.7582%2031.36ZM25.3982%2031.24C25.3982%2029.38%2026.3982%2028.08%2028.1182%2028.08C29.7782%2028.08%2030.8382%2029.3%2030.8382%2031.24V34.76C30.8382%2036.66%2029.9982%2037.92%2028.1182%2037.92C26.2982%2037.92%2025.3982%2036.74%2025.3982%2034.76V31.24ZM37.6723%2026L34.0723%2032.32H36.8323L38.7923%2028.8H39.0323V40H41.6723V26H37.6723Z'%20fill='white'%3e%3c/path%3e%3crect%20x='0.75'%20y='0.25'%20width='63.5'%20height='63.5'%20rx='31.75'%20stroke='%2321BF73'%20stroke-width='0.5'%3e%3c/rect%3e%3crect%20x='0.75'%20y='0.25'%20width='63.5'%20height='63.5'%20rx='31.75'%20stroke='url(%23paint0_linear_1274_60035)'%20stroke-width='0.5'%3e%3c/rect%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_ii_1274_60035'%20x='0.5'%20y='0'%20width='64'%20height='64'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'%3e%3c/feFlood%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'%3e%3c/feBlend%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'%3e%3c/feColorMatrix%3e%3cfeOffset%3e%3c/feOffset%3e%3cfeGaussianBlur%20stdDeviation='13.2915'%3e%3c/feGaussianBlur%3e%3cfeComposite%20in2='hardAlpha'%20operator='arithmetic'%20k2='-1'%20k3='1'%3e%3c/feComposite%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.129412%200%200%200%200%200.74902%200%200%200%200%200.45098%200%200%200%200.25%200'%3e%3c/feColorMatrix%3e%3cfeBlend%20mode='normal'%20in2='shape'%20result='effect1_innerShadow_1274_60035'%3e%3c/feBlend%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'%3e%3c/feColorMatrix%3e%3cfeOffset%3e%3c/feOffset%3e%3cfeGaussianBlur%20stdDeviation='2.23297'%3e%3c/feGaussianBlur%3e%3cfeComposite%20in2='hardAlpha'%20operator='arithmetic'%20k2='-1'%20k3='1'%3e%3c/feComposite%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.129412%200%200%200%200%200.74902%200%200%200%200%200.45098%200%200%200%200.26%200'%3e%3c/feColorMatrix%3e%3cfeBlend%20mode='normal'%20in2='effect1_innerShadow_1274_60035'%20result='effect2_innerShadow_1274_60035'%3e%3c/feBlend%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_1274_60035'%20x1='62.6923'%20y1='59.1678'%20x2='44.3938'%20y2='40.8692'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FAFF00'%20stop-opacity='0.8'%3e%3c/stop%3e%3cstop%20offset='1'%20stop-color='white'%20stop-opacity='0'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
                            />
                            <p className="text-white text-sm max-w-[230px] mt-4 font-mulish">Enter the amount in crypto or fiat currency that you wish to purchase.</p>
                            <p className="text-white text-sm max-w-[230px] font-mulish"></p>
                        </div>
                        <div className="flex flex-col z-20 items-center text-center">
                            <img
                                src="data:image/svg+xml,%3csvg%20width='65'%20height='64'%20viewBox='0%200%2065%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20filter='url(%23filter0_ii_1274_60039)'%3e%3crect%20x='0.5'%20width='64'%20height='64'%20rx='32'%20fill='black'%3e%3c/rect%3e%3cpath%20d='M21.4594%2031.36V34.64C21.4594%2038.32%2023.6194%2040.28%2026.8194%2040.28C30.0194%2040.28%2032.1794%2038.32%2032.1794%2034.64V31.36C32.1794%2027.8%2030.0194%2025.72%2026.8194%2025.72C23.6194%2025.72%2021.4594%2027.8%2021.4594%2031.36ZM24.0994%2031.24C24.0994%2029.38%2025.0994%2028.08%2026.8194%2028.08C28.4794%2028.08%2029.5394%2029.3%2029.5394%2031.24V34.76C29.5394%2036.66%2028.6994%2037.92%2026.8194%2037.92C24.9994%2037.92%2024.0994%2036.74%2024.0994%2034.76V31.24ZM33.3334%2030.68V31.16H35.9734V30.72C35.9734%2028.9%2037.1934%2028.08%2038.6334%2028.08C40.0734%2028.08%2041.0134%2028.9%2041.0134%2030.28C41.0134%2031.92%2039.8134%2032.58%2037.8134%2033.12C35.2334%2033.82%2033.4134%2035.06%2033.4134%2037.6V40H43.5734V37.6H36.0534V37.36C36.0534%2036.06%2037.0934%2035.64%2039.0534%2035.14C41.9934%2034.4%2043.6534%2033.12%2043.6534%2030.36C43.6534%2027.48%2041.3134%2025.72%2038.5934%2025.72C35.7534%2025.72%2033.3334%2027.4%2033.3334%2030.68Z'%20fill='white'%3e%3c/path%3e%3crect%20x='0.75'%20y='0.25'%20width='63.5'%20height='63.5'%20rx='31.75'%20stroke='%2321BF73'%20stroke-width='0.5'%3e%3c/rect%3e%3crect%20x='0.75'%20y='0.25'%20width='63.5'%20height='63.5'%20rx='31.75'%20stroke='url(%23paint0_linear_1274_60039)'%20stroke-width='0.5'%3e%3c/rect%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_ii_1274_60039'%20x='0.5'%20y='0'%20width='64'%20height='64'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'%3e%3c/feFlood%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'%3e%3c/feBlend%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'%3e%3c/feColorMatrix%3e%3cfeOffset%3e%3c/feOffset%3e%3cfeGaussianBlur%20stdDeviation='13.2915'%3e%3c/feGaussianBlur%3e%3cfeComposite%20in2='hardAlpha'%20operator='arithmetic'%20k2='-1'%20k3='1'%3e%3c/feComposite%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.129412%200%200%200%200%200.74902%200%200%200%200%200.45098%200%200%200%200.25%200'%3e%3c/feColorMatrix%3e%3cfeBlend%20mode='normal'%20in2='shape'%20result='effect1_innerShadow_1274_60039'%3e%3c/feBlend%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'%3e%3c/feColorMatrix%3e%3cfeOffset%3e%3c/feOffset%3e%3cfeGaussianBlur%20stdDeviation='2.23297'%3e%3c/feGaussianBlur%3e%3cfeComposite%20in2='hardAlpha'%20operator='arithmetic'%20k2='-1'%20k3='1'%3e%3c/feComposite%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.129412%200%200%200%200%200.74902%200%200%200%200%200.45098%200%200%200%200.26%200'%3e%3c/feColorMatrix%3e%3cfeBlend%20mode='normal'%20in2='effect1_innerShadow_1274_60039'%20result='effect2_innerShadow_1274_60039'%3e%3c/feBlend%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_1274_60039'%20x1='62.6923'%20y1='59.1678'%20x2='44.3938'%20y2='40.8692'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FAFF00'%20stop-opacity='0.8'%3e%3c/stop%3e%3cstop%20offset='1'%20stop-color='white'%20stop-opacity='0'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
                            />
                            <p className="text-white text-sm max-w-[230px] mt-4 font-mulish">Verify your email</p>
                            <p className="text-white text-sm max-w-[230px] font-mulish">and basic information.</p>
                        </div>
                        <div className="flex flex-col z-20 items-center text-center">
                            <img
                                src="data:image/svg+xml,%3csvg%20width='65'%20height='64'%20viewBox='0%200%2065%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20filter='url(%23filter0_ii_1274_60043)'%3e%3crect%20x='0.5'%20width='64'%20height='64'%20rx='32'%20fill='black'%3e%3c/rect%3e%3cpath%20d='M21.4203%2031.36V34.64C21.4203%2038.32%2023.5803%2040.28%2026.7803%2040.28C29.9803%2040.28%2032.1403%2038.32%2032.1403%2034.64V31.36C32.1403%2027.8%2029.9803%2025.72%2026.7803%2025.72C23.5803%2025.72%2021.4203%2027.8%2021.4203%2031.36ZM24.0603%2031.24C24.0603%2029.38%2025.0603%2028.08%2026.7803%2028.08C28.4403%2028.08%2029.5003%2029.3%2029.5003%2031.24V34.76C29.5003%2036.66%2028.6603%2037.92%2026.7803%2037.92C24.9603%2037.92%2024.0603%2036.74%2024.0603%2034.76V31.24ZM33.4944%2026V28.4H39.8344L36.3744%2031.24V33.6H38.8144C40.1544%2033.6%2041.0944%2034.26%2041.0944%2035.6C41.0944%2036.94%2040.1144%2037.92%2038.4544%2037.92C36.6744%2037.92%2035.7344%2036.8%2035.7344%2035.44V34.96H33.0944V35.52C33.0944%2038.3%2035.1144%2040.28%2038.4544%2040.28C41.5744%2040.28%2043.7344%2038.44%2043.7344%2035.6C43.7344%2033.06%2041.9944%2031.72%2040.0544%2031.72H39.5344V31.48L43.4144%2028.32V26H33.4944Z'%20fill='white'%3e%3c/path%3e%3crect%20x='0.75'%20y='0.25'%20width='63.5'%20height='63.5'%20rx='31.75'%20stroke='%2321BF73'%20stroke-width='0.5'%3e%3c/rect%3e%3crect%20x='0.75'%20y='0.25'%20width='63.5'%20height='63.5'%20rx='31.75'%20stroke='url(%23paint0_linear_1274_60043)'%20stroke-width='0.5'%3e%3c/rect%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_ii_1274_60043'%20x='0.5'%20y='0'%20width='64'%20height='64'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'%3e%3c/feFlood%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'%3e%3c/feBlend%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'%3e%3c/feColorMatrix%3e%3cfeOffset%3e%3c/feOffset%3e%3cfeGaussianBlur%20stdDeviation='13.2915'%3e%3c/feGaussianBlur%3e%3cfeComposite%20in2='hardAlpha'%20operator='arithmetic'%20k2='-1'%20k3='1'%3e%3c/feComposite%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.129412%200%200%200%200%200.74902%200%200%200%200%200.45098%200%200%200%200.25%200'%3e%3c/feColorMatrix%3e%3cfeBlend%20mode='normal'%20in2='shape'%20result='effect1_innerShadow_1274_60043'%3e%3c/feBlend%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'%3e%3c/feColorMatrix%3e%3cfeOffset%3e%3c/feOffset%3e%3cfeGaussianBlur%20stdDeviation='2.23297'%3e%3c/feGaussianBlur%3e%3cfeComposite%20in2='hardAlpha'%20operator='arithmetic'%20k2='-1'%20k3='1'%3e%3c/feComposite%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.129412%200%200%200%200%200.74902%200%200%200%200%200.45098%200%200%200%200.26%200'%3e%3c/feColorMatrix%3e%3cfeBlend%20mode='normal'%20in2='effect1_innerShadow_1274_60043'%20result='effect2_innerShadow_1274_60043'%3e%3c/feBlend%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_1274_60043'%20x1='62.6923'%20y1='59.1678'%20x2='44.3938'%20y2='40.8692'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FAFF00'%20stop-opacity='0.8'%3e%3c/stop%3e%3cstop%20offset='1'%20stop-color='white'%20stop-opacity='0'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
                            />
                            <p className="text-white text-sm max-w-[230px] mt-4 font-mulish">Enter your crypto</p>
                            <p className="text-white text-sm max-w-[230px] font-mulish">wallet address.</p>
                        </div>
                        <div className="flex flex-col z-20 items-center text-center">
                            <img
                                src="data:image/svg+xml,%3csvg%20width='65'%20height='64'%20viewBox='0%200%2065%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20filter='url(%23filter0_ii_1274_60047)'%3e%3crect%20x='0.5'%20width='64'%20height='64'%20rx='32'%20fill='black'%3e%3c/rect%3e%3cpath%20d='M21.0785%2031.36V34.64C21.0785%2038.32%2023.2385%2040.28%2026.4385%2040.28C29.6385%2040.28%2031.7985%2038.32%2031.7985%2034.64V31.36C31.7985%2027.8%2029.6385%2025.72%2026.4385%2025.72C23.2385%2025.72%2021.0785%2027.8%2021.0785%2031.36ZM23.7185%2031.24C23.7185%2029.38%2024.7185%2028.08%2026.4385%2028.08C28.0985%2028.08%2029.1585%2029.3%2029.1585%2031.24V34.76C29.1585%2036.66%2028.3185%2037.92%2026.4385%2037.92C24.6185%2037.92%2023.7185%2036.74%2023.7185%2034.76V31.24ZM37.9926%2026L32.5126%2034.92V37.24H39.4726V40H42.1126V37.24H44.3926V34.84H42.1126V26H37.9926ZM39.2326%2028.28H39.4726V34.84H35.2726L39.2326%2028.28Z'%20fill='white'%3e%3c/path%3e%3crect%20x='0.75'%20y='0.25'%20width='63.5'%20height='63.5'%20rx='31.75'%20stroke='%2321BF73'%20stroke-width='0.5'%3e%3c/rect%3e%3crect%20x='0.75'%20y='0.25'%20width='63.5'%20height='63.5'%20rx='31.75'%20stroke='url(%23paint0_linear_1274_60047)'%20stroke-width='0.5'%3e%3c/rect%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_ii_1274_60047'%20x='0.5'%20y='0'%20width='64'%20height='64'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'%3e%3c/feFlood%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'%3e%3c/feBlend%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'%3e%3c/feColorMatrix%3e%3cfeOffset%3e%3c/feOffset%3e%3cfeGaussianBlur%20stdDeviation='13.2915'%3e%3c/feGaussianBlur%3e%3cfeComposite%20in2='hardAlpha'%20operator='arithmetic'%20k2='-1'%20k3='1'%3e%3c/feComposite%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.129412%200%200%200%200%200.74902%200%200%200%200%200.45098%200%200%200%200.25%200'%3e%3c/feColorMatrix%3e%3cfeBlend%20mode='normal'%20in2='shape'%20result='effect1_innerShadow_1274_60047'%3e%3c/feBlend%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'%3e%3c/feColorMatrix%3e%3cfeOffset%3e%3c/feOffset%3e%3cfeGaussianBlur%20stdDeviation='2.23297'%3e%3c/feGaussianBlur%3e%3cfeComposite%20in2='hardAlpha'%20operator='arithmetic'%20k2='-1'%20k3='1'%3e%3c/feComposite%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.129412%200%200%200%200%200.74902%200%200%200%200%200.45098%200%200%200%200.26%200'%3e%3c/feColorMatrix%3e%3cfeBlend%20mode='normal'%20in2='effect1_innerShadow_1274_60047'%20result='effect2_innerShadow_1274_60047'%3e%3c/feBlend%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_1274_60047'%20x1='62.6923'%20y1='59.1678'%20x2='44.3938'%20y2='40.8692'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FAFF00'%20stop-opacity='0.8'%3e%3c/stop%3e%3cstop%20offset='1'%20stop-color='white'%20stop-opacity='0'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
                            />
                            <p className="text-white text-sm max-w-[230px] mt-4 font-mulish">Pay with your preferred</p>
                            <p className="text-white text-sm max-w-[230px] font-mulish">payment method.</p>
                        </div>
                    </div>
                </div>
                <img
                    src="data:image/svg+xml,%3csvg%20width='916'%20height='1'%20viewBox='0%200%20916%201'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20opacity='0.6'%3e%3crect%20width='0.5'%20height='240'%20transform='matrix(0%20-1%201%200%2029%200.812988)'%20fill='url(%23paint0_linear_1274_60030)'%3e%3c/rect%3e%3crect%20width='0.5'%20height='240'%20transform='matrix(0%20-1%201%200%20332%200.812988)'%20fill='url(%23paint1_linear_1274_60030)'%3e%3c/rect%3e%3crect%20width='0.5'%20height='240'%20transform='matrix(0%20-1%201%200%20635%200.812988)'%20fill='url(%23paint2_linear_1274_60030)'%3e%3c/rect%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_1274_60030'%20x1='0.25'%20y1='0'%20x2='0.25'%20y2='240'%20gradientUnits='userSpaceOnUse'%3e%3cstop%3e%3c/stop%3e%3cstop%20offset='0.224109'%20stop-color='%2321BF73'%3e%3c/stop%3e%3cstop%20offset='0.779157'%20stop-color='%2321BF73'%3e%3c/stop%3e%3cstop%20offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_1274_60030'%20x1='0.25'%20y1='0'%20x2='0.25'%20y2='240'%20gradientUnits='userSpaceOnUse'%3e%3cstop%3e%3c/stop%3e%3cstop%20offset='0.224109'%20stop-color='%2321BF73'%3e%3c/stop%3e%3cstop%20offset='0.779157'%20stop-color='%2321BF73'%3e%3c/stop%3e%3cstop%20offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20id='paint2_linear_1274_60030'%20x1='0.25'%20y1='0'%20x2='0.25'%20y2='240'%20gradientUnits='userSpaceOnUse'%3e%3cstop%3e%3c/stop%3e%3cstop%20offset='0.224109'%20stop-color='%2321BF73'%3e%3c/stop%3e%3cstop%20offset='0.779157'%20stop-color='%2321BF73'%3e%3c/stop%3e%3cstop%20offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
                    alt=""
                    className="absolute top-[64%] left-[24.5%] z-10"
                />
            </section>
            <div className="max-w-[1400px] mx-auto mt-[20px] mb-[96px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="bg-[#f0f2f4] px-[24px] py-[56px] rounded-[24px]">
                        <h2 className="text-[48px] text-center max-w-[530px] mx-auto font-bold mb-4">Choose the best way to buy crypto</h2>
                        <p className="text-[#3d4651] text-[16px] font-semibold max-w-[550px] mx-auto text-center font-mulish">
                            Choose your preferred option from all major global payment methods. Buy crypto with debit cards, credit cards, bank transfers, Apple Pay, Google Pay, and many others.
                        </p>
                        <div className="flex flex-wrap gap-2 my-[56px] max-w-[420px] mx-auto justify-center">
                            <div className="py-[10px] px-[12px] bg-white border rounded-lg shadow-sm">
                                <img
                                    src="data:image/svg+xml,%3csvg%20width='50'%20height='32'%20viewBox='0%200%2050%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M34.6259%2031.0102C42.8216%2031.0102%2049.4656%2024.2899%2049.4656%2016C49.4656%207.71006%2042.8216%200.989746%2034.6259%200.989746C30.9528%200.989746%2027.5914%202.33957%2025.0001%204.57557C22.4087%202.33959%2019.0473%200.989776%2015.3743%200.989776C7.17851%200.989776%200.534546%207.71009%200.534546%2016C0.534546%2024.2899%207.17851%2031.0103%2015.3743%2031.0103C19.0474%2031.0103%2022.4088%2029.6604%2025.0001%2027.4244C27.5914%2029.6604%2030.9528%2031.0102%2034.6259%2031.0102Z'%20fill='%23ED0006'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M25.0001%2027.4245C28.1908%2024.6713%2030.214%2020.5746%2030.214%2016C30.214%2011.4253%2028.1908%207.32868%2025.0001%204.57553C27.5914%202.33956%2030.9528%200.989746%2034.6259%200.989746C42.8217%200.989746%2049.4656%207.71006%2049.4656%2016C49.4656%2024.2899%2042.8217%2031.0102%2034.6259%2031.0102C30.9528%2031.0102%2027.5914%2029.6604%2025.0001%2027.4245Z'%20fill='%23F9A000'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M25.0002%2027.4244C28.1909%2024.6713%2030.2141%2020.5746%2030.2141%2016C30.2141%2011.4253%2028.1909%207.32866%2025.0002%204.5755C21.8095%207.32866%2019.7863%2011.4253%2019.7863%2016C19.7863%2020.5746%2021.8095%2024.6713%2025.0002%2027.4244Z'%20fill='%23FF5E00'/%3e%3c/svg%3e"
                                    alt="MasterCard"
                                    className="h-6"
                                />
                            </div>
                            <div className="py-[10px] px-[12px] bg-white border rounded-lg shadow-sm">
                                <img
                                    src="data:image/svg+xml,%3csvg%20width='54'%20height='19'%20viewBox='0%200%2054%2019'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M23.5068%2017.8778L19.2031%2017.8778L21.895%201.23541L26.1984%201.23541L23.5068%2017.8778Z'%20fill='%2300579F'/%3e%3cpath%20d='M39.1062%201.64243C38.2573%201.3057%2036.9109%200.933899%2035.2461%200.933899C30.9961%200.933899%2028.0032%203.19998%2027.9849%206.4398C27.9496%208.83013%2030.1277%2010.1578%2031.7567%2010.9548C33.4218%2011.7692%2033.9878%2012.3008%2033.9878%2013.0267C33.9708%2014.1417%2032.6423%2014.6556%2031.4032%2014.6556C29.685%2014.6556%2028.7643%2014.3906%2027.3652%2013.7703L26.7985%2013.5044L26.1963%2017.2403C27.2057%2017.7001%2029.0653%2018.1081%2030.9961%2018.126C35.5118%2018.126%2038.4517%2015.895%2038.4866%2012.4425C38.5037%2010.5479%2037.3536%209.09628%2034.8741%207.91005C33.3688%207.14857%2032.447%206.63511%2032.447%205.85599C32.4646%205.14769%2033.2267%204.42221%2034.9258%204.42221C36.3249%204.38668%2037.3529%204.72294%2038.1317%205.05944L38.5209%205.23617L39.1062%201.64243Z'%20fill='%2300579F'/%3e%3cpath%20d='M44.8289%2011.982C45.1834%2011.0259%2046.5472%207.3256%2046.5472%207.3256C46.5293%207.36113%2046.9009%206.35187%2047.1134%205.73228L47.4142%207.16629C47.4142%207.16629%2048.2292%2011.1499%2048.4062%2011.982C47.7335%2011.982%2045.679%2011.982%2044.8289%2011.982ZM50.1413%201.23541L46.8124%201.23541C45.7859%201.23541%2045.0059%201.53615%2044.563%202.61624L38.1704%2017.8776L42.6862%2017.8776C42.6862%2017.8776%2043.4296%2015.8235%2043.5894%2015.3811C44.0848%2015.3811%2048.4777%2015.3811%2049.115%2015.3811C49.2386%2015.9654%2049.6285%2017.8776%2049.6285%2017.8776L53.6133%2017.8776L50.1413%201.23541V1.23541Z'%20fill='%2300579F'/%3e%3cpath%20d='M15.6079%201.23541L11.3931%2012.584L10.9326%2010.2823C10.1534%207.62657%207.70957%204.74114%204.98242%203.30642L8.84298%2017.8602L13.394%2017.8602L20.1587%201.23541L15.6079%201.23541V1.23541Z'%20fill='%2300579F'/%3e%3cpath%20d='M7.47945%201.23541L0.555213%201.23541L0.484375%201.57168C5.88572%202.95274%209.46292%206.28174%2010.9326%2010.283L9.42738%202.63436C9.17957%201.57144%208.418%201.27047%207.47945%201.23541Z'%20fill='%23FAA61A'/%3e%3c/svg%3e"
                                    alt="VISA"
                                    className="h-6"
                                />
                            </div>
                            <div className="py-[10px] px-[12px] bg-white border rounded-lg shadow-sm">
                                <img
                                    src="data:image/svg+xml,%3csvg%20width='56'%20height='24'%20viewBox='0%200%2056%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M25.8909%2018.317L25.8909%2011.7481H29.2817C30.6711%2011.7481%2031.8438%2011.2826%2032.7999%2010.3645L33.0293%2010.1317C34.7757%208.23088%2034.661%205.26968%2032.7999%203.51107C31.8693%202.58004%2030.5946%202.07573%2029.2817%202.10159L23.8386%202.10159L23.8386%2018.317H25.8909ZM25.891%209.75657V4.0928L29.3329%204.0928C30.0722%204.0928%2030.7734%204.37729%2031.296%204.89452C32.4051%205.98073%2032.4306%207.79106%2031.3598%208.91606C30.8371%209.47209%2030.0977%209.78243%2029.3329%209.75657H25.891ZM42.6024%208.08869C41.7229%207.27404%2040.5246%206.86025%2039.0077%206.86025C37.0574%206.86025%2035.5915%207.58438%2034.6227%209.01972L36.4328%2010.1706C37.0956%209.18782%2038.0007%208.69645%2039.1479%208.69645C39.8745%208.69645%2040.5756%208.968%2041.1237%209.45937C41.6591%209.92489%2041.965%2010.5973%2041.965%2011.3085V11.7869C41.1747%2011.3473%2040.1804%2011.1145%2038.9567%2011.1145C37.529%2011.1145%2036.3818%2011.4507%2035.5277%2012.1361C34.6737%2012.8214%2034.2403%2013.7266%2034.2403%2014.8775C34.2148%2015.9249%2034.6609%2016.9205%2035.4512%2017.593C36.2543%2018.3171%2037.2741%2018.6792%2038.4723%2018.6792C39.8873%2018.6792%2041.009%2018.0455%2041.8631%2016.7783H41.9523V18.3171H43.9154V11.4766C43.9154%2010.0413%2043.482%208.90334%2042.6024%208.08869ZM37.0322%2016.274C36.6115%2015.9637%2036.3566%2015.4593%2036.3566%2014.9162C36.3566%2014.3085%2036.637%2013.8042%2037.1852%2013.4033C37.7461%2013.0025%2038.4472%2012.7956%2039.2758%2012.7956C40.4231%2012.7826%2041.3154%2013.0413%2041.9528%2013.5585C41.9528%2014.4378%2041.6086%2015.2007%2040.933%2015.8473C40.3211%2016.468%2039.4925%2016.8171%2038.6257%2016.8171C38.052%2016.83%2037.4911%2016.6361%2037.0322%2016.274ZM48.3261%2023.1921L55.1841%207.2223L52.9533%207.2223L49.7792%2015.1878H49.741L46.4905%207.2223H44.2597L48.7595%2017.6059L46.21%2023.1921H48.3261Z'%20fill='%233C4043'/%3e%3cpath%20d='M18.8047%2010.3257C18.8047%209.69211%2018.7537%209.05849%2018.6518%208.43781L9.99744%208.43781V12.0197H14.9555C14.7516%2013.1705%2014.0888%2014.205%2013.1201%2014.8516L13.1201%2017.1791H16.0771C17.8106%2015.5628%2018.8047%2013.1705%2018.8047%2010.3257Z'%20fill='%234285F4'/%3e%3cpath%20d='M9.9977%2019.43C12.4707%2019.43%2014.5612%2018.6023%2016.0781%2017.1798L13.1208%2014.8519C12.2922%2015.421%2011.2342%2015.7443%209.9977%2015.7443C7.60123%2015.7443%205.57443%2014.1018%204.84784%2011.9033H1.80127L1.80127%2014.3088C3.35643%2017.4513%206.53047%2019.43%209.9977%2019.43Z'%20fill='%2334A853'/%3e%3cpath%20d='M4.84776%2011.9034C4.46532%2010.7525%204.46532%209.49822%204.84776%208.33443V5.9422L1.80105%205.9422C0.48803%208.56719%200.48803%2011.6706%201.80105%2014.2956L4.84776%2011.9034Z'%20fill='%23FBBC04'/%3e%3cpath%20d='M9.9977%204.4943C11.3107%204.46843%2012.5726%204.9728%2013.5159%205.89101L16.1418%203.22692C14.472%201.64916%2012.2794%200.782681%209.9977%200.808546C6.53047%200.808546%203.35643%202.80015%201.80127%205.94274L4.84784%208.34817C5.57443%206.13672%207.60123%204.4943%209.9977%204.4943Z'%20fill='%23EA4335'/%3e%3c/svg%3e"
                                    alt="Google Pay"
                                    className="h-6"
                                />
                            </div>
                            <div className="py-[10px] px-[12px] bg-white border rounded-lg shadow-sm">
                                <img
                                    src="data:image/svg+xml,%3csvg%20width='56'%20height='24'%20viewBox='0%200%2056%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.02152%204.87623C9.04361%204.96245%2010.0657%204.35892%2010.7045%203.59373C11.3326%202.80699%2011.7479%201.75082%2011.6414%200.673096C10.7364%200.716205%209.61853%201.27662%208.97973%202.06336C8.39416%202.74233%207.89376%203.84161%208.02152%204.87623ZM20.1812%2018.7573L20.1812%201.95555L26.4103%201.95555C29.626%201.95555%2031.8727%204.19722%2031.8727%207.47351C31.8727%2010.7498%2029.5834%2013.013%2026.3251%2013.013L22.758%2013.013L22.758%2018.7573L20.1812%2018.7573ZM11.631%205.08096C10.7304%205.0285%209.90873%205.35508%209.24502%205.61887C8.8179%205.78862%208.45621%205.93237%208.18105%205.93237C7.87225%205.93237%207.49563%205.78093%207.07277%205.6109C6.51869%205.38811%205.88522%205.1334%205.22092%205.14563C3.69827%205.16718%202.28209%206.04014%201.50479%207.4304C-0.0923996%2010.2109%201.08952%2014.3278%202.63347%2016.5911C3.38948%2017.7119%204.29455%2018.9405%205.48712%2018.8974C6.01178%2018.8774%206.38919%2018.7153%206.77977%2018.5475C7.22943%2018.3544%207.69656%2018.1538%208.42595%2018.1538C9.13005%2018.1538%209.57675%2018.3492%2010.0055%2018.5367C10.4133%2018.7151%2010.8048%2018.8864%2011.3861%2018.8759C12.6212%2018.8543%2013.3985%2017.755%2014.1545%2016.6342C14.9704%2015.4312%2015.3289%2014.2572%2015.3833%2014.079L15.3897%2014.0584C15.3884%2014.0571%2015.3783%2014.0524%2015.3605%2014.0442C15.0878%2013.9178%2013.0033%2012.9519%2012.9833%2010.3618C12.9632%208.1878%2014.6367%207.08631%2014.9001%206.91292C14.9161%206.90237%2014.9269%206.89525%2014.9318%206.89154C13.867%205.29651%2012.206%205.12407%2011.631%205.08096ZM36.5794%2018.8867C38.1978%2018.8867%2039.6992%2018.0569%2040.3807%2016.742H40.4339L40.4339%2018.7574L42.819%2018.7574L42.819%2010.3942C42.819%207.96936%2040.9024%206.40666%2037.9529%206.40666C35.2164%206.40666%2033.1933%207.99092%2033.1188%2010.1679L35.44%2010.1679C35.6317%209.1333%2036.5794%208.45434%2037.8784%208.45434C39.4543%208.45434%2040.3381%209.19797%2040.3381%2010.5667V11.4935L37.1224%2011.6875C34.1303%2011.8707%2032.5118%2013.1101%2032.5118%2015.2656C32.5118%2017.4426%2034.1836%2018.8867%2036.5794%2018.8867ZM37.2709%2016.8929C35.8975%2016.8929%2035.0245%2016.2247%2035.0245%2015.2008C35.0245%2014.1447%2035.8656%2013.5304%2037.4732%2013.4334L40.3372%2013.2501V14.1985C40.3372%2015.772%2039.017%2016.8929%2037.2709%2016.8929ZM50.7302%2019.4148C49.6974%2022.357%2048.5154%2023.3269%2046.0025%2023.3269C45.8109%2023.3269%2045.172%2023.3054%2045.0229%2023.2623L45.0229%2021.2469C45.1826%2021.2685%2045.5766%2021.29%2045.7789%2021.29C46.9183%2021.29%2047.5571%2020.8051%2047.9511%2019.5441L48.1854%2018.8005L43.8197%206.56831L46.5136%206.56831L49.5483%2016.4942H49.6015L52.6362%206.56831L55.2556%206.56831L50.7302%2019.4148ZM22.7578%204.15416L25.7283%204.15416C27.9641%204.15416%2029.2417%205.36122%2029.2417%207.48434C29.2417%209.60746%2027.9641%2010.8253%2025.7176%2010.8253L22.7578%2010.8253L22.7578%204.15416Z'%20fill='black'/%3e%3c/svg%3e"
                                    alt="Apple Pay"
                                    className="h-6"
                                />
                            </div>
                            <div className="py-[10px] px-[12px] bg-white border rounded-lg shadow-sm"><img src="/assets/sepa-V75M5h7N.svg" alt="Apple Pay" className="h-6" /></div>
                            <div className="py-[10px] px-[12px] bg-white border rounded-lg shadow-sm">
                                <img
                                    src="data:image/svg+xml,%3csvg%20width='52'%20height='26'%20viewBox='0%200%2060%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M38.8222%205.13817C37.8235%204.23581%2036.6176%203.79471%2035.2236%203.79471C33.8486%203.79471%2032.6427%204.23637%2031.6434%205.13817C30.6446%206.02093%2030.1369%207.24964%2030.1369%208.82373C30.1369%2010.3978%2030.6446%2011.6254%2031.6434%2012.5278C32.6422%2013.4105%2033.8486%2013.8522%2035.2236%2013.8522C36.6176%2013.8522%2037.8235%2013.4105%2038.8222%2012.5278C39.84%2011.6254%2040.3478%2010.3973%2040.3478%208.82373C40.3478%207.2502%2039.8395%206.02093%2038.8222%205.13817ZM33.3403%2010.8384C32.8135%2010.3206%2032.5481%209.64828%2032.5481%208.82317C32.5481%207.99806%2032.8112%207.32633%2033.3403%206.82701C33.5856%206.57803%2033.879%206.38158%2034.2027%206.24964C34.5264%206.1177%2034.8735%206.05302%2035.223%206.05956C35.5754%206.05296%2035.9256%206.11752%2036.2524%206.24939C36.5793%206.38126%2036.8762%206.57772%2037.1254%206.82701C37.6706%207.32633%2037.936%207.9975%2037.936%208.82317C37.936%209.64884%2037.6729%2010.32%2037.1254%2010.8384C36.5985%2011.3371%2035.9575%2011.5868%2035.223%2011.5868C34.8753%2011.5923%2034.53%2011.529%2034.2069%2011.4006C33.8838%2011.2722%2033.5892%2011.0811%2033.3403%2010.8384ZM43.9106%2013.5829L43.9106%200.41254L41.5369%200.41254L41.5369%2013.5829L43.9106%2013.5829ZM51.572%204.0634L51.572%209.31857C51.572%2010.5848%2050.9002%2011.4245%2049.6216%2011.4245C48.321%2011.4245%2047.6671%2010.5859%2047.6671%209.31857L47.6671%204.0634L45.2889%204.0634L45.2889%209.72161C45.2889%2011.9137%2046.6454%2013.8516%2049.6216%2013.8516H49.64C52.5977%2013.8516%2053.9519%2011.8706%2053.9519%209.72161L53.9519%204.0634L51.572%204.0634ZM27.6109%204.0634L25.2371%2010.512L22.8634%204.0634L20.3391%204.0634L24.127%2013.5835L26.3507%2013.5835L30.138%204.0634L27.6109%204.0634ZM20.3503%208.55448C20.3503%207.17295%2019.9175%206.04053%2019.0694%205.13817C18.2212%204.23581%2017.1301%203.79471%2015.7921%203.79471C14.4171%203.79471%2013.2482%204.27499%2012.2875%205.21486C11.3447%206.15584%2010.875%207.34536%2010.875%208.82317C10.875%2010.301%2011.3458%2011.5107%2012.269%2012.4505C13.2118%2013.3915%2014.3421%2013.8516%2015.6795%2013.8516C17.7342%2013.8516%2019.1841%2012.9302%2020.0681%2011.0684L18.2979%2010.0317C17.7151%2011.2022%2016.8658%2011.7782%2015.7171%2011.7782C14.3046%2011.7782%2013.3058%2010.8568%2013.1547%209.39862L20.3497%209.39862V8.55392L20.3503%208.55448ZM15.7154%205.63693C17.0528%205.63693%2017.9391%206.40438%2018.1647%207.63309L13.1535%207.63309C13.5124%206.50066%2014.491%205.63693%2015.7159%205.63693H15.7154ZM10.8744%2013.5829L7.6895%207.90234C9.70437%207.15392%2010.7031%205.84908%2010.7031%203.94864C10.7054%201.62613%208.8954%200.147766%206.01334%200.147766L0.381348%200.147766L0.381348%2013.5829L2.86816%2013.5829L2.86816%208.13241L4.97876%208.13241L8.02989%2013.5835L10.8744%2013.5829ZM6.01334%202.37399C7.48292%202.37399%208.21799%202.96904%208.21799%204.13953C8.21799%205.31002%207.48236%205.90506%206.01334%205.90506L2.86816%205.90506L2.86816%202.37399L6.01334%202.37399ZM57.976%2013.8516C56.4482%2013.8516%2055.2093%2012.5888%2055.2093%2011.0304L55.2093%201.49123L57.583%201.49123L57.583%204.06676L59.6186%204.06676V6.02429L57.583%206.02429L57.583%2010.8747C57.583%2011.3315%2057.9464%2011.7015%2058.3954%2011.7015L59.6186%2011.7015L59.6186%2013.8516L57.976%2013.8516Z'%20fill='black'/%3e%3c/svg%3e"
                                    alt="Apple Pay"
                                    className="h-6"
                                />
                            </div>
                            <div className="py-[10px] px-[12px] bg-white border rounded-lg shadow-sm"><img src="/assets/ach-B2ybWOzS.svg" alt="Apple Pay" className="h-6" /></div>
                        </div>
                    </div>
                    <div className="bg-[#f0f2f4] px-[24px] py-[56px] rounded-[24px]">
                        <h2 className="text-[48px] text-center max-w-[530px] mx-auto font-bold mb-4">Popular tokens available</h2>
                        <p className="text-[#3d4651] text-[16px] font-semibold max-w-[550px] mx-auto text-center font-mulish">Purchase any of 110+ of the most popular cryptocurrencies on top blockchain networks.</p>
                        <div className="flex flex-wrap gap-2 my-[56px] max-w-[600px] justify-center">
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Logo'%3e%3cpath%20id='Vector'%20d='M23.641%2014.9029C22.0381%2021.3315%2015.5262%2025.2439%209.09607%2023.6408C2.66864%2022.0381%20-1.24415%2015.5265%200.359423%209.09838C1.96159%202.66903%208.47349%20-1.24361%2014.9016%200.359081C21.3313%201.96177%2025.2438%208.47405%2023.6408%2014.903L23.6409%2014.9029H23.641Z'%20fill='%23F7931A'/%3e%3cpath%20id='Vector_2'%20d='M17.3702%2010.3507C17.6074%208.74302%2016.4002%207.87884%2014.7494%207.30234L15.2849%205.1246L13.9774%204.79428L13.4561%206.91468C13.1124%206.82776%2012.7594%206.74586%2012.4086%206.66467L12.9337%204.53027L11.627%204.19995L11.0912%206.37698C10.8067%206.31132%2010.5274%206.24642%2010.2563%206.17804L10.2578%206.17119L8.45476%205.71468L8.10695%207.13057C8.10695%207.13057%209.077%207.35601%209.05656%207.36989C9.58602%207.50387%209.68177%207.85923%209.66587%208.1409L9.05586%2010.6219C9.09232%2010.6312%209.13961%2010.6448%209.19179%2010.6661C9.14817%2010.6551%209.10175%2010.6431%209.05359%2010.6314L8.19857%2014.1069C8.13386%2014.27%207.96962%2014.5147%207.59945%2014.4218C7.61255%2014.441%206.64915%2014.1813%206.64915%2014.1813L6%2015.6988L7.70149%2016.1288C8.01802%2016.2093%208.32821%2016.2935%208.63368%2016.3727L8.09263%2018.5754L9.39861%2018.9058L9.93441%2016.7264C10.2912%2016.8246%2010.6374%2016.9152%2010.9764%2017.0006L10.4424%2019.1696L11.7499%2019.5L12.2909%2017.3014C14.5205%2017.7292%2016.1969%2017.5567%2016.9026%2015.5121C17.4712%2013.8659%2016.8743%2012.9164%2015.7013%2012.2972C16.5556%2012.0974%2017.1991%2011.5277%2017.3707%2010.3509L17.3703%2010.3506L17.3702%2010.3507ZM14.3829%2014.5979C13.9788%2016.244%2011.2452%2015.3542%2010.3589%2015.131L11.0769%2012.2128C11.9631%2012.4371%2014.8052%2012.8811%2014.383%2014.5979H14.3829ZM14.7873%2010.3268C14.4187%2011.8242%2012.1434%2011.0635%2011.4053%2010.8769L12.0563%208.2303C12.7944%208.41684%2015.1713%208.76499%2014.7874%2010.3268H14.7873Z'%20fill='white'/%3e%3c/g%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        className="h-6"
                                    />
                                    <h2 className="text-[16px] font-semibold font-mulish">Bitcoin</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2_2)'%3e%3cpath%20d='M12.5%2024C19.1274%2024%2024.5%2018.6274%2024.5%2012C24.5%205.37258%2019.1274%200%2012.5%200C5.87258%200%200.5%205.37258%200.5%2012C0.5%2018.6274%205.87258%2024%2012.5%2024Z'%20fill='url(%23paint0_linear_2_2)'/%3e%3cpath%20d='M12.5%204.5L17%2012.2419L12.5%2015L8%2012.2419L12.5%204.5Z'%20fill='white'/%3e%3cpath%20d='M12.4986%2019.4998L17%2013.125L12.4987%2015.7978L8%2013.125L12.4986%2019.4998Z'%20fill='%23A5ABC1'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_2_2'%20x1='12.5'%20y1='0'%20x2='12.5'%20y2='24'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%2333447E'/%3e%3cstop%20offset='1'%20stop-color='%23152457'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_2_2'%3e%3crect%20width='25'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        className="h-6"
                                    />
                                    <h2 className="text-[16px] font-semibold font-mulish">Ether</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img src="/assets/doge-Di110Hwq.svg" alt="Bitcoin" className="h-6" />
                                    <h2 className="text-[16px] font-semibold font-mulish">Dogecoin</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%2024C18.6274%2024%2024%2018.6274%2024%2012C24%205.37258%2018.6274%200%2012%200C5.37258%200%200%205.37258%200%2012C0%2018.6274%205.37258%2024%2012%2024Z'%20fill='%23010101'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.44861%2010.7939H16.0357C16.1558%2010.7939%2016.2698%2010.8414%2016.3527%2010.926L17.8693%2012.4467C18.1491%2012.7274%2017.9502%2013.2061%2017.5523%2013.2061H7.96525C7.84513%2013.2061%207.73118%2013.1586%207.64825%2013.074L6.13161%2011.5533C5.84979%2011.2726%206.05076%2010.7939%206.44861%2010.7939ZM6.13161%208.77788L7.64825%207.25704C7.73318%207.17246%207.84722%207.125%207.96525%207.125H17.5502C17.9481%207.125%2018.1491%207.60372%2017.8672%207.88438L16.3527%209.40512C16.2677%209.4898%2016.1537%209.53726%2016.0357%209.53726H6.44861C6.05076%209.53726%205.84979%209.05854%206.13161%208.77788ZM17.8672%2015.2221L16.3506%2016.743C16.2657%2016.8276%2016.1516%2016.875%2016.0336%2016.875H6.44861C6.05076%2016.875%205.84979%2016.3963%206.13161%2016.1156L7.64825%2014.5949C7.73318%2014.5102%207.84722%2014.4628%207.96525%2014.4628H17.5502C17.9481%2014.4628%2018.1491%2014.9415%2017.8672%2015.2221Z'%20fill='url(%23paint0_linear_2_22)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_2_22'%20x1='6.68315'%20y1='17.2945'%20x2='17.272'%20y2='6.66199'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23CB4EE8'/%3e%3cstop%20offset='1'%20stop-color='%2310F4B1'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        className="h-6"
                                    />
                                    <h2 className="text-[16px] font-semibold font-mulish">Solana</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2_30)'%3e%3cpath%20d='M12%200C18.628%200%2024%205.37306%2024%2012C24%2018.628%2018.628%2024%2012%2024C5.37306%2024%200%2018.6275%200%2012C0%205.37306%205.37306%200%2012%200Z'%20fill='%23F5AC37'/%3e%3cpath%20d='M12.1862%2012.8402H16.7201C16.8167%2012.8402%2016.8624%2012.8402%2016.8693%2012.7141C16.9064%2012.2553%2016.9064%2011.7937%2016.8693%2011.3343C16.8693%2011.2451%2016.8248%2011.2083%2016.7276%2011.2083H7.70449C7.59281%2011.2083%207.56274%2011.2451%207.56274%2011.3493V12.6698C7.56274%2012.8402%207.56274%2012.8402%207.74154%2012.8402H12.1862ZM16.363%209.665C16.3759%209.63135%2016.3759%209.59449%2016.363%209.56137C16.2873%209.39738%2016.1976%209.24085%2016.0935%209.09396C15.9367%208.8429%2015.752%208.61159%2015.5415%208.4038C15.4422%208.27826%2015.3273%208.16555%2015.1984%208.06993C14.553%207.52346%2013.7858%207.13671%2012.961%206.94227C12.5449%206.84932%2012.1197%206.80499%2011.6933%206.80873H7.68892C7.57724%206.80873%207.5622%206.85306%207.5622%206.94975V9.58327C7.5622%209.69438%207.5622%209.7243%207.70395%209.7243H16.3093C16.3093%209.7243%2016.384%209.70934%2016.399%209.665H16.363ZM16.363%2014.3834C16.2363%2014.3696%2016.1085%2014.3696%2015.9818%2014.3834H7.71201C7.60033%2014.3834%207.56274%2014.3834%207.56274%2014.5319V17.1067C7.56274%2017.2253%207.56274%2017.2552%207.71201%2017.2552H11.5301C11.7127%2017.2691%2011.8952%2017.2563%2012.074%2017.2184C12.6281%2017.1788%2013.1731%2017.0592%2013.6929%2016.8621C13.8819%2016.7969%2014.0644%2016.7119%2014.2368%2016.6099H14.2889C15.1839%2016.1468%2015.9109%2015.4192%2016.3695%2014.5261C16.3695%2014.5261%2016.4215%2014.4139%2016.363%2014.3845V14.3834ZM6.06417%2018.5901V18.5458V16.8172V16.2312V14.4876C6.06417%2014.3909%206.06417%2014.3765%205.94497%2014.3765H4.32667C4.237%2014.3765%204.19995%2014.3765%204.19995%2014.2579V12.8482H5.92994C6.02659%2012.8482%206.06417%2012.8482%206.06417%2012.7221V11.3274C6.06417%2011.2382%206.06417%2011.2163%205.94497%2011.2163H4.32667C4.237%2011.2163%204.19995%2011.2163%204.19995%2011.0977V9.79214C4.19995%209.71041%204.19995%209.68851%204.31915%209.68851H5.92242C6.0341%209.68851%206.06417%209.6885%206.06417%209.54747V5.54859C6.06417%205.43%206.06417%205.40009%206.21344%205.40009H11.8061C12.212%205.41611%2012.6153%205.46045%2013.0142%205.53363C13.8362%205.68481%2014.6261%205.977%2015.3482%206.3942C15.8272%206.67465%2016.268%207.01331%2016.6605%207.40326C16.9558%207.70829%2017.2221%208.03841%2017.4584%208.3899C17.693%208.7462%2017.8879%209.12708%2018.0409%209.52505C18.0597%209.62868%2018.1596%209.69866%2018.2637%209.68103H19.5986C19.7698%209.68103%2019.7698%209.68103%2019.7774%209.84449V11.0614C19.7774%2011.1799%2019.7328%2011.2099%2019.6131%2011.2099H18.5838C18.4796%2011.2099%2018.4495%2011.2099%2018.457%2011.3434C18.4979%2011.7953%2018.4979%2012.2488%2018.457%2012.7008C18.457%2012.8268%2018.457%2012.8418%2018.5993%2012.8418H19.7768C19.8289%2012.9086%2019.7768%2012.9753%2019.7768%2013.0426C19.7843%2013.1286%2019.7843%2013.2157%2019.7768%2013.3017V14.1997C19.7768%2014.3257%2019.7398%2014.3631%2019.6276%2014.3631H18.2181C18.1199%2014.3444%2018.0243%2014.4069%2018.0017%2014.5042C17.6661%2015.3722%2017.1292%2016.1505%2016.4355%2016.7744C16.1821%2017.0015%2015.9158%2017.2151%2015.6376%2017.4123C15.3391%2017.5832%2015.0486%2017.7611%2014.7426%2017.9021C14.1793%2018.1542%2013.5887%2018.3401%2012.9825%2018.4582C12.4069%2018.5608%2011.8233%2018.6072%2011.2375%2018.5992H6.06202V18.5917L6.06417%2018.5901Z'%20fill='%23FEFEFD'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2_30'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        className="h-6"
                                    />
                                    <h2 className="text-[16px] font-semibold font-mulish">DAI</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2_18)'%3e%3cpath%20d='M24%2012C24%205.37258%2018.6274%200%2012%200C5.37258%200%200%205.37258%200%2012C0%2018.6274%205.37258%2024%2012%2024C18.6274%2024%2024%2018.6274%2024%2012Z'%20fill='white'/%3e%3cpath%20d='M23.641%2014.9029C22.0381%2021.3315%2015.5262%2025.2439%209.09607%2023.6408C2.66864%2022.0381%20-1.24415%2015.5265%200.359423%209.09838C1.96159%202.66903%208.47349%20-1.24361%2014.9016%200.359082C21.3313%201.96177%2025.244%208.47395%2023.641%2014.9029Z'%20fill='%2350AF95'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13.526%2012.8182C13.4408%2012.8246%2013.0004%2012.8509%2012.0181%2012.8509C11.2368%2012.8509%2010.6821%2012.8275%2010.4875%2012.8182C7.46818%2012.6856%205.21452%2012.1606%205.21452%2011.5321C5.21452%2010.9036%207.46818%2010.3793%2010.4875%2010.2445V12.2954C10.685%2012.3096%2011.2503%2012.3429%2012.0316%2012.3429C12.9692%2012.3429%2013.4386%2012.3039%2013.5232%2012.2961V10.2459C16.5361%2010.38%2018.7848%2010.905%2018.7848%2011.5321C18.7848%2012.1592%2016.5368%2012.6842%2013.5232%2012.8175L13.526%2012.8182ZM13.526%2010.0338V8.19862H17.7308V5.40002H6.28276V8.19862H10.4868V10.0331C7.06973%2010.1899%204.5%2010.866%204.5%2011.6761C4.5%2012.4862%207.06973%2013.1616%2010.4868%2013.3191V19.2H13.5253V13.317C16.9346%2013.1602%2019.5%2012.4848%2019.5%2011.6754C19.5%2010.866%2016.9374%2010.1913%2013.526%2010.0338Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2_18'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        className="h-6"
                                    />
                                    <h2 className="text-[16px] font-semibold font-mulish">USDT</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img src="/assets/TON-y4y0pbrQ.png" alt="Bitcoin" className="h-6" />
                                    <h2 className="text-[16px] font-semibold font-mulish">TON</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1_136)'%3e%3cmask%20id='mask0_1_136'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='24'%20height='24'%3e%3cpath%20d='M24%200H0V24H24V0Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_1_136)'%3e%3cpath%20d='M12%2024C18.6274%2024%2024%2018.6274%2024%2012C24%205.37258%2018.6274%200%2012%200C5.37258%200%200%205.37258%200%2012C0%2018.6274%205.37258%2024%2012%2024Z'%20fill='black'/%3e%3cpath%20d='M19.1719%206H17.0906L13.7975%209.27821C13.318%209.75371%2012.6719%2010.0203%2011.9987%2010.0203C11.3256%2010.0203%2010.6794%209.75371%2010.2%209.27821L6.90936%206H4.82642L9.15936%2010.3155C10.729%2011.8774%2013.2721%2011.8774%2014.8406%2010.3155L19.1719%206Z'%20fill='white'/%3e%3cpath%20d='M4.80005%2018H6.88271L10.2026%2014.6952C10.682%2014.2197%2011.3282%2013.9531%2012.0013%2013.9531C12.6745%2013.9531%2013.3206%2014.2197%2013.8001%2014.6952L17.1188%2018H19.2001L14.8407%2013.6579C13.271%2012.0959%2010.728%2012.0959%209.15943%2013.6579L4.80005%2018Z'%20fill='white'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1_136'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        className="h-6"
                                    />
                                    <h2 className="text-[16px] font-semibold font-mulish">XRP</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2_7)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%200C18.6276%200%2024%205.37247%2024%2012.0001C24%2018.6271%2018.6276%2024.0001%2012%2024.0001C5.37246%2024.0001%200%2018.6271%200%2012.0001C0%205.37247%205.37246%200%2012%200Z'%20fill='%232775CA'/%3e%3cpath%20d='M9.75107%2020.124C9.75107%2020.4031%209.53008%2020.5617%209.25715%2020.4774C5.62989%2019.333%203%2015.9691%203%2011.9999C3%208.0309%205.62989%204.66687%209.25715%203.52242C9.53008%203.43869%209.75107%203.59671%209.75107%203.87581V4.5648C9.75107%204.7506%209.60547%204.96929%209.42647%205.02983C6.55665%206.07208%204.50083%208.79876%204.50083%2011.9952C4.50083%2015.1916%206.55665%2017.9189%209.42647%2018.9606C9.60547%2019.0258%209.75107%2019.2397%209.75107%2019.4261V20.124Z'%20fill='white'/%3e%3cpath%20d='M12.7482%2017.5601C12.7482%2017.7651%2012.5789%2017.9325%2012.3719%2017.9325H11.6237C11.4168%2017.9325%2011.2475%2017.7651%2011.2475%2017.5601V16.3878C9.61019%2016.1692%208.81063%2015.2617%208.59414%2014.0288C8.55638%2013.8191%208.72569%2013.6285%208.94218%2013.6285H9.79845C9.97718%2013.6285%2010.1278%2013.7543%2010.1654%2013.9308C10.3255%2014.666%2010.7536%2015.2291%2012.066%2015.2291C13.0351%2015.2291%2013.7222%2014.6939%2013.7222%2013.894C13.7222%2013.0933%2013.3175%2012.791%2011.8967%2012.5582C9.79845%2012.2791%208.80586%2011.6508%208.80586%2010.0223C8.80586%208.76606%209.76574%207.78907%2011.2523%207.57954V6.43024C11.2523%206.22544%2011.4217%206.05784%2011.6285%206.05784H12.3767C12.5836%206.05784%2012.7529%206.22544%2012.7529%206.43024V7.61217C13.962%207.82655%2014.7289%208.50543%2014.9783%209.6314C15.0252%209.84578%2014.8559%2010.0455%2014.6349%2010.0455H13.8444C13.6751%2010.0455%2013.534%209.93369%2013.4823%209.77095C13.2706%209.05473%2012.7529%208.74772%2011.8543%208.74772C10.8617%208.74772%2010.3488%209.22219%2010.3488%209.88745C10.3488%2010.5901%2010.6407%2010.9434%2012.1651%2011.1625C14.2254%2011.4416%2015.2889%2012.0232%2015.2889%2013.7591C15.2889%2015.0757%2014.3008%2016.1413%2012.7529%2016.3878V17.5601H12.7482Z'%20fill='white'/%3e%3cpath%20d='M14.249%2020.124C14.249%2020.4031%2014.4702%2020.5616%2014.7429%2020.4774C18.3701%2019.3282%2020.9955%2015.9689%2021%2012.0093C21%208.04029%2018.3701%204.67639%2014.7429%203.53127C14.4702%203.44336%2014.249%203.6061%2014.249%203.8852V4.57365C14.249%204.76012%2014.3948%204.97396%2014.5736%205.03922C17.4434%206.08146%2019.4992%208.80815%2019.4992%2012.0046C19.4992%2015.201%2017.4434%2017.9277%2014.5736%2018.97C14.376%2019.0401%2014.249%2019.2307%2014.249%2019.4355V20.124Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2_7'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        className="h-6"
                                    />
                                    <h2 className="text-[16px] font-semibold font-mulish">USDC</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1_144)'%3e%3cmask%20id='mask0_1_144'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='25'%20height='24'%3e%3cpath%20d='M24.5%206.10352e-05H0.5V24.0001H24.5V6.10352e-05Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_1_144)'%3e%3cpath%20d='M12.5%2024.0001C19.1274%2024.0001%2024.5%2018.6275%2024.5%2012.0001C24.5%205.37269%2019.1274%200.000106812%2012.5%200.000106812C5.87258%200.000106812%200.5%205.37269%200.5%2012.0001C0.5%2018.6275%205.87258%2024.0001%2012.5%2024.0001Z'%20fill='%23F0B90B'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M14.3582%206.39738L12.5%204.50006L7.8209%209.20989L9.67911%2011.0626L14.3582%206.39738ZM17.1791%209.20989L15.3209%207.31256L7.8209%2014.8349L9.67911%2016.6876L17.1791%209.20989ZM6.85821%2010.1251L8.71642%2012.0224L6.85821%2013.8751L5%2012.0224L6.85821%2010.1251ZM20%2012.0224L18.1418%2010.1251L10.6418%2017.6474L12.5%2019.5001L20%2012.0224Z'%20fill='white'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1_144'%3e%3crect%20width='25'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        className="h-6"
                                    />
                                    <h2 className="text-[16px] font-semibold font-mulish">BNB</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2_23)'%3e%3cmask%20id='mask0_2_23'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='25'%20height='24'%3e%3cpath%20d='M24.5%206.10352e-05H0.5V24.0001H24.5V6.10352e-05Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_2_23)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M24.5%2012.0001C24.5%2018.627%2019.127%2024.0001%2012.5%2024.0001C5.87305%2024.0001%200.5%2018.627%200.5%2012.0001C0.5%205.37311%205.87305%206.10352e-05%2012.5%206.10352e-05C19.127%206.10352e-05%2024.5%205.37311%2024.5%2012.0001Z'%20fill='white'/%3e%3cpath%20d='M12.5%206.10352e-05C10.1266%206.10352e-05%207.80656%200.70385%205.83317%202.02243C3.85978%203.34101%202.3217%205.21515%201.41345%207.40787C0.505199%209.60058%200.267559%2012.0134%200.730582%2014.3412C1.19361%2016.6689%202.3365%2018.8071%204.01473%2020.4854C5.69296%2022.1636%207.83116%2023.3065%2010.1589%2023.7695C12.4867%2024.2325%2014.8995%2023.9949%2017.0922%2023.0866C19.2849%2022.1784%2021.1591%2020.6403%2022.4777%2018.6669C23.7962%2016.6935%2024.5%2014.3735%2024.5%2012.0001C24.5046%2010.4288%2024.1997%208.87198%2023.6026%207.41855C23.0055%205.96512%2022.128%204.64352%2021.0202%203.52921C19.9124%202.41491%2018.5959%201.52972%2017.146%200.924183C15.696%200.31865%2014.141%200.00463315%2012.5698%206.10352e-05H12.5ZM12.7034%2012.4069L11.454%2016.6199H18.1368C18.1811%2016.6184%2018.2252%2016.6256%2018.2667%2016.6411C18.3082%2016.6566%2018.3462%2016.6801%2018.3786%2016.7104C18.411%2016.7406%2018.4371%2016.7769%2018.4554%2016.8172C18.4738%2016.8575%2018.484%2016.9011%2018.4855%2016.9454V17.0558L17.9044%2019.0606C17.8788%2019.1554%2017.8217%2019.2387%2017.7425%2019.2968C17.6633%2019.3549%2017.5667%2019.3843%2017.4685%2019.3802H7.24093L8.95522%2013.54L7.03754%2014.1211L7.47338%2012.7846L9.39106%2012.2035L11.8027%204.00975C11.8292%203.91547%2011.8866%203.83279%2011.9655%203.77487C12.0445%203.71695%2012.1406%203.68712%2012.2385%203.69014H14.8245C14.8687%203.68858%2014.9129%203.69577%2014.9544%203.71129C14.9959%203.72681%2015.0339%203.75035%2015.0663%203.78058C15.0986%203.8108%2015.1248%203.84711%2015.1431%203.88743C15.1614%203.92775%2015.1716%203.97129%2015.1731%204.01556V4.12597L13.1392%2011.0412L15.0569%2010.4601L14.6501%2011.8548L12.7034%2012.4069Z'%20fill='%23345D9D'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2_23'%3e%3crect%20width='25'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        className="h-6"
                                    />
                                    <h2 className="text-[16px] font-semibold font-mulish">Litecoin</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img src="/assets/Cardano-DCSmLHO_.svg" alt="Bitcoin" className="h-6" />
                                    <h2 className="text-[16px] font-semibold font-mulish">Cardano</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1_151)'%3e%3cpath%20d='M12.5%2024.0001C19.1274%2024.0001%2024.5%2018.6275%2024.5%2012.0001C24.5%205.37265%2019.1274%206.10352e-05%2012.5%206.10352e-05C5.87259%206.10352e-05%200.5%205.37265%200.5%2012.0001C0.5%2018.6275%205.87259%2024.0001%2012.5%2024.0001Z'%20fill='%238DC351'/%3e%3cpath%20d='M16.4104%207.85827C15.8097%206.36573%2014.3832%206.29111%2012.6564%206.58962L12.0558%204.50006L10.7795%204.8732L11.3801%206.88812C11.0798%206.96275%2010.7044%207.112%2010.329%207.18663L9.72838%205.09708L8.45204%205.47021L9.05267%207.55977C8.75236%207.63439%208.52712%207.70902%208.22681%207.78365L6.5%208.38066L6.87539%209.72395C6.87539%209.72395%207.85141%209.42544%207.77634%209.42544C8.30189%209.27619%208.52712%209.50007%208.67728%209.79857L9.35299%2012.1866C9.35299%2012.1866%209.42806%2012.1866%209.50314%2012.1866H9.35299L10.329%2015.6195C10.329%2015.7687%2010.329%2016.0672%209.95361%2016.2165L9.05267%2016.515L9.20283%2018.0822L10.8546%2017.6344C11.1549%2017.5598%2011.4552%2017.4851%2011.7555%2017.4105L12.3561%2019.5001L13.6325%2019.1269L13.0318%2017.0374C13.4072%2016.9628%2013.7075%2016.8881%2014.0829%2016.7389L14.6836%2018.8284L15.9599%2018.4553L15.3593%2016.3657C17.4615%2015.6195%2018.8129%2014.6493%2018.4375%2012.5598C18.1372%2010.918%2017.1612%2010.3956%2015.8097%2010.4702C16.5605%209.72395%2016.8608%208.97768%2016.4104%207.85827ZM15.9599%2012.9329C16.4104%2014.5001%2013.6325%2015.0971%2012.7315%2015.3956L11.9057%2012.5598C12.8066%2012.3359%2015.4343%2011.2911%2015.9599%2012.9329ZM14.158%209.12693C14.6085%2010.5448%2012.281%2011.0672%2011.5303%2011.2911L10.7795%208.7538C11.5303%208.52992%2013.7826%207.63439%2014.158%209.12693Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1_151'%3e%3crect%20width='25'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        className="h-6"
                                    />
                                    <h2 className="text-[16px] font-semibold font-mulish">Bitcoin Cash</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1_154)'%3e%3cpath%20d='M24.5%2012.0001C24.5%205.37265%2019.1274%206.10352e-05%2012.5%206.10352e-05C5.87259%206.10352e-05%200.5%205.37265%200.5%2012.0001C0.5%2018.6275%205.87259%2024.0001%2012.5%2024.0001C19.1274%2024.0001%2024.5%2018.6275%2024.5%2012.0001Z'%20fill='%23E6007A'/%3e%3cmask%20id='mask0_1_154'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='4'%20y='3'%20width='17'%20height='18'%3e%3cpath%20d='M20.3%203.60004H4.69995V20.4H20.3V3.60004Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_1_154)'%3e%3cpath%20d='M12.4996%207.12372C14.1518%207.12372%2015.4911%206.33491%2015.4911%205.36188C15.4911%204.38884%2014.1518%203.60004%2012.4996%203.60004C10.8474%203.60004%209.50806%204.38884%209.50806%205.36188C9.50806%206.33491%2010.8474%207.12372%2012.4996%207.12372Z'%20fill='white'/%3e%3cpath%20d='M12.4996%2020.3989C14.1518%2020.3989%2015.4911%2019.6101%2015.4911%2018.6371C15.4911%2017.664%2014.1518%2016.8752%2012.4996%2016.8752C10.8474%2016.8752%209.50806%2017.664%209.50806%2018.6371C9.50806%2019.6101%2010.8474%2020.3989%2012.4996%2020.3989Z'%20fill='white'/%3e%3cpath%20d='M8.33037%209.56249C9.15646%208.11364%209.1511%206.54444%208.31839%206.05759C7.48568%205.57074%206.14096%206.35061%205.31487%207.79946C4.48878%209.24832%204.49414%2010.8175%205.32685%2011.3044C6.15955%2011.7912%207.50427%2011.0114%208.33037%209.56249Z'%20fill='white'/%3e%3cpath%20d='M19.6826%2016.1994C20.5087%2014.7505%2020.5038%2013.1816%2019.6716%2012.6951C18.8395%2012.2085%2017.4952%2012.9887%2016.6691%2014.4375C15.843%2015.8864%2015.8479%2017.4553%2016.6801%2017.9418C17.5122%2018.4284%2018.8565%2017.6482%2019.6826%2016.1994Z'%20fill='white'/%3e%3cpath%20d='M8.31888%2017.9414C9.15158%2017.4546%209.15694%2015.8854%208.33085%2014.4365C7.50476%2012.9877%206.16004%2012.2078%205.32734%2012.6947C4.49463%2013.1815%204.48927%2014.7507%205.31536%2016.1996C6.14145%2017.6484%207.48617%2018.4283%208.31888%2017.9414Z'%20fill='white'/%3e%3cpath%20d='M19.6721%2011.3047C20.5042%2010.8182%2020.5091%209.24924%2019.6831%207.80038C18.857%206.35152%2017.5127%205.57139%2016.6806%206.05791C15.8484%206.54443%2015.8435%208.11336%2016.6696%209.56222C17.4957%2011.0111%2018.84%2011.7912%2019.6721%2011.3047Z'%20fill='white'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1_154'%3e%3crect%20width='25'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        className="h-6"
                                    />
                                    <h2 className="text-[16px] font-semibold font-mulish">Polkadot</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAOK0lEQVR4Xu2ca3njvBaFF4QPgiAUgiAUgiEUgiEUgiAUgiAUgiEMg3O66smko512kujurPd53v7Ixd7W1tbFSQqIGvz3of9w+XD98PXD+Nv3D/93p3xv/C2PuWI/h8d+TiGG4lQILx8G7B037dStjdhjYUweQjTEYR+xA/JmgtYy1oA9dgchCsEZ4hl759pgO96sbtividempZm4CYd9efIG27GOKq+V1+wgxAU4ii6Ya9lUS7bBAs0sAvsS45Fmiltl27CNxAPBkXHFsfYUtd2wt5lmlQPjsG9M0+TL2wzQXuVQeIzx+cTRjNDnLFPjocJoYYQKZSo8VBg9jFChDI2D9hgjGKA9ylCc7kqliZJ9XaG7Xt3hPfoNNjlyDDfoc5QuOOgDvpmM0LKrGfzO0C/YJMixZc6YO1EJrmcjbMPLuYzQbFIcrmM1axxH5lJ7kwJw1niFbeBZZEeI2G99rjj/PJY6XI/D+X0L9mMF7MeeeeBgbpljcQcOc339nLEGnH/q2jLxPJfH+ae/s7Wbg7gJTr+jj4xMLEdAxtqyGK6FMTE2xjh6wTDXjFVcAUfBtAFH8Q3z/q7bYY+d15Be1ygy9+IHAmyj9fZUFCPOEvfCa1kwZrEECAMTNtIyYMO+EXY4Pg7j/YCMfeFIA1IWIxVHxGOvhXntEbZdeqgi+eAJY2zGAx5jtrgW5iXAtlNr2TcYy0MyQnEEqDB+wqF/oTxkkfQujjeoMG7Boe+G/qGKpGdxROhXbzl49NujPESR9CoOnnOBKMWCfnk8bJH0Ko4A3Q2pAds0wLZ3bQ9ZJGzM1sWxQcupFni0/wyFfekwgx4v5B32Imv6hgM14ASwrdnmaR5qyj51iBy3LA6OLAtELxa0XSmwb01NgL2oWrKxniB6wxy0HBQDJuUF9mJqGXCQ6fYgMBcBNk+1ZF+bimfYi6jldI3zQLQcJNnnpsChzTqU55imUR4Y5qhVf3AYHE6tLdafbIwniFlgrloUCfse++CwvMIGXVoVx5y0KhL2wSF5hg22tMOPEOJHmDvmMM1radkXh8Kh/uig4jgGLYqEfXGovhJhgyypiuNYtCiSiEF4gQ2upEcrjiec//nbG/ZEbrDXLfNl3+yKQ92l1XBT5Y0w9mfsG8cIe32yruw/Dh2JsEGVkhfH0XY2HPaRK8Jek2wvZ+kucGRMgynpTMXBmWKBimJU2Vebwg6xwQZSygVz4LB/56jmMlPmu6HxUn2FDaKUAePj0PbLeDLfFY1wsCcv5TvGxkGFMbMODQiwJy4hlylNp8EbYFwrbMxyLgMq42FPWsrmG6krYVwbbLxyTj0qEmFPWMJXjAdnDd4iTGOVcxtRCQ97shJuGG9p5aE7U0fWowIR9kQl9BiLFTZGeSwjCuNhT1LCkZZWWlI9lh4FibAnyHXDOEsrh/rfLpVjGVEIB3vwEo5y1+oJ2m88qg4FCLAHzjViDFQcj21AJlwCpQctoUN/VBySZi3zV9gD5hrQHxWHPLkigw32gLk69EXFIb+64U64iU4PluuKvnA6HeVu1Yb9tvKKva09Mqf7ByHAtmWubP+bYfLSA+XauwP0Lg626Qv6z6Iz42DbNVfm5SbYkdOD5BrQl1fYmFq4YS+K3oPDkQiw7ZzrTflZYA+Qq0M/OIWm8dQ2ovCnteIPDra9c11wA6WXIgH9cGi7KWfbeYjaRNi2z5F5uwoH++ZcPfoRYeOpIYuQSynRBg+bg1wdroBJTt+Y44Z+lL6W74y4snFFUTbYXOR41QDHHX36xhyvOmkFHNosrVaIXpQeANn3f4Q7+fRNufKYPShd6KksPg/REwebl1x/7K/PsG/I8Z8VWQkPG0tJWRxPECNQeiBkDXxLgH1Djj+erCIRNpZSvkPFMRILbI5yDPiBDfYN98pRtgelZ8Gv8pocxEhwSZTmKccN3+BgX5xjQB84wqexlFDLqnEpvcxyuMAC+8IcF7THw8ZRSg8xKgtsvnJccIEA+8IcOfW1JsLGUcIXiJEpvcwKuEDJpUlEexxsHCXk9C3Gp2T/5bH+onQFrmjPK2wcuXLf0WMmFLdTOv9/5d1feEGOHu1hZ07jyPUZYhY8bP5y9PgC19jpC3JsDTtyGkOuEWImSq+CWBN/CBdecK8R7QmwceT6BDEbJfchAV+IyZM5ci3YmtLLqwAxIyX3IRFfSJ/McUFbPGwMuWr2mJMFNpc5flJ67da6c62wMeQYIWbFw+Yzx887Wf7CEzm2JsLGkKPuXM1Nms8c/YdFpyVuklqTxpAj9zJibjbYvN7r8mHRJUpEWzxsDDkGiNmJsHm91/XDojv/FW3hveo0hhy1vJqfkv35845svPDEvUbsRdLKCBtDjquc3gib13uN+P0nfUJK+btASn76KOWR/LzplD4opTxrHpBSnjUPSCnPmgeklGfNA1LKs+YBKeVZ84CU8qx5QEp51jwgpTxrHpBSnjUPSCnPmgeklGfNA1LKs+YBKeVZfd1dym/8/Lp7vPCElLLCLwoj7E8gaxphY8hxldMbYfN6r/HDoj9yD2gL/8lCGkOOHmJ2Amxe7/XznzasF56414i2PMHGkONng4ipibB5vdf1w6L/OK7HP17jOdM47nWDmJ0NNq/3unxY/J+v/Ye2vMHGkKP+N9bcpPnM0X9Y/J9Xe7TlBTaGHFlwYk48bD5z/DPYp0/kyA7bktL7EOogZqT0YPmHeOHJew1ozwYbR44BYkYCbC7vNeILIXkyxw3t4d2nNI5cHcRsvMPm8V4DvlB6amq9Ua+xzIoQM1F6L/3XVsFfeEGOPe4EbbBx5NrjOsR9MFdp/nL0+ELp6uOSpzUrbBy5bmg/G4r7KL3MNpRcv/FYrXGwcZTwDWIGqvffAPvCHB3aw86cxlHCBWJkHGzOcgy4wAL7whz/2uQ0wsPGUconiFFZYPOV44ILONgX5thraRJhYynhL6hIRqX0ysHhGzbYF+fYY4PrYeMoJdemPa5JfA/zkeYpxw0/EGDfkOOCPkTYWEqpIhmLBTZHOQb8wDPsG3KM6AOXQmksJWWRaLk1BqWXV6yBbyk9XVGHPgTYWEqqPUl/HGxecv3n6qB0Ra7oAy+UnTiNp7QvEL1g26f5yJF9/5+UPumGfiyw8dSQDfvPkUcUZ4PNRY5XDXYO9o25/riuq0yEjaeGnK0WiFawT6U5yNXhSt5h35xjRD9aLbVORrT/VeUjEmHbPkf2+atZYA+Qq0M/aow2/zJChVILB9veuS64AY666QFyDejLK2xMLeTItEB7lJIE2HbO9eb8cOOZHiRXh75E2JhayjZd0L8dZsbBtmuuzMvN1FiWBPSFo0Tp/dW9btjbY8W+FHuCuIYA25a5sq/fxQZ7sFwd+sIi+QUbl3xMN2Swwh4w14D+cLRWkUi6IgOOtukBS+jRHxWJpDdvzlMC7EFzjRgDFcljG1AAB3vgEi4YAxbJBhufPL4OhYiwB8+VI3f29FYIxvEOG6M8rhEF8bAnKOErxoFF8gYbozymHoWJsCcpocdYrLAxymMZUQEPe6ISbhhnqXXCQ/uSI+tRiQh7shIGjIeWXMc0oiIe9oSlfMaYMK4NNl45px6VCbAnLSHvajmMCWeTFTZmOZcBDXCwJy4lb7WOth/5ikO9AULW16ERK+zJSxkwPg4qlNlc0RCO8htsEKV8wRw47J/lcHmYXoMcxw0dVibcvKaBlHTUTfsl2PgL6t3lk3l260s1b4NyVH7CfDjsM2CEvSbZ3oiOONRdXsxaJCc4s3D04jLsHfb6ZF3Zfxw6w9EyDayk7FjsaEfBY1+Ordhn4Ii6g8wjy745BBE2uJIerUiugTOnP6icVWsPChEDwc5b+4IfsUiOCHPIXKb5LSn7osNgcFRIAy2timRuWhQHZV8cklfYYEvLBn6CmI1WxcE+OCytGoFTqIpkHpirDTaPpZ1iheFQfz9CeY5hp1LxBxZHq/7gMAnsuOkF1PIFYlQW2HzVcrrBkh03vYhaBkwwtT4Yr7B5quW0g2SAvZhacv3pIHrDgSrC5qeWAZPDjpteVC21L+mLR5v9xkn2renhiNKySGiAllwtYVu3XFJR9qnD5JgX0nJkoRv2EU3U5QntB0D2pcMUxwk2ZOsioRzZDteYA9Bj1qDsQ+xLh6RXkfCcC0QpntHmg7/UQxfHiV5FQiO07MrBoe0dqq8+RHGc6FkkNEC3hG/Boe0t+9SHKo4TvYuEBqhQfsKh7n+wucaHLI4TIxQJDVChfMWh74xx8qGL48R/aH+b8Dvf8Nh7FI8xCoOyT7BvCIxVJHTD/v0eh+PDtue1brDt0EsVxzcE2MbqLWeVBcdL2IK6/7bpXgPEj3A0SxttFGcuFsa8YL+GX7DXNoLMvbiCZ4ybxJNcBrxij3XUgvHY70Ix1jT+kWSu2Y7iBhzGT+xXGWvAPgp6tMdjnyFYtLO1m4O4C47MTHjaqLO4Yf/kmdewYh8l/W9vnXX8b3mMFfsxI8baXN8qr+HWdhAXYKf4BdvAck6ZS+ZUFMSh3/eAZDkjNGtU5QWaTWaUOWPuRAMcNJvM5Bu0Ee8C17EbbELkGG7QXqM7XM+usMmRfV2hvcZQOIz5VZVHM0DLqaHx0P6khxF9PiAVd+KhQmlhhApjajxUKDWMUGEcCgftUUoYoD3GoTnd9dpgky8vu0F3pR4S3qPnh1hph5C7bBt9jiH+/JjoHbaTPJpsgwWaLcQ3OOzfGXqkmYXXymt2EOIGOIpyiRFwrD3Lhv2aeG2aKUQxHPblR8BcyzHGGrDH7iBEQzz25UnAGJ+3RPz901/NEGI42Ck99hF7xfnnsTRn5uF74295zBX7OTxUCFX4P0wpK4NU09MmAAAAAElFTkSuQmCC"
                                        alt="Bitcoin"
                                        className="h-6"
                                    />
                                    <h2 className="text-[16px] font-semibold font-mulish">Worldcoin</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1_166)'%3e%3cmask%20id='mask0_1_166'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='24'%20height='24'%3e%3cpath%20d='M24%200H0V24H24V0Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_1_166)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M24%2012C24%2018.6269%2018.627%2024%2012%2024C5.37305%2024%200%2018.6269%200%2012C0%205.37305%205.37305%200%2012%200C18.627%200%2024%205.37305%2024%2012Z'%20fill='%232A5ADA'/%3e%3cpath%20d='M12%204.80005L10.6666%205.55968L7.03329%207.64042L5.69995%208.40005V15.6001L7.03329%2016.3597L10.7%2018.4404L12.0333%2019.2001L13.3666%2018.4404L16.9666%2016.3597L18.3%2015.6001V8.40005L16.9666%207.64042L13.3333%205.55968L12%204.80005ZM8.36662%2014.0808V9.91932L12%207.83858L15.6333%209.91932V14.0808L12%2016.1615L8.36662%2014.0808Z'%20fill='white'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1_166'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        className="h-6"
                                    />
                                    <h2 className="text-[16px] font-semibold font-mulish">Chainlink</h2>
                                </div>
                            </a>
                            <a href="/">
                                <div className="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%2024C18.6274%2024%2024%2018.6274%2024%2012C24%205.37258%2018.6274%200%2012%200C5.37258%200%200%205.37258%200%2012C0%2018.6274%205.37258%2024%2012%2024Z'%20fill='%238247E5'/%3e%3cpath%20d='M15.8575%209.26144C15.7124%209.18458%2015.5512%209.14443%2015.3875%209.14443C15.2238%209.14443%2015.0626%209.18458%2014.9175%209.26144L12.7241%2010.5465L11.2363%2011.3641L9.08257%2012.6492C8.93756%2012.726%208.7763%2012.7662%208.61261%2012.7662C8.44892%2012.7662%208.28766%2012.726%208.14265%2012.6492L6.45833%2011.637C6.31589%2011.5545%206.19742%2011.4355%206.11483%2011.292C6.03223%2011.1485%205.98844%2010.9855%205.98784%2010.8194V8.87222C5.98951%208.70636%206.03376%208.54378%206.11624%208.40045C6.19873%208.25712%206.31662%208.13795%206.45833%208.05464L8.14265%207.08051C8.28769%207.00373%208.44893%206.96363%208.61261%206.96363C8.77629%206.96363%208.93753%207.00373%209.08257%207.08051L10.7658%208.0927C10.9083%208.17517%2011.0267%208.29415%2011.1093%208.43766C11.1919%208.58118%2011.2357%208.74419%2011.2363%208.91028V10.1964L12.7241%209.33863V8.01551C12.7227%207.84956%2012.6787%207.68683%2012.5964%207.5433C12.5141%207.39977%2012.3963%207.28038%2012.2546%207.19684L9.12124%205.36707C8.97623%205.29021%208.81497%205.25006%208.65128%205.25006C8.48759%205.25006%208.32633%205.29021%208.18132%205.36707L4.96951%207.23707C4.82662%207.30871%204.7067%207.41985%204.62363%207.55761C4.54055%207.69537%204.49772%207.85413%204.50009%208.01551V11.6761C4.50176%2011.842%204.54601%2012.0046%204.6285%2012.1479C4.71098%2012.2912%204.82887%2012.4104%204.97059%2012.4937L8.14265%2014.3246C8.28766%2014.4014%208.44892%2014.4416%208.61261%2014.4416C8.7763%2014.4416%208.93756%2014.4014%209.08257%2014.3246L11.2363%2013.0775L12.7241%2012.2208L14.8778%2010.9749C15.0228%2010.898%2015.1841%2010.8579%2015.3478%2010.8579C15.5114%2010.8579%2015.6727%2010.898%2015.8177%2010.9749L17.502%2011.949C17.6445%2012.0315%2017.7629%2012.1505%2017.8455%2012.294C17.9281%2012.4375%2017.9719%2012.6005%2017.9725%2012.7666V14.7127C17.971%2014.8787%2017.9269%2015.0415%2017.8444%2015.1851C17.7619%2015.3286%2017.6439%2015.448%2017.502%2015.5314L15.8575%2016.5055C15.7124%2016.5824%2015.5512%2016.6225%2015.3875%2016.6225C15.2238%2016.6225%2015.0626%2016.5824%2014.9175%2016.5055L13.2332%2015.5314C13.091%2015.4487%2012.9727%2015.3297%2012.8903%2015.1862C12.8079%2015.0427%2012.7643%2014.8798%2012.7638%2014.7138V13.4678L11.275%2014.3246V15.6096C11.2766%2015.7755%2011.3209%2015.9381%2011.4034%2016.0814C11.4859%2016.2247%2011.6038%2016.3439%2011.7455%2016.4272L14.9175%2018.2581C15.0626%2018.3349%2015.2238%2018.3751%2015.3875%2018.3751C15.5512%2018.3751%2015.7124%2018.3349%2015.8575%2018.2581L19.0295%2016.4272C19.172%2016.3447%2019.2904%2016.2258%2019.373%2016.0822C19.4556%2015.9387%2019.4994%2015.7757%2019.5%2015.6096V11.9099C19.4985%2011.7438%2019.4544%2011.581%2019.3719%2011.4375C19.2894%2011.2939%2019.1714%2011.1746%2019.0295%2011.0912L15.8575%209.26144Z'%20fill='white'/%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        className="h-6"
                                    />
                                    <h2 className="text-[16px] font-semibold font-mulish">Matic</h2>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#21bf73]">
                <div className="bg-white rounded-bl-[32px] rounded-br-[32px]">
                    <section className="max-w-[800px] ] mx-auto pt-[96px] pb-[200px]">
                        <h2 className="text-[14px] text-[#21bf73] font-bold text-center mb-[8px] uppercase">learn more</h2>
                        <h2 className="text-[48px] font-bold text-center mb-[48px]">Frequently asked questions</h2>
                        <div className="space-y-4">
                            <div className="border-b border-gray-300 font-mulish">
                                <button className="flex justify-between items-center w-full py-4 text-left hover:px-[10px] transition-all duration-250">
                                    <span className="text-[18px] font-semibold text-[#14161a]">How much does Acebit charge in fees?</span>
                                    <span className="text-[26px] border-[#21bf73] rounded-full w-[24px] h-[24px] flex items-center justify-center border-2 text-[#21bf73]">+</span>
                                </button>
                            </div>
                            <div className="border-b border-gray-300 font-mulish">
                                <button className="flex justify-between items-center w-full py-4 text-left hover:px-[10px] transition-all duration-250">
                                    <span className="text-[18px] font-semibold text-[#14161a]">Which countries and states does Acebit support?</span>
                                    <span className="text-[26px] border-[#21bf73] rounded-full w-[24px] h-[24px] flex items-center justify-center border-2 text-[#21bf73]">+</span>
                                </button>
                            </div>
                            <div className="border-b border-gray-300 font-mulish">
                                <button className="flex justify-between items-center w-full py-4 text-left hover:px-[10px] transition-all duration-250">
                                    <span className="text-[18px] font-semibold text-[#14161a]">How long does verification take?</span>
                                    <span className="text-[26px] border-[#21bf73] rounded-full w-[24px] h-[24px] flex items-center justify-center border-2 text-[#21bf73]">+</span>
                                </button>
                            </div>
                            <div className="border-b border-gray-300 font-mulish">
                                <button className="flex justify-between items-center w-full py-4 text-left hover:px-[10px] transition-all duration-250">
                                    <span className="text-[18px] font-semibold text-[#14161a]">How long does it take to buy crypto?</span>
                                    <span className="text-[26px] border-[#21bf73] rounded-full w-[24px] h-[24px] flex items-center justify-center border-2 text-[#21bf73]">+</span>
                                </button>
                            </div>
                            <div className="border-b border-gray-300 font-mulish">
                                <button className="flex justify-between items-center w-full py-4 text-left hover:px-[10px] transition-all duration-250">
                                    <span className="text-[18px] font-semibold text-[#14161a]">How long does it take to sell crypto?</span>
                                    <span className="text-[26px] border-[#21bf73] rounded-full w-[24px] h-[24px] flex items-center justify-center border-2 text-[#21bf73]">+</span>
                                </button>
                            </div>
                            <div className="border-b border-gray-300 font-mulish">
                                <button className="flex justify-between items-center w-full py-4 text-left hover:px-[10px] transition-all duration-250">
                                    <span className="text-[18px] font-semibold text-[#14161a]">Does Acebit offer solutions for businesses?</span>
                                    <span className="text-[26px] border-[#21bf73] rounded-full w-[24px] h-[24px] flex items-center justify-center border-2 text-[#21bf73]">+</span>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div className="bg-black">
                <section className="bg-[#21bf73] relative rounded-bl-[32px] rounded-br-[32px]">
                    <div className="max-w-[1400px] mx-auto h-[460px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                            <div className="text-white">
                                <h2 className="text-[64px] text-left absolute top-[12%] right-[48.5%] max-w-[600px] leading-tight mx-auto font-bold mb-4">Let’s get your integration started</h2>
                                <a href="#buy" className="bg-[#000000] absolute top-[54%] right-[71.75%] text-[16px] font-bold text-white px-[20px] py-[12px] rounded-[8px]">Contact Sales</a>
                            </div>
                            <div className="text-white"><img src="/assets/map-BjLJ7K9Y.webp" alt="" className="h-[460px]" /></div>
                        </div>
                    </div>
                    <img src="/assets/mbl-C2beHCQo.png" alt="" className="absolute top-[-12.75%] left-[54%] w-[588px] z-10" />
                </section>
            </div>

            <footer className="bg-black text-white pt-12">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex justify-between flex-wrap">
                        <div className="mb-6">
                            <img src="/assets/acebit-white-BQYzJshi.png" alt="Ramp" className="h-8 mb-[16px]" />
                            <p className="text-[12px] text-[#a6adb9] font-normal font-mulish">
                                Copyright 2024, Acebit.<br />
                                All rights reserved.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h4 className="font-bold mb-[24px] text-[12px] text-[#a6adb9]">Personal</h4>
                            <ul>
                                <li className="mb-[8px]"><a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Buy &amp; sell crypto</a></li>
                            </ul>
                        </div>
                        <div className="mb-6">
                            <h4 className="font-bold mb-[24px] text-[12px] text-[#a6adb9]">Business</h4>
                            <ul>
                                <li className="mb-[8px]"><a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Contact sales</a></li>
                                <li className="mb-[8px]"><a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">List your token</a></li>
                            </ul>
                        </div>
                        <div className="mb-6">
                            <h4 className="font-bold mb-[24px] text-[12px] text-[#a6adb9]">Company</h4>
                            <ul>
                                <li className="mb-[8px]"><a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">About us</a></li>
                                <li className="mb-[8px]"><a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Careers</a></li>
                            </ul>
                        </div>
                        <div className="mb-6">
                            <h4 className="font-bold mb-[24px] text-[12px] text-[#a6adb9]">Legal</h4>
                            <ul>
                                <li className="mb-[8px]"><a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Terms of service</a></li>
                                <li className="mb-[8px]"><a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Privacy notice</a></li>
                                <li className="mb-[8px]"><a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Cookie policy</a></li>
                                <li className="mb-[8px]"><a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Licenses</a></li>
                                <li className="mb-[8px]"><a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Risk warning</a></li>
                            </ul>
                        </div>
                        <div className="mb-6">
                            <h4 className="font-bold mb-[24px] text-[12px] text-[#a6adb9]">Resources</h4>
                            <ul>
                                <li className="mb-[8px]"><a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Blog</a></li>
                                <li className="mb-[8px]"><a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Documentation</a></li>
                                <li className="mb-[8px]"><a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Media kit</a></li>
                                <li className="mb-[8px]"><a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Help center</a></li>
                                <li className="mb-[8px]"><a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Security</a></li>
                            </ul>
                        </div>
                        <div className="mb-6">
                            <h4 className="font-bold mb-[24px] text-[12px] text-[#a6adb9]">Socials</h4>
                            <ul>
                                <li className="flex items-center gap-[12px] mb-[8px]">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='12'%20height='12'%20viewBox='0%200%2012%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2071_25656)'%3e%3cpath%20d='M12%200.882353V11.1176C12%2011.3517%2011.907%2011.5761%2011.7416%2011.7416C11.5761%2011.907%2011.3517%2012%2011.1176%2012H0.882353C0.648338%2012%200.423908%2011.907%200.258435%2011.7416C0.0929619%2011.5761%200%2011.3517%200%2011.1176L0%200.882353C0%200.648338%200.0929619%200.423908%200.258435%200.258435C0.423908%200.0929619%200.648338%200%200.882353%200L11.1176%200C11.3517%200%2011.5761%200.0929619%2011.7416%200.258435C11.907%200.423908%2012%200.648338%2012%200.882353V0.882353ZM3.52941%204.58824H1.76471V10.2353H3.52941V4.58824ZM3.68824%202.64706C3.68917%202.51357%203.66379%202.38121%203.61357%202.25753C3.56334%202.13385%203.48925%202.02128%203.39552%201.92623C3.30178%201.83119%203.19025%201.75554%203.06728%201.7036C2.94431%201.65166%202.81231%201.62445%202.67882%201.62353H2.64706C2.3756%201.62353%202.11526%201.73137%201.92331%201.92331C1.73137%202.11526%201.62353%202.3756%201.62353%202.64706C1.62353%202.91852%201.73137%203.17885%201.92331%203.3708C2.11526%203.56275%202.3756%203.67059%202.64706%203.67059V3.67059C2.78055%203.67387%202.91339%203.65082%203.03797%203.60275C3.16255%203.55468%203.27644%203.48253%203.37313%203.39043C3.46982%203.29833%203.54742%203.18808%203.60149%203.06598C3.65555%202.94388%203.68503%202.81232%203.68824%202.67882V2.64706ZM10.2353%206.80471C10.2353%205.10706%209.15529%204.44706%208.08235%204.44706C7.73105%204.42947%207.38127%204.50429%207.06792%204.66407C6.75456%204.82385%206.48856%205.06299%206.29647%205.35765H6.24706V4.58824H4.58824V10.2353H6.35294V7.23176C6.32743%206.92415%206.42433%206.6189%206.62258%206.38232C6.82084%206.14573%207.10443%205.99693%207.41176%205.96824H7.47882C8.04%205.96824%208.45647%206.32118%208.45647%207.21059V10.2353H10.2212L10.2353%206.80471Z'%20fill='%23515D6C'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2071_25656'%3e%3crect%20width='12'%20height='12'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt=""
                                    />
                                    <a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">LinkedIn</a>
                                </li>
                                <li className="flex items-center gap-[12px] mb-[8px]">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='12'%20height='13'%20viewBox='0%200%2012%2013'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.4507%201H11.2908L7.27076%205.65949L12%2012H8.29704L5.39675%208.15451L2.07815%2012H0.236963L4.53678%207.01615L0%201H3.79697L6.41858%204.51492L9.4507%201ZM8.8049%2010.8831H9.8245L3.24294%202.05826H2.1488L8.8049%2010.8831Z'%20fill='%23515D6C'/%3e%3c/svg%3e"
                                        alt=""
                                    />
                                    <a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">X (Twitter)</a>
                                </li>
                                <li className="flex items-center gap-[12px] mb-[8px]">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='12'%20height='12'%20viewBox='0%200%2012%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2071_25666)'%3e%3cpath%20d='M12%206.0364C12%202.7024%209.314%200%206%200C2.686%200%200%202.7024%200%206.0364C0%209.05%202.1936%2011.5472%205.0624%2012V7.7816H3.5392V6.036H5.0624V4.7064C5.0624%203.1936%205.958%202.3576%207.3288%202.3576C7.9848%202.3576%208.672%202.4756%208.672%202.4756V3.9612H7.9148C7.1696%203.9612%206.9376%204.4268%206.9376%204.9044V6.0364H8.6016L8.3356%207.7812H6.9376V12C9.8064%2011.5472%2012%209.05%2012%206.0364Z'%20fill='%23515D6C'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2071_25666'%3e%3crect%20width='12'%20height='12'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt=""
                                    />
                                    <a href="/" className="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Facebook</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>


        </div>
    );
}

export default main;
