import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
  return (
    <Card>
      <CardContent className="p-5 flex justify-between py-0">
        <div className="flex flex-col gap-2 py-3">
          <Badge className="bg-[#221C3D] hover:bg-[#221C3D] w-fit">
            Confirmado
          </Badge>
          <h2 className="font-bold">Corte de Cabelo</h2>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://utfs.io/f/a55f0f39-31a0-4819-8796-538d68cc2a0f-17o.png" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>

        <div className="flex items-center flex-col justify-center border-l border-solid border-secondary px-3">
          <p className="text-sm">Fevereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-sm">09:45</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
