import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-blue-50">

      
      {/* Hero Background Illustration */}
      <div className="fixed inset-0 w-screen h-screen z-0">
        <Image
          src="/hero-background.png"
          alt="EventOS Event Management Background"
          fill
          className="object-cover object-center w-full h-full"
          priority
          quality={100}
        />
        {/* Overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
      </div>


      {/* Central Card */}
      <div className="relative z-10 w-full max-w-4xl mx-4 mt-5">
        <div className="bg-white/85 backdrop-blur-xl border border-white/40 p-7 md:p-12 rounded-3xl shadow-2xl text-center space-y-8 transform transition-all hover:scale-[1.01] duration-500">

          
          {/* Logo & Branding */}
          <div className="space-y-2">
            <h1 className="text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text text-transparent">
                EventOS
              </span>
            </h1>
            <p className="text-slate-600 text-lg font-medium">
              Seamless Event Management
            </p>
          </div>

          <p className="text-slate-500 leading-relaxed text-lg max-w-2xl mx-auto">
            The all-in-one platform to plan, organize, and execute unforgettable events with analytics-driven insights.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800">Smart Planning</h3>
              <p className="text-sm text-slate-600">Create and manage events with intuitive scheduling tools</p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800">Real-Time Analytics</h3>
              <p className="text-sm text-slate-600">Track attendance, engagement, and performance metrics</p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800">Team Collaboration</h3>
              <p className="text-sm text-slate-600">Coordinate with your team in real-time effortlessly</p>
            </div>
          </div>

    
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/auth/login"
              className="px-8 py-3 rounded-full border-2 border-blue-600 text-blue-700 font-bold hover:bg-blue-50 transition-colors duration-300 focus:ring-4 focus:ring-blue-200"
            >
              Log In
            </Link>
            <Link
              href="/auth/register"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 focus:ring-4 focus:ring-blue-300"
            >
              Get Started Free
            </Link>
          </div>
        </div>
        
        {/* Footer/Copyright hint */}
        <div className="mt-8 text-center">
            <p className="text-white/80 text-sm font-medium drop-shadow-md">
                © {new Date().getFullYear()} EventOS Inc.
            </p>
        </div>
      </div>
    </main>
  );
}
