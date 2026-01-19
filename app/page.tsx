import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-blue-50">
      {/* Hero Background Illustration */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-background.png"
          alt="EventOS Event Management Background"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        {/* Overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
      </div>

      {/* Central Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/85 backdrop-blur-xl border border-white/40 p-8 md:p-12 rounded-3xl shadow-2xl text-center space-y-8 transform transition-all hover:scale-[1.01] duration-500">
          
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

          <p className="text-slate-500 leading-relaxed">
            The all-in-one platform to plan, organize, and execute unforgettable events with analytics-driven insights.
          </p>

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
              Register
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
