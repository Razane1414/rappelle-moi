import { Button } from "../src/components/ui/button";
import { Card, CardContent, CardHeader } from "../src/components/ui/card";

export default function Page() {
    return (
      <div className="">
        <div className="h-screen rounded-2xl m-5 flex flex-col relative overflow-hidden">
            {/* Blobs en fond */}           
            <div className="absolute bottom-0 left-0 w-full h-64 bg-[#88CDFF] rounded-full blur-3xl opacity-70 z-0 transform scale-x-150"></div>
            <div className="absolute bottom-15 -left-10 w-96 h-96 bg-[#77FFB2] rounded-full blur-3xl opacity-70 z-0"></div>
            <div className="absolute bottom-15 -right-10 w-96 h-96 bg-[#77FFB2] rounded-full blur-3xl opacity-70 z-0"></div>
            <div className="absolute top-0 left-0 w-full h-64 bg-[#88CDFF] rounded-full blur-3xl opacity-15 z-0 transform "></div>


            <nav className="flex justify-between items-center p-4 relative z-10">
                <h1 className="text-2xl font-bold">Rappelle-Moi.</h1>
                <ul className="flex gap-4">
                    <li className="text-lg">Accueil</li>
                    <li className="text-lg">À propos</li>
                    <li className="text-lg">Fonctionnalités</li>
                    <li className="text-lg">Contact</li>
                </ul>
                <div className="flex gap-4">
                    <Button>Se connecter</Button>
                </div>
            </nav>

            <div className="flex flex-col items-center justify-center flex-grow relative z-10">
                <h2 className="text-4xl font-bold ">Rappelle-Moi : Ne ratez plus jamais un médicament.</h2>
                <p className="my-4 text-lg">
                    Grâce à Rappelle-Moi, recevez vos rappels personnalisés et restez serein chaque jour.<br />
                    Une application pensée pour vous soutenir et vous simplifier la vie, à chaque étape.
                </p>

                <div className="flex gap-4 mt-10">
                    <Button>C’est partie !</Button>
                    <Button>Comment ça marche ?</Button>
                </div>
            </div>

            <div className="flex mt-10 gap-4 p-7 pb-10 relative z-10">
                <Card className="w-1/3 flex flex-col justify-between items-center">
                    <CardContent className="flex flex-row items-center gap-4">
                        <div>
                            <img src="icon/verifier.svg" alt="check" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Simplicité</h3>  
                            <p className="text-sm">En quelques clics, on ajoute un médicament et on suit ses prises au quotidien.</p>
                        </div>
                    </CardContent>          
                </Card>      
                <Card className="w-1/3 flex flex-col justify-between items-center ">
                    <CardContent className="flex flex-row items-center gap-4">
                        <div>
                            <img src="icon/tonnerre.svg" alt="rapide" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Rapidité</h3>  
                            <p className="text-sm">Ajoutez, modifiez ou cochez une prise en un instant. Une interface fluide et intuitive.</p>
                        </div>
                    </CardContent>          
                </Card>  
                
                <Card className="w-1/3 flex flex-col justify-between items-center ">
                    <CardContent className="flex flex-row items-center gap-4">
                        <div>
                            <img src="icon/rappel.svg" alt="rappel"/>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Rappels fiables</h3>  
                            <p className="text-sm">Recevez vos rappels à l’heure prévue. Plus besoin de se poser de question.</p>
                        </div>
                    </CardContent>          
                </Card>   

            </div>
        </div>
      </div>
    );
  }
  