'use client';
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../src/lib/firebase";
import { Card, CardContent, CardHeader } from "../../../src/components/ui/card";
import { Param } from "../../../src/components/button_param";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import useCurrentUser from "../../../src/hook/user_verif";

export default function ListMedic() {
    const { user, loading } = useCurrentUser();// on utilise le hook pour vérifier si l'utilisateur est connecté
    const router = useRouter();
    const [medicaments, setMedicaments] = useState([]);

    // fonction pour supprimer un médicament
    const supprimerMedicament = async (id) => {
        try {
            const medicamentDoc = doc(db, "medicaments", id); // on crée une référence au document à supprimer
            await deleteDoc(medicamentDoc); // on supprime le document
            setMedicaments(medicaments.filter((medicament) => medicament.id !== id)); // on met à jour l'état pour retirer le médicament supprimé
        } catch (error) {
            console.error("Erreur lors de la suppression du médicament :", error);
        }
    };
    // fonction pour modifier un médicament
    const modificationMedicament = (id) => {
        router.push(`add_medicament?id=${id}`); // on redirige vers la page d'ajout de médicament avec l'ID du médicament à modifier
    }
    
    
    // fonction pour récupérer les médicaments
    useEffect(() => {
        if (loading || !user) return; // si l'utilisateur n'est pas connecté, on ne fait rien
        
        const fetchMedicaments = async () => {
            try {
                const getMedicaments = await getDocs(collection(db, "medicaments"));
                const medicamentsData = getMedicaments.docs
                    .map((doc) => ({ id: doc.id, ...doc.data() })) // on récupère les données des médicaments
                    .filter((med) => med.uid === user.uid); // filtrer par utilisateur connecté
                setMedicaments(medicamentsData);
            } catch (error) {
                console.error("Erreur lors de la récupération des médicaments :", error);
            }
        };
        fetchMedicaments();  // on appelle la fonction pour récupérer les médicaments
    }, [user, loading]); //l'effet ne s'exécute qu'une seule fois au chargement


    

    return (
        <div className="flex flex-col w-full">
            <h3 className="text-4xl mb-[2%] relative z-10">
                <span className="font-bold">Ici ? </span> <br />
                La liste de tes médicaments bien sûr !
            </h3>
            <Card className="flex flex-col justify-between w-full h-full mt-4 bg-white/25 backdrop-blur-md shadow-xl relative z-10">
                <CardContent>
                    <div className="flex flex-row justify-between items-center relative z-10 mb-5">
                        <h3 className="text-md font-medium ">Tes médicaments enregistrés</h3>
                        <div className="flex flex-row  gap-3">
                            <p >Ajouter</p>
                            <button className="cursor-pointer"
                            onClick={() => router.push("add_medicament")}
                            >
                                <img
                                src="../icon/ajouter-un-bouton.png"
                                alt="plus"
                                className="w-7 h-7 transition-transform duration-200 ease-in-out hover:scale-110"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col w-full items-center justify-center gap-4 ">
                        {medicaments.map((medicament) => (
                            <Card key={medicament.id} className="w-full flex flex-row justify-between items-center p-4 shadow-xl bg-white/20 backdrop-blur-md">
                                <div>
                                    <CardHeader>
                                    <h3 className="text-2xl font-bold">{medicament.nom}</h3>
                                    </CardHeader>
                                    <CardContent>
                                    <p className="text-lg">Heure de prise : {medicament.heure}</p>
                                    </CardContent>
                                </div>
                    
                                {/* param  */}
                                <div className="flex gap-2">
                                    <Param onModif={modificationMedicament} onDelete={supprimerMedicament} id={medicament.id} />
                                    
                                </div>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}