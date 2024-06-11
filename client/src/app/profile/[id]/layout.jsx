import PrivateRoute from "@/components/PrivateRoute";
import { Navbar } from "@/components/Navbar";
export default function Layout({ children }) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
