// src/pages/vendor/DashboardPage.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Store, TrendingUp, DollarSign, Eye, ShoppingCart, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { formatPrice } from '../../utils/currency';

const DashboardPage = () => {
  const { user } = useAuth();

  // Mock analytics data - in real app, this would come from API
  const analytics = {
    totalProducts: 12,
    storeViews: 5329,
    productViews: 18456,
    topProduct: 'Organic Milk',
    earnings: 1250.00, // USD - will be converted to INR
    lowStockItems: 3,
    recentOrders: 8,
    growth: {
      products: 20,
      views: 15,
      earnings: 5,
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
  };

  const stats = [
    {
      title: 'Total Products',
      value: analytics.totalProducts,
      change: `+${analytics.growth.products}%`,
      icon: Package,
      color: 'text-fypBlue',
      bgColor: 'bg-fypBlue/10',
    },
    {
      title: 'Store Views',
      value: analytics.storeViews.toLocaleString(),
      change: `+${analytics.growth.views}%`,
      icon: Eye,
      color: 'text-fypGreen',
      bgColor: 'bg-fypGreen/10',
    },
    {
      title: 'Product Views',
      value: analytics.productViews.toLocaleString(),
      change: `+${analytics.growth.views}%`,
      icon: ShoppingCart,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Earnings (MoM)',
      value: formatPrice(analytics.earnings),
      change: `+${analytics.growth.earnings}%`,
      icon: DollarSign,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Welcome Header */}
      <div className="bg-gradient-primary rounded-2xl p-8 text-white">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-2">
            Welcome back, {user?.name || 'Vendor'}! 👋
          </h1>
          <p className="text-xl text-white/90">
            Here's what's happening with your store today
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, idx) => (
          <motion.div key={stat.title} variants={cardVariants}>
            <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-fypBlue/50 dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center text-xs text-fypGreen">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>{stat.change} from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Alerts Section */}
      {analytics.lowStockItems > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-2 border-yellow-500/50 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-yellow-500/20">
                  <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Low Stock Alert
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You have {analytics.lowStockItems} product{analytics.lowStockItems !== 1 ? 's' : ''} running low on stock
                  </p>
                </div>
                <Link to="/vendor/products">
                  <Button variant="outline" size="sm">
                    View Products <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="h-full dark:bg-gray-800 border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-poppins font-bold text-gray-900 dark:text-white">
                Quick Actions
              </CardTitle>
              <CardDescription>
                Manage your store and products quickly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/vendor/products/new" className="block">
                <Button variant="fypPrimary" className="w-full justify-start" size="lg">
                  <Package className="mr-2 h-5 w-5" />
                  Add New Product
                </Button>
              </Link>
              <Link to="/vendor/products" className="block">
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Store className="mr-2 h-5 w-5" />
                  Manage Products
                </Button>
              </Link>
              <Link to="/vendor/profile" className="block">
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Store className="mr-2 h-5 w-5" />
                  Update Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="h-full dark:bg-gray-800 border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-poppins font-bold text-gray-900 dark:text-white">
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest updates from your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'New product added', item: 'Organic Milk', time: '2 hours ago', type: 'success' },
                  { action: 'Store profile updated', item: 'Business hours', time: '1 day ago', type: 'info' },
                  { action: 'Product viewed', item: 'Artisan Sourdough Bread', time: '2 days ago', type: 'view' },
                  { action: 'Low stock alert', item: 'Organic Honey', time: '3 days ago', type: 'warning' },
                ].map((activity, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className={`p-2 rounded-full ${
                      activity.type === 'success' ? 'bg-fypGreen/10' :
                      activity.type === 'warning' ? 'bg-yellow-500/10' :
                      activity.type === 'view' ? 'bg-fypBlue/10' :
                      'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      {activity.type === 'success' && <Package className="h-4 w-4 text-fypGreen" />}
                      {activity.type === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                      {activity.type === 'view' && <Eye className="h-4 w-4 text-fypBlue" />}
                      {activity.type === 'info' && <Store className="h-4 w-4 text-gray-600 dark:text-gray-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {activity.item} • {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Product Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="bg-gradient-to-r from-fypBlue/10 to-fypGreen/10 dark:from-fypBlue/20 dark:to-fypGreen/20 border-2 border-fypBlue/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-poppins font-bold text-gray-900 dark:text-white mb-2">
                  🏆 Top Performing Product
                </h3>
                <p className="text-2xl font-bold text-fypBlue mb-1">{analytics.topProduct}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Leading in sales and views this month
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-fypGreen mb-1">
                  #{1}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">in Sales</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
