import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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
import { useGetStats, useListTools } from "@workspace/api-client-react";

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const {
    data: toolsData,
    isLoading,
    refetch,
    isRefetching,
  } = useListTools({ limit: 30 });

  const { data: statsData } = useGetStats();

  const tools = toolsData?.tools ?? [];
  const topRated = [...tools].sort((a, b) => b.avgRating - a.avgRating).slice(0, 10);
  const recent = tools.slice(0, 20);

  const topInset = Platform.OS === "web" ? 67 : insets.top;

  const ListHeader = (
    <View>
      <View
        style={[
          styles.header,
          { paddingTop: topInset + 12, backgroundColor: colors.background },
        ]}
      >
        <View>
          <Text style={[styles.wordmark, { color: colors.primary }]}>
            DevOtion
          </Text>
          <Text style={[styles.tagline, { color: colors.mutedForeground }]}>
            Honest dev tool reviews
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.searchBtn,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={() => router.push("/(tabs)/search" as never)}
        >
          <Ionicons name="search" size={18} color={colors.mutedForeground} />
        </Pressable>
      </View>

      {statsData && (
        <View
          style={[
            styles.statsRow,
            { borderColor: colors.border, backgroundColor: colors.card },
          ]}
        >
          <StatItem label="tools" value={statsData.totalTools} colors={colors} />
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <StatItem label="reviews" value={statsData.totalReviews} colors={colors} />
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <StatItem
            label="categories"
            value={statsData.totalCategories}
            colors={colors}
          />
        </View>
      )}

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Top Rated
        </Text>
        <Pressable onPress={() => router.push("/(tabs)/explore" as never)}>
          <Text style={[styles.sectionLink, { color: colors.primary }]}>
            Browse all →
          </Text>
        </Pressable>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View
        style={[styles.centered, { backgroundColor: colors.background, paddingTop: topInset }]}
      >
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={topRated.length ? topRated : recent}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ToolCard tool={item} />}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Ionicons name="cube-outline" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No tools found
            </Text>
          </View>
        }
        contentContainerStyle={[
          styles.list,
          {
            paddingBottom:
              Platform.OS === "web" ? 34 + 84 : insets.bottom + 90,
          },
        ]}
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

function StatItem({
  label,
  value,
  colors,
}: {
  label: string;
  value: number;
  colors: ReturnType<typeof useColors>;
}) {
  return (
    <View style={styles.statItem}>
      <Text style={[styles.statValue, { color: colors.primary }]}>
        {value.toLocaleString()}
      </Text>
      <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  wordmark: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 1,
  },
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 14,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    marginVertical: 4,
  },
  statValue: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  statLabel: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
  },
  sectionLink: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  list: {
    paddingTop: 4,
  },
});
