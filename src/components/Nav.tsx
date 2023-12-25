import NavLink from "./NavLink";
import { getUser } from "../../lib/actions/users";
import LogoutBtn from "./LogoutBtn";

const Nav = async () => {
  const user = await getUser();

  return (
    <nav className="text-yellow-500 mb-5">
      <ul className="flex gap-4 text-2xl justify-end">
        {user ? (
          <>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/transactions">Transactions</NavLink>
            <NavLink href="/my-profile">My-Profile</NavLink>

            <LogoutBtn />
          </>
        ) : (
          <>
            <NavLink href="/register">Register</NavLink>
            <NavLink href="/login">Login</NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
