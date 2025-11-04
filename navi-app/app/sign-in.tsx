import React, { useState } from 'react';
import { Stack } from 'expo-router';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { ThemedView } from '../components/themed-view';
import { ThemedText } from '../components/themed-text';

const PRIMARY = '#001E6C';
const SECONDARY = '#E8DEC8';
const BG = '#FFFFFF';
const TEXT = '#1E1E1E';
const NEUTRAL = '#DADCE0';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async () => {
    if (isSubmitting) return;
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      // TODO: Replace with real auth call
      await new Promise((r) => setTimeout(r, 600));
    } catch (err) {
      setErrorMessage('Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Sign in' }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ThemedView style={[styles.container]}> 
            <View style={styles.headerArea}>
              <ThemedText type="title" style={styles.title}>Welcome back</ThemedText>
              <ThemedText style={styles.subtitle}>
                Sign in to continue
              </ThemedText>
            </View>

            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  placeholder="you@example.com"
                  placeholderTextColor="#8A8A8A"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder="Enter your password"
                  placeholderTextColor="#8A8A8A"
                  style={styles.input}
                />
              </View>

              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}

              <Pressable
                onPress={onSubmit}
                disabled={isSubmitting || !email || !password}
                style={({ pressed }) => [
                  styles.primaryButton,
                  (pressed || isSubmitting) && styles.primaryButtonPressed,
                  (!email || !password) && styles.primaryButtonDisabled,
                ]}
              >
                <Text style={styles.primaryButtonText}>
                  {isSubmitting ? 'Signing in…' : 'Sign in'}
                </Text>
              </Pressable>

              <Pressable onPress={() => { /* TODO: forgot password */ }}>
                <Text style={styles.link}>Forgot password?</Text>
              </Pressable>
            </View>

            <View style={styles.footerHint}>
              <Text style={styles.footerText}>Don’t have an account? </Text>
              <Pressable onPress={() => { /* TODO: navigate to sign up */ }}>
                <Text style={styles.linkInline}>Create one</Text>
              </Pressable>
            </View>
          </ThemedView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  headerArea: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    color: TEXT,
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    color: '#4A4A4A',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    gap: 16,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 420,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    color: '#3A3A3A',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: NEUTRAL,
    backgroundColor: '#F9F9F9',
    borderRadius: 14,
    paddingHorizontal: 14,
    color: TEXT,
  },
  errorText: {
    color: '#C62828',
    fontSize: 14,
  },
  primaryButton: {
    height: 52,
    backgroundColor: PRIMARY,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonPressed: {
    opacity: 0.85,
  },
  primaryButtonDisabled: {
    backgroundColor: '#7A8ABD',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  link: {
    color: PRIMARY,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  footerHint: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  footerText: {
    color: '#4A4A4A',
    fontSize: 14,
  },
  linkInline: {
    color: PRIMARY,
    fontSize: 14,
    fontWeight: '700',
  },
});


