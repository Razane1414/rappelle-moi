"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../../src/components/ui/card";

import { collection, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../../src/lib/firebase";
import { useRouter } from "next/navigation";
import useCurrentUser from "../../src/hook/user_verif";

export default function Dashboard() {
    const { user, loading } = useCurrentUser(); // on utilise le hook pour vérifier si l'utilisateur est connecté
    const [medicaments, setMedicaments] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/connexion");
        }
    }, [user, loading, router]);

       useEffect(() => {
        const fetchMedicaments = async () => {
            if (!user) return;
            try {
                const q = query(collection(db, "medicaments"), where("uid", "==", user.uid)); // on récupère les médicaments de l'utilisateur connecté grc à id
                const querySnapshot = await getDocs(q);
                const medicamentsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id, // on récupère l'id du médicament
                    ...doc.data(), // on récupère les données du médicament
                }));
                setMedicaments(medicamentsData);
            } catch (error) {
                console.error("Erreur lors de la récupération des médicaments :", error);
            }
        };

        fetchMedicaments();
    }, [user]);

    if (loading || !user) {
        return null;
    }

    // fonction pour marquer le medicament comme pris
    const medicamenPris = async (id) => {
        try {
            const medicamentRef = doc(db, "medicaments", id);
            await updateDoc(medicamentRef, {
                pris: true,
            });
            // on met à jour l'état local pour refléter le changement
            setMedicaments((prevMedicaments) =>
                prevMedicaments.map((medicament) =>
                    medicament.id === id ? { ...medicament, pris: true } : medicament
                )
            );
  
        } catch (error) {
            console.error("Erreur lors de la mise à jour du médicament :", error);
        }
    }


    return (
        <div className="">
            <div className="flex flex-col w-full h-full">
                <h3 className="text-4xl mb-[2%] relative z-10">
                    <span className="font-bold">Salut {user?.displayName?.split(" ")[0] || ""} !  <br /></span>
                    Tu as pris tes médicaments ?
                </h3>
                <div className="flex gap-5 relative z-10">
                    <Card className="w-1/2 flex flex-col justify-between p-4 mr-2 bg-white/25 backdrop-blur-md shadow-xl">
                        <CardContent className="">
                            <h4 className="text-7xl">0{medicaments.filter(medicament => medicament.pris).length}</h4>
                        </CardContent>
                        <CardFooter className="">
                            <p className="font-medium">Déjà pris</p>
                        </CardFooter>
                    </Card>

                    <Card className="w-1/2 flex flex-col justify-between p-4 bg-white/25 backdrop-blur-md shadow-xl">
                        <CardContent className="">
                            <h4 className="text-7xl">0{medicaments.length}</h4>
                        </CardContent>
                        <CardFooter className="">
                            <p className="font-medium">A prendre</p>
                        </CardFooter>
                    </Card>
                </div>
                
                <Card className="flex flex-col justify-between w-full h-full mt-4 bg-white/25 backdrop-blur-md shadow-xl relative z-10">
                    <CardContent>
                        <div className="flex flex-row justify-between items-center mb-5">
                            <h3 className="text-md font-medium ">Médicaments à prendre</h3>
                            <div className="flex flex-row  gap-3">
                                <p >Ajouter</p>
                                <button className="cursor-pointer"
                                onClick={() => router.push("dashboard/add_medicament")}
                                >
                                    <img
                                    src="icon/ajouter-un-bouton.png"
                                    alt="plus"
                                    className="w-7 h-7 transition-transform duration-200 ease-in-out hover:scale-110"
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col w-full items-center justify-center gap-4 ">
                            {medicaments.length > 0 ? (
                                medicaments.map((medicament) => (
                                    <Card
                                    key={medicament.id}
                                    className={`w-full flex flex-row justify-between items-center p-4 shadow-xl transition-colors duration-300 ${
                                        medicament.pris ? 'bg-[#455A64]/45' : 'bg-white/30 backdrop-blur-md'
                                    }`}>       
                                        <div className={`${medicament.pris ? 'text-white' : 'text-black'}`}>
                                            <CardHeader>
                                                <h3 className={`text-2xl font-bold ${medicament.pris ? 'line-through decoration-black' : ''}`}>
                                                    {medicament.nom}
                                                </h3>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-lg">Heure de prise : {medicament.heure}</p>
                                            </CardContent>
                                        </div>
                                        <div className="flex flex-col items-center justify-center">
                                            <button
                                            onClick={() => medicamenPris(medicament.id)}
                                            className={medicament.pris ? '' : 'cursor-pointer'}
                                            >
                                            <img
                                                src={medicament.pris ? "/icon/coche_white.png" : "/icon/coche.png"}
                                                alt="coche"
                                                className={`w-10 h-10 ${medicament.pris ? '' : 'transition-transform duration-200 ease-in-out hover:scale-110'}`}
                                            />
                                            </button>

                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <Card className="w-full flex flex-row justify-between items-center p-4 shadow-xl bg-white/20 backdrop-blur-md">
                                    <div>
                                        <p className="text-xl ">Aucun médicament à prendre</p>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </CardContent>

                </Card>
            
            </div>
            
        </div>
    );
}