import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuItemResponse } from "../menu-item.types";

interface Props {
  menuItem: MenuItemResponse;
}

export const MenuItemCard = ({ menuItem }: Props) => {
  const disabled = !menuItem.active

  return (
    <Card
      className={cn(
        "group relative w-full h-80 overflow-hidden border-0 bg-transparent backdrop-blur-md", // Transparent base
        disabled && "grayscale-[0.8] opacity-70 pointer-events-none"
      )}
    >

      <div className="absolute inset-0 z-0 bg-muted/20">
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10 opacity-60" />

        <img
          src="/logo.svg"
          alt={menuItem.name}
          className={cn(
            "h-full w-full object-cover transition-transform duration-700 ease-out",
            "group-hover:scale-105",
            "object-cover"
          )}
        />
      </div>


      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <Badge
          className={cn(
            "backdrop-blur-md shadow-sm border-white/10 px-3",
            !menuItem.active
              ? "bg-destructive/80 text-white hover:bg-destructive/90"
              : "bg-emerald-500/80 text-white hover:bg-emerald-500/90"
          )}
        >
          {!menuItem.active ? "Inactive" : "Active"}
        </Badge>
      </div>

     
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className={cn(
          "flex flex-col gap-4 p-5",
          "bg-background/80 backdrop-blur-md", // The frost
          "border-t border-white/20",
          "transition-all duration-300",
          "group-hover:bg-background/90" // Slightly more solid on hover for readability
        )}>

          <div className="space-y-1">
            <h3 className="font-bold text-lg leading-tight truncate pr-2 text-foreground">
              {menuItem.name}
            </h3>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-primary">
                ${menuItem.price.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground">USD</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center bg-muted/50 border border-border/50 rounded-full shadow-sm">
              <Button
                variant="ghost"
                size="icon"
                disabled={disabled}
                className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="w-px h-3 bg-border" />

              <Button
                variant="ghost"
                size="icon"
                disabled={disabled}
                className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};