"use client";
import { useRouter } from "next/navigation";    
import { useState } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../src/lib/firebase";
import { Button } from "../../src/components/ui/button";


export default function Connexion() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const provider = new GoogleAuthProvider();  // on importe le provider Google pour l'authentification

    const connexionFn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Connexion réussie
        const user = userCredential.user;
        console.log("Utilisateur connecté :", user);
        router.push("/dashboard");
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Erreur de connexion :", errorCode, errorMessage);
        });
    };


    // google connect
    
    const connexionGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                router.push("/dashboard"); // redirection après connexion
            })
            .catch((error) => {
                console.error("Erreur de connexion Google :", error.code, error.message);
            });
    };

    return (
        <div
            className="rounded-2xl m-5 flex flex-row relative overflow-hidden gap-70 py-[3%] px-[5%] relative z-10"
            style={{
                height: "calc(100vh - 2.5rem)",
                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
            }}
        >
            {/* Blobs en fond */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-[#88CDFF] rounded-full blur-3xl opacity-70 z-0 transform scale-x-150"></div>
            <div className="absolute bottom-15 -left-10 w-96 h-96 bg-[#77FFB2] rounded-full blur-3xl opacity-70 z-0"></div>
            <div className="absolute bottom-15 -right-10 w-96 h-96 bg-[#77FFB2] rounded-full blur-3xl opacity-70 z-0"></div>
            <div className="absolute top-0 left-0 w-full h-64 bg-[#88CDFF] rounded-full blur-3xl opacity-15 z-0 transform "></div>
            {/*  gauche */}
            <div className="w-1/2 h-full relative z-10 flex flex-col justify-between ">
                <h3 className="text-4xl mb-[2%] relative font-bold z-10">
                    Bienvenue sur <br /> Rappelle-moi.
                </h3>

                <div className="flex flex-col gap-5 relative z-10">
                    <div className="flex flex-row gap-5 items-center">
                        <img className="h-7 w-7" src="icon/forme-abstraite2.png" alt="forme verte" />
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xl">Accède à tes informations personnelles</h4>
                            <p className="text-sm text-gray-600">
                                Connecte-toi pour accéder à ta liste de médicaments, voir ceux que tu as pris aujourd’hui et gérer tes rappels.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-5 items-center">
                        <img className="h-7 w-7" src="icon/forme-abstraite2.png" alt="forme verte" />
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xl">Un espace sécurisé rien que pour toi</h4>
                            <p className="text-sm text-gray-600">
                                Ton espace est personnel et protégé. Reprends là où tu t’étais arrêté, en toute tranquillité.
                            </p>
                        </div>
                    </div>
                </div>
                <h3 className="text-xl font-bold mt-10 relative z-10">
                    Rappelle-moi.
                </h3>
            </div>


            {/* droite */}
            <div className="w-1/2 min-h-[400px] bg-white p-[5%] shadow-xl rounded-2xl flex flex-col items-center justify-center relative z-10">
                <h2 className="text-3xl font-bold ">Se connecter</h2>
                <p className="text-gray-600 text-sm mb-6"> Vous avez déjà un compte ?{" "}
                    <span
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={() => router.push("/inscription")}>
                        S'inscrire
                    </span>
                </p>
                <form onSubmit={connexionFn} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 rounded-md border border-gray-300"
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 rounded-md border border-gray-300"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                        Se connecter
                    </button>
                    <div className="border-t border-gray-300 my-4"></div>
                    <Button className="bg-white text-blac border border-gray-600 w-full justify-center hover:bg-gray-100 cursor-pointer"
                        onClick={connexionGoogle}>
                        <img src="icon/google-logo.png" alt="google"
                            className="w-5 h-5 " />
                        Google
                    </Button>
                </form>
            </div>
        </div>
    );
}

