"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";



export function Param({ onModif ,onDelete, id }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer px-6">
        <img src="../icon/param.png" alt="button param" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() => onModif(id)}>Modifier</DropdownMenuItem> 
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onDelete(id)}>Supprimer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
