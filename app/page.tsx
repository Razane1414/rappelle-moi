"use client";

import { Button } from "../src/components/ui/button";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Un petit rappel pour un grand bien.</h1>
      <p className="mt-4 text-lg">Bienvenue sur Rappelle-Moi, ton nouveau compagnon de santé.</p>
      <Button
        onClick={() => router.push("/dashboard")}
      >
        Commencer      
      </Button>
    </div>
  );

}
