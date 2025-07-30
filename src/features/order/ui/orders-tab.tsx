import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import type { OrderStatus } from "../type";

type OrdersTabProps = {
  active: OrderStatus;
  setActive: (status: OrderStatus) => void;
};

export default function OrdersTab({ active, setActive }: OrdersTabProps) {
  return (
    <div className="flex justify-center px-8">
      <div className="flex justify-center rounded-lg bg-background p-1 w-full  gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActive("duringOrder")}
          className={cn(
            "flex-1/2 py-2 transition-all hover:text-primary",
            active === "duringOrder"
              ? "bg-card shadow-sm font-medium text-primary"
              : "text-foreground/30"
          )}
        >
          <CheckCircle className="h-4 w-4" />
          فعال{" "}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActive("outOfOrder")}
          className={cn(
            "flex-1/2 py-2 transition-all hover:text-primary",
            active === "outOfOrder"
              ? "bg-card shadow-sm font-medium text-primary"
              : "text-foreground/30"
          )}
        >
          <XCircle className="h-4 w-4" />
          لغو شده
        </Button>
      </div>
    </div>
  );
}
