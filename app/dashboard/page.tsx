import { Button } from "../../src/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../src/components/ui/card";
import { db } from "../../src/lib/firebase";

export default function Dashboard() {
    return (
        <div className="flex flex-col p-[5%]">
            <h3 className="text-4xl mb-[5%]">Alors maman ? tu as pris tes medicaments aujourd'hui ?</h3>
            <div className="flex">
                <Card className="w-1/2 flex flex-col justify-between items-center p-4 mr-2">
                    <CardContent className="">
                        01
                    </CardContent>
                    <CardFooter className="">
                        Déjà pris
                    </CardFooter>
                </Card>

                <Card className="w-1/2 flex flex-col justify-between items-center p-4">
                    <CardContent className="">
                        02
                    </CardContent>
                    <CardFooter className="">
                        A prendre
                    </CardFooter>
                </Card>
            </div>

            <div className="flex flex-col w-full items-center justify-center mt-4 gap-4">
                <Card className="w-full flex flex-row justify-between items-center p-4">
                    <div>
                        <CardHeader className="">
                            <h3 className="text-2xl font-bold">Medicament Name</h3>
                        </CardHeader>
                        <CardContent className="">
                            <p className="text-lg">Heure de prise : 12h00</p>
                        </CardContent>
                    </div>
                    <div className="flex gap-2">
                        <Button>Oublié</Button>
                        <Button>Pris</Button>
                    </div>
                </Card>
                <Card className="w-full flex flex-row justify-between items-center p-4">
                    <div>
                        <CardHeader className="">
                            <h3 className="text-2xl font-bold">Medicament Name</h3>
                        </CardHeader>
                        <CardContent className="">
                            <p className="text-lg">Heure de prise : 12h00</p>
                        </CardContent>
                    </div>
                    <div className="flex gap-2">
                        <Button>Oublié</Button>
                        <Button>Pris</Button>
                    </div>
                </Card>

            </div>
               
        </div>
    );
}