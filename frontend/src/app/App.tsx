import { Activity, Box, GitBranch, Layers3, Play, Server } from "lucide-react";

const nav = [
  { label: "Dashboard", icon: Activity },
  { label: "Assets", icon: Layers3 },
  { label: "Resources", icon: Server },
  { label: "Workflows", icon: Play },
];

const stats = [
  ["Tenants", "24"],
  ["Deployments", "118"],
  ["Road Repos", "96"],
  ["Running workflows", "4"],
];

export function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">IC</div>
          <div>
            <strong>Infra Control Plane</strong>
            <span>Platform Operations</span>
          </div>
        </div>

        <nav>
          {nav.map(({ label, icon: Icon }, index) => (
            <button className={index === 0 ? "nav-item active" : "nav-item"} key={label}>
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="connection">
            <span className="status-dot" />
            Systems operational
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Control plane</p>
            <h1>Good morning</h1>
          </div>
          <button className="primary-button">
            <Play size={16} />
            New workflow
          </button>
        </header>

        <section className="stats-grid">
          {stats.map(([label, value]) => (
            <div className="stat-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </section>

        <section className="content-grid">
          <div className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Activity</p>
                <h2>Workflow executions</h2>
              </div>
              <button className="ghost-button">View all</button>
            </div>

            <div className="execution-list">
              {[
                ["Road repository onboarding", "ecs-deployment-teller-mws-uk", "Running", "2m 14s"],
                ["CodePipeline runner", "ecs-deployment-teller-mws-uk", "Succeeded", "8m 32s"],
                ["Resource discovery", "AWS / eu-west-2", "Succeeded", "4m 08s"],
              ].map(([title, target, status, duration]) => (
                <div className="execution" key={`${title}-${target}`}>
                  <div className="execution-icon"><GitBranch size={16} /></div>
                  <div className="execution-main">
                    <strong>{title}</strong>
                    <span>{target}</span>
                  </div>
                  <span className={`status ${status.toLowerCase()}`}>{status}</span>
                  <span className="duration">{duration}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Assets</p>
                <h2>Recent deployments</h2>
              </div>
            </div>
            <div className="deployment-list">
              {[
                ["teller", "mws-uk", "AWS", "eu-west-2"],
                ["infra-deployment", "mws-uk", "AWS", "eu-west-2"],
                ["service-a", "mws-uk", "AWS", "eu-west-2"],
              ].map(([component, instance, provider, region]) => (
                <div className="deployment" key={`${component}-${instance}`}>
                  <div>
                    <strong>{component}</strong>
                    <span>{instance}</span>
                  </div>
                  <div className="deployment-target">
                    <Box size={14} />
                    {provider} · {region}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
