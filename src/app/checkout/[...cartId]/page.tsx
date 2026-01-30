"use client"

import React, { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CreditCard, Banknote, Truck, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { cashPayment } from "@/paymentActions.ts/cashPayment.action"
import { toast } from "sonner"
import { cartContext } from "@/context/cartContext"
import { useRouter } from 'next/navigation'
import { onlinePayment } from "@/paymentActions.ts/onlinePayment.action"

const checkoutSchema = z.object({
  paymentMethod: z.enum(["cash", "online"], {
    message: "Please select a payment method.",
  }),
  shippingAddress: z.object({
    details: z.string().min(3, "Address details are required"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
    city: z.string().min(2, "City is required"),
  }),
})

type CheckoutValues = z.infer<typeof checkoutSchema>

export default  function CheckoutPage({params}:any) {
    let router= useRouter()

let {NumberOfCartItems,setNumberOfCartItems} =useContext(cartContext)
 let [cartId,setCartId]=useState('')
async function  getCartId(){
  let {cartId} =  await params
console.log("cartId",cartId);
setCartId(cartId)
}

useEffect(() => {
  getCartId()
}, [])

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "cash",
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
  })

  async function onSubmit(data: CheckoutValues) {

    console.log("Checkout Data:",data)

    // cash 
    if(data.paymentMethod === "cash"){
      let res = await cashPayment(data,cartId)
      console.log(res);
    
      
      if(res.status === "success"){
        toast.success("Order placed successfully")
        setNumberOfCartItems(0)
        router.push("/allorders")
      }else{
        toast.error(res.message?res.message:"Failed to place order")
      }
    }else{
      let res = await onlinePayment(data,cartId)
      console.log(res);
    
      
      if(res.status === "success"){
        // toast.success("Order placed successfully")
        // setNumberOfCartItems(0)
        // router.push("/allorders")
        window.location.href = res.session.url
      }else{
        // toast.error(res.message?res.message:"Failed to place order")
      }
    }
   
  }

  return (
    <div className="mx-auto max-w-3xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        <p className="text-muted-foreground mt-2">
          Complete your order by providing your shipping and payment details.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit((data)=>{onSubmit(data)})} className="space-y-8">
          {/* Payment Method Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
              <CardDescription>
                Choose how you would like to pay for your order.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Cash Option */}
                        <div
                          className={cn(
                            "cursor-pointer rounded-xl border-2 p-6 transition-all hover:bg-accent/50",
                            field.value === "cash"
                              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                              : "border-muted bg-card hover:border-primary/50"
                          )}
                          onClick={() => field.onChange("cash")}
                        >
                          <div className="flex flex-col items-center gap-4 text-center">
                            <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/20">
                              <Banknote className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold">Cash on Delivery</h3>
                              <p className="text-sm text-muted-foreground">
                                Pay with cash when you receive your order.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Online Option */}
                        <div
                          className={cn(
                            "cursor-pointer rounded-xl border-2 p-6 transition-all hover:bg-accent/50",
                            field.value === "online"
                              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                              : "border-muted bg-card hover:border-primary/50"
                          )}
                          onClick={() => field.onChange("online")}
                        >
                          <div className="flex flex-col items-center gap-4 text-center">
                            <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900/20">
                              <CreditCard className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold">Online Payment</h3>
                              <p className="text-sm text-muted-foreground">
                                Pay securely with your credit or debit card.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Shipping Address Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Details
              </CardTitle>
              <CardDescription>
                Enter the address where you want your order delivered.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="shippingAddress.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="your city" className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="shippingAddress.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="your phone number" className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="shippingAddress.details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Details</FormLabel>
                    <FormControl>
                      <Input placeholder="Street name, building number, apartment..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" className="w-full text-lg py-6" size="lg">
            Place Order
          </Button>
        </form>
      </Form>
    </div>
  )
}
