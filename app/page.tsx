import { Button } from "../src/components/ui/button";
import { Card, CardContent } from "../src/components/ui/card";

export default function Page() {
    return (
      <div className="">
        {/* hero section here */}
        <div className="h-screen rounded-2xl m-5 flex flex-col relative overflow-hidden">
            {/* Blobs en fond */}           
            <div className="absolute bottom-0 left-0 w-full h-64 bg-[#88CDFF] rounded-full blur-3xl opacity-70 z-0 transform scale-x-150"></div>
            <div className="absolute bottom-15 -left-10 w-96 h-96 bg-[#77FFB2] rounded-full blur-3xl opacity-70 z-0"></div>
            <div className="absolute bottom-15 -right-10 w-96 h-96 bg-[#77FFB2] rounded-full blur-3xl opacity-70 z-0"></div>
            <div className="absolute top-0 left-0 w-full h-64 bg-[#88CDFF] rounded-full blur-3xl opacity-15 z-0 transform "></div>


            <nav className="flex justify-between items-center p-4 relative z-10">
                <h1 className="text-2xl font-bold">Rappelle-Moi.</h1>
                <ul className="flex gap-4">
                    <li className="text-md">Accueil</li>
                    <li className="text-md">À propos</li>
                    <li className="text-md">Fonctionnalités</li>
                    <li className="text-md">Contact</li>
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
                <Card className="w-1/3 flex flex-col justify-between items-center bg-white/20 backdrop-blur-md shadow-xl">
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
                <Card className="w-1/3 flex flex-col justify-between items-center bg-white/20 backdrop-blur-md shadow-xl">
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
                
                <Card className="w-1/3 flex flex-col justify-between items-center bg-white/20 backdrop-blur-md shadow-xl">
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



        <div className="mx-[10%] mt-[5%] flex flex-col">
            {/* A propos HERE*/}
            <div className="flex flex-row my-[10%] gap-20">
                <div className="w-1/2 ">
                    <img src="img/oublie.png" alt="medicament" className="h-full"/>
                </div>
                <div className="w-1/2 flex flex-col">
                    <h2 className="text-4xl font-bold">Ne ratez plus jamais un médicament.</h2>
                    <p className="my-4 text-lg  max-w-2xl">
                        Tout a commencé avec ma mère, qui oubliait souvent de prendre ses médicaments.Rien de grave… sauf quand ça devient quotidien. 
                        Il fallait lui rappeler,et souvent vérifier. Et je me suis dit : “Pourquoi ne pas créer une application simple, faite pour elle ?”
                        Rappelle-Moi est né de là. Un projet personnel, que j’ai construit dans le cadre de mes études, avec une idée claire :
                        Créer une app accessible, douce, utile, qui ne complique pas les choses mais qui les rend plus faciles. 
                        Parce qu’un simple rappel au bon moment, ça peut vraiment faire la différence.
                    </p>
                    <Button className="w-fit self-start">C’est partie !</Button>
                </div>
            </div>

            {/* fonctionnalité */}
            <Card className="bg-gradient-to-b from-[#88C8FF] to-[#ffffff] my-[5%]">
                <CardContent className="flex flex-row justify-between items-center gap-4 items-stretch">
                    <Card className={"w-1/4 flex flex-col bg-white/20 backdrop-blur-md shadow-xl min-h-[350px]" }>
                        <CardContent className="flex flex-col gap-4 flex-1 justify-end">
                            <div className="flex justify-center items-center ">
                                <img src="img/medic.png" alt="medicaments" />
                            </div>
                            <h5>Ajout & gestion des médicaments</h5>
                            <p className="text-sm">Ajoutez un traitement en quelques secondes, choisissez l’heure de prise et laissez l’application s’en charger. Simple, rapide et efficace.</p>
                        </CardContent>
                    </Card>
                    <Card className={"w-1/4 flex flex-col bg-white/20 backdrop-blur-md shadow-xl min-h-[350px]"}>
                        <CardContent className="flex flex-col gap-4 flex-1 justify-end">
                            <div className="flex justify-center items-center ">
                                <img src="img/push.png" alt="push" />
                            </div>
                            <h5>Rappels & notifications</h5>
                            <p className="text-sm">Recevez une alerte au bon moment. Plus besoin d’y penser, Rappelle-Moi vous le rappelle.</p>
                        </CardContent>
                    </Card>
                    <Card className={"w-1/4 flex flex-col bg-white/20 backdrop-blur-md shadow-xl min-h-[350px]"}>
                        <CardContent className="flex flex-col gap-4 flex-1 justify-end">
                            <div className="flex justify-center items-center ">
                                <img src="img/checklist.png" alt="checklist" />
                            </div>
                            <h5>Suivi de prise</h5>
                            <p className="text-sm">Un bouton suffit pour marquer un médicament comme “pris” ou “oublié”. Le statut s’affiche pour mieux suivre la journée.</p>
                        </CardContent>
                    </Card>
                    <Card className={"w-1/4 flex flex-col bg-white/20 backdrop-blur-md shadow-xl min-h-[350px]"}>
                        <CardContent className="flex flex-col gap-4 flex-1 justify-end">
                            <div className="flex justify-center items-center ">
                                <img src="img/solidarity.png" alt="check" />
                            </div>
                            <h5>Adaptée à tous</h5>
                            <p className="text-sm">Pensée pour les proches, les familles, les personnes âgées : une interface claire, lisible et accessible à tous.</p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>


            {/* Contact HERE */}
            <div className="flex flex-row gap-20 my-[15%]">
                <div className="w-1/2 flex flex-col">
                    <p className="text-sm">/GET IN TOUCH/</p>
                    <h2 className="text-4xl font-bold">Contactez-moi</h2>
                    <p className="my-4 text-lg max-w-2xl">
                        Ce projet a été réalisé dans le cadre de mes études en développement web.
                        Je suis toujours curieuse d’avoir des retours, des idées ou des conseils.
                    </p>
                    <div className="flex flex-row gap-10 mt-10">
                        <div className="flex flex-col gap-2">
                            <p className="text-lg">Email</p>
                            <p className="text-sm">razanefeggous@gmail.com</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-lg">Réseaux sociaux</p>
                            <p className="text-sm">Linkedin</p>
                            <p className="text-sm">Github</p>
                            <p className="text-sm">Portfolio</p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 ">
                    <Card className="bg-gradient-to-b from-[#88C8FF] to-[#ffffff] ">
                        <CardContent className="flex flex-col gap-4 m-10">
                            <h5>Restons en contact</h5>
                            <p className="text-sm">Vous pouvez aussi m’écrire directement via le formulaire de contact. Je vous répondrai dès que possible.</p>
                            <form className="flex flex-col gap-4 ">
                                <input type="text" placeholder="Nom" className="border-b border-black p-2" />
                                <input type="email" placeholder="Email" className="border-b border-black p-2" />
                                <textarea placeholder="Message" className="border-b border-black p-2"></textarea>
                                <Button type="submit" className="w-fit self-start">Envoyer</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
        {/* footer HERE */}
        <footer className="flex justify-center items-center h-20 bg-[#88C8FF] rounded-t-2xl mt-[5%]">
            <p className="text-sm">© 2023 Rappelle-Moi. Tous droits réservés.</p>
        </footer>
      </div>
    );
  }
  