const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  matcher: ['/auth/login', '/auth/signup', '/dashboard/:path*'],
};


export default config;
