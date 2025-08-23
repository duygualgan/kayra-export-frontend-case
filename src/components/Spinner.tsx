"use client";

import React from 'react'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-full min-h-[300px]"  role="status" aria-live="polite" aria-label="Yükleniyor">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

export default Spinner