import { View, ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/use-theme-color";

export function ThemedView(props: ViewProps & { color?: "background" | "text" }) {
  const { style, color = "background", ...otherProps } = props;

  const backgroundColor = useThemeColor({}, color);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
