import Auth from "./components/Auth";
import { useEffect, useState } from "react";
import {
  Siren, MapPin, Hospital, Navigation, Clock3,
  ShieldCheck, PhoneCall, Bell, Activity,
  LayoutDashboard, FileText, Truck, UserRound,
  BrainCircuit, Settings, Search, Menu, X,
  ArrowUpRight, Upload, HeartPulse, AlertTriangle,
  CheckCircle2, ChevronRight, LocateFixed, Plus,
  ClipboardList
} from "lucide-react";

import "./App.css";

const hospitalData = [
  {
    name: "City Care Hospital",
    location: "Bengaluru",
    distance: "2.4 km",
    facilities: ["Emergency", "ICU", "Trauma Care"],
    status: "Demo availability"
  },
  {
    name: "LifeLine Medical Centre",
    location: "Bengaluru",
    distance: "4.1 km",
    facilities: ["Emergency", "ICU"],
    status: "Demo availability"
  },
  {
    name: "Green Valley Hospital",
    location: "Bengaluru",
    distance: "5.8 km",
    facilities: ["Emergency", "Trauma Care"],
    status: "Demo availability"
  }
];

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "report", label: "Report Emergency", icon: FileText },
  { id: "hospitals", label: "Find Hospitals", icon: Hospital },
  { id: "tracking", label: "Ambulance Tracking", icon: Truck },
  { id: "profile", label: "Medical Profile", icon: UserRound },
  { id: "ai", label: "AI Assessment", icon: BrainCircuit }
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [showAuth, setShowAuth] = useState(false);
const [currentUser, setCurrentUser] = useState(null);
  const [serverStatus, setServerStatus] = useState("Checking...");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notification, setNotification] = useState("");
  const [search, setSearch] = useState("");
  const [incidentType, setIncidentType] = useState("Road Accident");
  const [description, setDescription] = useState("");
  const [imageName, setImageName] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [assessment, setAssessment] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    allergies: "",
    contact: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/status")
      .then((response) => {
        if (!response.ok) throw new Error("Backend unavailable");
        return response.json();
      })
      .then((data) => {
        setServerStatus(data.status || "Connected");
      })
      .catch(() => setServerStatus("Offline"));
  }, []);

  const navigate = (page) => {
    setActivePage(page);
    setMobileMenu(false);
    setNotification("");
  };

  const handleSOS = () => {
    setNotification(
      "Demo mode: No emergency request was sent. Contact local emergency services directly if you need help."
    );
  };

  const handleReport = (event) => {
    event.preventDefault();
    setReportSubmitted(true);
    setNotification("Demo report created successfully. It has not been sent to emergency services.");
  };

  const handleAssessment = () => {
    if (!description.trim()) {
      setAssessment("Please enter an incident description first.");
      return;
    }

    setAssessment(
      `Demo assessment generated for: ${incidentType}. Your description has been recorded for this prototype. This is not a medical assessment or a reliable severity determination.`
    );
  };

  const filteredHospitals = hospitalData.filter((hospital) =>
    hospital.name.toLowerCase().includes(search.toLowerCase())
  );

  const pageTitle = menuItems.find((item) => item.id === activePage)?.label || "Dashboard";

  const renderDashboard = () => (
    <>
      <section className="welcome-section">
        <div>
          <span className="eyebrow">EMERGENCY RESPONSE PLATFORM</span>
          <h1>Welcome to SmartRescue</h1>
          <p>Monitor emergency response services from one place.</p>
        </div>
        <div className="date-chip">
          <Clock3 size={16} />
          Response dashboard
        </div>
      </section>

      <section className="hero-panel">
        <div className="hero-text">
          <span className="hero-tag">
            <span className="pulse-dot"></span>
            YOUR SAFETY MATTERS
          </span>
          <h2>Every second<br /><span>matters.</span></h2>
          <p>
            A unified platform for reporting incidents, locating hospitals
            and coordinating emergency response.
          </p>
          <div className="hero-buttons">
            <button className="sos-button" onClick={handleSOS}>
              <Siren size={21} /> SOS DEMO
            </button>
            <button className="light-button" onClick={() => navigate("report")}>
              Report an incident <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-circle circle-one"></div>
          <div className="visual-circle circle-two"></div>
          <div className="visual-icon"><ShieldCheck size={65} /></div>
          <div className="visual-caption">CONNECTED RESPONSE</div>
        </div>
      </section>

      {notification && (
        <div className="notice">
          <InfoIcon />
          <span>{notification}</span>
          <button onClick={() => setNotification("")}><X size={17} /></button>
        </div>
      )}

      <section className="stats-grid">
        <StatCard icon={Activity} label="Total Incidents" value="12" note="Sample data" color="red" />
        <StatCard icon={Hospital} label="Hospitals Listed" value="08" note="Demo records" color="blue" />
        <StatCard icon={Truck} label="Ambulances" value="05" note="Simulated fleet" color="green" />
        <StatCard icon={ShieldCheck} label="System Status" value="Online" note={serverStatus} color="purple" />
      </section>

      <section className="dashboard-grid">
        <div className="content-card activity-card">
          <div className="card-heading">
            <div>
              <h3>Recent Activity</h3>
              <p>Example incident records</p>
            </div>
            <ClipboardList size={22} />
          </div>
          <div className="activity-item">
            <div className="activity-icon red-bg"><AlertTriangle size={19} /></div>
            <div><strong>Road accident report</strong><p>Demo record · Bengaluru</p></div>
            <span className="status-pill pending">Pending</span>
          </div>
          <div className="activity-item">
            <div className="activity-icon blue-bg"><Hospital size={19} /></div>
            <div><strong>Hospital directory viewed</strong><p>Demo activity</p></div>
            <span className="status-pill completed">Viewed</span>
          </div>
          <div className="activity-item">
            <div className="activity-icon green-bg"><Truck size={19} /></div>
            <div><strong>Ambulance tracking preview</strong><p>Simulated tracking</p></div>
            <span className="status-pill completed">Demo</span>
          </div>
        </div>

        <div className="content-card quick-card">
          <div className="card-heading">
            <div><h3>Quick Services</h3><p>Explore platform features</p></div>
            <ArrowUpRight size={22} />
          </div>
          <QuickLink icon={Hospital} title="Find hospitals" onClick={() => navigate("hospitals")} />
          <QuickLink icon={Truck} title="Track ambulance" onClick={() => navigate("tracking")} />
          <QuickLink icon={UserRound} title="Medical profile" onClick={() => navigate("profile")} />
          <QuickLink icon={BrainCircuit} title="AI assessment demo" onClick={() => navigate("ai")} />
        </div>
      </section>

      <div className="disclaimer">
        <ShieldCheck size={18} />
        <p>Student project prototype. All incidents, statistics and service availability shown here are illustrative demo data.</p>
      </div>
    </>
  );

  const renderReport = () => (
    <section className="page-section">
      <PageHeading title="Report an Emergency" subtitle="Enter incident information to create a demonstration report." />
      {notification && <div className="notice"><InfoIcon /><span>{notification}</span><button onClick={() => setNotification("")}><X size={17} /></button></div>}
      {reportSubmitted ? (
        <div className="content-card success-card">
          <CheckCircle2 size={48} />
          <h2>Demo report created!</h2>
          <p>Your report is stored only in this frontend session. No emergency service has been contacted.</p>
          <button className="primary-button" onClick={() => { setReportSubmitted(false); setDescription(""); setImageName(""); }}>
            Create another report
          </button>
        </div>
      ) : (
        <form className="content-card form-card" onSubmit={handleReport}>
          <div className="form-grid">
            <label>Incident type
              <select value={incidentType} onChange={(e) => setIncidentType(e.target.value)}>
                <option>Road Accident</option>
                <option>Fire Incident</option>
                <option>Other Incident</option>
              </select>
            </label>
            <label>Location
              <input required placeholder="Enter area or location" />
            </label>
            <label className="full-width">Incident description
              <textarea required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe what happened..." rows="5" />
            </label>
            <label className="upload-box full-width">
              <Upload size={25} />
              <strong>Attach an incident image (optional)</strong>
              <span>{imageName || "Choose an image from your device"}</span>
              <input type="file" accept="image/*" onChange={(e) => setImageName(e.target.files[0]?.name || "")} />
            </label>
          </div>
          <div className="form-footer">
            <p><InfoIcon /> Prototype only. Do not use this form to request real emergency assistance.</p>
            <button type="submit" className="primary-button"><Plus size={18} /> Create demo report</button>
          </div>
        </form>
      )}
    </section>
  );

  const renderHospitals = () => (
    <section className="page-section">
      <PageHeading title="Find Hospitals" subtitle="Explore the sample hospital directory." />
      <div className="search-box">
        <Search size={19} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search hospital name..." />
      </div>
      <div className="hospital-grid">
        {filteredHospitals.map((hospital) => (
          <div className="content-card hospital-card" key={hospital.name}>
            <div className="hospital-top"><div className="hospital-symbol"><Hospital size={27} /></div><span className="status-pill completed">{hospital.status}</span></div>
            <h3>{hospital.name}</h3>
            <p><MapPin size={16} /> {hospital.location}</p>
            <p><Navigation size={16} /> Approx. {hospital.distance}</p>
            <div className="facility-list">{hospital.facilities.map((facility) => <span key={facility}>{facility}</span>)}</div>
            <button className="outline-button" onClick={() => setNotification(`${hospital.name} is a sample directory entry. Availability has not been verified.`)}>View details <ChevronRight size={17} /></button>
          </div>
        ))}
        {filteredHospitals.length === 0 && <p>No matching hospitals found.</p>}
      </div>
      <div className="disclaimer"><InfoIcon /><p>Hospital names, distances and facilities are sample data, not verified real-time information.</p></div>
    </section>
  );

  const renderTracking = () => (
    <section className="page-section">
      <PageHeading title="Ambulance Tracking" subtitle="Preview the simulated ambulance tracking interface." />
      <div className="tracking-layout">
        <div className="content-card map-placeholder">
          <div className="map-grid"></div>
          <div className="map-pin"><MapPin size={35} /></div>
          <div className="map-label">DEMO MAP VIEW</div>
          <p>Live GPS tracking will be integrated later.</p>
        </div>
        <div className="content-card tracking-details">
          <span className="eyebrow">SAMPLE VEHICLE</span>
          <div className="vehicle-icon"><Truck size={32} /></div>
          <h2>Ambulance DEMO-01</h2>
          <span className="status-pill pending">Simulation only</span>
          <div className="detail-row"><span>Current status</span><strong>Standby</strong></div>
          <div className="detail-row"><span>Assigned location</span><strong>Demo location</strong></div>
          <div className="detail-row"><span>GPS connection</span><strong>Not connected</strong></div>
          <p className="small-note">No real ambulance is being tracked or dispatched.</p>
        </div>
      </div>
    </section>
  );

  const renderProfile = () => (
    <section className="page-section">
      <PageHeading title="Medical Profile" subtitle="Enter optional sample patient information for the prototype." />
      <form className="content-card form-card" onSubmit={(e) => { e.preventDefault(); setNotification("Demo medical profile saved in this browser session."); }}>
        <div className="profile-banner"><div className="profile-avatar"><HeartPulse size={30} /></div><div><h3>Patient Information</h3><p>Only enter fictional/sample details for this project demo.</p></div></div>
        <div className="form-grid">
          <label>Full name<input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} placeholder="Enter name" /></label>
          <label>Age<input type="number" min="1" max="120" value={profile.age} onChange={(e) => setProfile({...profile, age: e.target.value})} placeholder="Enter age" /></label>
          <label>Blood group<select value={profile.bloodGroup} onChange={(e) => setProfile({...profile, bloodGroup: e.target.value})}><option value="">Select blood group</option>{["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((v) => <option key={v}>{v}</option>)}</select></label>
          <label>Emergency contact<input value={profile.contact} onChange={(e) => setProfile({...profile, contact: e.target.value})} placeholder="Contact number" /></label>
          <label className="full-width">Known allergies / notes<textarea rows="4" value={profile.allergies} onChange={(e) => setProfile({...profile, allergies: e.target.value})} placeholder="Optional sample information" /></label>
        </div>
        <div className="form-footer"><span className="small-note">This prototype does not securely store medical records.</span><button className="primary-button" type="submit">Save demo profile</button></div>
      </form>
      {notification && <div className="notice"><CheckCircle2 /><span>{notification}</span><button onClick={() => setNotification("")}><X size={17} /></button></div>}
    </section>
  );

  const renderAI = () => (
    <section className="page-section">
      <PageHeading title="AI Incident Assessment" subtitle="Preview the planned AI-assisted incident description feature." />
      <div className="ai-layout">
        <div className="content-card form-card">
          <div className="ai-heading"><div className="ai-symbol"><BrainCircuit size={30} /></div><div><h3>Incident analysis demo</h3><p>Enter a description to generate a sample summary.</p></div></div>
          <label>Incident category
            <select value={incidentType} onChange={(e) => setIncidentType(e.target.value)}>
              <option>Road Accident</option><option>Fire Incident</option><option>Other Incident</option>
            </select>
          </label>
          <label className="description-label">Incident description
            <textarea rows="6" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter a short description of the incident..." />
          </label>
          <button className="primary-button" onClick={handleAssessment}><BrainCircuit size={18} /> Generate demo summary</button>
          {assessment && <div className="assessment-result"><strong>Demo output</strong><p>{assessment}</p></div>}
        </div>
        <div className="content-card ai-info">
          <ShieldCheck size={35} />
          <h3>AI-assisted support</h3>
          <p>The planned AI module may help organize incident descriptions and produce summaries for review.</p>
          <div className="disclaimer"><AlertTriangle size={18} /><p>AI output is not a medical diagnosis, emergency triage decision or substitute for professional help.</p></div>
        </div>
      </div>
    </section>
  );

  const renderPage = () => {
    switch (activePage) {
      case "report": return renderReport();
      case "hospitals": return renderHospitals();
      case "tracking": return renderTracking();
      case "profile": return renderProfile();
      case "ai": return renderAI();
      default: return renderDashboard();
    }
  };
  if (showAuth) {
  return (
    <Auth
      onBack={() => setShowAuth(false)}
      onLogin={(user) => {
        setCurrentUser(user);
        setShowAuth(false);
        setActivePage("dashboard");
      }}
    />
  );
}

// Existing retur
  
  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><Siren size={25} /></div>
          <div><h2>SMART<span>RESCUE</span></h2><p>EMERGENCY RESPONSE</p></div>
          <button className="close-menu" onClick={() => setMobileMenu(false)}><X /></button>
        </div>

        <div className="sidebar-label">WORKSPACE</div>
        <nav className="side-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} className={`nav-item ${activePage === item.id ? "active" : ""}`} onClick={() => navigate(item.id)}>
                <Icon size={19} /><span>{item.label}</span>
                {activePage === item.id && <span className="active-mark"></span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="backend-card">
            <div className="backend-heading"><span className={`backend-dot ${serverStatus === "Offline" ? "offline-dot" : ""}`}></span> Backend status</div>
            <strong>{serverStatus}</strong>
            <small>API connection</small>
          </div>
          <div className="project-label"><ShieldCheck size={17} /><span>Student Project Prototype</span></div>
        </div>
      </aside>

      {mobileMenu && <div className="mobile-overlay" onClick={() => setMobileMenu(false)}></div>}

      <div className="main-area">
        <header className="topbar">
          <button className="mobile-menu-button" onClick={() => setMobileMenu(true)}><Menu /></button>
          <div className="breadcrumb">SmartRescue <ChevronRight size={15} /> <strong>{pageTitle}</strong></div>
          <div className="topbar-right">
            <span className="system-indicator"><span className={`backend-dot ${serverStatus === "Offline" ? "offline-dot" : ""}`}></span>{serverStatus}</span>
            <button className="notification-button" onClick={() => setNotification("You are viewing the prototype notification area.")}><Bell size={19} /></button>
        <button
  className="user-avatar"
  onClick={() => setShowAuth(true)}
  title="Login or register"
>
  {currentUser ? currentUser.name.charAt(0).toUpperCase() : "U"}
</button>
          </div>
        </header>

        <main className="page-content">
          {renderPage()}
          <footer className="page-footer">© 2026 SmartRescue AI · Academic project prototype · SDG 3: Good Health and Well-being</footer>
        </main>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, note, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}><Icon size={22} /></div>
      <div><p>{label}</p><h2>{value}</h2><span>{note}</span></div>
    </div>
  );
}

function QuickLink({ icon: Icon, title, onClick }) {
  return <button className="quick-link" onClick={onClick}><span><Icon size={19} /></span><strong>{title}</strong><ChevronRight size={17} /></button>;
}

function PageHeading({ title, subtitle }) {
  return <div className="page-heading"><span className="eyebrow">SMARTRESCUE PLATFORM</span><h1>{title}</h1><p>{subtitle}</p></div>;
}

function InfoIcon() {
  return <ShieldCheck size={19} />;
}

export default App;
