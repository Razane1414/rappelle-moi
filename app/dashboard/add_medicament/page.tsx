"use client";


import { useRouter } from "next/navigation";
import { Button } from "../../src/components/ui/button";

export default function AjoutMedicament() {
  
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Button
          onClick={() => router.push("add_medicament/formulaire")}
            className="text-white text-4xl rounded-full py-10 px-10"
        > + 
        </Button>
    </div>
  );
}
