"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";


export default function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // Verifie si l'utilisateur est connecté
  // et redirige vers la page de connexion si ce n'est pas le cas
  useEffect(() => {
    const auth = getAuth();
    const stopObserver = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        router.push("/connexion");
      }
      setLoading(false);
    });

    return () => stopObserver();
  }, [router]);

  return { user, loading };
}
