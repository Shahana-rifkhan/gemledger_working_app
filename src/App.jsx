import React, { useState } from "react";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Diamond,
  FileText,
  Gem,
  Globe2,
  Home,
  Import,
  LineChart,
  MapPin,
  MessageCircle,
  Package,
  QrCode,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Upload,
  UserPlus,
  Users,
} from "lucide-react";

const STONES = {
  RUBY: "Ruby",
  BLU_SAPPHIRE: "Blue Sapphire",
  EMERALD: "Emerald",
  PARAIBA: "Paraiba",
  PADPARADSCHA: "Padparadscha",
  DIAMOND: "Diamond",
};

const stone = {
  id: "s1",
  sku: "GL-2024-05-0001",
  title: "Kashmir Sapphire",
  type: "BLU_SAPPHIRE",
  carat: 6.27,
  origin: "Kashmir, India",
  shape: "Cushion",
  treatment: "No indications of heating",
  certs: ["Gübelin Report No. 24051234"],
  status: "Verified",
  owner: "Mineral Source",
  chainId: "0x7a3b8d2f6c9e4a1b8f2d9e7c...",
  timeline: ["Registered", "Gübelin Verified", "Blockchain Recorded", "Ownership Secured"],
};

const buyers = [
  { name: "Claire Beaumont", city: "Paris, France", company: "Luxury Jewellery House", score: 98, interest: "Kashmir Sapphires, Royal Blue" },
  { name: "Kenji Nakamura", city: "Tokyo, Japan", company: "Private Collector", score: 94, interest: "No-heat Sapphire, Ruby" },
  { name: "Aïsha Al-Mansouri", city: "Dubai, UAE", company: "High Jewellery Designer", score: 91, interest: "Emerald, Ruby, Diamond" },
  { name: "Michael Stein", city: "New York, USA", company: "Private Client Advisor", score: 88, interest: "Certified rare stones" },
  { name: "Lina Al-Sabah", city: "Kuwait City, Kuwait", company: "VIP Jewellery Buyer", score: 84, interest: "Ruby, Diamond, Emerald" },
];

const exhibitions = [
  { name: "JCK Las Vegas 2026", city: "Las Vegas, USA", date: "May 29-Jun 1", type: "Global jewellery & gemstone trade" },
  { name: "Jewellery & Gem Asia Hong Kong", city: "Hong Kong", date: "Jun 18-21", type: "Major Asian jewellery and gemstone fair" },
  { name: "Mineral & Gem Sainte-Marie-aux-Mines", city: "France", date: "Jun 24-28", type: "Minerals, gems, fossils and precious stones" },
  { name: "Singapore International Jewelry Expo", city: "Singapore", date: "Jul 9-12", type: "Luxury jewellery and gemstones" },
  { name: "IIJS Premiere 2026", city: "Mumbai, India", date: "Aug 5-9", type: "Large gems and jewellery trade fair" },
];

function parseCsv(text) {
  const clean = String(text || "").replaceAll("\r", "").trim();
  if (!clean) return [];
  const lines = clean.split("\n").filter(Boolean);
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });
    return row;
  });
}

console.assert(parseCsv("name,city\nZaf,Dubai")[0].city === "Dubai", "CSV parser works");
console.assert(buyers.length >= 5, "At least five global buyer contacts exist");
console.assert(stone.chainId.length > 10, "Blockchain proof ID exists");

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-stone-200 bg-white p-5 shadow-sm ${className}`}>{children}</div>;
}

function Stat({ label, value, icon, onClick, sub = "View details" }) {
  return <button onClick={onClick} className="w-full text-left"><Card className="transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"><div className="flex items-center gap-4"><div className="text-3xl">{icon}</div><div><p className="text-sm text-slate-500">{label}</p><p className="font-serif text-3xl">{value}</p><p className="text-sm text-[#0f6b3f]">{sub} →</p></div></div></Card></button>;
}

function Info({ label, value }) {
  return <><p className="text-slate-500">{label}</p><p className="font-medium">{value}</p></>;
}

function StoneImage() {
  return <div className="grid h-72 w-full place-items-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-700"><Gem className="h-28 w-28 text-blue-950" /></div>;
}

function AppShell({ tab, setTab, children }) {
  const nav = [
    ["dashboard", Home, "Dashboard", ""],
    ["stones", Gem, "Stones", "INVENTORY"],
    ["lots", Package, "Lots", ""],
    ["certificates", FileText, "Certificates", ""],
    ["import", Upload, "Import Excel", ""],
    ["buyers", Users, "Buyers", "CRM"],
    ["suppliers", Truck, "Suppliers", ""],
    ["communications", MessageCircle, "Communications", ""],
    ["deals", ShoppingCart, "Deals", ""],
    ["ai", Diamond, "AI Buyer Match", "INTELLIGENCE"],
    ["market", Globe2, "Market Insights", ""],
    ["price", LineChart, "Price Trends", ""],
    ["exhibitions", CalendarDays, "Exhibitions", ""],
    ["gps", MapPin, "GPS Buyer Map", ""],
    ["blockchain", ShieldCheck, "Blockchain Proof", "PROVENANCE"],
    ["settings", Settings, "Settings", "SETTINGS"],
  ];

  let lastGroup = "";

  return <div className="min-h-screen bg-[#f8f6f0] text-slate-900">
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-stone-200 bg-white p-5 xl:block">
      <div className="mb-8 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#0f6b3f] text-white"><Gem /></div>
        <div><h1 className="font-serif text-3xl text-[#0f6b3f]">GemLedger</h1><p className="text-xs text-slate-500">Trust · Provenance · Value</p></div>
      </div>
      <nav className="space-y-1">
        {nav.map(([id, Icon, label, group]) => {
          const showGroup = Boolean(group && group !== lastGroup);
          if (group) lastGroup = group;
          return <React.Fragment key={id}>
            {showGroup && <p className="mt-5 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">{group}</p>}
            <button onClick={() => setTab(id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm ${tab === id ? "bg-green-50 font-semibold text-[#0f6b3f]" : "text-slate-700 hover:bg-stone-50"}`}>
              <Icon className="h-5 w-5" />{label}{id === "blockchain" && <span className="ml-auto rounded-full bg-green-100 px-2 py-1 text-xs text-[#0f6b3f]">NEW</span>}
            </button>
          </React.Fragment>;
        })}
      </nav>
      <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-stone-200 bg-[#f8f6f0] p-4"><p className="font-semibold text-[#0f6b3f]">Mineral Source</p><p className="text-sm text-slate-500">Enterprise Plan</p></div>
    </aside>
    <main className="xl:ml-72">
      <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-stone-200 bg-white px-6 py-4">
        <div className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><input className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-10 outline-none" placeholder="Search stones, clients, certificates, blockchain IDs..." /></div>
        <Bell className="text-slate-600" />
        <div className="h-10 w-px bg-stone-200" />
        <div className="text-right"><p className="font-semibold">Zafarullah Hashim</p><p className="text-xs text-slate-500">Mineral Source</p></div>
      </header>
      {children}
    </main>
  </div>;
}

function StoneRecord() {
  return <Card><div className="mb-4 flex items-center justify-between"><div><p className="text-sm text-slate-500">Stones / {stone.sku}</p><h2 className="font-serif text-4xl">{stone.title} <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm text-[#0f6b3f]">Verified</span></h2></div><button onClick={() => alert('Share link copied: https://gemledger.app/stones/GL-2024-05-0001')} className="rounded-xl bg-[#0f6b3f] px-5 py-3 font-semibold text-white">Share</button></div><div className="grid gap-6 lg:grid-cols-[360px_1fr]"><StoneImage /><div className="grid grid-cols-2 gap-3 text-sm"><Info label="Stone ID" value={stone.sku} /><Info label="Variety" value={STONES[stone.type]} /><Info label="Weight" value={`${stone.carat} Carats`} /><Info label="Shape" value={stone.shape} /><Info label="Origin" value={stone.origin} /><Info label="Treatment" value={stone.treatment} /><Info label="Certificate" value={stone.certs.join(", ")} /><Info label="Owner" value={stone.owner} /></div></div></Card>;
}

function Provenance() {
  return <Card><div className="flex items-start gap-3"><ShieldCheck className="h-9 w-9 text-[#0f6b3f]" /><div><h2 className="font-serif text-2xl">Blockchain Provenance</h2><p className="text-sm text-slate-500">Secured by Gübelin Blockchain</p></div></div><div className="my-6 rounded-xl bg-green-50 p-5 text-center"><CheckCircle2 className="mx-auto text-[#0f6b3f]" /><p className="mt-2 font-serif text-2xl text-[#0f6b3f]">Provenance Verified</p><p className="text-sm text-slate-600">This gemstone is recorded on the Gübelin Blockchain</p></div><h3 className="font-serif text-xl">Provenance Timeline</h3><div className="mt-4 space-y-4">{stone.timeline.map((item, index) => <div key={item} className="flex gap-3"><div className="grid h-8 w-8 place-items-center rounded-full bg-green-100 text-[#0f6b3f]">✓</div><div><p className="font-semibold">{item}</p><p className="text-sm text-slate-500">2024-05-12 14:{32 + index * 4}:45</p></div></div>)}</div><div className="mt-6 rounded-xl bg-stone-50 p-4"><p className="text-sm text-slate-500">Blockchain Hash</p><p className="font-mono text-sm">{stone.chainId}</p></div><button className="mt-4 w-full rounded-xl border border-stone-300 py-3 font-semibold"><QrCode className="mr-2 inline" /> View on Blockchain</button></Card>;
}

function BuyerMatch({ onViewAll }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? buyers : buyers.slice(0, 3);
  return <Card><div className="flex justify-between"><h3 className="font-serif text-xl">AI Buyer Match</h3><button onClick={() => onViewAll ? onViewAll() : setShowAll(!showAll)} className="text-[#0f6b3f]">View all →</button></div>{visible.map((buyer) => <button key={buyer.name} onClick={() => alert(`${buyer.name}
${buyer.company}
${buyer.city}
Interest: ${buyer.interest}
Match: ${buyer.score}%`)} className="mt-4 flex w-full items-center justify-between rounded-xl border border-stone-100 p-3 text-left transition hover:bg-green-50"><div><p className="font-semibold">{buyer.name}</p><p className="text-sm text-slate-500">{buyer.city} · {buyer.company}</p><p className="text-xs text-slate-500">Interested in: {buyer.interest}</p></div><p className="font-serif text-2xl text-[#0f6b3f]">{buyer.score}%</p></button>)}</Card>;
}

function BuyerMap() {
  const [city, setCity] = useState("Dubai");
  const [query, setQuery] = useState("gemstone buyers jewellers mineral dealers gem labs");
  const categories = ["Gemstone buyers", "Mineral dealers", "Jewellers", "Gem labs", "Wholesalers", "Auction advisors"];
  const leads = [
    { name: "Royal Gem House", type: "Jeweller", distance: "1.2 km", fit: "Ruby, Emerald" },
    { name: "Global Mineral Traders", type: "Mineral dealer", distance: "2.8 km", fit: "Collector stones" },
    { name: "Elite Gem Lab", type: "Gem lab", distance: "3.4 km", fit: "Certification" },
    { name: "Heritage Jewellery Buyers", type: "Buyer", distance: "4.1 km", fit: "No-heat Sapphire" },
  ];
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/${encodeURIComponent(query + ' near ' + city)}`;
    window.open(url, '_blank');
  };
  return <Card><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><h3 className="font-serif text-xl">GPS Buyer Map</h3><p className="text-sm text-slate-500">Uses Google Maps search + AI enrichment to find gemstone, mineral, jeweller and lab contacts.</p></div><button onClick={openGoogleMaps} className="rounded-xl bg-[#0f6b3f] px-4 py-3 font-semibold text-white">Open Google Maps</button></div><div className="mt-4 grid gap-3 md:grid-cols-[1fr_180px_120px]"><input value={query} onChange={(event) => setQuery(event.target.value)} className="rounded-xl border border-stone-200 p-3" placeholder="Search by jewellers, wholesalers, labs, miners..." /><select value={city} onChange={(event) => setCity(event.target.value)} className="rounded-xl border border-stone-200 p-3">{["Dubai", "Geneva", "Hong Kong", "Bangkok", "Singapore", "Mumbai", "Colombo", "New York", "Paris", "Tokyo"].map((item) => <option key={item}>{item}</option>)}</select><button onClick={openGoogleMaps} className="rounded-xl border border-stone-300 p-3">Search</button></div><div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]"><div className="relative grid h-72 place-items-center overflow-hidden rounded-xl bg-green-50 text-[#0f6b3f]"><Globe2 className="h-32 w-32 opacity-25" /><div className="absolute left-[28%] top-[38%] h-4 w-4 rounded-full bg-[#0f6b3f] ring-8 ring-green-200" /><div className="absolute left-[52%] top-[48%] h-4 w-4 rounded-full bg-[#c9152c] ring-8 ring-red-100" /><div className="absolute left-[68%] top-[32%] h-4 w-4 rounded-full bg-[#0f6b3f] ring-8 ring-green-200" /><p className="absolute bottom-4 rounded-full bg-white px-4 py-2 text-sm shadow">Live integration target: Google Places API + AI ranking</p></div><div><p className="font-semibold">Search categories</p><div className="mt-2 flex flex-wrap gap-2">{categories.map((item) => <button key={item} onClick={() => setQuery(item)} className="rounded-full bg-green-50 px-3 py-1 text-xs text-[#0f6b3f]">{item}</button>)}</div><div className="mt-4 space-y-3">{leads.map((lead) => <button key={lead.name} onClick={openGoogleMaps} className="w-full rounded-xl border border-stone-100 p-3 text-left transition hover:bg-green-50"><p className="font-semibold">{lead.name}</p><p className="text-sm text-slate-500">{lead.type} · {city} · {lead.distance}</p><p className="text-xs text-[#0f6b3f]">Fit: {lead.fit}</p></button>)}</div></div></div></Card>;
}

function ExhibitionList() {
  return <Card><h3 className="font-serif text-xl">Upcoming gemstone exhibitions</h3>{exhibitions.map((event) => <div key={event.name} className="mt-4 border-b border-stone-100 pb-3"><p className="font-semibold">{event.name}</p><p className="text-sm text-slate-500">{event.date} · {event.city}</p></div>)}</Card>;
}

function Dashboard() {
  return <div className="p-6"><div className="grid gap-4 lg:grid-cols-4"><Stat icon="💎" label="Total Stones" value="128" /><Stat icon="💰" label="Total Value" value="$2.48M" /><Stat icon="👥" label="Active Buyers" value={buyers.length} /><Stat icon="🛡️" label="Blockchain Proofs" value="42" /></div><div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]"><StoneRecord /><Provenance /></div><div className="mt-6 grid gap-6 xl:grid-cols-3"><BuyerMatch /><BuyerMap /><ExhibitionList /></div></div>;
}

function GenericTab({ title, icon, children }) {
  return <div className="p-6"><Card><div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-xl bg-green-50 text-[#0f6b3f]">{icon}</div><div><h1 className="font-serif text-4xl">{title}</h1><p className="text-slate-500">This tab is linked and ready for backend data.</p></div></div><div className="mt-6">{children || <p className="text-slate-600">Production content, filters, forms, and reports will connect here.</p>}</div></Card></div>;
}

function CRMImportTab({ type = "buyers" }) {
  const [rows, setRows] = useState([]);
  const [notice, setNotice] = useState("Upload CSV or Excel files. Production will map columns automatically.");
  const sample = type === "buyers" ? "name, company, city, country, phone, email, wants, origins, previous" : "name, company, city, country, phone, email, minerals, supplyType, notes";

  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const parsed = parseCsv(String(event.target?.result || ""));
      setRows(parsed.slice(0, 8));
      setNotice(`${parsed.length} ${type} rows ready to import. Excel parser can be connected in backend production.`);
    };
    reader.readAsText(file);
  }

  return <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-6"><Upload className="h-10 w-10 text-[#0f6b3f]" /><h3 className="mt-3 font-serif text-2xl capitalize">Bulk upload {type}</h3><p className="mt-1 text-sm text-slate-500">Expected columns: {sample}</p><input type="file" accept=".csv,.xlsx,.xls" className="mt-4" onChange={(event) => event.target.files?.[0] && handleFile(event.target.files[0])} /><p className="mt-3 text-sm text-[#0f6b3f]">{notice}</p><pre className="mt-4 max-h-56 overflow-auto rounded-xl bg-white p-4 text-xs text-slate-600">{JSON.stringify(rows, null, 2)}</pre></div>;
}

function ImportTab() {
  return <GenericTab title="Import Excel" icon={<Upload />}><div className="grid gap-6 lg:grid-cols-2"><CRMImportTab type="buyers" /><CRMImportTab type="suppliers" /></div></GenericTab>;
}

function AddStoneTab() {
  return <GenericTab title="Add Stone" icon={<UserPlus />}><div className="grid gap-4 md:grid-cols-2"><input className="rounded-xl border p-3" placeholder="Stone name" /><input className="rounded-xl border p-3" placeholder="Carat" /><input className="rounded-xl border p-3" placeholder="Origin" /><input className="rounded-xl border p-3" placeholder="Certificate" /><button className="rounded-xl bg-[#0f6b3f] p-3 font-semibold text-white md:col-span-2">Save and Generate Blockchain Proof</button></div></GenericTab>;
}

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const pages = {
    dashboard: <Dashboard />,
    stones: <GenericTab title="Stones" icon={<Gem />}><StoneRecord /></GenericTab>,
    lots: <GenericTab title="Lots" icon={<Package />} />,
    certificates: <GenericTab title="Certificates" icon={<FileText />}><p>Gübelin, SSEF, GIA, and GRS certificate records appear here.</p></GenericTab>,
    import: <ImportTab />,
    buyers: <GenericTab title="Buyers" icon={<Users />}><div className="grid gap-6 xl:grid-cols-[1fr_420px]"><BuyerMatch /><CRMImportTab type="buyers" /></div></GenericTab>,
    suppliers: <GenericTab title="Suppliers" icon={<Truck />}><CRMImportTab type="suppliers" /></GenericTab>,
    communications: <GenericTab title="Communications" icon={<MessageCircle />} />,
    deals: <GenericTab title="Deals" icon={<ShoppingCart />} />,
    ai: <GenericTab title="AI Buyer Match" icon={<Diamond />}><BuyerMatch /></GenericTab>,
    market: <GenericTab title="Market Insights" icon={<Globe2 />} />,
    price: <GenericTab title="Price Trends" icon={<LineChart />} />,
    exhibitions: <GenericTab title="Exhibitions" icon={<CalendarDays />}><ExhibitionList /></GenericTab>,
    gps: <GenericTab title="GPS Buyer Map" icon={<MapPin />}><BuyerMap /></GenericTab>,
    blockchain: <GenericTab title="Blockchain Proof" icon={<ShieldCheck />}><Provenance /></GenericTab>,
    settings: <GenericTab title="Settings" icon={<Settings />} />,
    addStone: <AddStoneTab />,
  };

  return <AppShell tab={tab} setTab={setTab}>{pages[tab] || pages.dashboard}</AppShell>;
}
