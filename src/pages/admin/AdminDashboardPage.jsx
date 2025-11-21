// src/pages/admin/AdminDashboardPage.jsx - Enhanced with consistent colors and INR
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, Package, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { formatPrice } from '../../utils/currency';

// Mock data for key metrics
const metrics = [
  { title: 'Pending Vendors', value: 7, icon: Users, link: '/admin/vendors', color: 'text-red-500' },
  { title: 'Total Categories', value: 12, icon: Tag, link: '/admin/categories', color: 'text-fypGreen' },
  { title: 'Total Products', value: 580, icon: Package, link: '/admin/vendors', color: 'text-fypBlue' },
  { title: 'New Sales (Today)', value: formatPrice(14.87), icon: DollarSign, link: '#', color: 'text-yellow-500' },
];

const AdminDashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="bg-gradient-primary rounded-2xl p-8 text-white">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-2">
          Administrator Dashboard
        </h1>
        <p className="text-xl text-white/90">
          Manage vendors, categories, and platform operations
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, idx) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link to={metric.link}>
              <Card className="hover:shadow-xl transition-all border-2 hover:border-fypBlue/50 dark:bg-gray-800 h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {metric.title}
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-gradient-primary/10">
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Click to view details
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-2 dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-gray-900 dark:text-gray-100">
                <Clock className="h-4 w-4 mr-2 text-fypBlue" /> 
                Vendor "Green Farms" was approved.
              </li>
              <li className="flex items-center text-gray-900 dark:text-gray-100">
                <Clock className="h-4 w-4 mr-2 text-fypBlue" /> 
                New category "Dairy" added.
              </li>
              <li className="flex items-center text-gray-900 dark:text-gray-100">
                <Clock className="h-4 w-4 mr-2 text-fypBlue" /> 
                User updated profile.
              </li>
              <li className="flex items-center text-gray-900 dark:text-gray-100">
                <Clock className="h-4 w-4 mr-2 text-fypBlue" /> 
                Vendor "Urban Harvest" signed up and is pending review.
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-2 dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-3">
            <Link to="/admin/vendors">
              <Button variant="fypPrimary" className="w-full">Review Vendors</Button>
            </Link>
            <Link to="/admin/categories">
              <Button variant="outline" className="w-full">Manage Categories</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;
