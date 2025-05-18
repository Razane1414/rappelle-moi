"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../../src/components/ui/card";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../src/lib/firebase";
import MenuBar from "../../src/components/include/menu";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [medicaments, setMedicaments] = useState([]);
    const router = useRouter();
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
        <>

            <div className="flex flex-row p-[5%] bg-[#FAF1F1] h-screen overflow-hidden relative">
                <MenuBar />
                {/* Blobs en fond */}           
                <div className="absolute -top-15 -right-10 w-96 h-96 bg-[#88CDFF] rounded-full blur-3xl opacity-70 z-0"></div>
                <div className="absolute -bottom-15 -left-10 w-96 h-96 bg-[#77FFB2] rounded-full blur-3xl opacity-70 z-0"></div>

                <div className="flex flex-col w-full h-full">
                    <h3 className="text-4xl mb-[2%] relative z-10">
                        <span className="font-bold">Salut maman ! <br /></span>
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
                    
                    <Card className="flex flex-col justify-between w-full h-full mt-4 bg-white/25 backdrop-blur-md shadow-xl">
                        <CardContent>
                            <div className="flex flex-row justify-between items-center relative z-10 mb-5">
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
                            <div className="flex flex-col w-full items-center justify-center gap-4 relative z-10 ">
                                {medicaments.map((medicament) => (
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
                                            <button className="cursor-pointer"
                                            onClick={() => medicamenPris(medicament.id)}>
                                                <img
                                                src={medicamenPris ? "/icon/coche_white.png": "/icon/coche.png"}
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
                
            </div>
        </>
    );
}