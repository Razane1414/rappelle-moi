'use client';
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../src/lib/firebase";
import { Card, CardContent, CardHeader } from "../../../src/components/ui/card";
import { Param } from "../../../src/components/button_param";
import { deleteDoc, doc } from "firebase/firestore";


export default function ListMedic() {

    const [medicaments, setMedicaments] = useState([]);
    const supprimerMedicament = async (id) => {
        try {
            const medicamentDoc = doc(db, "medicaments", id); // on crée une référence au document à supprimer
            await deleteDoc(medicamentDoc); // on supprime le document
            setMedicaments(medicaments.filter((medicament) => medicament.id !== id)); // on met à jour l'état pour retirer le médicament supprimé
        } catch (error) {
            console.error("Erreur lors de la suppression du médicament :", error);
        }

    };
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
        <div className="flex flex-col items-center justify-center min-h-screen p-[5%]">
            <div className="flex flex-col w-full items-center justify-center mt-4 gap-4">

            <h1 className="text-2xl font-bold">Ici ? La liste de tes médicaments bien sûr !</h1>
            {medicaments.map((medicament) => (
                <Card key={medicament.id} className="w-full flex flex-row justify-between items-center p-4">
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
                        <Param onDelete={supprimerMedicament} id={medicament.id} />
                    </div>
                </Card>
            ))}
            </div>
      </div>
    );
}