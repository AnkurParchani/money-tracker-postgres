import Heading from "@/components/Heading";
import { getUsers } from "../../lib/actions/users";

export default async function Home() {
  const users = await getUsers();

  return (
    <main className="">
      <Heading>Logging all Users</Heading>

      {users?.map((user) => {
        return (
          <div
            key={user.id}
            className="bg-gray-800 p-3 rounded-md my-3 text-yellow-200"
          >
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
          </div>
        );
      })}

      {(!users || !users?.length) && <h1>No user Found</h1>}
    </main>
  );
}
