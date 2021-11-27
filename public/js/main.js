import * as store from "./store.js";
import * as wss from "./wss.js";
import * as webRTCHandler from "./webRTCHandler.js";
import * as constants from "./constants.js";
import * as ui from "./ui.js";
import * as recordingUtils from "./recordingUtils.js";

// initialization of socketIo connection
const socket = io("/");
wss.registerSocketEvents(socket);

// register Event Listener for personal code copy button
const personalCodeCopyButton = document.getElementById(
  "personal_code_copy_button"
);
personalCodeCopyButton.addEventListener("click", () => {
  const personalCode = store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personalCode);
});

// GETTING LOCAL PREVIEW
webRTCHandler.getLocalPreview();

// REGISTER Event Listeners FOR CONNECTION BUTTONS
const personalCodeChatButton = document.getElementById(
  "personal_code_chat_button"
);
const personalCodeVideoButton = document.getElementById(
  "personal_code_video_button"
);

personalCodeChatButton.addEventListener("click", () => {
  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  const callType = constants.callType.CHAT_PERSONAL_CODE;

  webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});

personalCodeVideoButton.addEventListener("click", () => {
  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  const callType = constants.callType.VIDEO_PERSONAL_CODE;

  webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});

// EVENT LISTENERS FOR VIDEO CALL BUTTONS

const micButton = document.getElementById("mic_button");
micButton.addEventListener("click", () => {
  const localStream = store.getState().localStream;
  const micEnabled = localStream.getAudioTracks()[0].enabled;
  localStream.getAudioTracks()[0].enabled = !micEnabled;
  ui.updateMicButton(micEnabled);
});

const cameraButton = document.getElementById("camera_button");
cameraButton.addEventListener("click", () => {
  const localStream = store.getState().localStream;
  const cameraEnabled = localStream.getVideoTracks()[0].enabled;
  localStream.getVideoTracks()[0].enabled = !cameraEnabled;
  ui.updateCameraButton(cameraEnabled);
});

const switchForScreenSharingButton = document.getElementById(
  "screen_sharing_button"
);

switchForScreenSharingButton.addEventListener("click", () => {
  const screenSharingActive = store.getState().screenSharingActive;
  webRTCHandler.switchBetweenCameraAndScreenSharing(screenSharingActive);
});

// EVENTS LISTENERS FOR MESSAGES

const newMessageInput = document.getElementById("new_message_input");
newMessageInput.addEventListener("keydown", (event) => {
  const key = event.key;
  const message = event.target.value;

  if (key === "Enter" && message) {
    webRTCHandler.sendMessageUsingDataChannel(event.target.value);
    ui.appendMessage(message, true);
    newMessageInput.value = "";
  }
});

const sendMessageButton = document.getElementById("send_message_button");
sendMessageButton.addEventListener("click", () => {
  const message = newMessageInput.value;
  if (message) {
    webRTCHandler.sendMessageUsingDataChannel(message);
    ui.appendMessage(message, true);
    newMessageInput.value = "";
  }
});

// EVENT LISTENERS FOR RECORDING

const startRecordingButton = document.getElementById("start_recording_button");

startRecordingButton.addEventListener("click", () => {
  recordingUtils.startRecording();
  ui.showRecordingPanel();
});

const stopRecordingButton = document.getElementById("stop_recording_button");

stopRecordingButton.addEventListener("click", () => {
  recordingUtils.stopRecoding();
  ui.resetRecordingButton();
});

const resumeButton = document.getElementById("resume_recording_button");
const pauseButton = document.getElementById("pause_recording_button");
pauseButton.addEventListener("click", () => {
  recordingUtils.pauseRecording();
  ui.switchRecordingButtons(true);
});
resumeButton.addEventListener("click", () => {
  recordingUtils.resumeRecording();
  ui.switchRecordingButtons(false);
});

// EVENT LISTENERS FOR HANG UP
const hangUpCallButton = document.getElementById("hang_up_button");
hangUpCallButton.addEventListener("click", () => {
  webRTCHandler.handleHangUp();
});

const hangUpChatButton = document.getElementById("finish_chat_call_button");
hangUpChatButton.addEventListener("click", () => {
  webRTCHandler.handleHangUp();
});
