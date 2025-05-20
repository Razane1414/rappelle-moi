"use client";

import { auth, db } from "../../../src/lib/firebase";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Card, CardHeader } from "../../../src/components/ui/card";
import useCurrentUser from "../../../src/hook/user_verif";

export default function MedicamentForm() {
  const { user, loading } = useCurrentUser(); 
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();


  // pour la modification
  const searchParams = useSearchParams();
  const medicamentId = searchParams.get("id");

  // on utilise useEffect pour récupérer le médicament à modifier
  useEffect(() => {

    if (medicamentId) {
      // ici on cherche le médicament dans la base de données
      const fetchMedicament = async () => {
        if (loading || !user) return;

        const medicamentRef = doc(db, "medicaments", medicamentId);
        const medicamentDoc = await getDoc(medicamentRef);
        if (medicamentDoc.exists()) {
          const medicamentData = medicamentDoc.data();
          setName(medicamentData.nom);
          setTime(medicamentData.heure);
        } else {
          console.log("Aucun médicament trouvé avec cet ID");
        }
      };
      fetchMedicament();
    }
  }, [medicamentId, loading, user]); // reexécuter quand l'utilisateur est défini

  // fonction pour ajouter ou modifier un médicament
  const medicamentFn = async (e) => {
    e.preventDefault();
    if (medicamentId) {
      // si on a un ID, on modifie le médicament
      const medicamentRef = doc(db, "medicaments", medicamentId);
      await updateDoc(medicamentRef, {
        nom: name,
        heure: time,
      })
      .then(() => {
        setIsModalOpen(true); // ouvrir la modale
        setName("");
        setTime("");
      }
      )
    } else {
      await addDoc(collection(db, "medicaments"), {
        nom: name,
        heure: time,
        pris: false,
        uid: user.uid,
      })
      .then(() => {
        setIsModalOpen(true); // ouvrir la modale
        setName(""); 
        setTime(""); 
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du médicament :", error);
      });
    }
  };

  return (
    <div className="flex flex-col w-full h-full relative z-10">
      <h3 className="text-4xl  p-0 m-0">
        {medicamentId ? "Modifier le médicament" : "Ajouter un médicament"}
      </h3>
      <Card className="flex flex-col justify-between w-full h-full mt-4 p-[2%] bg-white/25 backdrop-blur-md shadow-xl relative z-10">
        <CardHeader>
          <h4 className="text-lg font-medium">
            {medicamentId ? "Modifier le médicament" : "Ajoute un nouveau médicament"}
          </h4>
        </CardHeader>
        <form onSubmit={medicamentFn} className="flex flex-col justify-between h-full p-4">
          <div className="flex flex-col">
            <label htmlFor="nom" className="text-md font-medium mb-3">Nom du médicament</label>
            <input
              type="text"
              name="nom"
              placeholder="Nom du médicament"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border p-3 rounded-2xl bg-white/15 backdrop-blur-md shadow-xl"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="heure" className="text-md font-medium mb-3">Heure de prise</label>
            <input
              type="time"
              name="heure"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="border p-3 rounded-2xl bg-white/15 backdrop-blur-md shadow-xl"
            />
          </div>

          <Button
          type="submit"
          className="inline-flex  p-5 bg-white/20 rounded-4xl text-white font-bold items-center justify-center self-end hover:bg-white/30 cursor-pointer shadow-xl border-black/20 border-b-4 border-[#407BFF] transition-transform duration-200 ease-in-out hover:scale-105"
          >
            <img src="../icon/fleche-droite.png" alt="fleche suivant" className="w-10 h-10" />
          </Button>

        </form>

        {/* Modale déclenchée par l'état */}
        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {medicamentId ? "Médicament modifié !" : "Médicament ajouté !"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                Que souhaitez-vous faire ensuite ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="w-1/2" onClick={() => setIsModalOpen(false)}>
                {medicamentId ? "Continuer à modifier" : " Ajouter un autre médicament !"}
               
              </AlertDialogCancel>
              <AlertDialogAction className="w-1/2" onClick={() => router.push("/dashboard")}>
                Retour au Dashboard
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card> 
    </div>
  );
}
