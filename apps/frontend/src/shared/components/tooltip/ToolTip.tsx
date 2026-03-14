import Tippy from "@tippyjs/react";
import type { Placement } from "tippy.js";
import React, { useState, useEffect, type ReactNode } from "react";

interface ToolTipProps {
  id: string;
  content: ReactNode;
  placement?: Placement;
  step: number;
  children: ReactNode;
}

export const ToolTip: React.FC<ToolTipProps> = ({
  id,
  content,
  placement,
  step,
  children,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const currentStep = parseInt(
        localStorage.getItem("currentStep") || "1",
        10
      );
      const seenTooltips = new Set(
        JSON.parse(localStorage.getItem("seenTooltips") || "[]")
      );

      if (step === currentStep && !seenTooltips.has(id)) {
        setVisible(true);
      }
    };

    checkVisibility();

    window.addEventListener("tooltip-step-change", checkVisibility);

    return () => {
      window.removeEventListener("tooltip-step-change", checkVisibility);
    };
  }, [id, step]);

  const handleGotIt = () => {
    const seenTooltips = new Set(
      JSON.parse(localStorage.getItem("seenTooltips") || "[]")
    );
    const tooltipsByStep: Record<number, string[]> = JSON.parse(
      localStorage.getItem("tooltipsByStep") || "{}"
    );

    let currentStep = parseInt(localStorage.getItem("currentStep") || "1", 10);

    seenTooltips.add(id);
    localStorage.setItem("seenTooltips", JSON.stringify([...seenTooltips]));

    const stepTooltips = tooltipsByStep[currentStep] || [];
    const allSeen = stepTooltips.every((tipId) => seenTooltips.has(tipId));

    if (allSeen) {
      currentStep += 1;
      localStorage.setItem("currentStep", currentStep.toString());

      window.dispatchEvent(new Event("tooltip-step-change"));
    }

    setVisible(false);
  };

  return (
    <Tippy
      content={
        <div className="bg-card text-foreground rounded-lg p-3 shadow-lg max-w-xs text-sm">
          {typeof content === "string" ? (
            <p className="mb-2">{content}</p>
          ) : (
            content
          )}
          <button
            onClick={handleGotIt}
            className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded hover:bg-primary/80 transition-colors"
          >
            Got it!
          </button>
        </div>
      }
      className="bg-card! border! border-border! text-foreground!"
      placement={placement}
      arrow
      animation="fade"
      interactive
      visible={visible}
      trigger="manual"
    >
      <div className="inline-block">{children}</div>
    </Tippy>
  );
};