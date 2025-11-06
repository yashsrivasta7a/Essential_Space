import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "../components/ui/Toast";

export function useContent() {
  const [contents, setContents] = useState([]);
  const { error: showError } = useToast();

  function refresh() {
    axios
      .get("http://essential-space-backend.vercel.app/api/v1/content", {
        headers: {
          Authorization: localStorage.getItem("tokennn") || "",
        },
      })
      .then((res) => {
        setContents(res.data.content);
      })
      .catch((err) => {
        console.error("Error fetching content:", err);
        showError("Failed to load content");
      });
  }

  useEffect(() => {
      refresh();
    }, []);
  return {contents,refresh};
}
