import { Text, TextProps } from "react-native";
import { Colors } from "@/constants/theme";

export function ThemedText(
  props: TextProps & { color?: keyof typeof Colors }
) {
  const { style, color = "text", ...otherProps } = props;

  return (
    <Text
      style={[
        { color: Colors[color] ?? Colors.text },
        style,
      ]}
      {...otherProps}
    />
  );
}
