import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";

interface StarRatingProps {
  rating: number;
  size?: number;
  showNumber?: boolean;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export function StarRating({
  rating,
  size = 14,
  showNumber = true,
}: StarRatingProps) {
  const colors = useColors();
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <View style={styles.row}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < fullStars)
          return <Ionicons key={i} name="star" size={size} color="#f59e0b" />;
        if (i === fullStars && hasHalf)
          return <Ionicons key={i} name="star-half" size={size} color="#f59e0b" />;
        return <Ionicons key={i} name="star-outline" size={size} color="#d1d5db" />;
      })}
      {showNumber && (
        <Text
          style={[
            styles.number,
            { color: colors.mutedForeground, fontSize: size },
          ]}
        >
          {"  "}
          {rating.toFixed(1)}
        </Text>
      )}
    </View>
  );
}

export function InteractiveStars({
  rating,
  size = 28,
  onRate,
}: {
  rating: number;
  size?: number;
  onRate: (r: number) => void;
}) {
  const { Pressable } = require("react-native");
  return (
    <View style={styles.row}>
      {Array.from({ length: 5 }, (_, i) => (
        <Pressable key={i} onPress={() => onRate(i + 1)} style={{ padding: 4 }}>
          <Ionicons
            name={i < rating ? "star" : "star-outline"}
            size={size}
            color={i < rating ? "#f59e0b" : "#d1d5db"}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  number: { marginLeft: 4, fontFamily: "Inter_500Medium" },
});
