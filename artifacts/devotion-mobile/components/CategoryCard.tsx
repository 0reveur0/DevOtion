import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import type { Category } from "@workspace/api-client-react";

interface CategoryCardProps {
  category: Category;
}

const CATEGORY_META: Record<
  string,
  { icon: string; color: string; bgColor: string }
> = {
  frontend: { icon: "layers", color: "#3b82f6", bgColor: "#eff6ff" },
  backend: { icon: "server", color: "#8b5cf6", bgColor: "#f5f3ff" },
  database: { icon: "disc", color: "#10b981", bgColor: "#ecfdf5" },
  devops: { icon: "git-branch", color: "#f97316", bgColor: "#fff7ed" },
  cloud: { icon: "cloud", color: "#0ea5e9", bgColor: "#f0f9ff" },
  mobile: { icon: "phone-portrait", color: "#ec4899", bgColor: "#fdf2f8" },
  ai: { icon: "sparkles", color: "#eab308", bgColor: "#fefce8" },
  testing: { icon: "checkmark-circle", color: "#ef4444", bgColor: "#fef2f2" },
  design: { icon: "color-palette", color: "#a855f7", bgColor: "#faf5ff" },
};

const DEFAULT_META = { icon: "cube", color: "#6b7280", bgColor: "#f9fafb" };

export function CategoryCard({ category }: CategoryCardProps) {
  const colors = useColors();
  const meta = CATEGORY_META[category.slug] ?? DEFAULT_META;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
      onPress={() => router.push(`/category/${category.slug}` as never)}
    >
      <View style={[styles.iconWrap, { backgroundColor: meta.bgColor }]}>
        <Ionicons
          name={meta.icon as never}
          size={22}
          color={meta.color}
        />
      </View>
      <Text
        style={[styles.name, { color: colors.foreground }]}
        numberOfLines={1}
      >
        {category.name}
      </Text>
      <Text style={[styles.count, { color: colors.mutedForeground }]}>
        {category.toolCount} tools
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    alignItems: "flex-start",
    gap: 8,
    minWidth: 0,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  count: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
});
