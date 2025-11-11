import { StyleSheet, Text, View } from "react-native";

export default function AssistantsScreen() {
	return (
		<View style={styles.container}>
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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8F9FA",
		padding: 20,
	},
	header: {
		marginTop: 20,
		marginBottom: 24,
	},
	title: {
		fontSize: 32,
		fontWeight: "700",
		color: "#1A1A1A",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#6B7280",
		fontWeight: "400",
	},
	card: {
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
		padding: 20,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1A1A1A",
		marginBottom: 12,
	},
	cardText: {
		fontSize: 14,
		color: "#4B5563",
		marginBottom: 8,
		lineHeight: 20,
	},
});

