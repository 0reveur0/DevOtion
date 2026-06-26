import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
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

import { ReviewCard } from "@/components/ReviewCard";
import { StarRating } from "@/components/StarRating";
import { WriteReviewModal } from "@/components/WriteReviewModal";
import { useColors } from "@/hooks/useColors";
import { useUsername } from "@/hooks/useUsername";
import {
  useGetTool,
  useFetchToolReviews,
} from "@workspace/api-client-react";

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

export default function ToolDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { username } = useUsername();
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const {
    data: toolData,
    isLoading: toolLoading,
    error: toolError,
  } = useGetTool(slug ?? "");

  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    refetch: refetchReviews,
    isRefetching,
  } = useFetchToolReviews(slug ?? "");

  const tool = toolData?.tool;
  const reviews = reviewsData?.reviews ?? [];
  const accentColor = tool ? (CATEGORY_COLORS[tool.category] ?? colors.primary) : colors.primary;

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  if (toolLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background, paddingTop: topPad }]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (toolError || !tool) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background, paddingTop: topPad }]}>
        <Ionicons name="alert-circle-outline" size={40} color={colors.destructive} />
        <Text style={[styles.errorText, { color: colors.mutedForeground }]}>
          Tool not found
        </Text>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={[styles.backBtnText, { color: colors.primary }]}>← Go back</Text>
        </Pressable>
      </View>
    );
  }

  const ListHeader = (
    <View>
      <View
        style={[
          styles.hero,
          { paddingTop: topPad + 8, backgroundColor: colors.background },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backArrow, { opacity: pressed ? 0.6 : 1 }]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.foreground} />
        </Pressable>
      </View>

      <View style={styles.toolHeader}>
        <View style={[styles.toolIcon, { backgroundColor: accentColor + "18" }]}>
          <Text style={[styles.toolInitial, { color: accentColor }]}>
            {tool.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.toolInfo}>
          <Text style={[styles.toolName, { color: colors.foreground }]}>
            {tool.name}
          </Text>
          <View style={[styles.categoryPill, { backgroundColor: accentColor + "18" }]}>
            <Text style={[styles.categoryPillText, { color: accentColor }]}>
              {tool.category.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.statsBar, { borderColor: colors.border }]}>
        <View style={styles.statItem}>
          <StarRating rating={tool.avgRating} size={16} showNumber={false} />
          <Text style={[styles.statVal, { color: colors.foreground }]}>
            {tool.avgRating.toFixed(1)}
          </Text>
          <Text style={[styles.statLbl, { color: colors.mutedForeground }]}>avg rating</Text>
        </View>
        <View style={[styles.statDiv, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statVal, { color: colors.foreground }]}>
            {tool.totalReviews}
          </Text>
          <Text style={[styles.statLbl, { color: colors.mutedForeground }]}>reviews</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>About</Text>
        <Text style={[styles.description, { color: colors.mutedForeground }]}>
          {tool.description}
        </Text>
      </View>

      {(tool.websiteUrl || tool.githubUrl) && (
        <View style={styles.links}>
          {tool.websiteUrl && (
            <Pressable
              style={({ pressed }) => [
                styles.linkBtn,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              onPress={() => WebBrowser.openBrowserAsync(tool.websiteUrl!)}
            >
              <Ionicons name="globe-outline" size={16} color={colors.primary} />
              <Text style={[styles.linkBtnText, { color: colors.primary }]}>
                Website
              </Text>
            </Pressable>
          )}
          {tool.githubUrl && (
            <Pressable
              style={({ pressed }) => [
                styles.linkBtn,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              onPress={() => WebBrowser.openBrowserAsync(tool.githubUrl!)}
            >
              <Ionicons name="logo-github" size={16} color={colors.foreground} />
              <Text style={[styles.linkBtnText, { color: colors.foreground }]}>
                GitHub
              </Text>
            </Pressable>
          )}
        </View>
      )}

      <View style={styles.reviewsHeader}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Reviews ({reviews.length})
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.writeBtn,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setReviewModalVisible(true);
          }}
        >
          <Ionicons name="add" size={16} color="#fff" />
          <Text style={styles.writeBtnText}>Write Review</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReviewCard
            review={item}
            currentUsername={username}
            onUpvoteChange={refetchReviews}
          />
        )}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          reviewsLoading ? (
            <View style={styles.centered}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
            <View style={[styles.emptyReviews]}>
              <Ionicons
                name="chatbubble-outline"
                size={36}
                color={colors.mutedForeground}
              />
              <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
                No reviews yet. Be the first!
              </Text>
            </View>
          )
        }
        contentContainerStyle={{ paddingBottom: bottomPad + 20 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetchReviews}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <WriteReviewModal
        visible={reviewModalVisible}
        toolSlug={slug ?? ""}
        toolName={tool.name}
        username={username}
        onClose={() => setReviewModalVisible(false)}
        onSuccess={() => refetchReviews()}
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
    gap: 12,
    paddingVertical: 40,
  },
  errorText: { fontSize: 15, fontFamily: "Inter_400Regular" },
  backBtn: { padding: 8 },
  backBtnText: { fontSize: 15, fontFamily: "Inter_500Medium" },

  hero: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  backArrow: { width: 36, height: 36, justifyContent: "center" },

  toolHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 14,
    paddingBottom: 16,
  },
  toolIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  toolInitial: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
  },
  toolInfo: { flex: 1, gap: 6 },
  toolName: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.3,
  },
  categoryPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  categoryPillText: {
    fontSize: 10,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.5,
  },

  statsBar: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 3,
  },
  statDiv: {
    width: 1,
    marginVertical: 4,
  },
  statVal: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginTop: 4,
  },
  statLbl: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },

  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 6,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
  },
  description: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 21,
  },

  links: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 20,
  },
  linkBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
  },
  linkBtnText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },

  reviewsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  writeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  writeBtnText: {
    color: "#ffffff",
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },

  emptyReviews: {
    alignItems: "center",
    paddingVertical: 40,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
});
