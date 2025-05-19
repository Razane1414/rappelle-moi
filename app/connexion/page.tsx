"use client";
import { useRouter } from "next/navigation";    
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/lib/firebase";


export default function Connexion() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

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

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#407BFF] to-[#A4C8FF]">
            <h1 className="text-4xl font-bold mb-6">Connexion</h1>
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
            </form>
        </div>
    );
}

