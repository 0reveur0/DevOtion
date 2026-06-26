import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ToolCard } from "@/components/ToolCard";
import { useColors } from "@/hooks/useColors";
import { useListTools } from "@workspace/api-client-react";

export default function SearchScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topInset = Platform.OS === "web" ? 67 : insets.top;

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined
  );

  const CATEGORIES = [
    { slug: "frontend", label: "Frontend" },
    { slug: "backend", label: "Backend" },
    { slug: "database", label: "DB" },
    { slug: "devops", label: "DevOps" },
    { slug: "cloud", label: "Cloud" },
    { slug: "mobile", label: "Mobile" },
    { slug: "ai", label: "AI" },
    { slug: "testing", label: "Testing" },
    { slug: "design", label: "Design" },
  ];

  const { data, isLoading } = useListTools({
    search: query || undefined,
    category: activeCategory,
    limit: 50,
  });

  const tools = data?.tools ?? [];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.searchHeader,
          {
            paddingTop: topInset + 12,
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View
          style={[
            styles.inputRow,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Ionicons name="search" size={18} color={colors.mutedForeground} />
          <TextInput
            style={[styles.input, { color: colors.foreground }]}
            placeholder="Search tools…"
            placeholderTextColor={colors.mutedForeground}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")}>
              <Ionicons
                name="close-circle"
                size={18}
                color={colors.mutedForeground}
              />
            </Pressable>
          )}
        </View>

        <FlatList
          data={CATEGORIES}
          horizontal
          keyExtractor={(item) => item.slug}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
          renderItem={({ item }) => {
            const active = activeCategory === item.slug;
            return (
              <Pressable
                style={({ pressed }) => [
                  styles.chip,
                  {
                    backgroundColor: active ? colors.primary : colors.card,
                    borderColor: active ? colors.primary : colors.border,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
                onPress={() =>
                  setActiveCategory(active ? undefined : item.slug)
                }
              >
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: active ? colors.primaryForeground : colors.mutedForeground,
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={tools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ToolCard tool={item} />}
          contentContainerStyle={[
            styles.results,
            {
              paddingBottom:
                Platform.OS === "web" ? 34 + 84 : insets.bottom + 90,
            },
          ]}
          ListHeaderComponent={
            <Text style={[styles.resultsLabel, { color: colors.mutedForeground }]}>
              {tools.length} result{tools.length !== 1 ? "s" : ""}
            </Text>
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons
                name="search-outline"
                size={40}
                color={colors.mutedForeground}
              />
              <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
                {query ? `No tools matching "${query}"` : "Start typing to search"}
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  searchHeader: {
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    padding: 0,
  },
  chips: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  results: {
    paddingTop: 8,
  },
  resultsLabel: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 12,
    fontFamily: "Inter_400Regular",
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
