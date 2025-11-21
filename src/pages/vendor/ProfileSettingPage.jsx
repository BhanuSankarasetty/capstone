// src/pages/vendor/ProfileSettingPage.jsx - Enhanced with consistent colors
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { mockVendors } from '../../utils/mockData';

const vendorProfileSchema = z.object({
  name: z.string().min(3, { message: "Store name must be at least 3 characters." }),
  address: z.string().min(10, { message: "Address is required and must be at least 10 characters." }),
  contactPhone: z.string().min(10, { message: "Phone number is required." }).optional().or(z.literal('')),
  contactEmail: z.string().email({ message: "Invalid email address." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }).optional().or(z.literal('')),
});

const ProfileSettingsPage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(vendorProfileSchema),
    defaultValues: {
      name: user?.name || '',
      address: '',
      contactPhone: '',
      contactEmail: user?.email || '',
      description: '',
    },
  });

  useEffect(() => {
    if (user && !authLoading) {
      setLoading(true);
      const mockVendorProfile = mockVendors.find(v => v.id === 'vend201');
      if (mockVendorProfile) {
        form.reset({
          name: mockVendorProfile.name,
          address: mockVendorProfile.address,
          contactPhone: mockVendorProfile.contactPhone,
          contactEmail: mockVendorProfile.contactEmail,
          description: mockVendorProfile.description || 'This is a mock vendor description for ' + mockVendorProfile.name,
        });
      } else {
        form.reset({
          name: user.name,
          address: '',
          contactPhone: '',
          contactEmail: user.email,
          description: '',
        });
      }
      setLoading(false);
    }
  }, [user, authLoading, form]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Profile updated:", data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="bg-gradient-primary rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-poppins font-bold mb-2">Profile Settings</h1>
        <p className="text-xl text-white/90">Manage your store's public profile details</p>
      </div>

      <Card className="border-2 dark:bg-gray-800 shadow-xl p-6">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 dark:text-white">Vendor Information</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Manage your store's public profile details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-white">Store Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your Awesome Store" 
                        className="dark:bg-gray-700 dark:border-gray-600"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-white">Store Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123 Main St, City, Country" 
                        className="dark:bg-gray-700 dark:border-gray-600"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-gray-600 dark:text-gray-400">
                      This will be used for displaying your location on the map.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-white">Contact Phone</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel" 
                        placeholder="e.g., +91 80 1234 5678" 
                        className="dark:bg-gray-700 dark:border-gray-600"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-white">Public Contact Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="contact@yourstore.com" 
                        className="dark:bg-gray-700 dark:border-gray-600"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-gray-600 dark:text-gray-400">
                      This email will be visible to customers.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-white">Store Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell customers about your store, products, and mission."
                        className="resize-y min-h-[100px] dark:bg-gray-700 dark:border-gray-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="bg-gradient-primary text-white hover:opacity-90" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileSettingsPage;
