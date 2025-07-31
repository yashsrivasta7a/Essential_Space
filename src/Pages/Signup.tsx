import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";

export function SignupPage() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

  const handleSignup = async () => {
    const username = usernameRef.current?.value || "";
    const pass = passwordRef.current?.value || "";

    try {
      
      const response = await axios.post("http://localhost:3001/api/v1/signup", {
        username,
        pass,
      });

      alert(response.data.message);
      navigate("/signin");
    } catch (e: unknown) {
      const error = e as { response?: { data?: { message?: string } }; message?: string };
      console.error("❌ Signup error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input placeholder="Username" ref={usernameRef} />
        <Input placeholder="Password" ref={passwordRef}/>
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleSignup}
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

