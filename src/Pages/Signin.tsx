import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignup = async () => {
    const username = usernameRef.current?.value || "";
    const pass = passwordRef.current?.value || "";
    try {
      const response = await axios.post("http://localhost:3001/api/v1/signin", {
        username,
        pass,
      });
      const jwt = response.data.token;
      localStorage.setItem("tokennn", jwt);
      navigate("/dashboard");
    } catch (e: any) {
      console.error("❌ Signup error:", e.response?.data || e.message);
      alert(e.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="h-screen w-screen flex gap-1 justify-center items-center" style={{ backgroundColor: "#000000", color: "#ffffff" }}>
      <div className="bg-black-300 rounded-xl border min-w-48 p-8">
        <Input placeholder="Username" ref={usernameRef} />
        <Input placeholder="Password" ref={passwordRef} />
        <div className="flex justify-center pt-4">
          <Button 
            onClick={handleSignup}
            loading={false}
            variant="primary"
            size="md"
            text="Signup"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}
