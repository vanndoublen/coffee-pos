import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductResponse } from "../product.types";

interface Props {
  product: ProductResponse;
}

export const ProductCard = ({ product }: Props) => {
  const disabled = !product.active 

  return (
    <Card
      className={cn(
        "group relative w-full h-80 overflow-hidden border-0 bg-transparent backdrop-blur-md", // Transparent base
        disabled && "grayscale-[0.8] opacity-70 pointer-events-none"
      )}
    >
      {/* 
        LAYER 1: The Image (Background) 
        This sits behind everything. We use 'group-hover' to zoom it.
      */}
      <div className="absolute inset-0 z-0 bg-muted/20">
        {/* 
           Using a gradient background behind the image in case the logo is transparent/small 
           It adds depth so it doesn't look flat.
        */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10 opacity-60" />
        
        <img
          src="/logo.svg" 
          alt={product.name}
          className={cn(
            "h-full w-full object-cover transition-transform duration-700 ease-out",
            "group-hover:scale-105", // The smooth zoom effect
             // If using a logo, you might prefer 'object-contain p-8' instead of 'object-cover'
             // depending on your image aspect ratios.
             "object-cover" 
          )}
        />
      </div>

      {/* 
         LAYER 2: Floating Status Badge (Top)
         Sits on top of the image
      */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
         {/* Active Badge */}
         <Badge 
           className={cn(
             "backdrop-blur-md shadow-sm border-white/10 px-3",
             !product.active 
                ? "bg-destructive/80 text-white hover:bg-destructive/90" 
                  : "bg-emerald-500/80 text-white hover:bg-emerald-500/90"
           )}
         >
           {!product.active ? "Inactive" : "Active"}
         </Badge>
      </div>

      {/* 
        LAYER 3: The Glass Panel (Bottom)
        Holds all the info. The backdrop-blur-md creates the frost effect over the image.
      */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* The Glass Container */}
        <div className={cn(
          "flex flex-col gap-4 p-5",
          "bg-background/80 backdrop-blur-md", // The frost
          "border-t border-white/20",
          "transition-all duration-300",
          "group-hover:bg-background/90" // Slightly more solid on hover for readability
        )}>
          
          {/* Title & Price Row */}
          <div className="space-y-1">
            <h3 className="font-bold text-lg leading-tight truncate pr-2 text-foreground">
              {product.name}
            </h3>
            
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-primary">
                ${product.price.toFixed(2)}
              </span>
              {/* Optional previous price or unit */}
              <span className="text-xs text-muted-foreground">USD</span>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between pt-2">
            {/* The Control Pill (Reused from previous, tweaked for small space) */}
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