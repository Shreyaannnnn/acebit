import React from 'react';

const Nav = () => {
    return (
        <>

            <header className="text-black p-4 w-full top-0 z-10">
                <div className="container max-w-[1280px] px-[40px] py-[16px] mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <img
                            src="/assets/acebit-logo-D9crurlZ.webp"
                            alt="Logo"
                            className="h-8"
                        />
                    </div>
                    <nav className="space-x-6">
                        <a
                            href="#about"
                            className="text-black text-[16px] pb-[4px] font-bold  hover:border-b-2 hover:border-[#21bf73] transition-all duration-20"
                        >
                            About
                        </a>
                        <a
                            href="#docs"
                            className="text-black text-[16px] pb-[4px] font-bold  hover:border-b-2 hover:border-[#21bf73] transition-all duration-20"
                        >
                            Exchange
                        </a>
                        <a
                            href="#token"
                            className="text-black text-[16px] pb-[4px] font-bold  hover:border-b-2 hover:border-[#21bf73] transition-all duration-20"
                        >
                            Wallet
                        </a>
                        <a
                            href="#careers"
                            className="text-black text-[16px] pb-[4px] font-bold  hover:border-b-2 hover:border-[#21bf73] transition-all duration-20"
                        >
                            Developer
                        </a>
                        <a
                            href="#help"
                            className="text-black text-[16px] pb-[4px] font-bold  hover:border-b-2 hover:border-[#21bf73] transition-all duration-20"
                        >
                            Help
                        </a>
                        <a
                            href="/buy"
                            className="bg-[#21bf73] text-[16px] font-bold  text-white px-[20px] py-[12px] rounded-[8px]"
                        >
                            Buy &amp; sell crypto
                        </a>
                    </nav>
                </div>
            </header>
            <div className="container mx-auto">
                <div className="bg-black">
                    <div className="bg-white  rounded-bl-[32px] rounded-br-[32px]">
                        <div className="bg-white max-w-[1500px] rounded-bl-[32px] rounded-br-[32px]">
                            <div className="gap-[130px] py-16 px-8 flex flex-col md:flex-row">
                                <div className="w-[50%] mt-[62px]">
                                    <h1 className="text-[64px] font-bold text-[#000000] leading-[120%] mb-[24px]">
                                        Empower users to{" "}
                                        <span className="text-[#21bf73]">
                                            buy &amp; sell crypto
                                        </span>{" "}
                                        inside your app
                                    </h1>
                                    <p className="text-[18px] text-[#515d6c] leading-[150%] mb-[40px] font-mulish">
                                        Give millions of users worldwide a direct connection between
                                        crypto and fiat, and boost your revenue with one simple,
                                        free integration.
                                    </p>
                                    <div className="flex space-x-4">
                                        <button className="bg-[#21bf73] text-white py-2 px-4 rounded-[8px] hover:bg-[#21bf73] transition duration-200">
                                            Contact sales
                                        </button>
                                        <button className="bg-white text-[#21bf73] border border-[#21bf73] py-2 px-4 rounded-[8px] hover:bg-[#21bf73] hover:text-white transition duration-200">
                                            Buy &amp; sell crypto
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-12 md:mt-0 w-[50%]">
                                    <img
                                        src="/assets/ramp-hero-C452YCWL.png"
                                        alt="Crypto App Interface"
                                        className="max-w-[685px] h-auto"
                                    />
                                </div>
                            </div>
                            <div className="bg-white px-8 pt-[40px] pb-[80px] flex flex-col items-start max-w-[1280px]">
                                <div className="flex items-center justify-between gap-[10px] w-[100%] mb-[22px]">
                                    <div className="w-[15%]">
                                        <p className="text-[#515d6c] font-semibold text-[12px]">
                                            Trusted by industry leaders
                                        </p>
                                    </div>
                                    <div className="bg-[#dfe2e7] w-[85%] h-[1px]"></div>
                                </div>
                                <div className="flex justify-center items-center gap-[55px]">
                                    <img
                                        src="/assets/metatask-DBrQfVvV.svg" />

                                    <img
                                        src="/assets/worldcoin-E34z80rU.svg"
                                        alt=""
                                    />
                                    <img
                                        src="/assets/axie-BhuzExie.svg"
                                        alt=""
                                    />
                                    <img
                                        src="/assets/sorare-BFFxIJ9t.svg"
                                        alt=""
                                    />
                                    <img
                                        src="/assets/brave-Pzh2HC8A.svg"
                                        alt=""
                                    />
                                    <img
                                        src="/assets/argent-PKId2afj.svg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#000000] rounded-bl-[32px] rounded-br-[32px]">
                <div className="max-w-[1400px] mx-auto mb-[96px]">
                    <p className="text-[#21bf73] text-center text-[14px] mb-[12px] pt-[60px] font-bold uppercase tracking-wide">
                        Helping your business grow
                    </p>
                    <h2 className="text-[48px] text-center text-[#ffffff] font-bold leading-[120%] mb-[56px]">
                        A friendly, full-stack crypto toolkit for businesses
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-[80px]">
                        <div className="bg-[#14161a] px-[24px] py-[56px] rounded-[24px]">
                            <div className="mx-auto flex justify-center w-[369px]">
                                <img
                                    src="/assets/etherium-B3DWLIHS.png"
                                    alt="MasterCard"
                                />
                            </div>
                            <h2 className="text-[32px] text-[#ffffff] text-center max-w-[530px] mx-auto font-semibold mb-4">
                                Fiat to crypto on-ramp
                            </h2>
                            <p className="text-[#a6adb9] text-[14px] leading-[140%] font-semibold max-w-[400px] mx-auto text-center font-mulish">
                                Onboard new users without hassle with our end-to-end,
                                non-custodial on-ramp.
                            </p>
                        </div>
                        <div className="bg-[#14161a] px-[24px] py-[56px] rounded-[24px]">
                            <div className="mx-auto flex justify-center w-[369px]">
                                <img
                                    src="/assets/fiat-C8tl3BXD.png"
                                    alt="MasterCard"
                                />
                            </div>
                            <h2 className="text-[32px] text-[#ffffff] text-center max-w-[530px] mx-auto font-semibold mb-4">
                                Crypto to fiat off-ramp
                            </h2>
                            <p className="text-[#a6adb9] text-[14px] leading-[140%] font-semibold max-w-[400px] mx-auto text-center font-mulish">
                                Give users the freedom to move back to fiat in just a few clicks
                                with our truly global off-ramp.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <section class="bg-white py-16">
                <div class="container mx-auto max-w-[1200px] px-4">
                    <div class="grid md:grid-cols-2 gap-[40px]">
                        <div class="sticky top-0 self-start">
                            <p class="text-[#21bf73] text-[14px] mb-[12px] font-bold uppercase tracking-wide">Helping your business grow</p>
                            <h2 class="text-[48px] font-bold leading-[120%]">A friendly, full-stack crypto toolkit for businesses</h2>
                        </div>
                        <div class="grid grid-cols-2 gap-x-[40px] gap-y-[32px]">
                            <div class="flex flex-col items-start mb-8">
                                <div class="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_6243_7935)'%3e%3cpath%20d='M20.9331%2018.7407C20.9448%2019.209%2020.8524%2019.674%2020.6625%2020.1022C20.4727%2020.5304%2020.19%2020.9111%2019.8351%2021.2167C18.9286%2021.9354%2017.8215%2022.3554%2016.6664%2022.4187V24.6667H15.2851V22.4807C13.8401%2022.5059%2012.405%2022.2381%2011.0664%2021.6934V19.5074C11.7326%2019.8245%2012.4305%2020.0703%2013.1484%2020.2407C13.8453%2020.4247%2014.5612%2020.5274%2015.2817%2020.5467V16.6667L14.4111%2016.346C13.4713%2016.0347%2012.621%2015.5001%2011.9331%2014.788C11.4038%2014.1628%2011.1252%2013.3635%2011.1511%2012.5447C11.1421%2012.0933%2011.238%2011.6459%2011.4312%2011.2378C11.6244%2010.8297%2011.9096%2010.4719%2012.2644%2010.1927C13.1379%209.52812%2014.1894%209.13868%2015.2851%209.07404V7.33337H16.6664V9.04271C18.0362%209.08474%2019.3872%209.37265%2020.6551%209.89271L19.8984%2011.7887C18.8656%2011.3726%2017.7761%2011.1142%2016.6664%2011.022V14.7927L17.4537%2015.0934C18.4686%2015.4174%2019.3992%2015.9622%2020.1784%2016.6887C20.683%2017.2511%2020.9531%2017.9854%2020.9331%2018.7407ZM13.5857%2012.524C13.5743%2012.8877%2013.7065%2013.2412%2013.9537%2013.508C14.3396%2013.8566%2014.7936%2014.1213%2015.2871%2014.2854V11.0667C14.825%2011.1113%2014.3855%2011.2873%2014.0204%2011.574C13.8821%2011.6903%2013.7714%2011.8359%2013.6962%2012.0002C13.6211%2012.1645%2013.5833%2012.3434%2013.5857%2012.524ZM18.4864%2018.896C18.4917%2018.7106%2018.457%2018.5262%2018.3845%2018.3555C18.312%2018.1848%2018.2035%2018.0317%2018.0664%2017.9067C17.6505%2017.5714%2017.1757%2017.3166%2016.6664%2017.1554V20.46C17.8797%2020.2743%2018.4864%2019.7529%2018.4864%2018.896Z'%20fill='%23165034'/%3e%3cpath%20d='M2.81557%2015.64C2.81345%2013.3273%203.45431%2011.0566%204.67112%209.06518C5.88793%207.07378%207.636%205.43486%209.73257%204.31979C11.8291%203.20472%2014.1972%202.65445%2016.5891%202.72652C18.9811%202.79859%2021.3091%203.49035%2023.3297%204.72947L21.1984%206.47638C21.1008%206.55611%2021.0276%206.65999%2020.9866%206.77687C20.9455%206.89375%2020.9381%207.01924%2020.9652%207.13986C20.9924%207.26048%2021.0529%207.3717%2021.1405%207.46158C21.2281%207.55146%2021.3393%207.61661%2021.4622%207.65005L29.1088%209.70908C29.1701%209.72595%2029.2336%209.73442%2029.2973%209.73424C29.4839%209.73424%2029.6629%209.6626%2029.7949%209.53507C29.9268%209.40755%2030.001%209.23459%2030.001%209.05424C30.0009%209.02583%2029.999%208.99744%2029.9953%208.96924L29.0194%201.44372C29.0037%201.32203%2028.9542%201.20671%2028.8762%201.10998C28.7982%201.01325%2028.6945%200.938703%2028.5763%200.89424C28.458%200.849777%2028.3295%200.837051%2028.2044%200.85741C28.0792%200.877768%2027.9621%200.930454%2027.8654%201.00989L25.5659%202.89552C23.145%201.2313%2020.2968%200.243186%2017.3334%200.0394383C14.37%20-0.164309%2011.4057%200.424177%208.76536%201.74041C6.12506%203.05664%203.9106%205.04983%202.36466%207.50156C0.818726%209.95329%200.000960063%2012.769%200.000976563%2015.64C0.000976563%2016.0007%200.149245%2016.3466%200.413164%2016.6017C0.677082%2016.8567%201.03503%2017%201.40827%2017C1.78151%2017%202.13946%2016.8567%202.40338%2016.6017C2.6673%2016.3466%202.81557%2016.0007%202.81557%2015.64Z'%20fill='%2321BF73'/%3e%3cpath%20d='M30.5938%2015C30.2206%2015%2029.8627%2015.1433%2029.5988%2015.3983C29.3349%2015.6534%2029.1866%2015.9993%2029.1866%2016.36C29.1889%2018.6726%2028.5482%2020.9434%2027.3316%2022.9349C26.115%2024.9263%2024.3671%2026.5652%2022.2708%2027.6803C20.1744%2028.7954%2017.8066%2029.3457%2015.4149%2029.2736C13.0232%2029.2015%2010.6954%2028.5097%208.67503%2027.2705L10.8055%2025.5236C10.903%2025.4439%2010.9762%2025.34%2011.0173%2025.2231C11.0583%2025.1062%2011.0657%2024.9808%2011.0386%2024.8601C11.0114%2024.7395%2010.9509%2024.6283%2010.8633%2024.5384C10.7758%2024.4485%2010.6646%2024.3834%2010.5416%2024.3499L2.89297%2022.2909C2.7813%2022.2609%202.6637%2022.2581%202.55061%2022.2826C2.43752%2022.3071%202.33245%2022.3582%202.24473%2022.4314C2.15701%2022.5046%202.08936%2022.5976%202.04779%2022.7022C2.00622%2022.8067%201.99202%2022.9196%202.00645%2023.0308L2.98514%2030.5563C3.00094%2030.6778%203.05044%2030.793%203.1284%2030.8896C3.20635%2030.9863%203.30987%2031.0607%203.42801%2031.1052C3.54615%2031.1496%203.67452%2031.1624%203.79955%2031.1421C3.92458%2031.1219%204.04163%2031.0694%204.13831%2030.9901L6.43833%2029.1045C8.85901%2030.7687%2011.707%2031.7568%2014.6701%2031.9606C17.6333%2032.1643%2020.5973%2031.5758%2023.2374%2030.2596C25.8774%2028.9434%2028.0917%2026.9502%2029.6375%2024.4984C31.1833%2022.0467%2032.001%2019.231%2032.001%2016.36C32.001%2015.9993%2031.8527%2015.6534%2031.5888%2015.3983C31.3249%2015.1433%2030.967%2015%2030.5938%2015Z'%20fill='%23B0E8CD'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_6243_7935'%3e%3crect%20width='32'%20height='32'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="New revenue streams"
                                        class="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 class="text-[24px] max-w-[235px] mt-[32px] mb-[12px] leading-[130%] font-semibold">New revenue streams</h3>
                                <div class="h-[55px]"><p class="text-[#6c7689] text-[14px] font-semibold font-mulish">Unlock new sources of revenue for your business.</p></div>
                            </div>
                            <div class="flex flex-col items-start mb-8">
                                <div class="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_6243_7974)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M29.1832%2023.9493C26.4165%2028.31%2021.5459%2031.2043%2015.9993%2031.2043C10.4527%2031.2043%205.58213%2028.31%202.81543%2023.9493H29.1832Z'%20fill='%2321BF73'/%3e%3ccircle%20cx='15.9996'%20cy='15.6022'%20r='14.6022'%20stroke='%2321BF73'%20stroke-width='2'/%3e%3cpath%20d='M16.0002%204.07043C15.7428%204.07043%2015.5338%204.27939%2015.5338%204.53685V7.33534C15.5338%207.59281%2015.7428%207.80176%2016.0002%207.80176C16.2577%207.80176%2016.4666%207.59281%2016.4666%207.33534V4.53685C16.4666%204.27939%2016.2577%204.07043%2016.0002%204.07043Z'%20fill='%23165034'/%3e%3cpath%20d='M4.80626%2016.1972H7.13834C7.3958%2016.1972%207.60475%2015.9883%207.60475%2015.7308C7.60475%2015.4734%207.3958%2015.2644%207.13834%2015.2644H4.80626C4.5488%2015.2644%204.33984%2015.4734%204.33984%2015.7308C4.33984%2015.9883%204.5488%2016.1972%204.80626%2016.1972Z'%20fill='%23165034'/%3e%3cpath%20d='M16.0002%2017.5965C16.4984%2017.5965%2016.9671%2017.4025%2017.3193%2017.0498C17.6719%2016.6977%2017.8659%2016.229%2017.8659%2015.7308C17.8659%2015.2327%2017.6719%2014.7639%2017.3193%2014.4118C16.767%2013.8591%209.21389%208.08721%208.35428%207.43096C8.16865%207.28917%207.90652%207.30689%207.74141%207.472C7.57584%207.63712%207.55858%207.89924%207.70037%208.08487C8.35661%208.94448%2014.1285%2016.4976%2014.6812%2017.0498C15.0334%2017.4025%2015.5021%2017.5965%2016.0002%2017.5965Z'%20fill='%23165034'/%3e%3cpath%20d='M24.2567%208.13338C24.4354%207.94821%2024.4302%207.65297%2024.2451%207.47387C24.0599%207.29523%2023.7647%207.30036%2023.5856%207.48553L21.9363%209.13478C21.7619%209.31528%2021.7619%209.60166%2021.9363%209.78263C22.1154%209.96826%2022.4106%209.97339%2022.5958%209.79429L24.2567%208.13338Z'%20fill='%23165034'/%3e%3cpath%20d='M24.8617%2016.1972H27.1937C27.4512%2016.1972%2027.6602%2015.9883%2027.6602%2015.7308C27.6602%2015.4734%2027.4512%2015.2644%2027.1937%2015.2644H24.8617C24.6042%2015.2644%2024.3952%2015.4734%2024.3952%2015.7308C24.3952%2015.9883%2024.6042%2016.1972%2024.8617%2016.1972Z'%20fill='%23165034'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_6243_7974'%3e%3crect%20width='32'%20height='32'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Lightning-fast transactions"
                                        class="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 class="text-[24px] max-w-[235px] mt-[32px] mb-[12px] leading-[130%] font-semibold">Lightning-fast transactions</h3>
                                <div class="h-[55px]"><p class="text-[#6c7689] text-[14px] font-semibold font-mulish">Increase conversions with the fastest crypto &lt;&gt; fiat deliveries on the market.</p></div>
                            </div>
                            <div class="flex flex-col items-start mb-8">
                                <div class="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M27%206.33333H4.33333C4.21936%206.33333%204.10929%206.31808%204.00049%206.29968C3.88993%206.31364%203.78101%206.33333%203.66667%206.33333C2.34619%206.33333%201.25741%205.3713%201.0448%204.11133C1.01973%204.18148%201%204.2546%201%204.33333V21.6667C1%2024.2399%203.09375%2026.3333%205.66667%2026.3333H28.3333C28.4473%2026.3333%2028.5574%2026.3486%2028.6662%2026.367C28.7767%2026.353%2028.8857%2026.3333%2029%2026.3333C30.3205%2026.3333%2031.4093%2027.2954%2031.6219%2028.5555C31.6469%2028.4853%2031.6667%2028.4121%2031.6667%2028.3333V11C31.6667%208.42676%2029.5729%206.33333%2027%206.33333Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M8.33333%2017.0001H5.66667C5.29818%2017.0001%205%2016.7016%205%2016.3334C5%2015.9652%205.29818%2015.6667%205.66667%2015.6667H8.33333C8.70182%2015.6667%209%2015.9652%209%2016.3334C9%2016.7016%208.70182%2017.0001%208.33333%2017.0001Z'%20fill='%23165034'/%3e%3cpath%20d='M15.0003%2017.0001H12.3337C11.9652%2017.0001%2011.667%2016.7016%2011.667%2016.3334C11.667%2015.9652%2011.9652%2015.6667%2012.3337%2015.6667H15.0003C15.3688%2015.6667%2015.667%2015.9652%2015.667%2016.3334C15.667%2016.7016%2015.3688%2017.0001%2015.0003%2017.0001Z'%20fill='%23165034'/%3e%3cpath%20d='M3.66667%201C2.19389%201%201%202.19389%201%203.66667C1%205.13941%202.19389%206.33333%203.66667%206.33333H6.33333V1H3.66667Z'%20fill='%23165034'/%3e%3cpath%20d='M28.9997%2026.3333C30.4725%2026.3333%2031.6663%2027.5271%2031.6663%2028.9999C31.6663%2030.4727%2030.4725%2031.6666%2028.9997%2031.6666H26.333V26.3333H28.9997Z'%20fill='%23165034'/%3e%3cpath%20d='M19%2015.5L21.5%2018L25%2013'%20stroke='%23165034'%20stroke-width='1.33'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
                                        alt="Seamless flow"
                                        class="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 class="text-[24px] max-w-[235px] mt-[32px] mb-[12px] leading-[130%] font-semibold">Seamless flow</h3>
                                <div class="h-[55px]"><p class="text-[#6c7689] text-[14px] font-semibold font-mulish">Familiar e-commerce-like experience that converts beyond crypto natives.</p></div>
                            </div>
                            <div class="flex flex-col items-start mb-8">
                                <div class="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M25.3333%2030.6668H18V29.3335H25.3333C26.2171%2029.3324%2027.0643%2028.9809%2027.6892%2028.356C28.3141%2027.7311%2028.6656%2026.8839%2028.6667%2026.0002V21.3335H30V26.0002C29.9986%2027.2374%2029.5065%2028.4236%2028.6316%2029.2984C27.7567%2030.1733%2026.5706%2030.6654%2025.3333%2030.6668Z'%20fill='%23165034'/%3e%3cpath%20d='M15.46%200.676695C7.884%200.963362%202%207.4287%202%2015.0107V22.6667C2%2023.5508%202.35119%2024.3986%202.97631%2025.0237C3.60143%2025.6488%204.44928%2026%205.33333%2026H7.33333C7.86377%2026%208.37247%2025.7893%208.74755%2025.4142C9.12262%2025.0392%209.33333%2024.5305%209.33333%2024V17.3334C9.33333%2016.8029%209.12262%2016.2942%208.74755%2015.9191C8.37247%2015.5441%207.86377%2015.3334%207.33333%2015.3334H4V14.9614C4%208.46269%209.04333%202.9207%2015.5373%202.67536C17.1505%202.61489%2018.7594%202.88018%2020.2677%203.4554C21.7761%204.03062%2023.153%204.90396%2024.3163%206.02325C25.4796%207.14253%2026.4053%208.48481%2027.0383%209.96989C27.6712%2011.455%2027.9983%2013.0524%2028%2014.6667V15.3334H24C23.4696%2015.3334%2022.9609%2015.5441%2022.5858%2015.9191C22.2107%2016.2942%2022%2016.8029%2022%2017.3334V24C22%2024.5305%2022.2107%2025.0392%2022.5858%2025.4142C22.9609%2025.7893%2023.4696%2026%2024%2026H26.6667C27.5507%2026%2028.3986%2025.6488%2029.0237%2025.0237C29.6488%2024.3986%2030%2023.5508%2030%2022.6667V14.6667C29.9979%2012.7833%2029.6163%2010.9197%2028.8778%209.18709C28.1394%207.45451%2027.0593%205.88853%2025.7022%204.58269C24.345%203.27686%2022.7385%202.25795%2020.9788%201.58684C19.219%200.915735%2017.3421%200.606189%2015.46%200.676695Z'%20fill='%2321BF73'/%3e%3cpath%20d='M8%2015.3335C8.53043%2015.3335%209.03914%2015.5442%209.41421%2015.9193C9.78929%2016.2944%2010%2016.8031%2010%2017.3335V24.0002C10%2024.5306%209.78929%2025.0393%209.41421%2025.4144C9.03914%2025.7894%208.53043%2026.0002%208%2026.0002H5.33333C4.44928%2026.0002%203.60143%2025.649%202.97631%2025.0239C2.35119%2024.3987%202%2023.5509%202%2022.6668V15.3335H8Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M8.00033%2015.3335H6.66699V26.0002H8.00033C8.53076%2026.0002%209.03947%2025.7894%209.41454%2025.4144C9.78961%2025.0393%2010.0003%2024.5306%2010.0003%2024.0002V17.3335C10.0003%2016.8031%209.78961%2016.2944%209.41454%2015.9193C9.03947%2015.5442%208.53076%2015.3335%208.00033%2015.3335Z'%20fill='%23165034'/%3e%3cpath%20d='M24%2015.3335C23.4696%2015.3335%2022.9609%2015.5442%2022.5858%2015.9193C22.2107%2016.2944%2022%2016.8031%2022%2017.3335V24.0002C22%2024.5306%2022.2107%2025.0393%2022.5858%2025.4144C22.9609%2025.7894%2023.4696%2026.0002%2024%2026.0002H26.6667C27.5507%2026.0002%2028.3986%2025.649%2029.0237%2025.0239C29.6488%2024.3987%2030%2023.5509%2030%2022.6668V15.3335H24Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M24%2015.3335H25.3333V26.0002H24C23.4696%2026.0002%2022.9609%2025.7894%2022.5858%2025.4144C22.2107%2025.0393%2022%2024.5306%2022%2024.0002V17.3335C22%2016.8031%2022.2107%2016.2944%2022.5858%2015.9193C22.9609%2015.5442%2023.4696%2015.3335%2024%2015.3335Z'%20fill='%23165034'/%3e%3cpath%20d='M22.5977%2027.9922H15.9997C15.6315%2027.9922%2015.333%2028.2907%2015.333%2028.6589V30.6755C15.333%2031.0437%2015.6315%2031.3422%2015.9997%2031.3422H22.5977C22.9659%2031.3422%2023.2643%2031.0437%2023.2643%2030.6755V28.6589C23.2643%2028.2907%2022.9659%2027.9922%2022.5977%2027.9922Z'%20fill='%23165034'/%3e%3c/svg%3e"
                                        alt="Outstanding support"
                                        class="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 class="text-[24px] max-w-[235px] mt-[32px] mb-[12px] leading-[130%] font-semibold">Outstanding support</h3>
                                <div class="h-[55px]"><p class="text-[#6c7689] text-[14px] font-semibold font-mulish">Dedicated partnerships team and partner portal. 24/7 support for end-users.</p></div>
                            </div>
                            <div class="flex flex-col items-start mb-8">
                                <div class="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M23.0541%204.40433C23.2525%203.93898%2023.9156%203.86753%2024.2094%204.27933L30.8761%2013.6127C31.0899%2013.9121%2031.0206%2014.3288%2030.7208%2014.5424C30.6036%2014.6263%2030.4682%2014.6667%2030.3341%2014.6667C30.1261%2014.6667%2029.921%2014.5697%2029.7908%2014.3874L23.8127%206.01805L20.2794%2014.2624C20.1713%2014.5157%2019.9252%2014.6667%2019.6664%2014.6667C19.5789%2014.6667%2019.4897%2014.6498%2019.4041%2014.6127C19.0659%2014.4675%2018.909%2014.0756%2019.0541%2013.7377L23.0541%204.40433Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M22.333%2017.3334H27.6663C29.8755%2017.3334%2031.6663%2015.5425%2031.6663%2013.3334L18.333%2013.3334C18.333%2015.5425%2020.1239%2017.3334%2022.333%2017.3334Z'%20fill='%23165034'/%3e%3cpath%20d='M9.61306%204.40433C9.41472%203.93898%208.75158%203.86753%208.45779%204.27933L1.79112%2013.6127C1.57726%2013.9121%201.64659%2014.3288%201.9464%2014.5424C2.06358%2014.6263%202.199%2014.6667%202.33311%2014.6667C2.54112%2014.6667%202.7462%2014.5697%202.8764%2014.3874L8.85451%206.01805L12.3878%2014.2624C12.4959%2014.5157%2012.742%2014.6667%2013.0008%2014.6667C13.0883%2014.6667%2013.1775%2014.6498%2013.2631%2014.6127C13.6013%2014.4675%2013.7582%2014.0756%2013.6131%2013.7377L9.61306%204.40433Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M25.6663%204H6.99967C6.63151%204%206.33301%204.29818%206.33301%204.66667C6.33301%205.03515%206.63151%205.33333%206.99967%205.33333H14.9997V27.3333H17.6663V5.33333H25.6663C26.0345%205.33333%2026.333%205.03515%2026.333%204.66667C26.333%204.29818%2026.0345%204%2025.6663%204Z'%20fill='%2321BF73'/%3e%3cpath%20d='M19.6663%2025.3334H12.9997C11.5269%2025.3334%2010.333%2026.5273%2010.333%2028H22.333C22.333%2026.5273%2021.1391%2025.3334%2019.6663%2025.3334Z'%20fill='%23165034'/%3e%3cpath%20d='M10.3333%2017.3334H4.99999C2.79086%2017.3334%201%2015.5425%201%2013.3334L14.3333%2013.3334C14.3333%2015.5425%2012.5425%2017.3334%2010.3333%2017.3334Z'%20fill='%23165034'/%3e%3c/svg%3e"
                                        alt="Built-in compliance"
                                        class="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 class="text-[24px] max-w-[235px] mt-[32px] mb-[12px] leading-[130%] font-semibold">Built-in compliance</h3>
                                <div class="h-[55px]"><p class="text-[#6c7689] text-[14px] font-semibold font-mulish">We handle KYC, AML, and regulations on all transactions coming through our widget.</p></div>
                            </div>
                            <div class="flex flex-col items-start mb-8">
                                <div class="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M28.243%204.03L16.243%201.03C16.0836%200.989023%2015.9164%200.989023%2015.757%201.03L3.757%204.03C3.54075%204.08417%203.34881%204.20905%203.21166%204.38479C3.0745%204.56054%203.00001%204.77707%203%205V19C3%2022.4478%204.36964%2025.7544%206.80761%2028.1924C9.24558%2030.6304%2012.5522%2032%2016%2032C19.4478%2032%2022.7544%2030.6304%2025.1924%2028.1924C27.6304%2025.7544%2029%2022.4478%2029%2019V5C29%204.77707%2028.9255%204.56054%2028.7883%204.38479C28.6512%204.20905%2028.4592%204.08417%2028.243%204.03ZM22%2023C22%2023.2652%2021.8946%2023.5196%2021.7071%2023.7071C21.5196%2023.8946%2021.2652%2024%2021%2024H11C10.7348%2024%2010.4804%2023.8946%2010.2929%2023.7071C10.1054%2023.5196%2010%2023.2652%2010%2023V16C10%2015.7348%2010.1054%2015.4804%2010.2929%2015.2929C10.4804%2015.1054%2010.7348%2015%2011%2015H12V13C12%2011.9391%2012.4214%2010.9217%2013.1716%2010.1716C13.9217%209.42143%2014.9391%209%2016%209C17.0609%209%2018.0783%209.42143%2018.8284%2010.1716C19.5786%2010.9217%2020%2011.9391%2020%2013V15H21C21.2652%2015%2021.5196%2015.1054%2021.7071%2015.2929C21.8946%2015.4804%2022%2015.7348%2022%2016V23Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M22%2023C22%2023.2652%2021.8946%2023.5196%2021.7071%2023.7071C21.5196%2023.8946%2021.2652%2024%2021%2024H11C10.7348%2024%2010.4804%2023.8946%2010.2929%2023.7071C10.1054%2023.5196%2010%2023.2652%2010%2023V16C10%2015.7348%2010.1054%2015.4804%2010.2929%2015.2929C10.4804%2015.1054%2010.7348%2015%2011%2015H12V13C12%2011.9391%2012.4214%2010.9217%2013.1716%2010.1716C13.9217%209.42143%2014.9391%209%2016%209C17.0609%209%2018.0783%209.42143%2018.8284%2010.1716C19.5786%2010.9217%2020%2011.9391%2020%2013V15H21C21.2652%2015%2021.5196%2015.1054%2021.7071%2015.2929C21.8946%2015.4804%2022%2015.7348%2022%2016V23Z'%20fill='%23165034'/%3e%3cpath%20d='M16%2011C15.4696%2011%2014.9609%2011.2107%2014.5858%2011.5858C14.2107%2011.9609%2014%2012.4696%2014%2013V15H18V13C18%2012.4696%2017.7893%2011.9609%2017.4142%2011.5858C17.0391%2011.2107%2016.5304%2011%2016%2011Z'%20fill='%23B0E8CD'/%3e%3c/svg%3e"
                                        alt="Security by design"
                                        class="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 class="text-[24px] max-w-[235px] mt-[32px] mb-[12px] leading-[130%] font-semibold">Security by design</h3>
                                <div class="h-[55px]"><p class="text-[#6c7689] text-[14px] font-semibold font-mulish">Industry-leading security, fraud prevention, and full chargeback handling.</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="bg-[#f0f2f4]">
                <div class="bg-[#000000] rounded-bl-[32px] rounded-br-[32px]">
                    <div class="max-w-[1280px] mx-auto mt-[20px]">
                        <p class="text-[#21bf73] text-center text-[14px] mb-[12px] pt-[60px] font-bold uppercase tracking-wide">Making web3 accessible</p>
                        <h2 class="text-[48px] text-center text-[#ffffff] font-bold leading-[120%] mb-[56px]">Global reach with no hassle</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-[80px]">
                            <div class="bg-[#14161a] rounded-[24px]">
                                <h2 class="text-[32px] text-[#ffffff] text-center pt-[56px] max-w-[530px] mx-auto font-semibold mb-4">Global coverage</h2>
                                <p class="text-[#a6adb9] text-[14px] leading-[140%] font-semibold max-w-[400px] mx-auto text-center font-mulish">
                                    Available in 150+ <br />
                                    countries and territories.
                                </p>
                                <a href="#">
                                    <div class="flex gap-[10px] justify-center cursor-pointer hover:gap-[15px] transition-all duration-250">
                                        <p class="text-[#21bf73] text-[16px] leading-[140%] font-semibold max-w-[400px] text-center mt-[32px] mb-[32px] font-mulish">Supported countries</p>
                                        <img
                                            src="data:image/svg+xml,%3csvg%20width='13'%20height='12'%20viewBox='0%200%2013%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.375%202.625L10.75%206L7.375%209.375'%20stroke='%2321BF73'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M10.5%206H2.5'%20stroke='%2321BF73'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
                                            alt=""
                                        />
                                    </div>
                                </a>
                                <div class="flex justify-center"><img src="/assets/map-home-BAQPafv2.webp" alt="MasterCard" /></div>
                            </div>
                            <div class="bg-[#14161a] rounded-[24px]">
                                <h2 class="text-[32px] text-[#ffffff] text-center pt-[56px] max-w-[530px] mx-auto font-semibold mb-4">Major payment methods</h2>
                                <p class="text-[#a6adb9] text-[14px] leading-[140%] font-semibold max-w-[380px] mx-auto text-center font-mulish">Support for major global payment/payout methods, with new options constantly added.</p>
                                <a href="#">
                                    <div class="flex gap-[10px] justify-center cursor-pointer hover:gap-[15px] transition-all duration-250">
                                        <p class="text-[#21bf73] text-[16px] leading-[140%] font-semibold max-w-[400px] text-center mt-[32px] mb-[32px] font-mulish">Supported countries</p>
                                        <img
                                            src="data:image/svg+xml,%3csvg%20width='13'%20height='12'%20viewBox='0%200%2013%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.375%202.625L10.75%206L7.375%209.375'%20stroke='%2321BF73'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M10.5%206H2.5'%20stroke='%2321BF73'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
                                            alt=""
                                        />
                                    </div>
                                </a>
                                <div class="flex justify-center"><img src="/assets/cards-Dokp8um6.png" alt="MasterCard" /></div>
                            </div>
                            <div class="bg-[#14161a] rounded-[24px]">
                                <h2 class="text-[32px] text-[#ffffff] text-center pt-[56px] max-w-[530px] mx-auto font-semibold mb-4">Most popular assets</h2>
                                <p class="text-[#a6adb9] text-[14px] leading-[140%] font-semibold max-w-[380px] mx-auto text-center font-mulish">Connected with 110+ digital assets and 40+ blockchains, L1s and L2s.</p>
                                <a href="#">
                                    <div class="flex gap-[10px] justify-center cursor-pointer hover:gap-[15px] transition-all duration-250">
                                        <p class="text-[#21bf73] text-[16px] leading-[140%] font-semibold max-w-[400px] text-center mt-[32px] mb-[32px] font-mulish">Supported countries</p>
                                        <img
                                            src="data:image/svg+xml,%3csvg%20width='13'%20height='12'%20viewBox='0%200%2013%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.375%202.625L10.75%206L7.375%209.375'%20stroke='%2321BF73'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M10.5%206H2.5'%20stroke='%2321BF73'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
                                            alt=""
                                        />
                                    </div>
                                </a>
                                <div class="flex justify-center"><img src="/assets/coin-zRe_zCGa.png" alt="MasterCard" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="bg-[#f0f2f4] rounded-bl-[32px] rounded-br-[32px]">
                <div class="max-w-[1400px] mx-auto mb-[96px]">
                    <div class="bg-[#f0f2f4] px-[24px] py-[56px] rounded-[24px]">
                        <p class="text-[#21bf73] text-center text-[14px] mb-[12px] pt-[60px] font-bold uppercase tracking-wide">Buying popular cryptocurrencies</p>
                        <h2 class="text-[48px] text-center font-bold leading-[120%] mb-[20px]">Popular tokens available</h2>
                        <p class="text-[#515d6c] text-center text-[14px] mb-[12px] font-bold uppercase tracking-wide font-mulish">
                            Purchase any of <a href="#" class="text-[#21bf73]"> 110+ of the most popular cryptocurrencies </a> on the top blockchain networks.
                        </p>
                        <div class="flex flex-wrap gap-2 my-[56px] max-w-[1050px] mx-auto justify-center">
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Logo'%3e%3cpath%20id='Vector'%20d='M23.641%2014.9029C22.0381%2021.3315%2015.5262%2025.2439%209.09607%2023.6408C2.66864%2022.0381%20-1.24415%2015.5265%200.359423%209.09838C1.96159%202.66903%208.47349%20-1.24361%2014.9016%200.359081C21.3313%201.96177%2025.2438%208.47405%2023.6408%2014.903L23.6409%2014.9029H23.641Z'%20fill='%23F7931A'/%3e%3cpath%20id='Vector_2'%20d='M17.3702%2010.3507C17.6074%208.74302%2016.4002%207.87884%2014.7494%207.30234L15.2849%205.1246L13.9774%204.79428L13.4561%206.91468C13.1124%206.82776%2012.7594%206.74586%2012.4086%206.66467L12.9337%204.53027L11.627%204.19995L11.0912%206.37698C10.8067%206.31132%2010.5274%206.24642%2010.2563%206.17804L10.2578%206.17119L8.45476%205.71468L8.10695%207.13057C8.10695%207.13057%209.077%207.35601%209.05656%207.36989C9.58602%207.50387%209.68177%207.85923%209.66587%208.1409L9.05586%2010.6219C9.09232%2010.6312%209.13961%2010.6448%209.19179%2010.6661C9.14817%2010.6551%209.10175%2010.6431%209.05359%2010.6314L8.19857%2014.1069C8.13386%2014.27%207.96962%2014.5147%207.59945%2014.4218C7.61255%2014.441%206.64915%2014.1813%206.64915%2014.1813L6%2015.6988L7.70149%2016.1288C8.01802%2016.2093%208.32821%2016.2935%208.63368%2016.3727L8.09263%2018.5754L9.39861%2018.9058L9.93441%2016.7264C10.2912%2016.8246%2010.6374%2016.9152%2010.9764%2017.0006L10.4424%2019.1696L11.7499%2019.5L12.2909%2017.3014C14.5205%2017.7292%2016.1969%2017.5567%2016.9026%2015.5121C17.4712%2013.8659%2016.8743%2012.9164%2015.7013%2012.2972C16.5556%2012.0974%2017.1991%2011.5277%2017.3707%2010.3509L17.3703%2010.3506L17.3702%2010.3507ZM14.3829%2014.5979C13.9788%2016.244%2011.2452%2015.3542%2010.3589%2015.131L11.0769%2012.2128C11.9631%2012.4371%2014.8052%2012.8811%2014.383%2014.5979H14.3829ZM14.7873%2010.3268C14.4187%2011.8242%2012.1434%2011.0635%2011.4053%2010.8769L12.0563%208.2303C12.7944%208.41684%2015.1713%208.76499%2014.7874%2010.3268H14.7873Z'%20fill='white'/%3e%3c/g%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        class="h-6"
                                    />
                                    <h2 class="text-[16px] font-semibold font-mulish">Bitcoin</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2_2)'%3e%3cpath%20d='M12.5%2024C19.1274%2024%2024.5%2018.6274%2024.5%2012C24.5%205.37258%2019.1274%200%2012.5%200C5.87258%200%200.5%205.37258%200.5%2012C0.5%2018.6274%205.87258%2024%2012.5%2024Z'%20fill='url(%23paint0_linear_2_2)'/%3e%3cpath%20d='M12.5%204.5L17%2012.2419L12.5%2015L8%2012.2419L12.5%204.5Z'%20fill='white'/%3e%3cpath%20d='M12.4986%2019.4998L17%2013.125L12.4987%2015.7978L8%2013.125L12.4986%2019.4998Z'%20fill='%23A5ABC1'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_2_2'%20x1='12.5'%20y1='0'%20x2='12.5'%20y2='24'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%2333447E'/%3e%3cstop%20offset='1'%20stop-color='%23152457'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_2_2'%3e%3crect%20width='25'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        class="h-6"
                                    />
                                    <h2 class="text-[16px] font-semibold font-mulish">Ether</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img src="/assets/doge-Di110Hwq.svg" alt="Bitcoin" class="h-6" />
                                    <h2 class="text-[16px] font-semibold font-mulish">Dogecoin</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%2024C18.6274%2024%2024%2018.6274%2024%2012C24%205.37258%2018.6274%200%2012%200C5.37258%200%200%205.37258%200%2012C0%2018.6274%205.37258%2024%2012%2024Z'%20fill='%23010101'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.44861%2010.7939H16.0357C16.1558%2010.7939%2016.2698%2010.8414%2016.3527%2010.926L17.8693%2012.4467C18.1491%2012.7274%2017.9502%2013.2061%2017.5523%2013.2061H7.96525C7.84513%2013.2061%207.73118%2013.1586%207.64825%2013.074L6.13161%2011.5533C5.84979%2011.2726%206.05076%2010.7939%206.44861%2010.7939ZM6.13161%208.77788L7.64825%207.25704C7.73318%207.17246%207.84722%207.125%207.96525%207.125H17.5502C17.9481%207.125%2018.1491%207.60372%2017.8672%207.88438L16.3527%209.40512C16.2677%209.4898%2016.1537%209.53726%2016.0357%209.53726H6.44861C6.05076%209.53726%205.84979%209.05854%206.13161%208.77788ZM17.8672%2015.2221L16.3506%2016.743C16.2657%2016.8276%2016.1516%2016.875%2016.0336%2016.875H6.44861C6.05076%2016.875%205.84979%2016.3963%206.13161%2016.1156L7.64825%2014.5949C7.73318%2014.5102%207.84722%2014.4628%207.96525%2014.4628H17.5502C17.9481%2014.4628%2018.1491%2014.9415%2017.8672%2015.2221Z'%20fill='url(%23paint0_linear_2_22)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_2_22'%20x1='6.68315'%20y1='17.2945'%20x2='17.272'%20y2='6.66199'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23CB4EE8'/%3e%3cstop%20offset='1'%20stop-color='%2310F4B1'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        class="h-6"
                                    />
                                    <h2 class="text-[16px] font-semibold font-mulish">Solana</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2_30)'%3e%3cpath%20d='M12%200C18.628%200%2024%205.37306%2024%2012C24%2018.628%2018.628%2024%2012%2024C5.37306%2024%200%2018.6275%200%2012C0%205.37306%205.37306%200%2012%200Z'%20fill='%23F5AC37'/%3e%3cpath%20d='M12.1862%2012.8402H16.7201C16.8167%2012.8402%2016.8624%2012.8402%2016.8693%2012.7141C16.9064%2012.2553%2016.9064%2011.7937%2016.8693%2011.3343C16.8693%2011.2451%2016.8248%2011.2083%2016.7276%2011.2083H7.70449C7.59281%2011.2083%207.56274%2011.2451%207.56274%2011.3493V12.6698C7.56274%2012.8402%207.56274%2012.8402%207.74154%2012.8402H12.1862ZM16.363%209.665C16.3759%209.63135%2016.3759%209.59449%2016.363%209.56137C16.2873%209.39738%2016.1976%209.24085%2016.0935%209.09396C15.9367%208.8429%2015.752%208.61159%2015.5415%208.4038C15.4422%208.27826%2015.3273%208.16555%2015.1984%208.06993C14.553%207.52346%2013.7858%207.13671%2012.961%206.94227C12.5449%206.84932%2012.1197%206.80499%2011.6933%206.80873H7.68892C7.57724%206.80873%207.5622%206.85306%207.5622%206.94975V9.58327C7.5622%209.69438%207.5622%209.7243%207.70395%209.7243H16.3093C16.3093%209.7243%2016.384%209.70934%2016.399%209.665H16.363ZM16.363%2014.3834C16.2363%2014.3696%2016.1085%2014.3696%2015.9818%2014.3834H7.71201C7.60033%2014.3834%207.56274%2014.3834%207.56274%2014.5319V17.1067C7.56274%2017.2253%207.56274%2017.2552%207.71201%2017.2552H11.5301C11.7127%2017.2691%2011.8952%2017.2563%2012.074%2017.2184C12.6281%2017.1788%2013.1731%2017.0592%2013.6929%2016.8621C13.8819%2016.7969%2014.0644%2016.7119%2014.2368%2016.6099H14.2889C15.1839%2016.1468%2015.9109%2015.4192%2016.3695%2014.5261C16.3695%2014.5261%2016.4215%2014.4139%2016.363%2014.3845V14.3834ZM6.06417%2018.5901V18.5458V16.8172V16.2312V14.4876C6.06417%2014.3909%206.06417%2014.3765%205.94497%2014.3765H4.32667C4.237%2014.3765%204.19995%2014.3765%204.19995%2014.2579V12.8482H5.92994C6.02659%2012.8482%206.06417%2012.8482%206.06417%2012.7221V11.3274C6.06417%2011.2382%206.06417%2011.2163%205.94497%2011.2163H4.32667C4.237%2011.2163%204.19995%2011.2163%204.19995%2011.0977V9.79214C4.19995%209.71041%204.19995%209.68851%204.31915%209.68851H5.92242C6.0341%209.68851%206.06417%209.6885%206.06417%209.54747V5.54859C6.06417%205.43%206.06417%205.40009%206.21344%205.40009H11.8061C12.212%205.41611%2012.6153%205.46045%2013.0142%205.53363C13.8362%205.68481%2014.6261%205.977%2015.3482%206.3942C15.8272%206.67465%2016.268%207.01331%2016.6605%207.40326C16.9558%207.70829%2017.2221%208.03841%2017.4584%208.3899C17.693%208.7462%2017.8879%209.12708%2018.0409%209.52505C18.0597%209.62868%2018.1596%209.69866%2018.2637%209.68103H19.5986C19.7698%209.68103%2019.7698%209.68103%2019.7774%209.84449V11.0614C19.7774%2011.1799%2019.7328%2011.2099%2019.6131%2011.2099H18.5838C18.4796%2011.2099%2018.4495%2011.2099%2018.457%2011.3434C18.4979%2011.7953%2018.4979%2012.2488%2018.457%2012.7008C18.457%2012.8268%2018.457%2012.8418%2018.5993%2012.8418H19.7768C19.8289%2012.9086%2019.7768%2012.9753%2019.7768%2013.0426C19.7843%2013.1286%2019.7843%2013.2157%2019.7768%2013.3017V14.1997C19.7768%2014.3257%2019.7398%2014.3631%2019.6276%2014.3631H18.2181C18.1199%2014.3444%2018.0243%2014.4069%2018.0017%2014.5042C17.6661%2015.3722%2017.1292%2016.1505%2016.4355%2016.7744C16.1821%2017.0015%2015.9158%2017.2151%2015.6376%2017.4123C15.3391%2017.5832%2015.0486%2017.7611%2014.7426%2017.9021C14.1793%2018.1542%2013.5887%2018.3401%2012.9825%2018.4582C12.4069%2018.5608%2011.8233%2018.6072%2011.2375%2018.5992H6.06202V18.5917L6.06417%2018.5901Z'%20fill='%23FEFEFD'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2_30'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        class="h-6"
                                    />
                                    <h2 class="text-[16px] font-semibold font-mulish">DAI</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2_18)'%3e%3cpath%20d='M24%2012C24%205.37258%2018.6274%200%2012%200C5.37258%200%200%205.37258%200%2012C0%2018.6274%205.37258%2024%2012%2024C18.6274%2024%2024%2018.6274%2024%2012Z'%20fill='white'/%3e%3cpath%20d='M23.641%2014.9029C22.0381%2021.3315%2015.5262%2025.2439%209.09607%2023.6408C2.66864%2022.0381%20-1.24415%2015.5265%200.359423%209.09838C1.96159%202.66903%208.47349%20-1.24361%2014.9016%200.359082C21.3313%201.96177%2025.244%208.47395%2023.641%2014.9029Z'%20fill='%2350AF95'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13.526%2012.8182C13.4408%2012.8246%2013.0004%2012.8509%2012.0181%2012.8509C11.2368%2012.8509%2010.6821%2012.8275%2010.4875%2012.8182C7.46818%2012.6856%205.21452%2012.1606%205.21452%2011.5321C5.21452%2010.9036%207.46818%2010.3793%2010.4875%2010.2445V12.2954C10.685%2012.3096%2011.2503%2012.3429%2012.0316%2012.3429C12.9692%2012.3429%2013.4386%2012.3039%2013.5232%2012.2961V10.2459C16.5361%2010.38%2018.7848%2010.905%2018.7848%2011.5321C18.7848%2012.1592%2016.5368%2012.6842%2013.5232%2012.8175L13.526%2012.8182ZM13.526%2010.0338V8.19862H17.7308V5.40002H6.28276V8.19862H10.4868V10.0331C7.06973%2010.1899%204.5%2010.866%204.5%2011.6761C4.5%2012.4862%207.06973%2013.1616%2010.4868%2013.3191V19.2H13.5253V13.317C16.9346%2013.1602%2019.5%2012.4848%2019.5%2011.6754C19.5%2010.866%2016.9374%2010.1913%2013.526%2010.0338Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2_18'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        class="h-6"
                                    />
                                    <h2 class="text-[16px] font-semibold font-mulish">USDT</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img src="/assets/TON-y4y0pbrQ.png" alt="Bitcoin" class="h-6" />
                                    <h2 class="text-[16px] font-semibold font-mulish">TON</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1_136)'%3e%3cmask%20id='mask0_1_136'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='24'%20height='24'%3e%3cpath%20d='M24%200H0V24H24V0Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_1_136)'%3e%3cpath%20d='M12%2024C18.6274%2024%2024%2018.6274%2024%2012C24%205.37258%2018.6274%200%2012%200C5.37258%200%200%205.37258%200%2012C0%2018.6274%205.37258%2024%2012%2024Z'%20fill='black'/%3e%3cpath%20d='M19.1719%206H17.0906L13.7975%209.27821C13.318%209.75371%2012.6719%2010.0203%2011.9987%2010.0203C11.3256%2010.0203%2010.6794%209.75371%2010.2%209.27821L6.90936%206H4.82642L9.15936%2010.3155C10.729%2011.8774%2013.2721%2011.8774%2014.8406%2010.3155L19.1719%206Z'%20fill='white'/%3e%3cpath%20d='M4.80005%2018H6.88271L10.2026%2014.6952C10.682%2014.2197%2011.3282%2013.9531%2012.0013%2013.9531C12.6745%2013.9531%2013.3206%2014.2197%2013.8001%2014.6952L17.1188%2018H19.2001L14.8407%2013.6579C13.271%2012.0959%2010.728%2012.0959%209.15943%2013.6579L4.80005%2018Z'%20fill='white'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1_136'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        class="h-6"
                                    />
                                    <h2 class="text-[16px] font-semibold font-mulish">XRP</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2_7)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%200C18.6276%200%2024%205.37247%2024%2012.0001C24%2018.6271%2018.6276%2024.0001%2012%2024.0001C5.37246%2024.0001%200%2018.6271%200%2012.0001C0%205.37247%205.37246%200%2012%200Z'%20fill='%232775CA'/%3e%3cpath%20d='M9.75107%2020.124C9.75107%2020.4031%209.53008%2020.5617%209.25715%2020.4774C5.62989%2019.333%203%2015.9691%203%2011.9999C3%208.0309%205.62989%204.66687%209.25715%203.52242C9.53008%203.43869%209.75107%203.59671%209.75107%203.87581V4.5648C9.75107%204.7506%209.60547%204.96929%209.42647%205.02983C6.55665%206.07208%204.50083%208.79876%204.50083%2011.9952C4.50083%2015.1916%206.55665%2017.9189%209.42647%2018.9606C9.60547%2019.0258%209.75107%2019.2397%209.75107%2019.4261V20.124Z'%20fill='white'/%3e%3cpath%20d='M12.7482%2017.5601C12.7482%2017.7651%2012.5789%2017.9325%2012.3719%2017.9325H11.6237C11.4168%2017.9325%2011.2475%2017.7651%2011.2475%2017.5601V16.3878C9.61019%2016.1692%208.81063%2015.2617%208.59414%2014.0288C8.55638%2013.8191%208.72569%2013.6285%208.94218%2013.6285H9.79845C9.97718%2013.6285%2010.1278%2013.7543%2010.1654%2013.9308C10.3255%2014.666%2010.7536%2015.2291%2012.066%2015.2291C13.0351%2015.2291%2013.7222%2014.6939%2013.7222%2013.894C13.7222%2013.0933%2013.3175%2012.791%2011.8967%2012.5582C9.79845%2012.2791%208.80586%2011.6508%208.80586%2010.0223C8.80586%208.76606%209.76574%207.78907%2011.2523%207.57954V6.43024C11.2523%206.22544%2011.4217%206.05784%2011.6285%206.05784H12.3767C12.5836%206.05784%2012.7529%206.22544%2012.7529%206.43024V7.61217C13.962%207.82655%2014.7289%208.50543%2014.9783%209.6314C15.0252%209.84578%2014.8559%2010.0455%2014.6349%2010.0455H13.8444C13.6751%2010.0455%2013.534%209.93369%2013.4823%209.77095C13.2706%209.05473%2012.7529%208.74772%2011.8543%208.74772C10.8617%208.74772%2010.3488%209.22219%2010.3488%209.88745C10.3488%2010.5901%2010.6407%2010.9434%2012.1651%2011.1625C14.2254%2011.4416%2015.2889%2012.0232%2015.2889%2013.7591C15.2889%2015.0757%2014.3008%2016.1413%2012.7529%2016.3878V17.5601H12.7482Z'%20fill='white'/%3e%3cpath%20d='M14.249%2020.124C14.249%2020.4031%2014.4702%2020.5616%2014.7429%2020.4774C18.3701%2019.3282%2020.9955%2015.9689%2021%2012.0093C21%208.04029%2018.3701%204.67639%2014.7429%203.53127C14.4702%203.44336%2014.249%203.6061%2014.249%203.8852V4.57365C14.249%204.76012%2014.3948%204.97396%2014.5736%205.03922C17.4434%206.08146%2019.4992%208.80815%2019.4992%2012.0046C19.4992%2015.201%2017.4434%2017.9277%2014.5736%2018.97C14.376%2019.0401%2014.249%2019.2307%2014.249%2019.4355V20.124Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2_7'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        class="h-6"
                                    />
                                    <h2 class="text-[16px] font-semibold font-mulish">USDC</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1_144)'%3e%3cmask%20id='mask0_1_144'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='25'%20height='24'%3e%3cpath%20d='M24.5%206.10352e-05H0.5V24.0001H24.5V6.10352e-05Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_1_144)'%3e%3cpath%20d='M12.5%2024.0001C19.1274%2024.0001%2024.5%2018.6275%2024.5%2012.0001C24.5%205.37269%2019.1274%200.000106812%2012.5%200.000106812C5.87258%200.000106812%200.5%205.37269%200.5%2012.0001C0.5%2018.6275%205.87258%2024.0001%2012.5%2024.0001Z'%20fill='%23F0B90B'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M14.3582%206.39738L12.5%204.50006L7.8209%209.20989L9.67911%2011.0626L14.3582%206.39738ZM17.1791%209.20989L15.3209%207.31256L7.8209%2014.8349L9.67911%2016.6876L17.1791%209.20989ZM6.85821%2010.1251L8.71642%2012.0224L6.85821%2013.8751L5%2012.0224L6.85821%2010.1251ZM20%2012.0224L18.1418%2010.1251L10.6418%2017.6474L12.5%2019.5001L20%2012.0224Z'%20fill='white'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1_144'%3e%3crect%20width='25'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        class="h-6"
                                    />
                                    <h2 class="text-[16px] font-semibold font-mulish">BNB</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2_23)'%3e%3cmask%20id='mask0_2_23'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='25'%20height='24'%3e%3cpath%20d='M24.5%206.10352e-05H0.5V24.0001H24.5V6.10352e-05Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_2_23)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M24.5%2012.0001C24.5%2018.627%2019.127%2024.0001%2012.5%2024.0001C5.87305%2024.0001%200.5%2018.627%200.5%2012.0001C0.5%205.37311%205.87305%206.10352e-05%2012.5%206.10352e-05C19.127%206.10352e-05%2024.5%205.37311%2024.5%2012.0001Z'%20fill='white'/%3e%3cpath%20d='M12.5%206.10352e-05C10.1266%206.10352e-05%207.80656%200.70385%205.83317%202.02243C3.85978%203.34101%202.3217%205.21515%201.41345%207.40787C0.505199%209.60058%200.267559%2012.0134%200.730582%2014.3412C1.19361%2016.6689%202.3365%2018.8071%204.01473%2020.4854C5.69296%2022.1636%207.83116%2023.3065%2010.1589%2023.7695C12.4867%2024.2325%2014.8995%2023.9949%2017.0922%2023.0866C19.2849%2022.1784%2021.1591%2020.6403%2022.4777%2018.6669C23.7962%2016.6935%2024.5%2014.3735%2024.5%2012.0001C24.5046%2010.4288%2024.1997%208.87198%2023.6026%207.41855C23.0055%205.96512%2022.128%204.64352%2021.0202%203.52921C19.9124%202.41491%2018.5959%201.52972%2017.146%200.924183C15.696%200.31865%2014.141%200.00463315%2012.5698%206.10352e-05H12.5ZM12.7034%2012.4069L11.454%2016.6199H18.1368C18.1811%2016.6184%2018.2252%2016.6256%2018.2667%2016.6411C18.3082%2016.6566%2018.3462%2016.6801%2018.3786%2016.7104C18.411%2016.7406%2018.4371%2016.7769%2018.4554%2016.8172C18.4738%2016.8575%2018.484%2016.9011%2018.4855%2016.9454V17.0558L17.9044%2019.0606C17.8788%2019.1554%2017.8217%2019.2387%2017.7425%2019.2968C17.6633%2019.3549%2017.5667%2019.3843%2017.4685%2019.3802H7.24093L8.95522%2013.54L7.03754%2014.1211L7.47338%2012.7846L9.39106%2012.2035L11.8027%204.00975C11.8292%203.91547%2011.8866%203.83279%2011.9655%203.77487C12.0445%203.71695%2012.1406%203.68712%2012.2385%203.69014H14.8245C14.8687%203.68858%2014.9129%203.69577%2014.9544%203.71129C14.9959%203.72681%2015.0339%203.75035%2015.0663%203.78058C15.0986%203.8108%2015.1248%203.84711%2015.1431%203.88743C15.1614%203.92775%2015.1716%203.97129%2015.1731%204.01556V4.12597L13.1392%2011.0412L15.0569%2010.4601L14.6501%2011.8548L12.7034%2012.4069Z'%20fill='%23345D9D'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2_23'%3e%3crect%20width='25'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        class="h-6"
                                    />
                                    <h2 class="text-[16px] font-semibold font-mulish">Litecoin</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img src="/assets/Cardano-DCSmLHO_.svg" alt="Bitcoin" class="h-6" />
                                    <h2 class="text-[16px] font-semibold font-mulish">Cardano</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1_151)'%3e%3cpath%20d='M12.5%2024.0001C19.1274%2024.0001%2024.5%2018.6275%2024.5%2012.0001C24.5%205.37265%2019.1274%206.10352e-05%2012.5%206.10352e-05C5.87259%206.10352e-05%200.5%205.37265%200.5%2012.0001C0.5%2018.6275%205.87259%2024.0001%2012.5%2024.0001Z'%20fill='%238DC351'/%3e%3cpath%20d='M16.4104%207.85827C15.8097%206.36573%2014.3832%206.29111%2012.6564%206.58962L12.0558%204.50006L10.7795%204.8732L11.3801%206.88812C11.0798%206.96275%2010.7044%207.112%2010.329%207.18663L9.72838%205.09708L8.45204%205.47021L9.05267%207.55977C8.75236%207.63439%208.52712%207.70902%208.22681%207.78365L6.5%208.38066L6.87539%209.72395C6.87539%209.72395%207.85141%209.42544%207.77634%209.42544C8.30189%209.27619%208.52712%209.50007%208.67728%209.79857L9.35299%2012.1866C9.35299%2012.1866%209.42806%2012.1866%209.50314%2012.1866H9.35299L10.329%2015.6195C10.329%2015.7687%2010.329%2016.0672%209.95361%2016.2165L9.05267%2016.515L9.20283%2018.0822L10.8546%2017.6344C11.1549%2017.5598%2011.4552%2017.4851%2011.7555%2017.4105L12.3561%2019.5001L13.6325%2019.1269L13.0318%2017.0374C13.4072%2016.9628%2013.7075%2016.8881%2014.0829%2016.7389L14.6836%2018.8284L15.9599%2018.4553L15.3593%2016.3657C17.4615%2015.6195%2018.8129%2014.6493%2018.4375%2012.5598C18.1372%2010.918%2017.1612%2010.3956%2015.8097%2010.4702C16.5605%209.72395%2016.8608%208.97768%2016.4104%207.85827ZM15.9599%2012.9329C16.4104%2014.5001%2013.6325%2015.0971%2012.7315%2015.3956L11.9057%2012.5598C12.8066%2012.3359%2015.4343%2011.2911%2015.9599%2012.9329ZM14.158%209.12693C14.6085%2010.5448%2012.281%2011.0672%2011.5303%2011.2911L10.7795%208.7538C11.5303%208.52992%2013.7826%207.63439%2014.158%209.12693Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1_151'%3e%3crect%20width='25'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        class="h-6"
                                    />
                                    <h2 class="text-[16px] font-semibold font-mulish">Bitcoin Cash</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1_154)'%3e%3cpath%20d='M24.5%2012.0001C24.5%205.37265%2019.1274%206.10352e-05%2012.5%206.10352e-05C5.87259%206.10352e-05%200.5%205.37265%200.5%2012.0001C0.5%2018.6275%205.87259%2024.0001%2012.5%2024.0001C19.1274%2024.0001%2024.5%2018.6275%2024.5%2012.0001Z'%20fill='%23E6007A'/%3e%3cmask%20id='mask0_1_154'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='4'%20y='3'%20width='17'%20height='18'%3e%3cpath%20d='M20.3%203.60004H4.69995V20.4H20.3V3.60004Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_1_154)'%3e%3cpath%20d='M12.4996%207.12372C14.1518%207.12372%2015.4911%206.33491%2015.4911%205.36188C15.4911%204.38884%2014.1518%203.60004%2012.4996%203.60004C10.8474%203.60004%209.50806%204.38884%209.50806%205.36188C9.50806%206.33491%2010.8474%207.12372%2012.4996%207.12372Z'%20fill='white'/%3e%3cpath%20d='M12.4996%2020.3989C14.1518%2020.3989%2015.4911%2019.6101%2015.4911%2018.6371C15.4911%2017.664%2014.1518%2016.8752%2012.4996%2016.8752C10.8474%2016.8752%209.50806%2017.664%209.50806%2018.6371C9.50806%2019.6101%2010.8474%2020.3989%2012.4996%2020.3989Z'%20fill='white'/%3e%3cpath%20d='M8.33037%209.56249C9.15646%208.11364%209.1511%206.54444%208.31839%206.05759C7.48568%205.57074%206.14096%206.35061%205.31487%207.79946C4.48878%209.24832%204.49414%2010.8175%205.32685%2011.3044C6.15955%2011.7912%207.50427%2011.0114%208.33037%209.56249Z'%20fill='white'/%3e%3cpath%20d='M19.6826%2016.1994C20.5087%2014.7505%2020.5038%2013.1816%2019.6716%2012.6951C18.8395%2012.2085%2017.4952%2012.9887%2016.6691%2014.4375C15.843%2015.8864%2015.8479%2017.4553%2016.6801%2017.9418C17.5122%2018.4284%2018.8565%2017.6482%2019.6826%2016.1994Z'%20fill='white'/%3e%3cpath%20d='M8.31888%2017.9414C9.15158%2017.4546%209.15694%2015.8854%208.33085%2014.4365C7.50476%2012.9877%206.16004%2012.2078%205.32734%2012.6947C4.49463%2013.1815%204.48927%2014.7507%205.31536%2016.1996C6.14145%2017.6484%207.48617%2018.4283%208.31888%2017.9414Z'%20fill='white'/%3e%3cpath%20d='M19.6721%2011.3047C20.5042%2010.8182%2020.5091%209.24924%2019.6831%207.80038C18.857%206.35152%2017.5127%205.57139%2016.6806%206.05791C15.8484%206.54443%2015.8435%208.11336%2016.6696%209.56222C17.4957%2011.0111%2018.84%2011.7912%2019.6721%2011.3047Z'%20fill='white'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1_154'%3e%3crect%20width='25'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        class="h-6"
                                    />
                                    <h2 class="text-[16px] font-semibold font-mulish">Polkadot</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/png;base64,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"
                                        alt="Bitcoin"
                                        class="h-6"
                                    />
                                    <h2 class="text-[16px] font-semibold font-mulish">Worldcoin</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1_166)'%3e%3cmask%20id='mask0_1_166'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='24'%20height='24'%3e%3cpath%20d='M24%200H0V24H24V0Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_1_166)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M24%2012C24%2018.6269%2018.627%2024%2012%2024C5.37305%2024%200%2018.6269%200%2012C0%205.37305%205.37305%200%2012%200C18.627%200%2024%205.37305%2024%2012Z'%20fill='%232A5ADA'/%3e%3cpath%20d='M12%204.80005L10.6666%205.55968L7.03329%207.64042L5.69995%208.40005V15.6001L7.03329%2016.3597L10.7%2018.4404L12.0333%2019.2001L13.3666%2018.4404L16.9666%2016.3597L18.3%2015.6001V8.40005L16.9666%207.64042L13.3333%205.55968L12%204.80005ZM8.36662%2014.0808V9.91932L12%207.83858L15.6333%209.91932V14.0808L12%2016.1615L8.36662%2014.0808Z'%20fill='white'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1_166'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        class="h-6"
                                    />
                                    <h2 class="text-[16px] font-semibold font-mulish">Chainlink</h2>
                                </div>
                            </a>
                            <a href="#">
                                <div class="py-[8px] px-[12px] bg-white border rounded-full flex gap-2 shadow-sm">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%2024C18.6274%2024%2024%2018.6274%2024%2012C24%205.37258%2018.6274%200%2012%200C5.37258%200%200%205.37258%200%2012C0%2018.6274%205.37258%2024%2012%2024Z'%20fill='%238247E5'/%3e%3cpath%20d='M15.8575%209.26144C15.7124%209.18458%2015.5512%209.14443%2015.3875%209.14443C15.2238%209.14443%2015.0626%209.18458%2014.9175%209.26144L12.7241%2010.5465L11.2363%2011.3641L9.08257%2012.6492C8.93756%2012.726%208.7763%2012.7662%208.61261%2012.7662C8.44892%2012.7662%208.28766%2012.726%208.14265%2012.6492L6.45833%2011.637C6.31589%2011.5545%206.19742%2011.4355%206.11483%2011.292C6.03223%2011.1485%205.98844%2010.9855%205.98784%2010.8194V8.87222C5.98951%208.70636%206.03376%208.54378%206.11624%208.40045C6.19873%208.25712%206.31662%208.13795%206.45833%208.05464L8.14265%207.08051C8.28769%207.00373%208.44893%206.96363%208.61261%206.96363C8.77629%206.96363%208.93753%207.00373%209.08257%207.08051L10.7658%208.0927C10.9083%208.17517%2011.0267%208.29415%2011.1093%208.43766C11.1919%208.58118%2011.2357%208.74419%2011.2363%208.91028V10.1964L12.7241%209.33863V8.01551C12.7227%207.84956%2012.6787%207.68683%2012.5964%207.5433C12.5141%207.39977%2012.3963%207.28038%2012.2546%207.19684L9.12124%205.36707C8.97623%205.29021%208.81497%205.25006%208.65128%205.25006C8.48759%205.25006%208.32633%205.29021%208.18132%205.36707L4.96951%207.23707C4.82662%207.30871%204.7067%207.41985%204.62363%207.55761C4.54055%207.69537%204.49772%207.85413%204.50009%208.01551V11.6761C4.50176%2011.842%204.54601%2012.0046%204.6285%2012.1479C4.71098%2012.2912%204.82887%2012.4104%204.97059%2012.4937L8.14265%2014.3246C8.28766%2014.4014%208.44892%2014.4416%208.61261%2014.4416C8.7763%2014.4416%208.93756%2014.4014%209.08257%2014.3246L11.2363%2013.0775L12.7241%2012.2208L14.8778%2010.9749C15.0228%2010.898%2015.1841%2010.8579%2015.3478%2010.8579C15.5114%2010.8579%2015.6727%2010.898%2015.8177%2010.9749L17.502%2011.949C17.6445%2012.0315%2017.7629%2012.1505%2017.8455%2012.294C17.9281%2012.4375%2017.9719%2012.6005%2017.9725%2012.7666V14.7127C17.971%2014.8787%2017.9269%2015.0415%2017.8444%2015.1851C17.7619%2015.3286%2017.6439%2015.448%2017.502%2015.5314L15.8575%2016.5055C15.7124%2016.5824%2015.5512%2016.6225%2015.3875%2016.6225C15.2238%2016.6225%2015.0626%2016.5824%2014.9175%2016.5055L13.2332%2015.5314C13.091%2015.4487%2012.9727%2015.3297%2012.8903%2015.1862C12.8079%2015.0427%2012.7643%2014.8798%2012.7638%2014.7138V13.4678L11.275%2014.3246V15.6096C11.2766%2015.7755%2011.3209%2015.9381%2011.4034%2016.0814C11.4859%2016.2247%2011.6038%2016.3439%2011.7455%2016.4272L14.9175%2018.2581C15.0626%2018.3349%2015.2238%2018.3751%2015.3875%2018.3751C15.5512%2018.3751%2015.7124%2018.3349%2015.8575%2018.2581L19.0295%2016.4272C19.172%2016.3447%2019.2904%2016.2258%2019.373%2016.0822C19.4556%2015.9387%2019.4994%2015.7757%2019.5%2015.6096V11.9099C19.4985%2011.7438%2019.4544%2011.581%2019.3719%2011.4375C19.2894%2011.2939%2019.1714%2011.1746%2019.0295%2011.0912L15.8575%209.26144Z'%20fill='white'/%3e%3c/svg%3e"
                                        alt="Bitcoin"
                                        class="h-6"
                                    />
                                    <h2 class="text-[16px] font-semibold font-mulish">Matic</h2>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <section class="bg-white py-16">
                <div class="container mx-auto max-w-[1200px] px-4">
                    <div class="grid md:grid-cols-2 gap-[40px]">
                        <div class="sticky top-0 self-start">
                            <p class="text-[#21bf73] text-[14px] mb-[12px] font-bold uppercase tracking-wide">Who is it for?</p>
                            <h2 class="text-[48px] font-bold leading-[120%] mb-[12px]">Support for all businesses, crypto native or not</h2>
                            <h2 class="text-[16px] font-mulish text-[#515d6c] font-bold max-w-[500px] leading-[130%]">Highly customizable experience to match your brand without breaking your user experience.</h2>
                        </div>
                        <div class="grid grid-cols-1 gap-x-[40px] gap-y-[64px]">
                            <div class="flex flex-col items-start">
                                <div class="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M15.9997%204.66669C15.6312%204.66669%2015.333%204.36851%2015.333%204.00002V1.33335C15.333%200.964867%2015.6312%200.666687%2015.9997%200.666687C16.3682%200.666687%2016.6663%200.964867%2016.6663%201.33335V4.00002C16.6663%204.36851%2016.3682%204.66669%2015.9997%204.66669Z'%20fill='%23165034'/%3e%3cpath%20d='M21.3333%207.33337H19.3333V4.00004C19.3333%203.63155%2019.0352%203.33337%2018.6667%203.33337H13.3333C12.9648%203.33337%2012.6667%203.63155%2012.6667%204.00004V7.33337H10.6667C10.2982%207.33337%2010%207.63155%2010%208.00004V30.6667C10%2031.0352%2010.2982%2031.3334%2010.6667%2031.3334H21.3333C21.7018%2031.3334%2022%2031.0352%2022%2030.6667V8.00004C22%207.63155%2021.7018%207.33337%2021.3333%207.33337Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M13.3333%2018H2.66667C2.29818%2018%202%2018.2982%202%2018.6667V30.6667C2%2031.0352%202.29818%2031.3334%202.66667%2031.3334H13.3333C13.7018%2031.3334%2014%2031.0352%2014%2030.6667V18.6667C14%2018.2982%2013.7018%2018%2013.3333%2018Z'%20fill='%2321BF73'/%3e%3cpath%20d='M29.3333%2014H18.6667C18.2982%2014%2018%2014.2982%2018%2014.6667V30.6667C18%2031.0352%2018.2982%2031.3334%2018.6667%2031.3334H29.3333C29.7018%2031.3334%2030%2031.0352%2030%2030.6667V14.6667C30%2014.2982%2029.7018%2014%2029.3333%2014Z'%20fill='%23165034'/%3e%3cpath%20d='M24.667%2026.6667H23.3337C22.9655%2026.6667%2022.667%2026.9652%2022.667%2027.3334V31.3334H25.3337V27.3334C25.3337%2026.9652%2025.0352%2026.6667%2024.667%2026.6667Z'%20fill='white'/%3e%3cpath%20d='M8.66699%2027.3334H7.33366C6.96547%2027.3334%206.66699%2027.6319%206.66699%2028V31.3334H9.33366V28C9.33366%2027.6319%209.03519%2027.3334%208.66699%2027.3334Z'%20fill='white'/%3e%3cpath%20d='M22.667%2019.3334H21.3337C20.9655%2019.3334%2020.667%2019.0349%2020.667%2018.6667V17.3334C20.667%2016.9652%2020.9655%2016.6667%2021.3337%2016.6667H22.667C23.0352%2016.6667%2023.3337%2016.9652%2023.3337%2017.3334V18.6667C23.3337%2019.0349%2023.0352%2019.3334%2022.667%2019.3334Z'%20fill='white'/%3e%3cpath%20d='M26.667%2019.3334H25.3337C24.9655%2019.3334%2024.667%2019.0349%2024.667%2018.6667V17.3334C24.667%2016.9652%2024.9655%2016.6667%2025.3337%2016.6667H26.667C27.0352%2016.6667%2027.3337%2016.9652%2027.3337%2017.3334V18.6667C27.3337%2019.0349%2027.0352%2019.3334%2026.667%2019.3334Z'%20fill='white'/%3e%3cpath%20d='M22.667%2023.3334H21.3337C20.9655%2023.3334%2020.667%2023.0349%2020.667%2022.6667V21.3334C20.667%2020.9652%2020.9655%2020.6667%2021.3337%2020.6667H22.667C23.0352%2020.6667%2023.3337%2020.9652%2023.3337%2021.3334V22.6667C23.3337%2023.0349%2023.0352%2023.3334%2022.667%2023.3334Z'%20fill='white'/%3e%3cpath%20d='M26.667%2023.3334H25.3337C24.9655%2023.3334%2024.667%2023.0349%2024.667%2022.6667V21.3334C24.667%2020.9652%2024.9655%2020.6667%2025.3337%2020.6667H26.667C27.0352%2020.6667%2027.3337%2020.9652%2027.3337%2021.3334V22.6667C27.3337%2023.0349%2027.0352%2023.3334%2026.667%2023.3334Z'%20fill='white'/%3e%3cpath%20d='M6.66699%2024H5.33366C4.96547%2024%204.66699%2023.7016%204.66699%2023.3334V22C4.66699%2021.6319%204.96547%2021.3334%205.33366%2021.3334H6.66699C7.03519%2021.3334%207.33366%2021.6319%207.33366%2022V23.3334C7.33366%2023.7016%207.03519%2024%206.66699%2024Z'%20fill='white'/%3e%3cpath%20d='M10.667%2024H9.33366C8.96547%2024%208.66699%2023.7016%208.66699%2023.3334V22C8.66699%2021.6319%208.96547%2021.3334%209.33366%2021.3334H10.667C11.0352%2021.3334%2011.3337%2021.6319%2011.3337%2022V23.3334C11.3337%2023.7016%2011.0352%2024%2010.667%2024Z'%20fill='white'/%3e%3c/svg%3e"
                                        alt="Web3 enterprises"
                                        class="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 class="text-[24px] max-w-[250px] mt-[32px] mb-[12px] font-semibold">Web3 enterprises</h3>
                                <div><p class="text-[#6c7689] text-[14px] font-semibold max-w-[515px] font-mulish">We provide you with the crypto onboarding toolkit you need to start tapping into a growing web3 market.</p></div>
                            </div>
                            <div class="flex flex-col items-start">
                                <div class="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center"><img src="https://staging.acebit.co/assets/wallet-DjT7goKV.svg" alt="Crypto wallets" class="h-[32px] w-[32px]" /></div>
                                <h3 class="text-[24px] max-w-[250px] mt-[32px] mb-[12px] font-semibold">Crypto wallets</h3>
                                <div><p class="text-[#6c7689] text-[14px] font-semibold max-w-[515px] font-mulish">We connect crypto wallets with the global financial system so your users can move seamlessly between fiat and crypto.</p></div>
                            </div>
                            <div class="flex flex-col items-start">
                                <div class="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22.665%2011.3333H9.33171C4.55271%2011.3333%200.665039%2015.221%200.665039%2020C0.665039%2024.779%204.55271%2028.6666%209.33171%2028.6666H22.665C27.444%2028.6666%2031.3317%2024.779%2031.3317%2020C31.3317%2015.221%2027.444%2011.3333%2022.665%2011.3333Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M15.9987%207.33333C15.6306%207.33333%2015.332%207.0348%2015.332%206.66667V2.66667C15.332%202.29853%2015.6306%202%2015.9987%202C16.3668%202%2016.6654%202.29853%2016.6654%202.66667V6.66667C16.6654%207.0348%2016.3668%207.33333%2015.9987%207.33333Z'%20fill='%23B0E8CD'/%3e%3cpath%20d='M17.3317%206H14.665V11.3333H17.3317V6Z'%20fill='%23165034'/%3e%3cpath%20d='M22.6654%2025.3334C25.6109%2025.3334%2027.9987%2022.9455%2027.9987%2020C27.9987%2017.0545%2025.6109%2014.6667%2022.6654%2014.6667C19.7198%2014.6667%2017.332%2017.0545%2017.332%2020C17.332%2022.9455%2019.7198%2025.3334%2022.6654%2025.3334Z'%20fill='%23165034'/%3e%3cpath%20d='M8.66536%2025.3334C11.6109%2025.3334%2013.9987%2022.9455%2013.9987%2020C13.9987%2017.0545%2011.6109%2014.6667%208.66536%2014.6667C5.71985%2014.6667%203.33203%2017.0545%203.33203%2020C3.33203%2022.9455%205.71985%2025.3334%208.66536%2025.3334Z'%20fill='%23165034'/%3e%3cpath%20d='M22.6654%2018.6667C23.4017%2018.6667%2023.9987%2018.0697%2023.9987%2017.3333C23.9987%2016.597%2023.4017%2016%2022.6654%2016C21.929%2016%2021.332%2016.597%2021.332%2017.3333C21.332%2018.0697%2021.929%2018.6667%2022.6654%2018.6667Z'%20fill='white'/%3e%3cpath%20d='M22.6654%2024C23.4017%2024%2023.9987%2023.403%2023.9987%2022.6666C23.9987%2021.9303%2023.4017%2021.3333%2022.6654%2021.3333C21.929%2021.3333%2021.332%2021.9303%2021.332%2022.6666C21.332%2023.403%2021.929%2024%2022.6654%2024Z'%20fill='white'/%3e%3cpath%20d='M25.3314%2021.3334C26.0678%2021.3334%2026.6647%2020.7364%2026.6647%2020C26.6647%2019.2636%2026.0678%2018.6667%2025.3314%2018.6667C24.595%2018.6667%2023.998%2019.2636%2023.998%2020C23.998%2020.7364%2024.595%2021.3334%2025.3314%2021.3334Z'%20fill='white'/%3e%3cpath%20d='M19.9984%2021.3334C20.7348%2021.3334%2021.3317%2020.7364%2021.3317%2020C21.3317%2019.2636%2020.7348%2018.6667%2019.9984%2018.6667C19.262%2018.6667%2018.665%2019.2636%2018.665%2020C18.665%2020.7364%2019.262%2021.3334%2019.9984%2021.3334Z'%20fill='white'/%3e%3cpath%20d='M11.332%2019.3334H9.33203V17.3334C9.33203%2016.9652%209.0335%2016.6667%208.66536%2016.6667C8.29723%2016.6667%207.9987%2016.9652%207.9987%2017.3334V19.3334H5.9987C5.63056%2019.3334%205.33203%2019.6319%205.33203%2020C5.33203%2020.3682%205.63056%2020.6667%205.9987%2020.6667H7.9987V22.6667C7.9987%2023.0348%208.29723%2023.3334%208.66536%2023.3334C9.0335%2023.3334%209.33203%2023.0348%209.33203%2022.6667V20.6667H11.332C11.7002%2020.6667%2011.9987%2020.3682%2011.9987%2020C11.9987%2019.6319%2011.7002%2019.3334%2011.332%2019.3334Z'%20fill='white'/%3e%3c/svg%3e"
                                        alt="Web3 games"
                                        class="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 class="text-[24px] max-w-[250px] mt-[32px] mb-[12px] font-semibold">Web3 games</h3>
                                <div><p class="text-[#6c7689] text-[14px] font-semibold max-w-[515px] font-mulish">We empower your play-to-earn game to realize your full economic potential without breaking the gaming experience.</p></div>
                            </div>
                            <div class="flex flex-col items-start">
                                <div class="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_6243_11013)'%3e%3cpath%20d='M10.3264%204.64468L4.84766%2013.3864L5.978%2014.0948L11.4568%205.35311L10.3264%204.64468Z'%20fill='%2388DDB4'/%3e%3cpath%20d='M14.1282%203.50034L13.5605%204.70605L25.3517%2010.2576L25.9194%209.05185L14.1282%203.50034Z'%20fill='%2388DDB4'/%3e%3cpath%20d='M25.5848%2011.9979L14.126%2023.0065L15.0492%2023.9675L26.508%2012.9589L25.5848%2011.9979Z'%20fill='%2388DDB4'/%3e%3cpath%20d='M26.9368%2013.2035L24.9805%2026.594L26.2998%2026.7867L28.2561%2013.3962L26.9368%2013.2035Z'%20fill='%2388DDB4'/%3e%3cpath%20d='M25.2514%2010.5957L6.45703%2014.7682L6.74615%2016.0705L25.5406%2011.898L25.2514%2010.5957Z'%20fill='%2388DDB4'/%3e%3cpath%20d='M12.6654%2028.6667C12.0061%2028.6667%2011.3616%2028.4712%2010.8135%2028.1049C10.2653%2027.7386%209.83806%2027.218%209.58577%2026.6089C9.33348%2025.9999%209.26746%2025.3296%209.39608%2024.683C9.5247%2024.0364%209.84217%2023.4425%2010.3083%2022.9763C10.7745%2022.5101%2011.3685%2022.1927%2012.0151%2022.0641C12.6617%2021.9354%2013.3319%2022.0014%2013.941%2022.2537C14.5501%2022.506%2015.0707%2022.9333%2015.4369%2023.4814C15.8032%2024.0296%2015.9987%2024.6741%2015.9987%2025.3333C15.9976%2026.2171%2015.6461%2027.0643%2015.0212%2027.6892C14.3963%2028.3141%2013.5491%2028.6656%2012.6654%2028.6667Z'%20fill='%2321BF73'/%3e%3cpath%20d='M3.99837%2019.3333C3.3391%2019.3333%202.69464%2019.1378%202.14647%2018.7715C1.59831%2018.4053%201.17107%2017.8847%200.918775%2017.2756C0.666483%2016.6665%200.600472%2015.9963%200.72909%2015.3497C0.857707%2014.7031%201.17518%2014.1091%201.64135%2013.6429C2.10753%2013.1768%202.70147%2012.8593%203.34807%2012.7307C3.99468%2012.6021%204.6649%2012.6681%205.27399%2012.9204C5.88307%2013.1727%206.40367%2013.5999%206.76994%2014.1481C7.13621%2014.6962%207.33171%2015.3407%207.33171%2016C7.33065%2016.8837%206.97912%2017.7309%206.35423%2018.3558C5.72934%2018.9807%204.8821%2019.3322%203.99837%2019.3333Z'%20fill='%23165034'/%3e%3cpath%20d='M27.9984%2013.9999C27.3391%2013.9999%2026.6946%2013.8044%2026.1465%2013.4382C25.5983%2013.0719%2025.1711%2012.5513%2024.9188%2011.9422C24.6665%2011.3331%2024.6005%2010.6629%2024.7291%2010.0163C24.8577%209.36968%2025.1752%208.77574%2025.6414%208.30956C26.1075%207.84339%2026.7015%207.52592%2027.3481%207.3973C27.9947%207.26869%2028.6649%207.3347%2029.274%207.58699C29.8831%207.83928%2030.4037%208.26652%2030.7699%208.81469C31.1362%209.36285%2031.3317%2010.0073%2031.3317%2010.6666C31.3306%2011.5503%2030.9791%2012.3975%2030.3542%2013.0224C29.7293%2013.6473%2028.8821%2013.9989%2027.9984%2013.9999Z'%20fill='%2321BF73'/%3e%3cpath%20d='M11.9987%205.99996C11.4713%205.99996%2010.9557%205.84356%2010.5172%205.55055C10.0786%205.25753%209.73685%204.84105%209.53502%204.35378C9.33319%203.86651%209.28038%203.33034%209.38327%202.81305C9.48617%202.29577%209.74014%201.82062%2010.1131%201.44768C10.486%201.07474%2010.9612%200.82076%2011.4785%200.717866C11.9957%200.614973%2012.5319%200.667781%2013.0192%200.869615C13.5065%201.07145%2013.9229%201.41324%2014.216%201.85177C14.509%202.2903%2014.6654%202.80588%2014.6654%203.33329C14.6654%204.04054%2014.3844%204.71881%2013.8843%205.21891C13.3842%205.71901%2012.7059%205.99996%2011.9987%205.99996Z'%20fill='%23165034'/%3e%3cpath%20d='M25.3317%2031.3333C24.8043%2031.3333%2024.2887%2031.1769%2023.8502%2030.8839C23.4117%2030.5909%2023.0699%2030.1744%2022.868%2029.6872C22.6662%2029.1999%2022.6134%2028.6637%2022.7163%2028.1464C22.8192%2027.6291%2023.0731%2027.154%2023.4461%2026.7811C23.819%2026.4081%2024.2942%2026.1541%2024.8115%2026.0512C25.3287%2025.9483%2025.8649%2026.0012%2026.3522%2026.203C26.8395%2026.4048%2027.2559%2026.7466%2027.549%2027.1851C27.842%2027.6237%2027.9984%2028.1393%2027.9984%2028.6667C27.9984%2029.3739%2027.7174%2030.0522%2027.2173%2030.5523C26.7172%2031.0524%2026.039%2031.3333%2025.3317%2031.3333Z'%20fill='%23165034'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_6243_11013'%3e%3crect%20width='32'%20height='32'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt="Defi platforms"
                                        class="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 class="text-[24px] max-w-[250px] mt-[32px] mb-[12px] font-semibold">Defi platforms</h3>
                                <div>
                                    <p class="text-[#6c7689] text-[14px] font-semibold max-w-[515px] font-mulish">We help your DeFi project put your financial innovation front and center,while we handle the more mundane “fiat payments” part.</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-start">
                                <div class="w-[64px] h-[64px] px-2 bg-white shadow-lg rounded-lg flex justify-center items-center">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M24.668%201.33337H22.668C22.5346%201.33333%2022.4044%201.37326%2022.294%201.44801C22.1836%201.52276%2022.0981%201.62889%2022.0486%201.75271L20.8833%204.66671H19.3546L18.648%201.83804C18.6119%201.69388%2018.5286%201.56591%2018.4114%201.47448C18.2943%201.38304%2018.1499%201.33338%2018.0013%201.33337H14.0013C13.8527%201.33338%2013.7083%201.38304%2013.5912%201.47448C13.474%201.56591%2013.3907%201.69388%2013.3546%201.83804L12.648%204.66671H11.1193L9.95397%201.75271C9.9045%201.62889%209.81905%201.52276%209.70865%201.44801C9.59824%201.37326%209.46796%201.33333%209.33464%201.33337H7.33464C7.15782%201.33337%206.98826%201.40361%206.86323%201.52864C6.73821%201.65366%206.66797%201.82323%206.66797%202.00004V7.33337C6.66792%207.42475%206.68665%207.51516%206.723%207.599C6.75936%207.68283%206.81256%207.7583%206.8793%207.82071L11.352%2012H20.6506L25.1233%207.82271C25.1903%207.76007%2025.2436%207.68428%2025.28%207.60008C25.3164%207.51588%2025.335%207.42509%2025.3346%207.33337V2.00004C25.3346%201.82323%2025.2644%201.65366%2025.1394%201.52864C25.0143%201.40361%2024.8448%201.33337%2024.668%201.33337Z'%20fill='%2321BF73'/%3e%3cpath%20d='M11.3338%2012L7.48047%2024.6667H24.5205L20.6671%2012H11.3338Z'%20fill='%23165034'/%3e%3cpath%20d='M28.0016%2031.3334H4.00163C3.82482%2031.3334%203.65525%2031.2632%203.53022%2031.1382C3.4052%2031.0131%203.33496%2030.8436%203.33496%2030.6667V26.6667C3.33496%2026.1363%203.54567%2025.6276%203.92075%2025.2525C4.29582%2024.8775%204.80453%2024.6667%205.33496%2024.6667H26.6683C27.1987%2024.6667%2027.7074%2024.8775%2028.0825%2025.2525C28.4576%2025.6276%2028.6683%2026.1363%2028.6683%2026.6667V30.6667C28.6683%2030.8436%2028.5981%2031.0131%2028.473%2031.1382C28.348%2031.2632%2028.1784%2031.3334%2028.0016%2031.3334Z'%20fill='%23165034'/%3e%3cpath%20d='M5.33496%2024.6667H26.6683C27.1987%2024.6667%2027.7074%2024.8775%2028.0825%2025.2525C28.4576%2025.6276%2028.6683%2026.1363%2028.6683%2026.6667V27.3334H3.33496V26.6667C3.33496%2026.1363%203.54567%2025.6276%203.92075%2025.2525C4.29582%2024.8775%204.80453%2024.6667%205.33496%2024.6667Z'%20fill='%2321BF73'/%3e%3c/svg%3e"
                                        alt="NFT marketplaces"
                                        class="h-[32px] w-[32px]"
                                    />
                                </div>
                                <h3 class="text-[24px] max-w-[250px] mt-[32px] mb-[12px] font-semibold">NFT marketplaces</h3>
                                <div>
                                    <p class="text-[#6c7689] text-[14px] font-semibold max-w-[515px] font-mulish">
                                        We allow NFT Marketplaces to focus on the experience of actually creating and trading NFTs, instead of how to buy crypto to pay for them.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section
                className="bg-cover bg-center py-16 rounded-bl-[32px] rounded-br-[32px]"
                style={{ backgroundImage: "url('https://staging.acebit.co/assets/bg-B-JAkOoD.webp')" }}
            >
                <div className="container mx-auto max-w-[1200px] px-4">
                    <div className="grid md:grid-cols-2 gap-[40px] items-center">
                        {/* Left text section */}
                        <div className="text-white">
                            <p className="text-[#21bf73] mb-[12px] text-[14px] font-semibold uppercase tracking-wide">
                                We Love Developers
                            </p>
                            <h2 className="text-[48px] font-semibold max-w-[400px] mb-[20px] leading-[120%]">
                                Just a few lines of code
                            </h2>
                            <p className="text-[#a6adb9] text-[16px] leading-[130%] max-w-[460px] mb-[48px] font-mulish">
                                Your dev team can set up your on- and off-ramp in minutes with the help of our in-house
                                dedicated partner team, or use our APIs for a deeper integration.
                            </p>
                            <a
                                href="#"
                                className="inline-block px-6 py-3 border bg-[black] border-[#21bf73] text-white rounded-lg font-semibold hover:bg-[#0a3923] transition-colors"
                            >
                                Documentation
                            </a>
                        </div>

                        {/* Right code snippet section */}
                        <div className="bg-black shadow-lg p-6 relative border border-[#006123] rounded-[16px] w-[648px] h-[450px]">
                            <div className="flex space-x-2 mb-4">
                                <div className="w-3 h-3 border border-[#006123] rounded-full"></div>
                                <div className="w-3 h-3 border border-[#006123] rounded-full"></div>
                                <div className="w-3 h-3 border border-[#006123] rounded-full"></div>
                            </div>
                            <pre className="text-green-400 text-sm leading-relaxed px-[40px]">
                                <code>
                                    <span className="text-[#22774e] text-[10px] flex justify-center">acebit_implementation.js</span>
                                    <span className="text-[14px] text-[#6c7689] mr-4">1.</span>
                                    <span className="text-yellow-300">import</span> {'{ AcebitInstantSDK }'} <span className="text-yellow-300">from</span>{' '}
                                    <br />
                                    <span className="text-[14px] text-[#6c7689] mr-4">2.</span>
                                    <span className="text-green-400">'@acebit/acebit-instant-sdk';</span>
                                    <br />
                                    <span className="text-[14px] text-[#6c7689] mr-4">3.</span>
                                    <br />
                                    <span className="text-[14px] text-[#6c7689] mr-4">4.</span>
                                    <span className="text-gray-400">/*</span>
                                    <br />
                                    <span className="text-[14px] text-[#6c7689] mr-4">5.</span>
                                    <span className="text-gray-400"> Quick Integration</span>
                                    <br />
                                    <span className="text-[14px] text-[#6c7689] mr-4">6.</span>
                                    <span className="text-gray-400">*/</span>
                                    <br />
                                    <span className="text-[14px] text-[#6c7689] mr-4">7.</span>
                                    <br />
                                    <span className="text-[14px] text-[#6c7689] mr-4">8.</span>
                                    <span className="text-yellow-300">new</span> AcebitInstantSDK{' '}
                                    <span className="text-white">{'({'}</span>
                                    <br />
                                    <span className="text-[14px] text-[#6c7689] mr-4">9.</span>
                                    <span className="text-white"> hostAppName:</span>{' '}
                                    <span className="text-green-400">'Acebit Partner'</span> <span className="text-white">,</span>
                                    <br />
                                    <span className="text-[14px] text-[#6c7689] mr-4">10.</span>
                                    <span className="text-white"> hostLogoUrl:</span>{' '}
                                    <span className="text-green-400">'https://cdn-images-1.medium.com/max/2600/1'</span>
                                    <span className="text-white">,</span>
                                    <br />
                                    <span className="text-[14px] text-[#6c7689] mr-4">11.</span>
                                    <span className="text-white"> enabledFlows:</span>{' '}
                                    <span className="text-green-400">['ONRAMP', 'OFFRAMP']</span>
                                    <span className="text-white">,</span>
                                    <br />
                                    <span className="text-[14px] text-[#6c7689] mr-4">12.</span>
                                    <span className="text-white"> hostApiKey:</span>{' '}
                                    <span className="text-green-400">'--your-api-key--'</span>,<br />
                                    <span className="text-[14px] text-[#6c7689] mr-4">13.</span>
                                    <span className="text-white">{'})'}.show();</span>
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </section>








            <div class="bg-black">
                <section class="bg-[#21bf73] relative rounded-bl-[32px] rounded-br-[32px]">
                    <div class="max-w-[1400px] mx-auto h-[460px]">
                        <div class="grid grid-cols-1 sm:grid-cols-2">
                            <div class="text-white">
                                <h2 class="text-[64px] text-left absolute top-[12%] right-[48.5%] max-w-[600px] leading-tight mx-auto font-bold mb-4">Let’s get your integration started</h2>
                                <a href="#buy" class="bg-[#000000] absolute top-[54%] right-[71.75%] text-[16px] font-bold text-white px-[20px] py-[12px] rounded-[8px]">Contact Sales</a>
                            </div>
                            <div class="text-white"><img src="https://staging.acebit.co/assets/map-BjLJ7K9Y.webp" alt="" class="h-[460px]" /></div>
                        </div>
                    </div>
                    <img src="https://staging.acebit.co/assets/mbl-C2beHCQo.png" alt="" class="absolute top-[-12.75%] left-[54%] w-[588px] z-10" />
                </section>
            </div>

            <footer class="bg-black text-white pt-12">
                <div class="max-w-[1200px] mx-auto">
                    <div class="flex justify-between flex-wrap">
                        <div class="mb-6">
                            <img src="https://staging.acebit.co/assets/acebit-white-BQYzJshi.png" alt="Ramp" class="h-8 mb-[16px]" />
                            <p class="text-[12px] text-[#a6adb9] font-normal font-mulish">
                                Copyright 2024, Acebit.<br />
                                All rights reserved.
                            </p>
                        </div>
                        <div class="mb-6">
                            <h4 class="font-bold mb-[24px] text-[12px] text-[#a6adb9]">Personal</h4>
                            <ul>
                                <li class="mb-[8px]"><a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Buy &amp; sell crypto</a></li>
                            </ul>
                        </div>
                        <div class="mb-6">
                            <h4 class="font-bold mb-[24px] text-[12px] text-[#a6adb9]">Business</h4>
                            <ul>
                                <li class="mb-[8px]"><a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Contact sales</a></li>
                                <li class="mb-[8px]"><a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">List your token</a></li>
                            </ul>
                        </div>
                        <div class="mb-6">
                            <h4 class="font-bold mb-[24px] text-[12px] text-[#a6adb9]">Company</h4>
                            <ul>
                                <li class="mb-[8px]"><a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">About us</a></li>
                                <li class="mb-[8px]"><a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Careers</a></li>
                            </ul>
                        </div>
                        <div class="mb-6">
                            <h4 class="font-bold mb-[24px] text-[12px] text-[#a6adb9]">Legal</h4>
                            <ul>
                                <li class="mb-[8px]"><a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Terms of service</a></li>
                                <li class="mb-[8px]"><a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Privacy notice</a></li>
                                <li class="mb-[8px]"><a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Cookie policy</a></li>
                                <li class="mb-[8px]"><a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Licenses</a></li>
                                <li class="mb-[8px]"><a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Risk warning</a></li>
                            </ul>
                        </div>
                        <div class="mb-6">
                            <h4 class="font-bold mb-[24px] text-[12px] text-[#a6adb9]">Resources</h4>
                            <ul>
                                <li class="mb-[8px]"><a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Blog</a></li>
                                <li class="mb-[8px]"><a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Documentation</a></li>
                                <li class="mb-[8px]"><a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Media kit</a></li>
                                <li class="mb-[8px]"><a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Help center</a></li>
                                <li class="mb-[8px]"><a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Security</a></li>
                            </ul>
                        </div>
                        <div class="mb-6">
                            <h4 class="font-bold mb-[24px] text-[12px] text-[#a6adb9]">Socials</h4>
                            <ul>
                                <li class="flex items-center gap-[12px] mb-[8px]">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='12'%20height='12'%20viewBox='0%200%2012%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2071_25656)'%3e%3cpath%20d='M12%200.882353V11.1176C12%2011.3517%2011.907%2011.5761%2011.7416%2011.7416C11.5761%2011.907%2011.3517%2012%2011.1176%2012H0.882353C0.648338%2012%200.423908%2011.907%200.258435%2011.7416C0.0929619%2011.5761%200%2011.3517%200%2011.1176L0%200.882353C0%200.648338%200.0929619%200.423908%200.258435%200.258435C0.423908%200.0929619%200.648338%200%200.882353%200L11.1176%200C11.3517%200%2011.5761%200.0929619%2011.7416%200.258435C11.907%200.423908%2012%200.648338%2012%200.882353V0.882353ZM3.52941%204.58824H1.76471V10.2353H3.52941V4.58824ZM3.68824%202.64706C3.68917%202.51357%203.66379%202.38121%203.61357%202.25753C3.56334%202.13385%203.48925%202.02128%203.39552%201.92623C3.30178%201.83119%203.19025%201.75554%203.06728%201.7036C2.94431%201.65166%202.81231%201.62445%202.67882%201.62353H2.64706C2.3756%201.62353%202.11526%201.73137%201.92331%201.92331C1.73137%202.11526%201.62353%202.3756%201.62353%202.64706C1.62353%202.91852%201.73137%203.17885%201.92331%203.3708C2.11526%203.56275%202.3756%203.67059%202.64706%203.67059V3.67059C2.78055%203.67387%202.91339%203.65082%203.03797%203.60275C3.16255%203.55468%203.27644%203.48253%203.37313%203.39043C3.46982%203.29833%203.54742%203.18808%203.60149%203.06598C3.65555%202.94388%203.68503%202.81232%203.68824%202.67882V2.64706ZM10.2353%206.80471C10.2353%205.10706%209.15529%204.44706%208.08235%204.44706C7.73105%204.42947%207.38127%204.50429%207.06792%204.66407C6.75456%204.82385%206.48856%205.06299%206.29647%205.35765H6.24706V4.58824H4.58824V10.2353H6.35294V7.23176C6.32743%206.92415%206.42433%206.6189%206.62258%206.38232C6.82084%206.14573%207.10443%205.99693%207.41176%205.96824H7.47882C8.04%205.96824%208.45647%206.32118%208.45647%207.21059V10.2353H10.2212L10.2353%206.80471Z'%20fill='%23515D6C'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2071_25656'%3e%3crect%20width='12'%20height='12'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt=""
                                    />
                                    <a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">LinkedIn</a>
                                </li>
                                <li class="flex items-center gap-[12px] mb-[8px]">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='12'%20height='13'%20viewBox='0%200%2012%2013'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.4507%201H11.2908L7.27076%205.65949L12%2012H8.29704L5.39675%208.15451L2.07815%2012H0.236963L4.53678%207.01615L0%201H3.79697L6.41858%204.51492L9.4507%201ZM8.8049%2010.8831H9.8245L3.24294%202.05826H2.1488L8.8049%2010.8831Z'%20fill='%23515D6C'/%3e%3c/svg%3e"
                                        alt=""
                                    />
                                    <a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">X (Twitter)</a>
                                </li>
                                <li class="flex items-center gap-[12px] mb-[8px]">
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='12'%20height='12'%20viewBox='0%200%2012%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2071_25666)'%3e%3cpath%20d='M12%206.0364C12%202.7024%209.314%200%206%200C2.686%200%200%202.7024%200%206.0364C0%209.05%202.1936%2011.5472%205.0624%2012V7.7816H3.5392V6.036H5.0624V4.7064C5.0624%203.1936%205.958%202.3576%207.3288%202.3576C7.9848%202.3576%208.672%202.4756%208.672%202.4756V3.9612H7.9148C7.1696%203.9612%206.9376%204.4268%206.9376%204.9044V6.0364H8.6016L8.3356%207.7812H6.9376V12C9.8064%2011.5472%2012%209.05%2012%206.0364Z'%20fill='%23515D6C'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2071_25666'%3e%3crect%20width='12'%20height='12'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                                        alt=""
                                    />
                                    <a href="#" class="hover:text-[#677689] text-[16px] font-semibold leading-[150%]">Facebook</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>



        </>
    );
};

export default Nav;
