import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ToolCard } from "@/components/ToolCard";
import { useColors } from "@/hooks/useColors";
import { useListTools } from "@workspace/api-client-react";

const CATEGORY_LABELS: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  devops: "DevOps",
  cloud: "Cloud",
  mobile: "Mobile",
  ai: "AI / ML",
  testing: "Testing",
  design: "Design",
};

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

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const { data, isLoading, refetch, isRefetching } = useListTools({
    category: slug,
    limit: 50,
  });

  const tools = data?.tools ?? [];
  const categoryLabel = CATEGORY_LABELS[slug ?? ""] ?? (slug ?? "");
  const accentColor = CATEGORY_COLORS[slug ?? ""] ?? colors.primary;

  const ListHeader = (
    <View style={[styles.header, { paddingTop: topPad + 8 }]}>
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.6 : 1 }]}
      >
        <Ionicons name="arrow-back" size={22} color={colors.foreground} />
      </Pressable>
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: colors.foreground }]}>
          {categoryLabel}
        </Text>
        <View style={[styles.badge, { backgroundColor: accentColor + "18" }]}>
          <Text style={[styles.badgeText, { color: accentColor }]}>
            {tools.length} tools
          </Text>
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View
        style={[
          styles.centered,
          { backgroundColor: colors.background, paddingTop: topPad },
        ]}
      >
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={tools}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ToolCard tool={item} />}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="cube-outline"
              size={40}
              color={colors.mutedForeground}
            />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No tools in this category
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: bottomPad + 20 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
  },
});
