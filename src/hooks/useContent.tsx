import axios from "axios";
import { useEffect, useState } from "react";

export function useContent() {
  const [contents, setContents] = useState([]);

  function refresh() {
    axios
      .get("http://localhost:3001/api/v1/content", {
        headers: {
          Authorization: localStorage.getItem("tokennn") || "",
        },
      })
      .then((res) => {
        setContents(res.data.content);
      })
      .catch((err) => {
        console.error("Error fetching content:", err);
      });
  }

  useEffect(() => {
      refresh();
    }, []);
  return {contents,refresh};
}
