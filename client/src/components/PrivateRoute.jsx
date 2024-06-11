"use client"
import { useAppSelector } from "@/store/hooks/hooks.js";
import {useRouter} from "next/navigation";

export default function PrivateRoute({children}) {
  const { currentUser } = useAppSelector((state) => state.user);
  const router = useRouter();
  return currentUser ? children : router.push("/signin");
}
