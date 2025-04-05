import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";
import { useProfileSettings } from "../../../hooks/useProfileSettings";

import ChangeNicknameSection from "../../../components/ProfileSettings/ChangeNicknameSection";
import ChangePinSection from "../../../components/ProfileSettings/ChangePinSection";
import ChangeEncryptionPinSection from "../../../components/ProfileSettings/ChangeEncryptionPinSection";
import ChangeProfilePhotoSection from "../../../components/ProfileSettings/ChangeProfilePhotoSection";

export default function ProfileSettingsScreen() {
  const {
    input,
    setInput,
    handleNicknameConfirm,
    handlePinConfirm,
    handleEncPinConfirm,
    handlePickImage,
    handlePhotoConfirm,
  } = useProfileSettings();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.mainTitle}>Profile Settings</Text>

      <ChangeNicknameSection
        nicknameInput={input.nickname}
        setNicknameInput={(val) =>
          setInput((prev) => ({ ...prev, nickname: val }))
        }
        onConfirmNickname={handleNicknameConfirm}
        nicknameMessage={""}
      />

      <ChangePinSection
        oldPinInput={input.oldPin}
        setOldPinInput={(val) => setInput((prev) => ({ ...prev, oldPin: val }))}
        newPinInput={input.newPin}
        setNewPinInput={(val) => setInput((prev) => ({ ...prev, newPin: val }))}
        confirmNewPinInput={input.confirmPin}
        setConfirmNewPinInput={(val) =>
          setInput((prev) => ({ ...prev, confirmPin: val }))
        }
        onConfirmPin={handlePinConfirm}
        pinMessage={""}
      />

      <ChangeEncryptionPinSection
        oldEncPinInput={input.oldEncPin}
        setOldEncPinInput={(val) =>
          setInput((prev) => ({ ...prev, oldEncPin: val }))
        }
        newEncPinInput={input.newEncPin}
        setNewEncPinInput={(val) =>
          setInput((prev) => ({ ...prev, newEncPin: val }))
        }
        confirmNewEncPinInput={input.confirmEncPin}
        setConfirmNewEncPinInput={(val) =>
          setInput((prev) => ({ ...prev, confirmEncPin: val }))
        }
        onConfirmEncPin={handleEncPinConfirm}
        encPinMessage={""}
      />

      <ChangeProfilePhotoSection
        photo={input.photo}
        setPhoto={(val) => setInput((prev) => ({ ...prev, photo: val }))}
        onConfirmPhoto={handlePhotoConfirm}
        onPickImage={handlePickImage}
        photoMessage={""}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "SpaceMono",
  },
});
