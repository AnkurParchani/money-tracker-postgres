import Button from "@/components/Button";
import Input from "@/components/Input";
import { login } from "../../../lib/actions/users";

const page = () => {
  return (
    <div>
      <h1 className="text-3xl mb-5">Login Portal</h1>
      <form
        autoComplete="off"
        action={login}
        className="flex flex-col gap-5 mt-5"
      >
        <Input type="email" name="email" label="Email:" />
        <Input type="password" name="password" label="Password:" />

        <Button>Login</Button>
      </form>
    </div>
  );
};

export default page;
