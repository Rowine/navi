import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{
				headerTitle: "NAVI",
				headerTitleAlign: "center",
				headerStyle: { backgroundColor: "#FFFFFF" },
				headerShadowVisible: true,
			}}
		/>
	);
}
