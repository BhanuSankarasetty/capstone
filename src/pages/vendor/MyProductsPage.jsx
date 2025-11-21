// src/pages/vendor/MyProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, PlusCircle, Edit, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '../../context/AuthContext';
import { mockProducts, mockVendors } from '../../utils/mockData';
import { formatPrice } from '../../utils/currency';
import toast from 'react-hot-toast';

const MyProductsPage = () => {
  const { user } = useAuth();
  const [vendorProducts, setVendorProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // In a real app, you'd fetch products for the logged-in vendor
    // const { data, isLoading, isError } = useQuery(['vendorProducts', user?.id], () =>
    //   axios.get(`/api/vendors/${user?.id}/products`)
    // );

    // Simulate fetching products for a specific mock vendor (e.g., 'vend201')
    const currentVendor = mockVendors.find(v => v.id === 'vend201'); // Assume logged-in vendor is 'vend201' for mock
    if (currentVendor) {
      const products = currentVendor.products.map(vp => {
        const productData = mockProducts.find(p => p.id === vp.productId);
        return productData ? { ...productData, price: vp.price, stock: vp.stock } : null;
      }).filter(Boolean);
      setVendorProducts(products);
    } else {
      setVendorProducts([]);
    }
    setLoading(false);
  }, [user]);

  const handleDeleteProduct = (productId) => {
    // In a real app: mutation.mutate(productId)
    toast.success(`Product ${productId} deleted (mock action).`);
    setVendorProducts(vendorProducts.filter(p => p.id !== productId));
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-fypBlue" />
        <span className="ml-3 text-lg text-gray-900 dark:text-gray-100">Loading your products...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-poppins font-bold text-gray-900 dark:text-gray-100">My Products</h1>
        <Link to="/vendor/products/new">
          <Button variant="fypPrimary">
            <PlusCircle className="h-5 w-5 mr-2" /> Add New Product
          </Button>
        </Link>
      </div>

      {vendorProducts.length === 0 ? (
        <Card className="p-8 text-center border-2 dark:bg-gray-800 shadow-lg">
          <CardTitle className="text-2xl text-gray-900 dark:text-white mb-2">No Products Listed Yet</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 mb-4">
            It looks like you haven't added any products to your store.
          </CardDescription>
          <Link to="/vendor/products/new">
            <Button variant="fypPrimary">Start Adding Products</Button>
          </Link>
        </Card>
      ) : (
        <Card className="border-2 dark:bg-gray-800 overflow-hidden shadow-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-gray-900 dark:text-white">Image</TableHead>
                <TableHead className="text-gray-900 dark:text-white">Product Name</TableHead>
                <TableHead className="text-gray-900 dark:text-white">Category</TableHead>
                <TableHead className="text-gray-900 dark:text-white">Price</TableHead>
                <TableHead className="text-gray-900 dark:text-white">Stock</TableHead>
                <TableHead className="text-right text-gray-900 dark:text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img src={product.imageUrl || 'https://via.placeholder.com/50'} alt={product.name} className="h-12 w-12 object-cover rounded-md" />
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    <Link to={`/product/${product.id}`} className="text-fypBlue hover:underline">
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{product.category}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                      ${product.stock === 'Available' ? 'bg-fypGreen/10 text-fypGreen' :
                        product.stock === 'Low' ? 'bg-fypOrange/10 text-fypOrange' :
                        'bg-red-500/10 text-red-500'}`}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right flex items-center justify-end space-x-2">
                    <Link to={`/vendor/products/edit/${product.id}`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </motion.div>
  );
};

export default MyProductsPage;