import axios from "axios";
import { useState } from "react";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function signin(username: string, password: string) {

  }
}
