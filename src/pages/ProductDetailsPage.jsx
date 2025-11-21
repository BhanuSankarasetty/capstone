// src/pages/ProductDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tag, MapPin, ExternalLink, Phone, Mail, CheckCircle2, XCircle, Loader2, Star, TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { getProductById, getVendorsForProduct } from '../utils/mockData';
import { ProductMap } from '../components/maps/ProductMap';
import { formatPrice } from '../utils/currency';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [productDetails, setProductDetails] = useState(location.state?.product || null);
  const [sellingVendors, setSellingVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const foundProduct = getProductById(productId);
    
    if (foundProduct) {
      setProductDetails(foundProduct);
      const vendors = getVendorsForProduct(productId);
      setSellingVendors(vendors);
    } else {
      setProductDetails(null);
    }
    setLoading(false);
  }, [productId, location.state]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-8">
        <Loader2 className="h-10 w-10 animate-spin text-fypBlue" />
        <span className="ml-3 text-lg text-gray-700 dark:text-gray-300">Loading product details...</span>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center p-8 text-center">
        <XCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white">Product Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">The product you are looking for does not exist or has been removed.</p>
        <Link to="/" className="mt-6">
          <Button variant="fypPrimary">Go to Homepage</Button>
        </Link>
      </div>
    );
  }

  // Sort vendors by price for comparison
  const sortedVendors = [...sellingVendors].sort((a, b) => a.productPrice - b.productPrice);
  const lowestPrice = sortedVendors[0]?.productPrice;
  const highestPrice = sortedVendors[sortedVendors.length - 1]?.productPrice;

  // Map markers for all selling vendors
  const mapResults = sellingVendors.map(vendor => ({
    product: productDetails,
    vendor: {
      id: vendor.id,
      name: vendor.name,
      address: vendor.address,
      latitude: vendor.latitude,
      longitude: vendor.longitude,
      distance: vendor.distance,
    },
    price: vendor.productPrice,
    stock: vendor.productStock,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Back Button */}
        <Link to="/search">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image and Basic Info */}
          <Card className="p-6 dark:bg-gray-800 shadow-xl border-2 hover:border-fypBlue/50 transition-colors">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative w-full h-96 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                <img
                  src={productDetails.imageUrl || 'https://via.placeholder.com/600x400?text=Product+Image'}
                  alt={productDetails.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <CardTitle className="text-4xl font-poppins font-bold text-gradient-primary bg-clip-text text-transparent mb-4">
              {productDetails.name}
            </CardTitle>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">Brand:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{productDetails.brand}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-fypBlue" />
                <span className="text-gray-600 dark:text-gray-400">Category:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{productDetails.category}</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Description</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {productDetails.description}
              </p>
            </div>

            {productDetails.tags && productDetails.tags.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {productDetails.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-fypBlue/10 text-fypBlue text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Vendors Selling This Product & Price Comparison */}
          <Card className="p-6 dark:bg-gray-800 shadow-xl border-2">
            <CardTitle className="text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-6">
              Available Vendors
            </CardTitle>
            
            {sellingVendors.length > 0 ? (
              <>
                {/* Price Range Info */}
                <div className="mb-6 p-4 rounded-lg bg-gradient-primary text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Price Range</p>
                      <p className="text-2xl font-bold">
                        {formatPrice(lowestPrice)} - {formatPrice(highestPrice)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-90">Best Price</p>
                      <p className="text-2xl font-bold">{formatPrice(lowestPrice)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {sortedVendors.map((vendor, idx) => {
                    const isLowestPrice = vendor.productPrice === lowestPrice;
                    return (
                      <motion.div
                        key={vendor.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Card className={`p-4 border-2 transition-all ${
                          isLowestPrice 
                            ? 'border-fypGreen bg-fypGreen/5' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-fypBlue/50'
                        } dark:bg-gray-700/50`}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <Link to={`/vendor/${vendor.id}`}>
                                <h4 className="text-lg font-semibold text-fypBlue hover:underline mb-1">
                                  {vendor.name}
                                </h4>
                              </Link>
                              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{vendor.distance} km</span>
                                </div>
                                {vendor.rating && (
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                    <span>{vendor.rating}</span>
                                  </div>
                                )}
                                {vendor.isVerified && (
                                  <span className="px-2 py-0.5 rounded-full bg-fypGreen/10 text-fypGreen text-xs font-medium">
                                    Verified
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                {isLowestPrice && (
                                  <span className="px-2 py-1 rounded-md bg-fypGreen text-white text-xs font-bold">
                                    Best Price
                                  </span>
                                )}
                                <span className="text-2xl font-bold text-fypBlue">
                                  {formatPrice(vendor.productPrice)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                              vendor.productStock === 'Available' 
                                ? 'bg-fypGreen/10 text-fypGreen border-fypGreen/20' 
                                : vendor.productStock === 'Low'
                                ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                                : 'bg-red-500/10 text-red-500 border-red-500/20'
                            }`}>
                              {vendor.productStock}
                            </span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/vendor/${vendor.id}`}>
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  Visit Shop
                                </Link>
                              </Button>
                              <Button variant="fypPrimary" size="sm" asChild>
                                <a
                                  href={`https://www.google.com/maps/dir/?api=1&destination=${vendor.latitude},${vendor.longitude}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <MapPin className="h-4 w-4 mr-1" />
                                  Directions
                                </a>
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                No vendors currently selling this product.
              </p>
            )}
          </Card>
        </div>

        {/* Map View of all Vendors for this product */}
        {sellingVendors.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8"
          >
            <Card className="p-6 dark:bg-gray-800 shadow-xl border-2">
              <CardTitle className="text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-6">
                Vendors on Map
              </CardTitle>
              <div className="h-[500px] rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <ProductMap searchResults={mapResults} />
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductDetailsPage;
