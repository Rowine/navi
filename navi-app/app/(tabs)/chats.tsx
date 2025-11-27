import { Bot, MapPin, MessageCircle } from "lucide-react-native";
import { router, Href } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import sampleData from "../../data/sample-data.json";

interface Chat {
	id: string;
	modelType: "Campus Navigator" | "AI Tutor";
	subject?: string;
	lastMessage: string;
	timestamp: string;
	messages: { id: string; role: "user" | "assistant"; text: string }[];
}

export default function ChatsScreen() {
	const chats = useMemo(() => (sampleData.chats as Chat[]) || [], []);
	const [assistantModalVisible, setAssistantModalVisible] = useState(false);
	const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

	const openAssistantModal = (chat?: Chat) => {
		setSelectedChat(chat ?? null);
		setAssistantModalVisible(true);
	};

	const closeAssistantModal = () => {
		setAssistantModalVisible(false);
		setSelectedChat(null);
	};

	const handleAssistantSelect = (assistant: "campus" | "tutor") => {
		if (selectedChat) {
			if (assistant === "campus") {
				router.push({
					pathname: "/assistants/campus-navigator",
					params: { chatId: selectedChat.id },
				} as Href);
			} else {
				const subject = selectedChat.subject ?? "general";
				if (selectedChat.subject) {
					router.push({
						pathname: `/assistants/ai-tutor/${subject}`,
						params: { chatId: selectedChat.id },
					} as Href);
				} else {
					router.push("/assistants/ai-tutor" as Href);
				}
			}
		} else {
			if (assistant === "campus") {
				router.push("/assistants/campus-navigator" as Href);
			} else {
				router.push("/assistants/ai-tutor" as Href);
			}
		}

		closeAssistantModal();
	};

	const handleChatPress = (chat: Chat) => {
		if (chat.modelType === "Campus Navigator") {
			router.push({
				pathname: "/assistants/campus-navigator",
				params: { chatId: chat.id },
			} as Href);
		} else if (chat.modelType === "AI Tutor" && chat.subject) {
			router.push({
				pathname: `/assistants/ai-tutor/${chat.subject}`,
				params: { chatId: chat.id },
			} as Href);
		}
	};

	const formatTime = (timestamp: string) => {
		const date = new Date(timestamp);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffDays === 0) {
			return "Today";
		} else if (diffDays === 1) {
			return "Yesterday";
		} else if (diffDays < 7) {
			return `${diffDays} days ago`;
		} else {
			return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
		}
	};

	const renderChatItem = ({ item }: { item: Chat }) => {
		const IconComponent = item.modelType === "Campus Navigator" ? MapPin : Bot;
		const subjectName =
			item.modelType === "AI Tutor" && item.subject
				? (sampleData.subjects as { id: string; name: string }[]).find((s) => s.id === item.subject)?.name || "AI Tutor"
				: item.modelType;

		return (
			<TouchableOpacity style={styles.chatCard} onPress={() => handleChatPress(item)} activeOpacity={0.85}>
				<View style={styles.chatIconContainer}>
					<IconComponent color="#5B5BFF" size={22} strokeWidth={2} />
				</View>
				<View style={styles.chatContent}>
					<View style={styles.chatHeader}>
						<Text style={styles.chatTitle}>{subjectName}</Text>
						<Text style={styles.chatTime}>{formatTime(item.timestamp)}</Text>
					</View>
					<Text style={styles.chatPreview} numberOfLines={1}>
						{item.lastMessage}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Chats</Text>
				<Text style={styles.subtitle}>Your recent conversations</Text>
			</View>

			{chats.length === 0 ? (
				<View style={styles.emptyCard}>
					<MessageCircle color="#9CA3AF" size={48} strokeWidth={1.5} />
					<Text style={styles.emptyTitle}>No recent chats</Text>
					<Text style={styles.emptyText}>Tap the + button to start a new conversation</Text>
				</View>
			) : (
				<FlatList
					data={chats}
					renderItem={renderChatItem}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.listContent}
					showsVerticalScrollIndicator={false}
				/>
			)}

			<TouchableOpacity
				style={styles.fab}
				activeOpacity={0.85}
				onPress={() => openAssistantModal()}
			>
				<Text style={styles.fabText}>＋</Text>
			</TouchableOpacity>

			<Modal visible={assistantModalVisible} transparent animationType="fade" onRequestClose={closeAssistantModal}>
				<Pressable style={styles.modalOverlay} onPress={closeAssistantModal}>
					<View style={styles.modalCard}>
						<Text style={styles.modalTitle}>Open with</Text>
						<Text style={styles.modalSubtitle}>Choose an AI assistant</Text>

						<View style={styles.modalOptions}>
							<TouchableOpacity
								style={styles.modalButton}
								activeOpacity={0.85}
								onPress={() => handleAssistantSelect("campus")}
							>
								<MapPin color="#5B5BFF" size={20} strokeWidth={2} />
								<Text style={styles.modalButtonText}>Campus Navigator</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.modalButton}
								activeOpacity={0.85}
								onPress={() => handleAssistantSelect("tutor")}
							>
								<Bot color="#5B5BFF" size={20} strokeWidth={2} />
								<Text style={styles.modalButtonText}>AI Tutor</Text>
							</TouchableOpacity>
						</View>

						<TouchableOpacity style={styles.modalCancel} onPress={closeAssistantModal}>
							<Text style={styles.modalCancelText}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</Pressable>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8F9FA",
	},
	header: {
		padding: 20,
		paddingTop: 20,
		paddingBottom: 16,
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
	listContent: {
		paddingHorizontal: 20,
		paddingBottom: 100,
	},
	chatCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
		padding: 16,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
	},
	chatIconContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: "#F0F0FF",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	chatContent: {
		flex: 1,
	},
	chatHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 4,
	},
	chatTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1A1A1A",
		flex: 1,
	},
	chatTime: {
		fontSize: 12,
		color: "#9CA3AF",
		fontWeight: "500",
	},
	chatPreview: {
		fontSize: 14,
		color: "#6B7280",
		lineHeight: 20,
	},
	emptyCard: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 40,
		marginHorizontal: 20,
	},
	emptyTitle: {
		fontSize: 20,
		fontWeight: "600",
		color: "#1A1A1A",
		marginTop: 16,
		marginBottom: 8,
	},
	emptyText: {
		fontSize: 14,
		color: "#6B7280",
		textAlign: "center",
	},
	fab: {
		position: "absolute",
		right: 20,
		bottom: 20,
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: "#5B5BFF",
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.2,
		shadowRadius: 10,
		elevation: 6,
	},
	fabText: {
		color: "#FFFFFF",
		fontSize: 28,
		lineHeight: 28,
		fontWeight: "700",
		marginTop: -2,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
	},
	modalCard: {
		width: "100%",
		maxWidth: 340,
		backgroundColor: "#FFFFFF",
		borderRadius: 24,
		padding: 24,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.15,
		shadowRadius: 16,
		elevation: 10,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#1A1A1A",
		marginBottom: 4,
	},
	modalSubtitle: {
		fontSize: 14,
		color: "#6B7280",
		marginBottom: 20,
	},
	modalOptions: {
		gap: 12,
	},
	modalButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		padding: 14,
		borderRadius: 16,
		backgroundColor: "#F3F4F6",
	},
	modalButtonText: {
		fontSize: 15,
		fontWeight: "600",
		color: "#1A1A1A",
	},
	modalCancel: {
		marginTop: 16,
		alignItems: "center",
	},
	modalCancelText: {
		fontSize: 15,
		fontWeight: "600",
		color: "#5B5BFF",
	},
});

