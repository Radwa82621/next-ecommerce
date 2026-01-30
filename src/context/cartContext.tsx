"use client"
import { getCart } from '@/cartActions/getCart.action'
import { Product } from '@/types'
import getMyToken from '@/utilities/getMyToken'
import React, { createContext, useEffect, useState, Dispatch, SetStateAction } from 'react'

export interface CartContextType {
  NumberOfCartItems: number;
  setNumberOfCartItems: Dispatch<SetStateAction<number>>;
}

export const cartContext = createContext<CartContextType>({
  NumberOfCartItems: 0,
  setNumberOfCartItems: () => {},
});

export default function CartContextProvider({children}: {children:React.ReactNode}){
        let [NumberOfCartItems,setNumberOfCartItems]=useState(0)


          useEffect(()=>{
           getUserCart()
        },[])

        async function getUserCart(){
        try {
            let res = await getCart()


        console.log(res.data.products);
        setNumberOfCartItems(0)
              res.data.products.forEach((el:Product)=>{
                setNumberOfCartItems(NumberOfCartItems+=el.count!)

        })
        console.log(NumberOfCartItems);
        
        } catch (error) {
            console.log(error);
            
        }
        
        
        }

      
        return <cartContext.Provider value={{NumberOfCartItems, setNumberOfCartItems}}>{children}</cartContext.Provider>
    }