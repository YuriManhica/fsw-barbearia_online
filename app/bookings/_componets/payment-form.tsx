import { Button } from "@/app/_components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/app/_components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface PaymentFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
//valida formulário
const formSchema = z.object({
  number: z
    .string()
    .trim()
    .min(1, { message: "O telefone é obrigatório" })
    .regex(/^\d{0,15}$/, { message: "Número de telefone inválido" }),
});

type FormData = z.infer<typeof formSchema>;
const PaymentForm = ({ isOpen, setIsOpen }: PaymentFormProps) => {
  const { data } = useSession();
  const [isPending, startTransition] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: "",
    },
    shouldUnregister: true,
  });

  //const subTotalFormatted = formatCurrencyWithoutSymbol(Number(subTotal));

  //método pagamento com m-pesa
  const handlePayment = async (phoneNumber: string) => {
    try {
      const response = await fetch("/api/mpesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: 100,
          reference: "mAnHiCA",
          wallet_id: "494956", // Substitua pelo ID real da carteira
        }),
      });

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Erro inesperado", error);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      startTransition(true);
      const paymentSuccess = await handlePayment(data.number);

      // Se o pagamento falhar, a execução do código é interrompida
      if (!paymentSuccess) {
        toast.error(
          "Ocorreu um erro ao finalizar o seu pagamento com M-Pesa.",
          {
            style: { background: "white", color: "red" },
            icon: "⛔",
          }
        );
        startTransition(false);
        return; // Impede a continuação da execução
      }

      toast.success("O seu pagamento foi realizado com sucesso.", {
        style: { background: "white", color: "green" },
        icon: "✅",
      });
      startTransition(false);
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro inesperado. Tente novamente mais tarde.", {
        style: { background: "white", color: "orange" },
        icon: "⚠️",
      });
      startTransition(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full ">Finalizar Pagamento</Button>
      </DrawerTrigger>
      <DrawerContent className="flex justify-center w-full">
        <div className="mb-4 mt-4">
          <DrawerHeader>
            <DrawerTitle className="text-center font-bold text-primary text-2xl mb-2">
              Finalizar Pagamento
            </DrawerTitle>
            <DrawerDescription className="text-center">
              Nota: no nosso sistema somente aceita-se pagamentos com o
              Eco-Sistema{" "}
              <span className="text-red-500 text-md font-semibold">
                M-PESA{" "}
              </span>{" "}
              insira os dados solicitados para prosseguir
            </DrawerDescription>
            <div className="pt-4 flex justify-center w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-4 w-full px-8"
                >
                  <div className="text-sm">
                    Olá, {data?.user?.name}! Por favor, insira o seu número de
                    telefone.
                  </div>
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="focus:outline-none !border-zinc-400"
                            placeholder="Digite seu Numero"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="text-center font-semibold text-md pt-4">
                    <span> Total a Pagar: {""}</span>
                    <span className="text-red-500">
                      {/* Adicione o preço total do pedido */}
                      $100.00
                    </span>
                  </p>

                  <div className="flex gap-4 justify-center pt-4">
                    <Button className="px-4" type="submit" disabled={isPending}>
                      {isPending ? "Processando..." : "Pagar com M-Pesa"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PaymentForm;
