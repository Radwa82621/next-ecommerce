import React from 'react'
import { getAllOrders } from '@/allOrdersActions.ts/getAllOrder.action';
import { Order } from '@/types/order';
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Package, Truck, Calendar, CreditCard, Banknote, MapPin } from "lucide-react";
import Image from 'next/image';

export default async function AllOrdersPage() {
  const orders: Order[] = await getAllOrders();

  const sortedOrders = orders?.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ) || [];

  return (
    <div className="mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground mt-2">
          View and track your past order history.
        </p>
      </div>

      <div className="space-y-6">
        {sortedOrders.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-xl border-2 border-dashed">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No orders found</h3>
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          </div>
        ) : (
          sortedOrders.map((order) => (
            <Card key={order._id} className="overflow-hidden border-2 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
              <div className="bg-muted/30 p-4 sm:px-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-b">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">Order #{order.id}</span>
                    <Badge variant={order.isPaid ? "default" : "secondary"} className={order.isPaid ? "bg-green-600 hover:bg-green-700" : ""}>
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </Badge>
                    <Badge variant={order.isDelivered ? "default" : "outline"} className={order.isDelivered ? "bg-blue-600 hover:bg-blue-700" : ""}>
                      {order.isDelivered ? "Delivered" : "Processing"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-2xl font-bold text-primary">EGP {order.totalOrderPrice.toLocaleString()}</span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground capitalize">
                    {order.paymentMethodType === 'cash' ? <Banknote className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                    {order.paymentMethodType}
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="font-semibold flex items-center gap-2 mb-3">
                      <Package className="h-4 w-4 text-primary" />
                      Items
                    </h4>
                    <div className="space-y-4">
                      {order.cartItems.map((item) => (
                        <div key={item._id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-background">
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm line-clamp-2" title={item.product.title}>
                              {item.product.title}
                            </h5>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <span>Qty: {item.count}</span>
                              <span>×</span>
                              <span>EGP {item.price.toLocaleString()}</span>
                            </div>
                            <div className="mt-1 font-semibold text-sm">
                              EGP {(item.price * item.count).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-3">
                        <Truck className="h-4 w-4 text-primary" />
                        Shipping Detail
                      </h4>
                      <div className="bg-muted/20 p-4 rounded-lg space-y-3 text-sm">
                        <div className="flex items-start gap-2">
                           <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                           <div className="space-y-1">
                             <p className="font-medium">Delivery Address</p>
                             <div className="text-muted-foreground">
                               <p>{order.shippingAddress.details}</p>
                               <p>{order.shippingAddress.city}</p>
                               <p className="mt-1 font-mono text-xs">{order.shippingAddress.phone}</p>
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>EGP {order.totalOrderPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>EGP {order.shippingPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>EGP {order.taxPrice.toLocaleString()}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>EGP {(order.totalOrderPrice + order.shippingPrice + order.taxPrice).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}