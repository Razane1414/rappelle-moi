"use client";
import { useEffect, useState } from "react";
import { Button } from "../../src/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../src/components/ui/card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../src/lib/firebase";

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
            <div className="flex flex-col p-[5%] bg-[#FAF1F1] h-screen overflow-hidden relative">
                {/* Blobs en fond */}           
                <div className="absolute -top-15 -right-10 w-96 h-96 bg-[#88CDFF] rounded-full blur-3xl opacity-70 z-0"></div>
                <div className="absolute -bottom-15 -left-10 w-96 h-96 bg-[#77FFB2] rounded-full blur-3xl opacity-70 z-0"></div>


                <h3 className="text-4xl mb-[5%] relative z-10">
                    Salut maman ! 
                    Tu as pris tes médicaments ?
                </h3>
                <div className="flex relative z-10">
                    <Card className="w-1/2 flex flex-col justify-between items-center p-4 mr-2 bg-white/45 backdrop-blur-md shadow-xl">
                        <CardContent className="">
                            <h4 className="text-5xl">01</h4>
                        </CardContent>
                        <CardFooter className="">
                            Déjà pris
                        </CardFooter>
                    </Card>

                    <Card className="w-1/2 flex flex-col justify-between items-center p-4 bg-white/45 backdrop-blur-md shadow-xl">
                        <CardContent className="">
                            <h4 className="text-5xl">02</h4>
                        </CardContent>
                        <CardFooter className="">
                            A prendre
                        </CardFooter>
                    </Card>
                </div>
                
                <Card className="w-full flex flex-col justify-between min-h-[60%] mt-4 bg-white/45 backdrop-blur-md shadow-xl">
                    <CardContent>
                        <h3 className="text-md font-bold mb-4">Médicaments à prendre</h3>
                        <div className="flex flex-col w-full items-center justify-center gap-4 relative z-10 ">
                            {medicaments.map((medicament) => (
                                <Card key={medicament.id} className="w-full flex flex-row justify-between items-center p-4 bg-white/45 backdrop-blur-md shadow-xl">
                                    <div>
                                        <CardHeader className="">
                                            <h3 className="text-2xl font-bold">{medicament.nom}</h3>
                                        </CardHeader>
                                        <CardContent className="">
                                            <p className="text-lg">Heure de prise : {medicament.heure}</p>
                                        </CardContent>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <button className="cursor-pointer">
                                            <img
                                            src="/icon/coche.png"
                                            alt="coche"
                                            className="w-10 h-10 transition-transform duration-200 ease-in-out hover:scale-110"
                                            />                                  
                                        </button>    
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </CardContent>

                </Card>
               
            </div>
        </>
    );
}