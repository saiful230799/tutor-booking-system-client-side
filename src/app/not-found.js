import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-center px-6 py-20 space-y-6">
      
      <h1 className="text-[10rem] md:text-[14rem] font-black text-primary leading-none tracking-tighter drop-shadow-2xl">
        404
      </h1>
      
      <div className="space-y-4">
        <div className="bg-secondary px-8 py-2 text-2xl uppercase tracking-widest rounded-full text-white font-black shadow-2xl inline-block">
          Page Not Found
        </div>
        
        <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-lg">
          Oops! The page you are looking for has vanished into thin air.
        </p>
      </div>
      
      <Link href="/" className="inline-block mt-8">
        <button className="btn btn-primary btn-lg px-12 py-4 text-xl font-bold shadow-xl hover:scale-105 transition-transform duration-300">
          Go Back
        </button>
      </Link>
    </div>
  );
}