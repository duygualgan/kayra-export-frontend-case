"use client";

import React from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { useLocale } from "next-intl";
import Head from "next/head";

type ProductCardProps = {
  product: Product;
};

const ProductsCard = ({ product }: ProductCardProps) => {
  const locale = useLocale();

  return (
    <>
      <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
        <Link href={`/${locale}/product/${product.id}`} className="block">
          <div className="relative w-full h-60 flex items-center justify-center overflow-hidden bg-gray-50">
            <Image
              src={product.image}
              alt={`Buy ${product.title} in ${product.category}`}
              width={300}
              height={300}
              priority
              className="object-contain h-52 w-auto transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              {product.category}
            </p>
            <h2 className="font-semibold text-lg text-gray-900 line-clamp-2 mt-1">
              {product.title}
            </h2>
            <p className="mt-2 text-xl font-bold text-indigo-600">
              {product.price}
            </p>
          </div>
        </Link>
        <div className="p-4 pt-0">
          <AddToCartButton />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200/5 via-purple-200/5 to-pink-200/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </>
  );
};

export default ProductsCard;
