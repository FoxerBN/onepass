import Toast from "react-native-toast-message";

interface ValidateStepProps {
    currentStep: number;
    firstName: string;
    lastName: string;
    appNick: string;
    pin: string;
}

export const useValidateStep = ({
    currentStep,
    firstName,
    lastName,
    appNick,
    pin,
}: ValidateStepProps) => {
    const validateStep= () => {
        if (currentStep === 1) {
              if (!firstName.trim() || !lastName.trim()) {
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "Please enter both first and last names.",
                  position: "top",
                  visibilityTime: 3000,
                });
                return false;
              }
            } else if (currentStep === 2) {
              if (!appNick.trim()) {
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "Please enter an app nickname.",
                  position: "top",
                  visibilityTime: 3000,
                });
                return false;
              }
            } else if (currentStep === 3) {
              if (pin.length < 4) {
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "Please enter a PIN with at least 4 digits.",
                  position: "top",
                  visibilityTime: 3000,
                });
                return false;
              };
            }
            return true;
    };
    return{ validateStep }
}