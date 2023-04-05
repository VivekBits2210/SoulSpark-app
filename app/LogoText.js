import { useRouter } from "expo-router";
const LogoText = () => {
    const router = useRouter();
    return (
    <Text
    style={{ color: "white", fontSize: 14, paddingLeft: 5 }}
    onPress={() => router.push("/Coffee")}
    >
    SoulSpark
    </Text>
    );
}
export default LogoText;