const profileApi = "https://api-soulspark.com/ai-profiles/fetch-profile";

export async function fetchProfile() {
  let result = await fetch(`${profileApi}?bot_id=2&no_image=true`).then((res) =>
    res.json()
  );
  return result;
}
