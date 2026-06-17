import useAuth from '../hooks/useAuth';
import { 
  LogOut, User, Award, BookOpen, Activity, 
  CheckCircle, Database, ShieldAlert, Cpu, 
  Layers, Users, Star, BrainCircuit 
} from 'lucide-react';

export const Dashboard = () => {
  const { user, logout } = useAuth();

  // Mock statistics for UI presentation
  const learnerStats = {
    activeCourses: 3,
    completedSims: 8,
    certificationsEarned: 2,
    completionRate: 78
  };

  const facultyStats = {
    totalBatches: 4,
    enrolledStudents: 124,
    pendingGrades: 12,
    averageOsceScore: 84.5
  };

  const adminStats = {
    activeUsers: 254,
    dbConnection: 'Healthy',
    redisCacheStatus: 'Active',
    minioAssetsCount: 1420
  };

  return (
    <div className="min-h-screen bg-[#091216] text-white font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-medical-800/20 bg-[#0c181f]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center">
            <Activity size={20} className="text-[#091216]" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none tracking-tight">PulseMed</h1>
            <span className="text-[10px] text-cyan-400 font-mono tracking-wider font-semibold uppercase">Clinical Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-cyan-950 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
              <User size={16} />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold leading-tight">{user?.first_name} {user?.last_name}</p>
              <span className="text-[10px] text-slate-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded leading-none">
                {user?.role}
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg text-slate-400 transition-all cursor-pointer"
            title="Log Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-8 animate-fade-in">
        
        {/* Welcome Section */}
        <section className="glass-panel border-l-4 border-l-cyan-400 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {user?.first_name}!</h2>
            <p className="text-slate-400 text-sm mt-1">
              PulseMed database connections, authentication layers, and object storage systems are online.
            </p>
          </div>
          <div className="text-xs bg-slate-900 border border-medical-800/20 px-3.5 py-2 rounded-xl text-slate-400 font-mono">
            Node status: <span className="text-green-400 font-semibold">ONLINE</span>
          </div>
        </section>

        {/* 1. LEARNER VIEW */}
        {user?.role === 'LEARNER' && (
          <div className="space-y-8">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card rounded-2xl p-5 border border-medical-800/10">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Active Courses</span>
                  <BookOpen size={20} className="text-cyan-400" />
                </div>
                <p className="text-3xl font-bold mt-2">{learnerStats.activeCourses}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">2 pending assessment tasks</span>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-medical-800/10">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Simulations Run</span>
                  <Activity size={20} className="text-teal-400" />
                </div>
                <p className="text-3xl font-bold mt-2">{learnerStats.completedSims}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">VR Telemetry synced to MinIO</span>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-medical-800/10">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Certifications</span>
                  <Award size={20} className="text-yellow-400" />
                </div>
                <p className="text-3xl font-bold mt-2">{learnerStats.certificationsEarned}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">Signed PDF credentials secure</span>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-medical-800/10">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Completion Rate</span>
                  <CheckCircle size={20} className="text-emerald-400" />
                </div>
                <p className="text-3xl font-bold mt-2">{learnerStats.completionRate}%</p>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${learnerStats.completionRate}%` }}></div>
                </div>
              </div>
            </div>

            {/* Courses & Sims Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass-panel rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold">Enrolled Training Modules</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-[#12222b] rounded-xl border border-medical-800/10 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-sm">Advanced Cardiac Life Support (ACLS)</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Specialty: Cardiology • Batch: Spring 2026</p>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/20 px-2 py-1 rounded">
                      In Progress
                    </span>
                  </div>
                  <div className="p-4 bg-[#12222b] rounded-xl border border-medical-800/10 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-sm">Pediatric Intubation OSCE prep</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Specialty: Pediatrics • Batch: Summer A</p>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/20 px-2 py-1 rounded">
                      In Progress
                    </span>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold">Active AI Clinician VR Scenarios</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-[#12222b] rounded-xl flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                      <BrainCircuit size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold">Polytrauma Triage VR</h4>
                      <p className="text-[10px] text-slate-400">Difficulty: Expert</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#12222b] rounded-xl flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                      <BrainCircuit size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold">Septic Shock Telemetry</h4>
                      <p className="text-[10px] text-slate-400">Difficulty: Intermediate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. FACULTY VIEW */}
        {user?.role === 'FACULTY' && (
          <div className="space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card rounded-2xl p-5 border border-medical-800/10">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Active Batches</span>
                  <Layers size={20} className="text-cyan-400" />
                </div>
                <p className="text-3xl font-bold mt-2">{facultyStats.totalBatches}</p>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-medical-800/10">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Students Enrolled</span>
                  <Users size={20} className="text-teal-400" />
                </div>
                <p className="text-3xl font-bold mt-2">{facultyStats.enrolledStudents}</p>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-medical-800/10">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Pending OSCE Grading</span>
                  <Star size={20} className="text-yellow-400" />
                </div>
                <p className="text-3xl font-bold mt-2 text-yellow-400">{facultyStats.pendingGrades}</p>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-medical-800/10">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">OSCE Pass Rating</span>
                  <Activity size={20} className="text-emerald-400" />
                </div>
                <p className="text-3xl font-bold mt-2">{facultyStats.averageOsceScore}%</p>
              </div>
            </div>

            {/* Faculty Grading Table */}
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">OSCE Assessment Queue</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-medical-800/20 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      <th className="py-3">Student Name</th>
                      <th className="py-3">Course / Assessment</th>
                      <th className="py-3">Date Submitted</th>
                      <th className="py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-medical-800/10 text-sm">
                    <tr>
                      <td className="py-4">John Doe</td>
                      <td className="py-4">Pediatric Intubation OSCE Prep</td>
                      <td className="py-4 text-slate-400">2026-06-17</td>
                      <td className="py-4">
                        <button className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-xs font-semibold transition-all">
                          Grade Assessment
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4">Jane Smith</td>
                      <td className="py-4">ACLS Practical - Defibrillation</td>
                      <td className="py-4 text-slate-400">2026-06-16</td>
                      <td className="py-4">
                        <button className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-xs font-semibold transition-all">
                          Grade Assessment
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. ADMIN VIEW */}
        {user?.role === 'ADMIN' && (
          <div className="space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card rounded-2xl p-5 border border-medical-800/10">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Active Users</span>
                  <Users size={20} className="text-cyan-400" />
                </div>
                <p className="text-3xl font-bold mt-2">{adminStats.activeUsers}</p>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-medical-800/10">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Database Status</span>
                  <Database size={20} className="text-teal-400" />
                </div>
                <p className="text-3xl font-bold mt-2 text-emerald-400">{adminStats.dbConnection}</p>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-medical-800/10">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">Redis Cache status</span>
                  <Cpu size={20} className="text-cyan-400" />
                </div>
                <p className="text-3xl font-bold mt-2 text-emerald-400">{adminStats.redisCacheStatus}</p>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-medical-800/10">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">MinIO Storage Assets</span>
                  <Layers size={20} className="text-yellow-400" />
                </div>
                <p className="text-3xl font-bold mt-2">{adminStats.minioAssetsCount}</p>
              </div>
            </div>

            {/* Server Settings and Role Guards Checks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold">Engine & Connection Diagnostics</h3>
                <div className="space-y-3 font-mono text-xs text-slate-400">
                  <div className="flex justify-between border-b border-medical-800/10 pb-2">
                    <span>Engine Connection:</span>
                    <span className="text-white font-semibold">Postgres + Asyncpg</span>
                  </div>
                  <div className="flex justify-between border-b border-medical-800/10 pb-2">
                    <span>Extension Registered:</span>
                    <span className="text-cyan-400">pgvector (1536 dim)</span>
                  </div>
                  <div className="flex justify-between border-b border-medical-800/10 pb-2">
                    <span>Alembic Metadata:</span>
                    <span className="text-white">Autodetect ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Object Storage Bucket:</span>
                    <span className="text-white">medical-assets (S3 client online)</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
                    <ShieldAlert size={18} />
                    <span>Security & Access Audits</span>
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    Access token validations and role-based route guard structures are loaded. Any session requests without valid signatures will fail with 401 Unauthorized status.
                  </p>
                </div>
                <div className="pt-4 flex gap-3">
                  <button className="flex-1 py-2 bg-slate-900 border border-medical-800/20 rounded-lg text-xs font-semibold transition-all hover:bg-slate-800">
                    Audit Logs
                  </button>
                  <button className="flex-1 py-2 bg-red-950/40 border border-red-500/20 text-red-200 rounded-lg text-xs font-semibold transition-all hover:bg-red-950/60">
                    Revoke Sessions
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default Dashboard;
