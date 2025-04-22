import { Button } from "@/src/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Rappelle-moi</h1>
      <h2 className="text-3xl text-center font-bold">Un petit rappel pour un grand bien.</h2>

      <p className="mt-4 text-center">
        Bienvenue sur Rappelle-Moi, ton nouveau compagnon de santé.
      </p>

      <Button>Commencer</Button>
    </div>
  );
}
