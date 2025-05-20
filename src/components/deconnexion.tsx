"use client";
import { useRouter } from "next/navigation";
import useCurrentUser from "../hook/user_verif";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Card } from "./ui/card";

export default function Deconnexion() {
    const router = useRouter();
    const { user, loading } = useCurrentUser(); // on utilise le hook pour vérifier si l'utilisateur est connecté

    // fonction pour se déconnecter
    const deconnexion = () => {
        signOut(auth)
            .then(() => {
                router.push("/connexion");
            })
            .catch((error) => {
                console.error("Erreur lors de la déconnexion :", error);
            });
    };

    return (
      <Card className="bg-[#407BFF] rounded-full p-2 w-15 h-15 flex items-center justify-center cursor-pointor" onClick={deconnexion}>
        <img
          src="/icon/menu/deconnexion.png"
          alt="Icon deconnexion"
          className="w-6 h-6 object-contain "
        />
      </Card>
    );
}