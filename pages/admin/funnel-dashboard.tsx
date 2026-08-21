"use client";

import { useEffect, useMemo, useState } from "react";

type DashboardRow = {
  funnel:string;offerMode:string;uniqueVisitors:number;views:number;ctaClicks:number;leads:number;
  whatsappSent:number;whatsappDelivered:number;whatsappRead:number;whatsappFailed:number;communityJoined:number;
  checkoutStarts:number;entryPurchases:number;masterclassJoined:number;masterclass30m:number;masterclass60m:number;masterclassOfferSeen:number;
  workshopOfferViews:number;workshopCtaClicks:number;workshopCheckoutStarts:number;workshopPurchases:number;workshopAttended:number;
  qualifiedLeads:number;workingLeads:number;coreOfferSeen:number;advisorClicks:number;coreCheckoutStarts:number;corePurchases:number;lostLeads:number;refunds:number;
  leadConversionRate:number;whatsappSendRate:number;whatsappDeliveryRate:number;whatsappReadRate:number;communityJoinFromReadRate:number;communityJoinFromLeadRate:number;
  checkoutConversionRate:number;showUpRate:number;retention30Rate:number;retention60Rate:number;liveOfferToWorkshopPageRate:number;workshopPageToCheckoutRate:number;workshopCheckoutConversionRate:number;workshopBuyerRate:number;workshopAttendanceRate:number;
  advisorClickRate:number;coreOfferToCheckoutRate:number;coreCheckoutConversionRate:number;coreOfferConversionRate:number;leadToCorePurchaseRate:number;
  entryRevenue:number;workshopRevenue:number;coreRevenue:number;grossRevenue:number;refundValue:number;netRevenue:number;
};

type DashboardData={ok:true;rangeDays:number;summary:{uniqueVisitors:number;views:number;leads:number;whatsappSent:number;whatsappDelivered:number;whatsappRead:number;communityJoined:number;masterclassJoined:number;workshopOfferViews:number;workshopCheckoutStarts:number;workshopPurchases:number;coreOfferSeen:number;advisorClicks:number;coreCheckoutStarts:number;corePurchases:number;grossRevenue:number;refundValue:number;netRevenue:number};rows:DashboardRow[];note:string};

function money(value:number){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value||0)}
function pct(value:number){return `${Number(value||0).toFixed(1)}%`}
const card={background:"white",border:"1px solid #e2e8f0",borderRadius:16,padding:18} as const;
const th={padding:"11px 12px",borderBottom:"1px solid #e2e8f0",whiteSpace:"nowrap",fontSize:11,color:"#64748b",textAlign:"left"} as const;
const td={padding:"12px",borderBottom:"1px solid #eef2f7",whiteSpace:"nowrap",fontSize:12} as const;

export default function FunnelDashboardPage(){
  const[days,setDays]=useState(30);const[data,setData]=useState<DashboardData|null>(null);const[error,setError]=useState("");const[loading,setLoading]=useState(true);
  useEffect(()=>{let active=true;(async()=>{setLoading(true);setError("");try{const r=await fetch(`/api/admin/funnel-dashboard?days=${days}`);if(r.status===401){window.location.href="/admin/login";return}const b=await r.json();if(!r.ok||!b?.ok){if(active)setError(b?.error||"Unable to load dashboard");return}if(active)setData(b)}catch(e){if(active)setError(e instanceof Error?e.message:"Unable to load dashboard")}finally{if(active)setLoading(false)}})();return()=>{active=false}},[days]);

  const rates=useMemo(()=>{const s=data?.summary;if(!s)return{delivery:0,read:0,community:0,showUp:0,workshop:0,coreCheckout:0,coreClose:0};return{
    delivery:s.whatsappSent?(s.whatsappDelivered/s.whatsappSent)*100:0,read:s.whatsappDelivered?(s.whatsappRead/s.whatsappDelivered)*100:0,community:s.leads?(s.communityJoined/s.leads)*100:0,showUp:s.leads?(s.masterclassJoined/s.leads)*100:0,
    workshop:s.workshopCheckoutStarts?(s.workshopPurchases/s.workshopCheckoutStarts)*100:0,coreCheckout:s.coreOfferSeen?(s.coreCheckoutStarts/s.coreOfferSeen)*100:0,coreClose:s.coreCheckoutStarts?(s.corePurchases/s.coreCheckoutStarts)*100:0,
  }},[data]);

  return <main style={{minHeight:"100vh",background:"#f6f8fb",color:"#0f172a",padding:"38px 18px 70px"}}><div style={{width:"min(1480px,100%)",margin:"0 auto"}}>
    <header style={{display:"flex",justifyContent:"space-between",alignItems:"end",gap:20,flexWrap:"wrap"}}><div><p style={{margin:0,color:"#2563eb",fontSize:11,fontWeight:900,letterSpacing:".12em"}}>SIKHADENGE • FIRST-PARTY REVENUE FUNNEL</p><h1 style={{margin:"8px 0 0",fontSize:38,letterSpacing:"-.04em"}}>AI Funnel Command Center</h1><p style={{margin:"8px 0 0",color:"#64748b"}}>ChatGPT vs Claude • Free vs Paid • WhatsApp → Masterclass → Workshop → ₹14,999 AI Expert Program</p></div>
      <label style={{display:"grid",gap:6,fontSize:11,fontWeight:800}}>Reporting window<select value={days} onChange={e=>setDays(Number(e.target.value))} style={{minHeight:40,border:"1px solid #d7dee8",borderRadius:10,padding:"0 12px",background:"white"}}><option value={7}>7 days</option><option value={30}>30 days</option><option value={60}>60 days</option><option value={90}>90 days</option><option value={180}>180 days</option></select></label></header>
    {error?<div style={{marginTop:22,padding:14,borderRadius:12,background:"#fff1f2",border:"1px solid #fecaca",color:"#991b1b"}}>{error}</div>:null}
    {loading?<div style={{marginTop:22,padding:14,borderRadius:12,background:"#eff6ff",border:"1px solid #bfdbfe",color:"#1e3a8a"}}>Loading funnel data…</div>:null}

    <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(165px,1fr))",gap:12,marginTop:28}}>{[
      ["Visitors",data?.summary.uniqueVisitors??0],["Registrations",data?.summary.leads??0],["WA delivery",pct(rates.delivery)],["WA read",pct(rates.read)],["Community join",pct(rates.community)],["Live show-up",pct(rates.showUp)],
      ["Workshop buyers",data?.summary.workshopPurchases??0],["Workshop checkout CVR",pct(rates.workshop)],["Core offers",data?.summary.coreOfferSeen??0],["Advisor clicks",data?.summary.advisorClicks??0],["Core checkouts",data?.summary.coreCheckoutStarts??0],["Offer → core checkout",pct(rates.coreCheckout)],["₹14,999 buyers",data?.summary.corePurchases??0],["Core checkout CVR",pct(rates.coreClose)],["Net revenue",money(data?.summary.netRevenue??0)],
    ].map(([label,value])=><article key={String(label)} style={card}><span style={{color:"#64748b",fontSize:11,fontWeight:800}}>{label}</span><strong style={{display:"block",marginTop:7,fontSize:25,letterSpacing:"-.035em"}}>{value}</strong></article>)}</section>

    <section style={{display:"grid",gap:16,marginTop:24}}>{(data?.rows||[]).map(row=><article key={`${row.funnel}:${row.offerMode}`} style={{background:"white",border:"1px solid #e2e8f0",borderRadius:20,overflow:"hidden"}}>
      <div style={{padding:"17px 19px",display:"flex",justifyContent:"space-between",gap:12,flexWrap:"wrap",borderBottom:"1px solid #e2e8f0"}}><div><strong style={{fontSize:18,textTransform:"capitalize"}}>{row.funnel} • {row.offerMode}</strong><div style={{marginTop:4,fontSize:11,color:"#64748b"}}>{row.uniqueVisitors} unique visitors • {money(row.netRevenue)} net tracked revenue</div></div><div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{[
        `Lead ${pct(row.leadConversionRate)}`,`WA ${pct(row.whatsappDeliveryRate)}`,`Show-up ${pct(row.showUpRate)}`,`Workshop checkout ${pct(row.workshopCheckoutConversionRate)}`,`Core checkout ${pct(row.coreCheckoutConversionRate)}`,`Lead → ₹14,999 ${pct(row.leadToCorePurchaseRate)}`
      ].map(x=><span key={x} style={{padding:"6px 9px",borderRadius:999,background:"#eff6ff",color:"#1d4ed8",fontSize:10,fontWeight:800}}>{x}</span>)}</div></div>
      <div style={{padding:18,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(115px,1fr))",gap:9}}>{[
        ["Views",row.views],["Leads",row.leads],["WA sent",row.whatsappSent],["WA delivered",row.whatsappDelivered],["WA read",row.whatsappRead],["Community",row.communityJoined],["Entry paid",row.entryPurchases],["Live joined",row.masterclassJoined],["30m",row.masterclass30m],["60m",row.masterclass60m],["Live offer",row.masterclassOfferSeen],["Workshop page",row.workshopOfferViews],["Workshop checkout",row.workshopCheckoutStarts],["Workshop paid",row.workshopPurchases],["Workshop attended",row.workshopAttended],["Core offer",row.coreOfferSeen],["Advisor",row.advisorClicks],["Core checkout",row.coreCheckoutStarts],["Core paid",row.corePurchases],["Lost",row.lostLeads],["Refunds",row.refunds]
      ].map(([label,value])=><div key={String(label)} style={{padding:11,border:"1px solid #eef2f7",borderRadius:11,background:"#fbfdff"}}><span style={{fontSize:9,fontWeight:800,color:"#64748b"}}>{label}</span><strong style={{display:"block",marginTop:4,fontSize:19}}>{value}</strong></div>)}</div>
    </article>)}</section>

    <section style={{marginTop:24,border:"1px solid #e2e8f0",borderRadius:18,overflow:"hidden",background:"white"}}><div style={{padding:"16px 18px",borderBottom:"1px solid #e2e8f0"}}><strong>Commercial cohort comparison</strong></div><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:1850}}><thead><tr style={{background:"#f8fafc"}}>{["Funnel","Entry","Leads","Show-up","Workshop page","Workshop checkout","Workshop paid","WS checkout CVR","Core offer","Advisor","Core checkout","Offer→checkout","₹14,999 paid","Core checkout CVR","Lead→core","Entry rev","Workshop rev","Core rev","Refunds","Net revenue"].map(h=><th key={h} style={th}>{h}</th>)}</tr></thead><tbody>{(data?.rows||[]).map(row=><tr key={`commercial:${row.funnel}:${row.offerMode}`}><td style={{...td,fontWeight:900,textTransform:"capitalize"}}>{row.funnel}</td><td style={{...td,textTransform:"capitalize"}}>{row.offerMode}</td><td style={td}>{row.leads}</td><td style={td}>{pct(row.showUpRate)}</td><td style={td}>{row.workshopOfferViews}</td><td style={td}>{row.workshopCheckoutStarts}</td><td style={td}>{row.workshopPurchases}</td><td style={td}>{pct(row.workshopCheckoutConversionRate)}</td><td style={td}>{row.coreOfferSeen}</td><td style={td}>{row.advisorClicks}</td><td style={td}>{row.coreCheckoutStarts}</td><td style={td}>{pct(row.coreOfferToCheckoutRate)}</td><td style={td}>{row.corePurchases}</td><td style={td}>{pct(row.coreCheckoutConversionRate)}</td><td style={td}>{pct(row.leadToCorePurchaseRate)}</td><td style={td}>{money(row.entryRevenue)}</td><td style={td}>{money(row.workshopRevenue)}</td><td style={td}>{money(row.coreRevenue)}</td><td style={td}>{money(row.refundValue)}</td><td style={{...td,fontWeight:900}}>{money(row.netRevenue)}</td></tr>)}</tbody></table></div></section>

    <div style={{marginTop:20,padding:14,borderRadius:12,background:"#eff6ff",border:"1px solid #bfdbfe",color:"#1e3a8a",fontSize:11,lineHeight:1.6}}>{data?.note||"Loading attribution note…"}</div>
  </div></main>
}
