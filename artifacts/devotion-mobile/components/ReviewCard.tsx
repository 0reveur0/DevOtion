import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import {
  useRemoveUpvote,
  useUpvoteReview,
} from "@workspace/api-client-react";
import type { Review } from "@workspace/api-client-react";

interface ReviewCardProps {
  review: Review;
  currentUsername: string;
  onUpvoteChange?: () => void;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function ReviewCard({
  review,
  currentUsername,
  onUpvoteChange,
}: ReviewCardProps) {
  const colors = useColors();
  const [localUpvotes, setLocalUpvotes] = useState(review.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const { mutate: upvote, isPending: upvoting } = useUpvoteReview({
    mutation: {
      onSuccess: (data) => {
        setLocalUpvotes(data.upvotes);
        setHasUpvoted(true);
        onUpvoteChange?.();
      },
      onError: () => {
        setHasUpvoted(false);
      },
    },
  });

  const { mutate: removeUpvote, isPending: removingUpvote } = useRemoveUpvote({
    mutation: {
      onSuccess: (data) => {
        setLocalUpvotes(data.upvotes);
        setHasUpvoted(false);
        onUpvoteChange?.();
      },
    },
  });

  const isSelf = review.authorUsername === currentUsername;
  const isLoading = upvoting || removingUpvote;

  const handleUpvote = () => {
    if (isSelf || isLoading || !currentUsername) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (hasUpvoted) {
      removeUpvote({ id: review.id, data: { voterUsername: currentUsername } });
    } else {
      upvote({ id: review.id, data: { voterUsername: currentUsername } });
    }
  };

  const stars = Array.from({ length: 5 }, (_, i) => i < review.rating);

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>
            {review.authorUsername.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.authorInfo}>
          <Text style={[styles.author, { color: colors.foreground }]}>
            {review.authorUsername}
          </Text>
          <Text style={[styles.date, { color: colors.mutedForeground }]}>
            {formatDate(review.createdAt)}
          </Text>
        </View>
        <View style={styles.stars}>
          {stars.map((filled, i) => (
            <Ionicons
              key={i}
              name={filled ? "star" : "star-outline"}
              size={12}
              color={filled ? "#f59e0b" : "#d1d5db"}
            />
          ))}
        </View>
      </View>

      <Text style={[styles.title, { color: colors.foreground }]}>
        {review.title}
      </Text>
      <Text style={[styles.content, { color: colors.mutedForeground }]}>
        {review.content}
      </Text>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.upvoteBtn,
            {
              backgroundColor: hasUpvoted ? colors.accent : colors.secondary,
              borderColor: hasUpvoted ? colors.primary : colors.border,
              opacity: pressed || isSelf ? 0.6 : 1,
            },
          ]}
          onPress={handleUpvote}
          disabled={isSelf || isLoading || !currentUsername}
        >
          <Ionicons
            name={hasUpvoted ? "chevron-up-circle" : "chevron-up-circle-outline"}
            size={14}
            color={hasUpvoted ? colors.primary : colors.mutedForeground}
          />
          <Text
            style={[
              styles.upvoteText,
              {
                color: hasUpvoted ? colors.primary : colors.mutedForeground,
              },
            ]}
          >
            {localUpvotes}
          </Text>
        </Pressable>
        {isSelf && (
          <Text style={[styles.ownNote, { color: colors.mutedForeground }]}>
            your review
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 5,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  authorInfo: { flex: 1 },
  author: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  date: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    marginTop: 1,
  },
  stars: { flexDirection: "row", gap: 1 },
  title: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    lineHeight: 20,
  },
  content: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 19,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },
  upvoteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
  },
  upvoteText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  ownNote: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    fontStyle: "italic",
  },
});
