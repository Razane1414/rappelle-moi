"use client";

import { db } from "../../src/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AjoutMedicament() {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const medicamentFn = async (e) => {
        e.preventDefault(); // empeche le rechargement de la page
        await addDoc(collection(db, "medicaments"), {
            nom: name,
            heure: time,
        })
        .then(() => {
            setIsModalOpen(true);
            setName("");
            setTime("");
        })
        .catch((error) => {
            console.error("Erreur lors de l'ajout du médicament : ", error);
        });
    };  
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Ajouter un médicament</h1>
            <form onSubmit={medicamentFn} className="flex flex-col gap-4 mt-4">
                <input type="text" name="nom" placeholder="Nom du médicament" value={name}  onChange={(e) => setName(e.target.value)} required  />
                <input type="time" name="heure" placeholder="Heure de prise" value={time} onChange={(e) => setTime(e.target.value)} required />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Ajouter</button>
            </form>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold">Médicament ajouté !</h2>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => router.push("/dashboard")}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Retour au Dashboard
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Ajouter un autre
                            </button>
                            </div>

                    </div>
                </div>
            )}
        </div>

       
    );
}