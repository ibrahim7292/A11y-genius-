import '../styles/globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>A11y Genius - AI-Powered Accessibility Scanner</title>
        <meta name="description" content="AI-powered accessibility scanner for WCAG compliance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph */}
        <meta property="og:title" content="A11y Genius - AI-Powered Accessibility Scanner" />
        <meta property="og:description" content="Make your website accessible to everyone" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://a11ygenius.com" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="A11y Genius" />
        <meta name="twitter:description" content="AI-powered accessibility scanner" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </AuthProvider>
    </>
  );
}

export default MyApp;
