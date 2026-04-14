import { Link } from "react-router-dom";
import { CaretDown, Wallet, Moon, CheckCircle } from "@phosphor-icons/react";

export function Portfolio() {
  const recommendations = [
    {
      id: "ssADA",
      name: "ssADA Yield Router",
      labels: ["Cardano", "Auto-Compound", "Single Asset"],
      apy: "12.5%",
      tvl: "$4.25M",
      hasCheck: true,
      color: "#0033AD"
    },
    {
      id: "iUSD",
      name: "iUSD Reserve",
      labels: ["Indigo", "Stablecoin", "Single Asset"],
      apy: "5.1%",
      tvl: "$2.1M",
      hasCheck: false,
      color: "#1d4ed8"
    },
    {
      id: "djjed",
      name: "Djed Pegged LP",
      labels: ["COTI", "Stablecoin", "LP Token"],
      apy: "4.44%",
      tvl: "$8.81M",
      hasCheck: true,
      color: "#10b981"
    },
    {
      id: "hosk",
      name: "HOSKY Farm",
      labels: ["Minswap", "Volatile", "LP Token"],
      apy: "0.75%",
      tvl: "$3.62M",
      hasCheck: false,
      color: "#f59e0b"
    }
  ];

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen text-gray-900 font-sans selection:bg-[#0033AD]/20 selection:text-gray-900">
      
      {/* Top Header */}
      <nav className="w-full px-8 py-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/onramper-hero-orb.svg" alt="BlueSense" className="w-[30px] h-[30px] object-contain" />
            <span className="font-sans text-[22px] font-bold tracking-tight text-[#0033AD] translate-y-[-1px]">
              BlueSense
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-[15px] text-gray-600 font-medium">
             <button className="flex items-center gap-1.5 hover:text-black transition-colors">Ecosystem <CaretDown weight="bold" size={12} /></button>
             <button className="flex items-center gap-1.5 hover:text-black transition-colors">Resources <CaretDown weight="bold" size={12} /></button>
          </div>
        </div>
        
        <div className="flex items-center bg-white rounded-lg p-1.5 shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-gray-200/60">
           <Link to="/vault" className="px-5 py-2 font-medium text-[15px] text-gray-500 hover:text-black transition-colors">Vaults</Link>
           <button className="px-3 py-2 text-gray-900 font-bold">Portfolio</button>
           <button className="px-3 py-2 text-gray-500 hover:text-black transition-colors">
              <Moon size={20} weight="regular" />
           </button>
           <div className="w-px h-6 bg-gray-200 mx-1" />
           <button className="flex items-center gap-2 h-10 rounded-lg bg-[#000] px-5 ml-1 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-gray-800">
             <Wallet size={18} /> Connect wallet
           </button>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto pt-6 px-8 pb-32">
        
        {/* Breadcrumb */}
        <div className="text-[13px] text-gray-500 mb-6">
           <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link> <span className="mx-2 text-gray-300">&gt;</span> <Link to="/vault" className="hover:text-gray-900 transition-colors">Vaults</Link> <span className="mx-2 text-gray-300">&gt;</span> <span className="text-gray-900 font-medium">Portfolio</span>
        </div>

        <h1 className="text-[32px] font-bold text-gray-900 mb-8 tracking-tight">Account Overview</h1>

        {/* Portfolio Tabs */}
        <div className="flex items-center bg-gray-100 rounded-xl p-1.5 mb-10 border border-gray-200">
           <button className="flex-1 py-3 text-[14px] font-bold bg-white rounded-lg text-gray-900 shadow-sm transition-shadow">Your Vaults</button>
           <button className="flex-1 py-3 text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">Activity</button>
           <button className="flex-1 py-3 text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">Claim Rewards</button>
        </div>

        {/* Main Tracking Section */}
        <div className="mb-14">
           <h2 className="text-[22px] font-bold text-gray-900 mb-1 leading-tight">Your Vaults</h2>
           <p className="text-[15px] text-gray-500 mb-6">Track every BlueSense position you currently hold.</p>

           <div className="w-full bg-white rounded-xl border border-gray-200 py-24 flex flex-col items-center justify-center text-center shadow-sm">
              <h3 className="text-[17px] font-bold text-gray-900 mb-3">Connect a wallet to view your vaults</h3>
              <p className="text-[14px] text-gray-500 mb-8">See all your BlueSense deposits in one place.</p>
              <button className="flex items-center h-12 rounded-lg bg-[#000] px-8 text-[15px] font-bold text-white shadow-md transition-all hover:bg-gray-800">
                Connect wallet
              </button>
           </div>
        </div>

        {/* Recommended Grids */}
        <div>
           <h2 className="text-[22px] font-bold text-gray-900 mb-6 leading-tight">You might like</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map(vault => (
                 <div key={vault.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between h-full group">
                    <div>
                       <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-100 shadow-sm" style={{ backgroundColor: `${vault.color}15` }}>
                             {vault.id === 'ssADA' ? (
                                <img src="/images/onramper-hero-orb.svg" className="w-[20px] h-[20px]" />
                             ) : (
                                <div className="text-[16px] font-bold" style={{ color: vault.color }}>{vault.name.charAt(0)}</div>
                             )}
                          </div>
                          <h3 className="font-bold text-[16px] text-gray-900 group-hover:text-[#0033AD] transition-colors">{vault.name}</h3>
                       </div>

                       <div className="flex flex-wrap gap-1.5 mb-8">
                          {vault.labels.map(label => (
                             <span key={label} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-medium">{label}</span>
                          ))}
                       </div>
                    </div>

                    <div className="flex justify-between items-end border-t border-gray-100 pt-5">
                       <div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Est. APY</div>
                          <div className={`font-bold text-[14px] flex items-center gap-1 ${vault.hasCheck ? 'text-[#10B981]' : 'text-gray-900'}`}>
                             {vault.hasCheck && <CheckCircle weight="fill" className="text-emerald-500" size={13} />}
                             {vault.apy}
                             {vault.hasCheck && <span className="text-[10px] text-gray-400 font-normal leading-none -translate-y-[6px]">*</span>}
                          </div>
                       </div>
                       
                       <div className="text-right">
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">TVL</div>
                          <div className="font-bold text-[14px] text-gray-900">{vault.tvl}</div>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}
