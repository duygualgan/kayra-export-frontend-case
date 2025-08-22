"use client";

import { useTranslations } from "next-intl";
import React from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
};

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  message,
}: ConfirmModalProps) {
  const t = useTranslations("project");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onCancel}
          >
            {t("cart.cancel")}
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500"
            onClick={onConfirm}
          >
            {t("cart.ok")}
          </button>
        </div>
      </div>
    </div>
  );
}
