"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
function ThemeProviderNext({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system">
        {children}
      </ThemeProvider>
    </>
  );
}

export default ThemeProviderNext;
