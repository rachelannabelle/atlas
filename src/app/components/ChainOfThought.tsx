import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import ExcelIcon from "../../imports/ExcelIcon";

interface ChainOfThoughtProps {
  steps: string[];
}

export function ChainOfThought({ steps }: ChainOfThoughtProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [allCompleted, setAllCompleted] = useState(false);
  const [isShimmering, setIsShimmering] = useState(true);

  // Prepend "Thinking" and "Searching for relevant files" as the first steps
  const allSteps = ["Thinking", "Searching for relevant files", ...steps];

  useEffect(() => {
    allSteps.forEach((step, index) => {
      // Show each step with shimmer
      setTimeout(() => {
        setCurrentStepIndex(index);
        setIsShimmering(true);
      }, index * 1500);

      // Complete the step (stop shimmer)
      setTimeout(() => {
        setIsShimmering(false);
        
        // If this is the last step, mark all as completed
        if (index === allSteps.length - 1) {
          setTimeout(() => {
            setAllCompleted(true);
          }, 300);
        }
      }, index * 1500 + 1000); // Shimmer for 1 second
    });
  }, []);

  const currentStep = allSteps[currentStepIndex];
  const fileCount = steps.length;

  // Check if current step is a file reading step
  const isFileStep = currentStep?.startsWith("Read ");

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {allCompleted ? (
            <>
              <span className="text-sm font-medium text-gray-700">
                Worked with {fileCount} files
              </span>
            </>
          ) : (
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {isFileStep && (
                <div className="size-4 shrink-0">
                  <ExcelIcon />
                </div>
              )}
              <span
                className={`text-sm ${
                  isShimmering ? "shimmer-text" : "text-gray-700"
                } truncate`}
              >
                {currentStep}
              </span>
            </div>
          )}
        </div>
        {allCompleted && (
          isOpen ? (
            <ChevronDown className="size-4 text-gray-500 shrink-0 ml-2" />
          ) : (
            <ChevronRight className="size-4 text-gray-500 shrink-0 ml-2" />
          )
        )}
      </button>

      {isOpen && allCompleted && (
        <div className="pl-4 pb-4 space-y-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm"
            >
              <div className="size-4 shrink-0">
                <ExcelIcon />
              </div>
              <span className="text-gray-700">
                {step}
              </span>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            #9ca3af 0%,
            #d1d5db 50%,
            #9ca3af 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
}