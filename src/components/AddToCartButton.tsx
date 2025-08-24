"use client";

import { addToCart } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { Product } from "@/types/product";
import { useTranslations } from "next-intl";
import React from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
};

function AddToCartButton({ product }: Props) {
  const t = useTranslations("project");
  const dispatch = useAppDispatch();
  const { status } = useSession();
  const locale = useLocale();
  const router = useRouter();

  const handleAdd = () => {
    if (status === "unauthenticated") {
      router.push(`/${locale}/login`);
      return;
    }

    dispatch(addToCart(product));
    toast.success(t("cart.added_product"));
  };

  return (
    <button
      onClick={handleAdd}
      className="
        w-full
        rounded-lg
        bg-sky-600
        text-white
        font-medium
        py-2.5
        shadow-md
        hover:bg-sky-400
        hover:shadow-lg
        active:scale-95
        transition
        duration-300
      "
      disabled={status === "loading"}
    >
      {t("button.add_cart")}
    </button>
  );
}

export default AddToCartButton;
