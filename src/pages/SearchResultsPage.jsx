// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../components/common/SearchBar';
import { ProductCard } from '../components/product/ProductCard';
import { ProductMap } from '../components/maps/ProductMap';
import { searchProductsAndVendors } from '../utils/mockData';
import { List, Map, Filter, Loader2, TrendingUp, Search } from 'lucide-react';
import { formatPrice } from '../utils/currency';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' or 'map'

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'All';
  const brand = searchParams.get('brand') || 'All';

  useEffect(() => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const mockSearchResults = searchProductsAndVendors(query, category, brand);
      setResults(mockSearchResults);
      setLoading(false);
    }, 500);
  }, [query, category, brand]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-primary text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-center">
              Search Results
            </h1>
            <div className="max-w-4xl mx-auto">
              <SearchBar initialQuery={query} initialCategory={category} initialBrand={brand} />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Results Summary */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-6"
          >
            <div className="flex items-center gap-4">
              <p className="text-gray-700 dark:text-gray-300">
                Found <span className="font-bold text-fypBlue">{results.length}</span> result{results.length !== 1 ? 's' : ''}
              </p>
              {query && (
                <span className="px-3 py-1 rounded-full bg-fypBlue/10 text-fypBlue text-sm font-medium">
                  "{query}"
                </span>
              )}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg border-2 border-gray-200 dark:border-gray-700">
              <Button
                variant={view === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('list')}
                className={view === 'list' ? 'bg-gradient-primary text-white' : ''}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
              <Button
                variant={view === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('map')}
                className={view === 'map' ? 'bg-gradient-primary text-white' : ''}
              >
                <Map className="h-4 w-4 mr-2" />
                Map
              </Button>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-fypBlue mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Searching for products...</p>
          </div>
        ) : results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Card className="max-w-md mx-auto p-8 dark:bg-gray-800">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button variant="fypPrimary" onClick={() => window.history.back()}>
                  Go Back
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {view === 'list' ? (
              <motion.div
                key="list"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {results.map((result, index) => (
                  <ProductCard
                    key={`${result.product.id}-${result.vendor.id}-${index}`}
                    product={result.product}
                    vendor={result.vendor}
                    price={result.price}
                    stock={result.stock}
                    stockCount={result.stockCount}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[600px] w-full rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-lg"
              >
                <ProductMap searchResults={results} />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Quick Stats */}
        {!loading && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <Card className="p-6 dark:bg-gray-800">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Results</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{results.length}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-fypBlue" />
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 dark:bg-gray-800">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Vendors</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {new Set(results.map(r => r.vendor.id)).size}
                    </p>
                  </div>
                  <Map className="h-8 w-8 text-fypGreen" />
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 dark:bg-gray-800">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Price Range</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(Math.min(...results.map(r => r.price)))} - {formatPrice(Math.max(...results.map(r => r.price)))}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-fypGreen" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
