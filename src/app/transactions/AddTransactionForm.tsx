"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";

import { addTransaction } from "../../../lib/actions/transaction";
import { useRef } from "react";

const AddTransactionForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAddTransaction(e: FormData) {
    const success = await addTransaction(e);
    if (success) {
      formRef.current?.reset();
    }
  }

  return (
    <form
      autoComplete="off"
      ref={formRef}
      action={handleAddTransaction}
      className="flex flex-col gap-3 mt-5"
    >
      <Input required type="text" name="desc" label="Description:" />
      <Input required type="number" name="amount" label="Amount:" />

      <Select name="type" label="Type:" options={["withdraw", "deposit"]} />

      <Button>Add</Button>
    </form>
  );
};

export default AddTransactionForm;
