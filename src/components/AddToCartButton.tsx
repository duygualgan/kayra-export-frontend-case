import { useTranslations } from "next-intl";
import React from "react";

function AddToCartButton() {
  const t = useTranslations("project");
  return (
    <>
      <button
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
      >
        {t("button.add_cart")}
      </button>
    </>
  );
}

export default AddToCartButton;
