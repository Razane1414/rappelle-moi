"use client";

import { db } from "../../../src/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "../../../src/components/ui/alert-dialog"
import { Button } from "../../../src/components/ui/button";

export default function MedicamentForm() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const medicamentFn = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "medicaments"), {
      nom: name,
      heure: time,
      pris: false,
    })
    .then(() => {
      setIsModalOpen(true); // ouvrir la modale
      setName(""); 
      setTime(""); 
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout du médicament :", error);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form onSubmit={medicamentFn} className="flex flex-col gap-4 mt-4 w-full max-w-md">
        <input
          type="text"
          name="nom"
          placeholder="Nom du médicament"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="time"
          name="heure"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <Button type="submit" className="w-full">Ajouter</Button>
      </form>

      {/* Modale déclenchée par l'état */}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Médicament ajouté ! </AlertDialogTitle>
            <AlertDialogDescription>
              Que souhaitez-vous faire ensuite ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-1/2" onClick={() => setIsModalOpen(false)}>
              Ajouter un autre médicament
            </AlertDialogCancel>
            <AlertDialogAction className="w-1/2" onClick={() => router.push("/dashboard")}>
              Retour au Dashboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
