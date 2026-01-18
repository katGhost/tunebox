'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { token, logout } = useAuth();

  const isAuthPage = pathname.startsWith('/auth');

  return (
    <>
      {isAuthPage && (
        <nav className="mx-auto px-4 py-4 lg:px-8 border-b dark:border-zinc-900 w-full space-x-8">
          {token ? (
            <>
              {/* Nabar-like */}
              {/* <Link className="flex items-center text-lg font-semibold" href="/dashboard"><span className="text-white">Tune</span><span className="text-emerald-500">box</span></Link> */}
              <button className="flex-end" onClick={logout}>Logout</button>
              
            </>
          ) : (
            <>
              <div className="flex h-8 items-center justify-between">
                <div>
                  <Link className="flex items-center text-lg font-semibold" href="/dashboard">
                  <span className="text-white">Tune</span>
                    <span className="text-emerald-500">box</span>
                  </Link>
                </div>
                
                <div className="flex space-x-6 text-sm font-medium" >
                  <Link className="text-md font-medium text-zinc-700 hover:text-emerald-500 dark:text-gray-300 dark:hover:text-emerald-400" href="/auth/login">Login</Link>
                  <Link className="text-md font-medium text-zinc-700 hover:text-emerald-500 dark:text-gray-300 dark:hover:text-emerald-400" href="/auth/signup">Signup</Link>
                </div>
              </div>
              
              
            </>
          )}
        </nav>
      )}

      {children}
    </>
  );
}
