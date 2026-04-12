import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Coins, HandDeposit, Database, ArrowRight, Wallet } from "@phosphor-icons/react";

export function Dashboard() {
  const [adaBalance, setAdaBalance] = useState(1000); 
  const [ssAdaBalance, setSsAdaBalance] = useState(0); 
  const [depositAmount, setDepositAmount] = useState("");
  
  const pricePerShare = 1.025;
  const strategies = [
    { name: "Native Staking", apy: "4.2%", active: false },
    { name: "Liqwid Lending", apy: "12.5%", active: true },
    { name: "Minswap LP", apy: "28.0%", active: false },
  ];

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0 && amount <= adaBalance) {
      setAdaBalance(prev => prev - amount);
      setSsAdaBalance(prev => prev + (amount / pricePerShare));
      setDepositAmount("");
    }
  };

  const handleWithdraw = () => {
    if (ssAdaBalance > 0) {
      setAdaBalance(prev => prev + (ssAdaBalance * pricePerShare));
      setSsAdaBalance(0);
    }
  };

  return (
    <div className="w-full bg-[#fbfcff] min-h-screen font-sans selection:bg-[#0033AD]/20 selection:text-gray-900">
      
      {/* App Header / Nav */}
      <nav className="w-full bg-white border-b border-gray-200/60 px-6 md:px-12 h-[80px] flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="font-satoshi text-2xl font-bold tracking-tight text-[#0033AD]">
          BlueSense <span className="text-sm font-medium text-blue-400 ml-2 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded-full">App</span>
        </Link>
        <button className="flex items-center gap-2 h-[44px] rounded-full bg-[#0033AD] px-6 text-[14px] font-semibold text-white shadow-md transition-all hover:bg-blue-800 hover:shadow-lg active:scale-95">
          <Wallet weight="bold" className="text-lg" /> Connect Wallet
        </button>
      </nav>

      {/* Main Dashboard Workspace */}
      <div className="py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          
          <div className="mb-12">
            <h2 className="font-satoshi text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Smart Router Vault
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-2xl">
              Deposit ADA once. Let the Charli3 Pull Oracle automatically rebalance your assets into the highest yield strategies across Cardano.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Action Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1 rounded-[2rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-50 text-[#0033AD]">
                  <HandDeposit weight="fill" className="text-xl" />
                </div>
                <h3 className="font-satoshi text-2xl font-bold text-gray-900">Manage Stake</h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-[#fbfcff] rounded-2xl p-5 border border-blue-100/50 shadow-inner">
                  <div className="flex justify-between text-sm text-gray-500 mb-2 font-medium">
                    <span>Amount to Deposit</span>
                    <span className="text-[#0033AD]">Wallet: {adaBalance.toFixed(2)} ADA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-transparent text-4xl font-black tracking-tighter text-gray-900 outline-none placeholder:text-gray-200"
                    />
                    <span className="font-bold text-gray-400 text-lg">ADA</span>
                  </div>
                </div>

                <button 
                  onClick={handleDeposit}
                  className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0033AD] py-4 text-[16px] font-semibold text-white shadow-xl shadow-blue-900/10 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-900/20 active:scale-[0.98]"
                >
                  Mint ssADA <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="pt-8 mt-4 border-t border-gray-100">
                  <div className="flex justify-between text-[15px] text-gray-500 font-medium mb-4">
                    <span>Your Active Position</span>
                    <span className="font-black text-[#0033AD]">{ssAdaBalance.toFixed(2)} ssADA</span>
                  </div>
                  <button 
                    onClick={handleWithdraw}
                    className="w-full rounded-2xl bg-white border-2 border-gray-100 py-3 text-[15px] font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:border-gray-200 active:scale-[0.98]"
                  >
                    Withdraw to ADA
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Analytics Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 rounded-[2rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-50 text-emerald-600">
                    <Database weight="fill" className="text-xl" />
                  </div>
                  <h3 className="font-satoshi text-2xl font-bold text-gray-900">Oracle Intelligence</h3>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#0033AD]/5 px-4 py-1.5 border border-[#0033AD]/10">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0033AD] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0033AD]"></span>
                  </div>
                  <span className="text-[11px] font-bold text-[#0033AD] uppercase tracking-widest">Charli3 Pull Status: Live</span>
                </div>
              </div>

              <h4 className="font-sans text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Live Yield Strategies</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                {strategies.map((strat, i) => (
                  <div 
                    key={i} 
                    className={`relative overflow-hidden rounded-2xl p-6 border transition-colors ${strat.active ? 'border-[#0033AD] bg-[#f2f6ff] shadow-sm' : 'border-gray-200 bg-gray-50/50 opacity-60'}`}
                  >
                    {strat.active && (
                      <div className="absolute top-0 right-0 bg-[#0033AD] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
                        Active
                      </div>
                    )}
                    <h4 className="font-sans text-[15px] font-medium text-gray-600 truncate">{strat.name}</h4>
                    <div className={`mt-3 font-satoshi text-4xl font-black ${strat.active ? 'text-[#0033AD]' : 'text-gray-900'}`}>{strat.apy}</div>
                  </div>
                ))}
              </div>

              <div className="mt-auto rounded-3xl bg-[#09090b] p-8 relative overflow-hidden group">
                <div className="absolute -right-[10%] -bottom-[20%] w-[300px] h-[200px] bg-gradient-to-l from-blue-600/40 to-transparent blur-3xl rounded-full" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Coins weight="bold" /> Vault NAV
                    </h4>
                    <div className="font-satoshi text-4xl font-black text-white flex items-baseline gap-2">
                      1.025 <span className="text-xl text-emerald-400 font-medium">ADA/ssADA</span>
                    </div>
                  </div>
                  
                  <div className="hidden md:block h-16 w-px bg-white/10" />

                  <div>
                    <h4 className="font-sans text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Total Value Locked</h4>
                    <div className="font-satoshi text-4xl font-black text-white">
                      4,250,000 <span className="text-xl text-gray-500 font-medium tracking-normal">ADA</span>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
