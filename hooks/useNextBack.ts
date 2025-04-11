import { useCallback } from "react";
import Toast from "react-native-toast-message";
interface UseNextBackProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  validateStep: () => boolean;
  onFinalStep: () => Promise<void>;
  totalSteps?: number;
}
export const useNextBack = ({
  currentStep,
  setCurrentStep,
  validateStep,
  onFinalStep,
  totalSteps = 3,
}: UseNextBackProps) => {
  const handleNext = useCallback(async () => {
    if (!validateStep()) return;

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      await onFinalStep();
    }
  }, [currentStep, validateStep, onFinalStep, setCurrentStep, totalSteps]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, setCurrentStep]);

  return {
    handleNext,
    handleBack,
    isFirstStep: currentStep === 1,
    isFinalStep: currentStep === totalSteps,
  };
};
