import { useRouter } from "expo-router";
import { ScreenHeaderBtn } from "../components";
const Logo = () => {
    const router = useRouter();
    return (<ScreenHeaderBtn
                    iconUrl={require("../assets/logo_png.png")}
                    dimension="100%"
                    handlePress={() => router.push("/Coffee")}
    />)
}
export default Logo;