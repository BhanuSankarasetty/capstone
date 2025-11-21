// src/components/product/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tag, MapPin, Star, TrendingDown, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatPrice } from '@/utils/currency';

export function ProductCard({ product, vendor, price, stock, stockCount }) {
  const stockColor =
    stock === 'Available' ? 'text-fypGreen' :
    stock === 'Low' ? 'text-yellow-500' :
    'text-red-500';

  const stockBadge =
    stock === 'Available' ? 'bg-fypGreen/10 text-fypGreen border-fypGreen/20' :
    stock === 'Low' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' :
    'bg-red-500/10 text-red-500 border-red-500/20';

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <Link to={`/product/${product.id}`} state={{ product, vendor, price, stock }}>
        <Card className="flex flex-col h-full overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 dark:bg-gray-800 border-2 hover:border-fypBlue/50 group">
          {/* Image Section */}
          <div className="relative w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
            <img
              src={product.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={product.name}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Distance Badge */}
            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-black/40 text-white flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{vendor.distance} km</span>
            </div>

            {/* Verified Badge */}
            {vendor.isVerified && (
              <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold bg-fypGreen/90 text-white flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                <span>Verified</span>
              </div>
            )}

            {/* Stock Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <span className={`text-xs font-semibold px-2 py-1 rounded-md ${stockBadge} border`}>
                {stock} {stockCount !== undefined && `(${stockCount})`}
              </span>
            </div>
          </div>

          <CardHeader className="p-4 flex-grow">
            <h3 className="text-lg font-poppins font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-fypBlue transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1">
              <span>{vendor.name}</span>
              {vendor.rating && (
                <>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs">{vendor.rating}</span>
                  </div>
                </>
              )}
            </p>
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {product.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </CardHeader>

          <CardContent className="p-4 pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-poppins font-bold text-fypBlue">
                  {formatPrice(price)}
                </span>
                {product.brand && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {product.brand}
                  </span>
                )}
              </div>
              <div className="flex items-center text-fypGreen">
                <Tag className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">{product.category}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
