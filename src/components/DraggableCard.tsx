import { useEffect, useRef } from "react";
import { Card } from "./ui/Card";

interface DraggableCardProps {
  id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
  index?: number;
  refresh: () => void;
}

export function DraggableCard(props: DraggableCardProps) {
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = dragRef.current;
    if (!card) return;

    card.style.position = "absolute";
    card.style.left = `${50 + (props.index || 0) * 20}px`;
    card.style.top = `${50 + (props.index || 0) * 20}px`;
    card.style.cursor = "grab";
    card.style.userSelect = "none";

    let startX = 0,
      startY = 0;

    function mouseDown(e: MouseEvent) {
      startX = e.clientX;
      startY = e.clientY;

      card.style.cursor = "grabbing";

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
      e.preventDefault();
    }

    function mouseMove(e: MouseEvent) {
      const newX = startX - e.clientX;
      const newY = startY - e.clientY;

      startX = e.clientX;
      startY = e.clientY;

      card.style.top = card.offsetTop - newY + "px";
      card.style.left = card.offsetLeft - newX + "px";
    }

    function mouseUp() {
      card.style.cursor = "grab";

      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    }

    card.addEventListener("mousedown", mouseDown);

    return () => {
      card.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
  }, [props.index]);

  return (
    <div ref={dragRef}>
      <Card {...props} />
    </div>
  );
}
