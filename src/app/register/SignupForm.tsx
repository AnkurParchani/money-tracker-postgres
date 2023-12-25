"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";

import { signup } from "../../../lib/actions/users";
import { addBio } from "../../../lib/actions/bio";

const SignupForm = () => {
  async function handleSubmit(e: FormData) {
    await signup(e);
    await addBio(e);
  }

  return (
    <form
      autoComplete="off"
      action={handleSubmit}
      className="flex flex-col gap-5 mt-5"
    >
      <Input type="text" name="name" label="Name:" />
      <Input type="email" name="email" label="Email:" />
      <Input type="password" name="password" label="Password:" />

      <h1 className="text-lg">Write a short Bio for yourself:- </h1>
      <label className="text-white flex">
        Bio:
        <textarea
          className="bg-black text-white ml-3 px-2 py-1"
          name="bio"
          cols={30}
          rows={10}
        />
      </label>

      <Button>Sign Up</Button>
    </form>
  );
};

export default SignupForm;
