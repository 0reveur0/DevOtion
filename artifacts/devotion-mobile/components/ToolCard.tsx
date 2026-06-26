import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import type { Tool } from "@workspace/api-client-react";

import { StarRating } from "./StarRating";

interface ToolCardProps {
  tool: Tool;
}

const CATEGORY_COLORS: Record<string, string> = {
  frontend: "#3b82f6",
  backend: "#8b5cf6",
  database: "#10b981",
  devops: "#f97316",
  cloud: "#0ea5e9",
  mobile: "#ec4899",
  ai: "#eab308",
  testing: "#ef4444",
  design: "#a855f7",
};

export function ToolCard({ tool }: ToolCardProps) {
  const colors = useColors();
  const accentColor = CATEGORY_COLORS[tool.category] ?? colors.primary;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: pressed ? colors.border : colors.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
      onPress={() => router.push(`/tool/${tool.slug}` as never)}
    >
      <View
        style={[styles.iconArea, { backgroundColor: accentColor + "18" }]}
      >
        <Text style={[styles.initial, { color: accentColor }]}>
          {tool.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[styles.name, { color: colors.foreground }]}
            numberOfLines={1}
          >
            {tool.name}
          </Text>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: accentColor + "18" },
            ]}
          >
            <Text style={[styles.categoryText, { color: accentColor }]}>
              {tool.category.toUpperCase()}
            </Text>
          </View>
        </View>
        <Text
          style={[styles.description, { color: colors.mutedForeground }]}
          numberOfLines={2}
        >
          {tool.description}
        </Text>
        <View style={styles.footer}>
          <StarRating rating={tool.avgRating} size={12} showNumber={false} />
          <Text style={[styles.meta, { color: colors.mutedForeground }]}>
            {"  "}
            {tool.avgRating.toFixed(1)} · {tool.totalReviews}{" "}
            {tool.totalReviews === 1 ? "review" : "reviews"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 5,
    padding: 14,
    gap: 12,
  },
  iconArea: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  initial: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  content: { flex: 1, gap: 4 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  name: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 9,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  footer: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  meta: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
});
