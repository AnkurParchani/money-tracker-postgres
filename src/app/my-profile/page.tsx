import Heading from "@/components/Heading";
import Input from "@/components/Input";

import { getUser, deleteUser, updateUser } from "../../../lib/actions/users";
import { getBio, updateBio } from "../../../lib/actions/bio";

const page = async () => {
  const user = await getUser();
  const bio = await getBio();

  return (
    <div className="mt-10">
      {/* Showing users */}
      {user ? (
        <>
          <div className="flex flex-col gap-2  bg-gray-900 px-4 py-3 rounded-sm">
            <Heading>My Account:- </Heading>

            <h1>UserId: {user.id}</h1>
            <h1>Name: {user.name}</h1>
            <h1>Email: {user.email}</h1>
          </div>

          <hr />

          {/* Delete account form */}
          <div className="mt-5 bg-gray-900 px-4 py-3 rounded-sm">
            <form action={updateUser} className="flex gap-3 flex-col">
              <Heading>Update Account</Heading>

              <Input
                type="text"
                label="Name:"
                name="name"
                required
                defaultValue={user.name as string}
              />

              <Input
                type="email"
                label="Email:"
                name="email"
                required
                defaultValue={user.email as string}
              />

              <button className="bg-green-700 rounded-md hover:bg-green-600 self-end duration-100 px-2.5 ml-3 py-1 text-gray-300">
                Update
              </button>
            </form>
          </div>

          <hr />

          {/* Details about user */}
          <div className="flex mt-10 flex-col gap-2  bg-gray-900 px-4 py-3 rounded-sm">
            <form action={updateBio} className="flex flex-col">
              <Heading>Bio about {user.name}:- </Heading>

              <textarea
                className="bg-black text-white px-2 py-1"
                name="bio"
                defaultValue={(bio && bio.bio) || ""}
                rows={5}
              />

              <button className="bg-blue-700 rounded-md hover:bg-blue-600 duration-100 px-2.5 ml-3 py-1 text-gray-300 self-end mt-5">
                Update
              </button>
            </form>
          </div>

          <hr />

          {/* Update account form */}
          <div className="mt-5 bg-gray-900 px-4 py-3 rounded-sm">
            <form action={deleteUser}>
              <Heading>Delete Account</Heading>
              <Input
                required
                type="password"
                label="Password:"
                name="password"
              />

              <button className="bg-red-700 rounded-md hover:bg-red-600 duration-100 px-2.5 ml-3 py-1 text-gray-300">
                Delete
              </button>
            </form>
          </div>

          <hr />
        </>
      ) : (
        <>
          <h1>Kindly login to see your profile</h1>
        </>
      )}
    </div>
  );
};

export default page;
