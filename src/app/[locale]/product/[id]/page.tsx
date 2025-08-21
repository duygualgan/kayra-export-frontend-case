"use client";

import { useParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts"; // Ortak hook’umuz
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";

const ProductDetailPage = () => {
  const { id } = useParams(); 
  const { products, isError, isLoading } = useProducts();

  if (isLoading) return <div className="p-10 text-center">Yükleniyor...</div>;
  if (isError)
    return <div className="p-10 text-red-600">Hata: {isError.message}</div>;

  const product = products?.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="p-10 text-gray-600 text-center">Ürün bulunamadı.</div>
    );
  }

  return (
    <Container className="flex items-center justify-between">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6 shadow-sm">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="object-contain max-h-[500px] w-auto"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
              {product.title}
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>
            <p className="mt-6 text-4xl font-bold text-indigo-600">
              ${product.price}
            </p>
          </div>

          <div className="mt-8">
            <AddToCartButton />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetailPage;
