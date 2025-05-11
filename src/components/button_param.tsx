// components/button_param.js
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export function Param({ onDelete, id }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Param</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>Modifier</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onDelete(id)}>Supprimer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
