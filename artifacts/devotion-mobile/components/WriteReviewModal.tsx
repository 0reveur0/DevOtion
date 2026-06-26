import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useColors } from "@/hooks/useColors";
import { useCreateReview } from "@workspace/api-client-react";

interface WriteReviewModalProps {
  visible: boolean;
  toolSlug: string;
  toolName: string;
  username: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function WriteReviewModal({
  visible,
  toolSlug,
  toolName,
  username,
  onClose,
  onSuccess,
}: WriteReviewModalProps) {
  const colors = useColors();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const { mutate: createReview, isPending } = useCreateReview({
    mutation: {
      onSuccess: () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setRating(0);
        setTitle("");
        setContent("");
        setError("");
        onSuccess();
        onClose();
      },
      onError: (err: unknown) => {
        const e = err as { response?: { status?: number } };
        if (e?.response?.status === 409) {
          setError("You've already reviewed this tool.");
        } else {
          setError("Failed to submit review. Please try again.");
        }
      },
    },
  });

  const handleSubmit = () => {
    if (!rating) {
      setError("Please select a rating.");
      return;
    }
    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }
    if (!content.trim()) {
      setError("Please write your review.");
      return;
    }
    if (!username) {
      setError("Username not available. Please try again.");
      return;
    }
    setError("");
    createReview({
      data: {
        toolSlug,
        authorUsername: username,
        rating,
        title: title.trim(),
        content: content.trim(),
      },
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={[
            styles.sheet,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.handle} />

          <View style={styles.sheetHeader}>
            <Text style={[styles.sheetTitle, { color: colors.foreground }]}>
              Review {toolName}
            </Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={[styles.closeBtnText, { color: colors.mutedForeground }]}>
                ✕
              </Text>
            </Pressable>
          </View>

          <ScrollView
            style={styles.form}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={[styles.label, { color: colors.foreground }]}>
              Rating
            </Text>
            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Pressable
                  key={star}
                  onPress={() => {
                    setRating(star);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={styles.starBtn}
                >
                  <Text style={[styles.starEmoji, { opacity: star <= rating ? 1 : 0.25 }]}>
                    ★
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={[styles.label, { color: colors.foreground }]}>
              Title
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.foreground,
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                },
              ]}
              placeholder="One-line summary…"
              placeholderTextColor={colors.mutedForeground}
              value={title}
              onChangeText={setTitle}
              maxLength={80}
            />

            <Text style={[styles.label, { color: colors.foreground }]}>
              Review
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.textarea,
                {
                  color: colors.foreground,
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                },
              ]}
              placeholder="Share your experience…"
              placeholderTextColor={colors.mutedForeground}
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              maxLength={1000}
            />

            <Text style={[styles.byline, { color: colors.mutedForeground }]}>
              Posting as <Text style={{ fontFamily: "Inter_600SemiBold" }}>{username || "…"}</Text>
            </Text>

            {!!error && (
              <Text style={[styles.error, { color: colors.destructive }]}>
                {error}
              </Text>
            )}

            <Pressable
              style={({ pressed }) => [
                styles.submitBtn,
                {
                  backgroundColor: pressed ? "#1d4ed8" : colors.primary,
                  opacity: isPending ? 0.7 : 1,
                },
              ]}
              onPress={handleSubmit}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.submitText}>Submit Review</Text>
              )}
            </Pressable>

            <View style={{ height: 24 }} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingTop: 12,
    maxHeight: "90%",
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#d1d5db",
    alignSelf: "center",
    marginBottom: 12,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  sheetTitle: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
  closeBtn: { padding: 4 },
  closeBtnText: { fontSize: 16 },
  form: { paddingHorizontal: 20 },
  label: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 6,
    marginTop: 4,
  },
  starRow: {
    flexDirection: "row",
    marginBottom: 14,
    gap: 6,
  },
  starBtn: { padding: 2 },
  starEmoji: {
    fontSize: 32,
    color: "#f59e0b",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginBottom: 14,
  },
  textarea: {
    height: 100,
    paddingTop: 10,
  },
  byline: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginBottom: 12,
  },
  error: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginBottom: 12,
  },
  submitBtn: {
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#ffffff",
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
});
