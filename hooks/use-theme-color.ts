import { Colors } from "@/constants/theme";

/**
 * Your custom theme does NOT have light/dark variants.
 * So we simply return Colors[key] directly.
 */

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors
) {
  // If a specific color was passed (light or dark), use that
  if (props.light || props.dark) {
    return props.light ?? props.dark!;
  }

  // Otherwise return the color from your Colors object
  return Colors[colorName];
}
