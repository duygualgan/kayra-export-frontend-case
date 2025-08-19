"use client";

// import Image from "next/image"
import { Product } from "@/types/product"

type ProductCardProps = {
  product: Product;
};

export default function ProductsList({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer">
      <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="group-hover:scale-105 transition object-cover w-4 h-3 md:w-full md:h-full"
        />
      </div>

      <p className="md:text-base font-medium pt-2 w-full truncate">
        {product.title}
      </p>

      <div className="flex items-center gap-2"></div>

      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium">{product.price}</p>
        <button className=" max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
          add to cart
        </button>
      </div>
    </div>
  )
}
