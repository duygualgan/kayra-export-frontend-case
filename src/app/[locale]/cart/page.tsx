"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  setQuantity,
  clearCart,
} from "@/store/cartSlice";
import { useLocale, useTranslations } from "next-intl";
import ConfirmModal from "@/components/ConfirmModal";
import toast from "react-hot-toast";

export default function CartPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const locale = useLocale();
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const t = useTranslations("project");

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h1 className="text-2xl font-semibold mb-6">
          {t("cart.your_cart_empty")}
        </h1>
        <Link href={`/${locale}/products`} className="text-sky-600 underline">
          {t("cart.back_products")}
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">
              {t("cart.your_cart")}
            </h2>

            <div className="space-y-4">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="w-24 h-24 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
                    <Image
                      src={it.image}
                      alt={it.title}
                      width={96}
                      height={96}
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{it.title}</h3>
                    <p className="text-sm text-gray-500">
                      {it.price.toFixed(2)} {t("cart.money")}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => dispatch(decreaseQty(it.id))}
                        className="w-8 h-8 rounded-md border flex items-center justify-center"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={it.quantity}
                        min={1}
                        onChange={(e) =>
                          dispatch(
                            setQuantity({
                              id: it.id,
                              quantity: Number(e.target.value),
                            })
                          )
                        }
                        className="w-16 text-center border rounded-md p-1"
                      />
                      <button
                        onClick={() => dispatch(increaseQty(it.id))}
                        className="w-8 h-8 rounded-md border flex items-center justify-center"
                      >
                        +
                      </button>

                      <button
                        onClick={() => {
                          //   dispatch(removeFromCart(it.id));
                          setSelectedId(it.id);
                          setModalOpen(true);
                        }}
                        className="ml-4 text-sm text-red-600"
                      >
                        {t("cart.delete")}
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold">
                      {(it.price * it.quantity).toFixed(2)} ₺
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">{t("cart.summary")}</h3>

            <div className="flex justify-between mb-2">
              <span>
                {t("cart.products")} (
                {items.reduce((s, i) => s + i.quantity, 0)})
              </span>
              <span>{total.toFixed(2)} ₺</span>
            </div>

            <div className="border-t my-4" />

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>{t("cart.total")}</span>
              <span>{total.toFixed(2)} ₺</span>
            </div>

            <button className="w-full py-3 rounded-lg bg-sky-600 text-white font-medium">
              {t("cart.checkout")}
            </button>

            <button
              onClick={() => dispatch(clearCart())}
              className="w-full mt-3 py-2 rounded-lg border text-sm"
            >
              {t("cart.empty_cart")}
            </button>
          </aside>
        </div>
      </div>
      <ConfirmModal
        isOpen={modalOpen}
        onConfirm={() => {
          if (selectedId !== null) {
            dispatch(removeFromCart(selectedId));
            toast.success(t("cart.remove_product"));
          }
          setModalOpen(false);
          setSelectedId(null);
        }}
        onCancel={() => {
          setModalOpen(false);
          setSelectedId(null);
        }}
        message={t("cart.delete_confirm")}
      />
    </>
  );
}
