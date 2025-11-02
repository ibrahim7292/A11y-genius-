import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function Home() {
  const [demoUrl, setDemoUrl] = useState('');

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (demoUrl) {
      window.open(`/signup?demo=${encodeURIComponent(demoUrl)}`, '_blank');
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Make Your Website
              <span className="text-blue-600"> Accessible</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              AI-powered accessibility scanner that detects WCAG issues and provides 
              instant fix suggestions. Ensure your website is accessible to everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Free Scan
                </motion.button>
              </Link>
              
              <Link href="/pricing">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  View Pricing
                </motion.button>
              </Link>
            </div>

            {/* Demo Form */}
            <form onSubmit={handleDemoSubmit} className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="Enter website URL for demo"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
                  Try Demo
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Accessibility
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive accessibility testing with AI-powered insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Analysis',
                description: 'Advanced AI analyzes your website and provides intelligent fix suggestions for every accessibility issue found.'
              },
              {
                icon: '⚡',
                title: 'Instant Scanning',
                description: 'Get comprehensive accessibility reports in seconds. No waiting, no complicated setup required.'
              },
              {
                icon: '📊',
                title: 'Detailed Reports',
                description: 'Download professional PDF reports with compliance scores, issue breakdowns, and fix priorities.'
              },
              {
                icon: '🔧',
                title: 'One-Click Fixes',
                description: 'Apply suggested fixes directly to your website with our automated fix implementation system.'
              },
              {
                icon: '📈',
                title: 'Track Progress',
                description: 'Monitor your accessibility improvements over time with detailed scan history and trend analysis.'
              },
              {
                icon: '✅',
                title: 'WCAG Compliance',
                description: 'Ensure your website meets WCAG 2.1 AA standards and ADA compliance requirements.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get accessibility insights in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Enter Your URL',
                description: 'Simply paste your website URL and click "Scan Now" to begin the accessibility analysis.'
              },
              {
                step: '2',
                title: 'AI Analysis',
                description: 'Our AI scans your website for accessibility issues and generates detailed fix suggestions.'
              },
              {
                step: '3',
                title: 'Get Results',
                description: 'Receive your compliance score, issue list, and downloadable PDF report with action items.'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Make Your Website Accessible?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of developers and businesses ensuring their websites are accessible to everyone.
            </p>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Your Free Scan
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
