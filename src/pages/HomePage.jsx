// src/pages/HomePage.jsx - Enhanced Professional Homepage
import React from 'react';
import { SearchBar } from '../components/common/SearchBar';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, TrendingUp, Store, Star, ArrowRight, Sparkles, ShoppingBag, Shield, Truck, Headphones } from 'lucide-react';
import { mockCategories, mockVendors } from '../utils/mockData';

const HomePage = () => {
  const featuredVendors = mockVendors.filter(v => v.featured).slice(0, 3);
  const popularCategories = mockCategories.filter(c => c !== 'All').slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section with Enhanced Gradient */}
      <section className="relative overflow-hidden bg-gradient-primary text-white py-20 md:py-32">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Discover Local Products</span>
      </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-poppins font-extrabold mb-6 leading-tight">
              Find Your Product,{' '}
              <span className="text-yellow-300 drop-shadow-lg">Locally.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover products from nearby vendors, compare prices, and get directions to your favorite local stores. Support local businesses in your community.
            </p>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full max-w-3xl mx-auto"
      >
        <SearchBar />
      </motion.div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="text-gradient-primary bg-clip-text text-transparent">FYP</span>?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Your one-stop platform for discovering local products and supporting neighborhood businesses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: MapPin, title: 'Nearby Vendors', desc: 'Find products from vendors in your neighborhood', color: 'text-fypBlue' },
              { icon: TrendingUp, title: 'Price Comparison', desc: 'Compare prices across multiple vendors instantly', color: 'text-fypGreen' },
              { icon: Store, title: 'Support Local', desc: 'Help local businesses thrive in your community', color: 'text-purple-500' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all border-2 hover:border-fypBlue/50 dark:bg-gray-800 group">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`h-8 w-8 text-white`} />
                    </div>
                    <h3 className="text-xl font-poppins font-semibold mb-2 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-8"
          >
            <h2 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white">
              Popular Categories
            </h2>
            <Link to="/search">
              <Button variant="ghost" className="text-fypBlue">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCategories.map((category, idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to={`/search?category=${category}`}>
                  <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-2 hover:border-fypBlue dark:bg-gray-800 group">
                    <CardContent className="p-4 text-center">
                      <p className="font-semibold text-gray-900 dark:text-white group-hover:text-fypBlue transition-colors">
                        {category}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      {featuredVendors.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-between items-center mb-8"
            >
              <h2 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white">
                Featured Vendors
              </h2>
              <Link to="/search">
                <Button variant="ghost" className="text-fypBlue">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredVendors.map((vendor, idx) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Link to={`/vendor/${vendor.id}`}>
                    <Card className="h-full hover:shadow-xl transition-all hover:scale-105 cursor-pointer overflow-hidden border-2 hover:border-fypBlue dark:bg-gray-800">
                      <div className="relative h-48 bg-gradient-primary">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute top-4 right-4">
                          {vendor.isVerified && (
                            <span className="bg-fypGreen text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                              <Shield className="h-3 w-3 fill-current" />
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-poppins font-bold mb-2 text-gray-900 dark:text-white">
                          {vendor.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{vendor.distance} km away</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(vendor.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            ({vendor.rating}) • {vendor.reviewCount} reviews
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {vendor.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Delivery', desc: 'On orders above ₹500' },
              { icon: Shield, title: 'Secure Payment', desc: '100% secure' },
              { icon: Headphones, title: '24/7 Support', desc: 'Always here' },
              { icon: ShoppingBag, title: 'Easy Returns', desc: '7-day policy' },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mb-3">
                  <badge.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{badge.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-poppins font-bold mb-4">
              Ready to Start Selling?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our community of local vendors and reach more customers in your area
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-white text-fypBlue hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg"
                >
            Become a Vendor
          </Button>
        </Link>
              <Link to="/search">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
                >
                  Explore Products
          </Button>
        </Link>
            </div>
      </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
