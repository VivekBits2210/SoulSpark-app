import { Image } from "react-native-web";

const profileApi = "${api_url}/ai-profiles/fetch-profile";

export async function fetchProfiles(n) {
  let result = await fetch(`${profileApi}?n=${n}&no_image=True`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return result;
}

export async function getProfilesForSwipe(n) {
  let result = await fetchProfiles(n).then((res) => res);
  let data = [];
  for (let i = 0; i < result.length; i++) {
    let src = `data:image/png;base64,${result[i].profile_image};`;
    data.push({
      name: result[i].name,
      age: result[i].age,
      photo: src,
      key: i,
    });
  }
  return data;
}

var profilesRequestOptions = {
  method: "GET",
  redirect: "follow",
};