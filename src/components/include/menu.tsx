'use client';

import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export default function MenuBar() {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 w-full px-[20%] py-[3%] z-50">
      <Card className="p-5 w-full">
        <div className="flex justify-between items-center w-full gap-4">
          <Button onClick={() => router.push("/dashboard")} className="flex-[3] py-7 text-md">
            Dashboard
          </Button>
          <Button onClick={() => router.push("/listMedic")} className="flex-[1] py-7 text-md">
            List
          </Button>
          <Button onClick={() => router.push("/add_medicament")} className="flex-1 py-7 text-md">
            +
          </Button>
        </div>
      </Card>
    </div>
  );
}
