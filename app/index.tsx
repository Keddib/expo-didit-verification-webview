import { Image, StyleSheet, Button, Text, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { initializeVerification } from '@/core/verification';
import { Link, useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const handleVerify = async () => {
    const sessionUrl = await initializeVerification();
    router.push({
      pathname: '/verify',
      params: {
        sessionUrl: sessionUrl
      }
    });
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#d2e2ff', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-didit-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.container}>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
        </ThemedView>
        <Button title="Verify your self" onPress={handleVerify} />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',

  },
});
