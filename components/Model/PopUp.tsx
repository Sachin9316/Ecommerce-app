// components/PopupModal.tsx
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface PopupModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  onConfirm?: () => void;
}

const PopupModal = ({ visible, onClose, title, message, onConfirm }: PopupModalProps) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title || "Alert"}</Text>
          <Text style={styles.message}>{message || "Are you sure?"}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            {onConfirm && (
              <TouchableOpacity
                onPress={() => {
                  onConfirm();
                  onClose();
                }}
                style={[styles.button, styles.confirmButton]}
              >
                <Text style={[styles.buttonText, { color: "#fff" }]}>Confirm</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
  confirmButton: {
    backgroundColor: "#565",
  },
  buttonText: {
    fontSize: 14,
  },
});

export default PopupModal;
