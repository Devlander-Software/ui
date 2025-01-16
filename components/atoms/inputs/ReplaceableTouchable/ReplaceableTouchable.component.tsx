import React, { useCallback, useMemo } from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";

export interface ReplaceableTouchableProps {
  onPress?: (event: GestureResponderEvent) => void;
  TouchableComponent?: React.ComponentType<any>;
  children: React.ReactNode;
  disabled?: boolean;
  testID: string;
  [key: string]: any; // Allow additional props for flexibility
}

 const ReplaceableTouchable: React.FC<ReplaceableTouchableProps> = ({
  TouchableComponent = TouchableOpacity, // Default to TouchableOpacity
  onPress,
  children,
  disabled = false,
  testID,
  ...otherProps
}) => {
  /**
   * Memoize the accessibility label for consistency and performance.
   */
  const accessibilityLabel = useMemo(() => `${testID}-button`, [testID]);

  /**
   * Memoize the press handler to ensure referential stability,
   * improving performance when passed to child components.
   */
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (!disabled && onPress) {
        onPress(event);
      }
    },
    [disabled, onPress]
  );

  return (
    <TouchableComponent
      {...otherProps}
      onPress={handlePress} // Ensures no unnecessary re-renders
      disabled={disabled} // Prevent press events when disabled
      testID={testID}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </TouchableComponent>
  );
};


export default ReplaceableTouchable;