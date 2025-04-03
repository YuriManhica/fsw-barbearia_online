"use client";
import { useState } from "react";
import PaymentForm from "./payment-form";

const PaymentButton = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="mt-6 w-fit px-4">
      <PaymentForm isOpen={open} setIsOpen={setOpen} />
    </div>
  );
};

export default PaymentButton;
