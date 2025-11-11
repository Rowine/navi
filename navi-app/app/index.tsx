import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationBar } from "../components/NavigationBar";

export default function Index() {
  const [selectedTab, setSelectedTab] = useState<string>('chats');

  const handleTabPress = (tabId: string) => {
    setSelectedTab(tabId);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'chats':
        return (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Chats</Text>
              <Text style={styles.subtitle}>Your recent conversations</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Start a new conversation</Text>
              <Text style={styles.cardText}>Tap the + button to begin a chat with any assistant.</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Recent</Text>
              <Text style={styles.cardText}>No recent chats yet. Start your first conversation!</Text>
            </View>
          </>
        );
      case 'assistants':
        return (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Assistants</Text>
              <Text style={styles.subtitle}>Choose an AI helper</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Campus Navigator</Text>
              <Text style={styles.cardText}>School-specific help: maps, offices, policies, schedules.</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>AI Tutor</Text>
              <Text style={styles.cardText}>Homework help, explanations, and practice problems.</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>More assistants</Text>
              <Text style={styles.cardText}>Browse and search to discover the right assistant.</Text>
            </View>
          </>
        );
      case 'share':
        return (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Share Knowledge</Text>
              <Text style={styles.subtitle}>Help improve the AI</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Contribute examples</Text>
              <Text style={styles.cardText}>Share Q&A pairs, corrections, or context to make answers better.</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Why contribute?</Text>
              <Text style={styles.cardText}>Your input helps everyone get faster, more accurate help.</Text>
            </View>
          </>
        );
      case 'profile':
        return (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Profile</Text>
              <Text style={styles.subtitle}>Account & preferences</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Account</Text>
              <Text style={styles.cardText}>Sign in to sync chats across devices.</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Settings</Text>
              <Text style={styles.cardText}>Theme, notifications, data controls.</Text>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {renderContent()}
      </ScrollView>

      <NavigationBar onTabPress={handleTabPress} />

      {selectedTab === 'chats' && (
        <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
          <Text style={styles.fabText}>＋</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  header: {
    marginTop: 60,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
    lineHeight: 20,
  },
  instructions: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#5B5BFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5B5BFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 28,
    fontWeight: '700',
    marginTop: -2,
  },
});
