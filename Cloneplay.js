console.log("Cloneplay.js loaded");

//DOM
const fetchBtn = document.getElementById("fetch");
const cloneBtn = document.getElementById("cloneBtn");
const showLinksBtn = document.getElementById("showlinks");
const urlInput = document.getElementById("url");
const savedLinksBox = document.getElementById("showsavedlinks");

let tokenClient = null;
//playlist details
let cloneContext = {
  sourcePlaylistId: null,
  title: null,
};

//custom alertBox
function showCpAlert(msg) {
  document.getElementById("cpAlertMsg").textContent = msg;
  document.getElementById("cpAlert").classList.remove("hidden");
  const CloseCpAlert = document.getElementById("cpAlertOk");
  CloseCpAlert.onclick = closeCpAlert;
}
function closeCpAlert() {
  document.getElementById("cpAlert").classList.add("hidden");
  document.getElementById("cpAlertInput").classList.add("hidden");
}

function cpPrompt(message, onSubmit) {
  const alertBox = document.getElementById("cpAlert");
  const CpErrmsg = document.getElementById("cpAlertMsg");
  const input = document.getElementById("cpAlertInput");
  const okBtn = document.getElementById("cpAlertOk");

  CpErrmsg.textContent = message;
  input.value = "";
  input.classList.remove("hidden");
  alertBox.classList.remove("hidden");

  okBtn.onclick = () => {
    onSubmit(input.value.trim());
    // input.classList.add("hidden");
    closeCpAlert();
  };
}
//initialization google gsi
function initClient() {
  gapi.client.init({
    apiKey: "AIzaSyBPGHYn5_2zaeMqC6Oz8jxmBGSMZ_6PyQc",
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
    ],
  });
  console.log("Google API Ready");
}
//signIn
function handleSignIn() {
  if (!tokenClient) {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id:
        "140443201652-66sthlgv2n61nctulbf2339nbtok4fss.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/youtube",
      callback: (resp) => {
        gapi.client.setToken({ access_token: resp.access_token });
        startCloning();
        // showCpAlert("Signed in successfully");
      },
    });
  }
  tokenClient.requestAccessToken();
}

function extractPlaylistID(url) {
  const match = url.match(/[?&]list=([^&]+)/);
  return match ? match[1] : null;
}
//new palylist name input taken here
cloneBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();
  const id = extractPlaylistID(url);

  if (!id) return showCpAlert("invalid playlist link");

  cpPrompt("Enter title of the new playlist", (title) => {
    cloneContext.sourcePlaylistId = id;
    cloneContext.title = title || "Clone Playlist";
    handleSignIn();
  });
});

//cloning here
async function startCloning() {
  const { sourcePlaylistId, title } = cloneContext;

  showCpAlert("Cloning playlist...");

  const videos = await getVideos(sourcePlaylistId);
  const newPlaylistId = await createPlaylist(title);

  for (let v of videos) {
    await addVideo(newPlaylistId, v);
  }
  showCpAlert("Playlist cloned successfully!!");
  cloneContext.sourcePlaylistId = null;
  cloneContext.title = null;
}
//getting videos from source playlist
async function getVideos(playlistId) {
  let videos = [];
  let token = "";

  do {
    const res = await gapi.client.youtube.playlistItems.list({
      part: "snippet",
      playlistId,
      maxResults: 50,
      pageToken: token,
    });

    res.result.items.forEach((item) => {
      videos.push(item.snippet.resourceId.videoId);
    });
    token = res.result.nextPageToken;
  } while (token);

  return videos;
}

async function createPlaylist(title) {
  const res = await gapi.client.youtube.playlists.insert({
    part: "snippet,status",
    resource: {
      snippet: { title },
      status: {
        privacyStatus: "private",
      },
    },
  });

  return res.result.id;
}

async function addVideo(playlistId, videoId) {
  return gapi.client.youtube.playlistItems.insert({
    part: "snippet",
    resource: {
      snippet: {
        playlistId,
        resourceId: {
          kind: "youtube#video",
          videoId,
        },
      },
    },
  });
}

////unnecessary codes below(used for user convinience)

//to save links in local storage
function saveLink(url, id) {
  const data = JSON.parse(localStorage.getItem("savedLinks")) || [];
  data.push({ url, id });
  localStorage.setItem("savedLinks", JSON.stringify(data));
}

//to save links(not necessary for cloning but added for user convenience)
fetchBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();
  if (!url) return showCpAlert("paste a playlist link");

  const id = extractPlaylistID(url);
  if (!id) return showCpAlert("Invalid playlist link");

  saveLink(url, id);
  showCpAlert("Playlist saved");
});

//to show saved links
showLinksBtn.addEventListener("click", () => {
  const data = JSON.parse(localStorage.getItem("savedLinks")) || [];
  savedLinksBox.innerHTML = "<h3>Saved Playlists</h3>";

  data.forEach((item, i) => {
    const p = document.createElement("p");
    p.innerHTML = `${i + 1}. <a href="${item.url}" target="_blank">${item.url}</a>`;

    savedLinksBox.appendChild(p);
  });
});
