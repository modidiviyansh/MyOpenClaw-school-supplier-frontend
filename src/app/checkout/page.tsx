"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Truck, Package, Phone, Mail, User, School } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const product_id = searchParams.get("product");
  const product_name = searchParams.get("name") || "";
  const price = parseFloat(searchParams.get("price") || "0");
  const quantity = parseInt(searchParams.get("qty") || "1");

  const [formData, setFormData] = useState({
    name: "",
    school: "",
    email: "",
    phone: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Send data to n8n webhook
      const webhookUrl = "https://n8n.coolify.theupliftco.com/webhook/order"; // Replace with your actual n8n webhook URL
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          product_id,
          product_name,
          price,
          quantity,
          total: price * quantity,
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <div className="mb-6 rounded-full bg-green-100 p-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Order Placed Successfully!</h1>
        <p className="mb-8 text-gray-600">
          Thank you for your order. We will contact you shortly to confirm details.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>
      
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Order Summary */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Order Summary</h2>
          
          <div className="mb-6 flex items-center space-x-4 border-b pb-6">
            <div className="h-24 w-24 rounded-lg bg-gray-100 object-cover">
              {/* Product Image Placeholder */}
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                <Package className="h-8 w-8" />
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{product_name}</h3>
              <p className="text-sm text-gray-500">Quantity: {quantity}</p>
              <p className="mt-1 font-bold text-primary">₹{price}</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{price * quantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>₹{price * quantity}</span>
            </div>
          </div>
        </div>
        
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 pl-10 py-3 text-sm focus:border-primary focus:ring-primary"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">School / Organization</label>
            <div className="relative">
              <School className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 pl-10 py-3 text-sm focus:border-primary focus:ring-primary"
                placeholder="Example High School"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                className="w-full rounded-lg border border-gray-300 pl-10 py-3 text-sm focus:border-primary focus:ring-primary"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                required
                className="w-full rounded-lg border border-gray-300 pl-10 py-3 text-sm focus:border-primary focus:ring-primary"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-primary py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Processing..." : "Place Order"}
          </button>
          
          <p className="mt-4 text-center text-xs text-gray-500">
            By placing this order, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
}
