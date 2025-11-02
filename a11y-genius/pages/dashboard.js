import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useAuth();
  const [url, setUrl] = useState('');
  const [siteName, setSiteName] = useState('');
  const [scanning, setScanning] = useState(false);
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentScans();
  }, []);

  const fetchRecentScans = async () => {
    try {
      const response = await axios.get('/api/reports?limit=5');
      setRecentScans(response.data.scans);
    } catch (error) {
      console.error('Error fetching scans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) return;

    setScanning(true);
    
    try {
      const response = await axios.post('/api/scan', { url, siteName });
      const { scanId } = response.data;
      
      toast.success('Scan started! Redirecting to results...');
      
      // Redirect to scan results page
      setTimeout(() => {
        window.location.href = `/scan/${scanId}`;
      }, 1000);
      
    } catch (error) {
      toast.error(error.response?.data?.error || 'Scan failed');
      setScanning(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 75) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Scan your websites for accessibility issues and get AI-powered fix suggestions.
          </p>
        </div>

        {/* Scan Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start New Scan</h2>
          <form onSubmit={handleScan}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL *
                </label>
                <input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name (Optional)
                </label>
                <input
                  id="siteName"
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="My Website"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={scanning}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {scanning ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Scanning...
                </span>
              ) : (
                'Scan Now'
              )}
            </button>
          </form>
          
          {user?.subscriptionTier === 'free' && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                🚀 Free Plan: 5 scans per day. 
                <Link href="/pricing" className="font-semibold underline ml-1">
                  Upgrade to Pro
                </Link> for unlimited scans!
              </p>
            </div>
          )}
        </div>

        {/* Recent Scans */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Scans</h2>
            <Link href="/history" className="text-blue-600 hover:text-blue-700 font-semibold">
              View All
            </Link>
          </div>
          
          {recentScans.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No scans yet</h3>
              <p className="text-gray-600">Start your first accessibility scan above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentScans.map((scan) => (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 mb-4 md:mb-0">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {scan.siteName || 'Unnamed Site'}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{scan.url}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>
                          {new Date(scan.createdAt).toLocaleDateString()}
                        </span>
                        {scan.totalIssues > 0 && (
                          <span className="text-red-600">{scan.totalIssues} issues found</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {scan.status === 'completed' && scan.score !== null && (
                        <div className={`px-4 py-2 rounded-lg ${getScoreBg(scan.score)}`}>
                          <span className={`font-bold ${getScoreColor(scan.score)}`}>{scan.score}%</span>
                        </div>
                      )}
                      
                      <div>
                        {scan.status === 'completed' ? (
                          <Link href={`/scan/${scan.id}`}>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              View Report
                            </button>
                          </Link>
                        ) : scan.status === 'scanning' ? (
                          <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg">Scanning...</span>
                        ) : (
                          <span className="px-4 py-2 bg-red-100 text-red-800 rounded-lg">Failed</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
