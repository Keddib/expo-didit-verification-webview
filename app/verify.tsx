import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';
import WebView from 'react-native-webview';

export default function VerifyScreen() {
  const { sessionUrl } = useLocalSearchParams();
  console.log('sessionUrl', sessionUrl);
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: sessionUrl as string }}
        // Make sure to set the user agent to a generic mobile one
        userAgent="Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        // Mandatory props
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        // Android-specific props
        domStorageEnabled={true}
        // Optional props for performance
        androidHardwareAccelerationDisabled={false}
        androidLayerType="hardware"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
