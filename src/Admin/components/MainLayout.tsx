import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';

interface MainLayoutProps extends BottomTabBarProps {
  children: React.ReactNode;
  rightContent?: React.ReactNode;
  showRightContent?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  rightContent,
  showRightContent = false,
  ...tabBarProps
}) => {
  return (
    <View style={styles.container}>
      {/* Left Sidebar Navigation */}
      <BottomTabBar {...tabBarProps} />
      
      {/* Main Content Area */}
      <View style={styles.mainContent}>{children}</View>
      
      {/* Right Content Area (Profile, etc.) */}
      {showRightContent && rightContent && (
        <View style={styles.rightContent}>{rightContent}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rightContent: {
    width: 350,
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
  },
});

export default MainLayout;
