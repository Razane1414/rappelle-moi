"use client";
import { useEffect, useState } from "react";
import { Button } from "../../../src/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../../src/components/ui/card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../src/lib/firebase";

export default function Dashboard() {
    const [medicaments, setMedicaments] = useState([]);
    useEffect(() => {
        const fetchMedicaments = async () => {
            try {
                const getMedicaments = await getDocs(collection(db, "medicaments"));
                const medicamentsData = getMedicaments.docs.map((doc) => ({ //parcourir les docs 
                    id: doc.id, // on récupère l'ID aussi
                    ...doc.data(),  // et toutes les données du médicament
                }));
                setMedicaments(medicamentsData); // on met à jour l'état avec les données récupérées
            } catch (error) {
                console.error("Erreur lors de la récupération des médicaments :", error);
            }
        };
        fetchMedicaments();  // on appelle la fonction pour récupérer les médicaments
    }, []); //l'effet ne s'exécute qu'une seule fois au chargement


    return (
        <>
            <div className="flex flex-col p-[5%]">
                <h3 className="text-4xl mb-[5%]">Alors maman ? tu as pris tes medicaments aujourd'hui ?</h3>
                <div className="flex">
                    <Card className="w-1/2 flex flex-col justify-between items-center p-4 mr-2">
                        <CardContent className="">
                            01
                        </CardContent>
                        <CardFooter className="">
                            Déjà pris
                        </CardFooter>
                    </Card>

                    <Card className="w-1/2 flex flex-col justify-between items-center p-4">
                        <CardContent className="">
                            02
                        </CardContent>
                        <CardFooter className="">
                            A prendre
                        </CardFooter>
                    </Card>
                </div>

                <div className="flex flex-col w-full items-center justify-center mt-4 gap-4">
                    {medicaments.map((medicament) => (
                        <Card key={medicament.id} className="w-full flex flex-row justify-between items-center p-4">
                            <div>
                                <CardHeader className="">
                                    <h3 className="text-2xl font-bold">{medicament.nom}</h3>
                                </CardHeader>
                                <CardContent className="">
                                    <p className="text-lg">Heure de prise : {medicament.heure}</p>
                                </CardContent>
                            </div>
                            <div className="flex gap-2">    
                                <Button>Oublié</Button>
                                <Button>Pris</Button>
                            </div>      
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}