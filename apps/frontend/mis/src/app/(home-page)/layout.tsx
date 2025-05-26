import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import Head from "next/head";
import React from "react";

export default async function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>كلية الهندسة - جامعة قناة السويس</title>
        <meta
          name="description"
          content="كلية الهندسة بجامعة قناة السويس - تعليم متطور وبحث علمي متميز"
        />
        <link rel="icon" href="/logo_with_transparent_bg.png" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        {children}

        <Footer />
      </div>
    </>
  );
}
