import * as constants from "./constants.js";
import * as elements from "./elements.js";
import * as store from "./store.js";

export const updatePersonalCode = (personalCode) => {
  const personalCodeParagraph = document.getElementById(
    "personal_code_paragraph"
  );
  personalCodeParagraph.textContent = personalCode;
};

export const updateLocalStream = (stream) => {
  const localVideo = document.getElementById("local_video");
  localVideo.srcObject = stream;
  localVideo.muted = true;

  localVideo.addEventListener("loadedmetadata", () => {
    localVideo.play();
  });
};

export const showVideoCallButtons = () => {
  const personalCodeVideoButton = document.getElementById(
    "personal_code_video_button"
  );
  const strangerVideoButton = document.getElementById("stranger_video_button");
  showElement(personalCodeVideoButton);
  showElement(strangerVideoButton);
};

export const updateRemoteStream = (stream) => {
  const remoteVideo = document.getElementById("remote_video");
  remoteVideo.srcObject = stream;
};

export const showIncomingCallDialog = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  const callTypeInfo =
    callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";

  const incomingCallDialog = elements.getIncomingCallDialog(
    callTypeInfo,
    acceptCallHandler,
    rejectCallHandler
  );

  // removing all dialogs inside HTML dialog element
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());

  dialog.appendChild(incomingCallDialog);
};

export const showCallingDialog = (rejectCallHandler) => {
  const callingDialog = elements.getCallingDialog(rejectCallHandler);

  // removing all dialogs inside HTML dialog element
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());

  dialog.appendChild(callingDialog);
};

export const showInfoDialog = (preOfferAnswer) => {
  let infoDialog = null;

  switch (preOfferAnswer) {
    case constants.preOfferAnswer.CALL_REJECTED:
      infoDialog = elements.getInfoDialog(
        "Call rejected",
        "Callee rejected your call"
      );
      break;
    case constants.preOfferAnswer.CALLEE_NOT_FOUND:
      infoDialog = elements.getInfoDialog(
        "Callee not found",
        "Please check personal code"
      );
      break;
    case constants.preOfferAnswer.CALL_UNAVAILABLE:
      infoDialog = elements.getInfoDialog(
        "Call is not possible",
        "Probably callee is busy, please try again later"
      );
      break;
    default:
      infoDialog = null;
      break;
  }

  if (infoDialog) {
    const dialog = document.getElementById("dialog");
    dialog.appendChild(infoDialog);

    setTimeout(removeAllDialogs, 4000);
  }
};

export const removeAllDialogs = () => {
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
};

export const showCallElements = (callType) => {
  if (callType === constants.callType.CHAT_PERSONAL_CODE) {
    showChatElements();
  }

  if (callType === constants.callType.VIDEO_PERSONAL_CODE) {
    showVideoElements();
  }
};

const showChatElements = () => {
  const finishConnectionsChatButtonContainer = document.getElementById(
    "finish_chat_button_container"
  );
  showElement(finishConnectionsChatButtonContainer);

  const newMessageInput = document.getElementById("new_message");
  showElement(newMessageInput);

  // block panel
  disableDashboard();
};

const showVideoElements = () => {
  const callButtons = document.getElementById("call_buttons");
  showElement(callButtons);

  const placeholder = document.getElementById("video_placeholder");
  hideElement(placeholder);

  const remoteVideo = document.getElementById("remote_video");
  showElement(remoteVideo);

  const newMessageInput = document.getElementById("new_message");
  showElement(newMessageInput);

  // block panel
  disableDashboard();
};

// UI CALL BUTTONS
const micOnImageSrc = "./utils/images/mic.png";
const micOffImageSrc = "./utils/images/micOff.png";

export const updateMicButton = (micActive) => {
  const micButtonImage = document.getElementById("mic_button_image");
  micButtonImage.src = micActive ? micOffImageSrc : micOnImageSrc;
};

const cameraOnImageSrc = "./utils/images/camera.png";
const cameraOffImageSrc = "./utils/images/cameraOff.png";

export const updateCameraButton = (cameraActive) => {
  const cameraButtonImage = document.getElementById("camera_button_image");
  cameraButtonImage.src = cameraActive ? cameraOffImageSrc : cameraOnImageSrc;
};

// UI MESSAGES

export const appendMessage = (message, right = false) => {
  const messagesContainer = document.getElementById("messages_container");
  const messageElement = right
    ? elements.getRightMessage(message)
    : elements.getLeftMessage(message);
  messagesContainer.appendChild(messageElement);
};

export const clearMessages = () => {
  const messagesContainer = document.getElementById("messages_container");
  messagesContainer.querySelectorAll("*").forEach((n) => n.remove());
};

// UI RECORDING FUNCTIONS
export const showRecordingPanel = () => {
  const recordingButtons = document.getElementById("video_recording_buttons");
  showElement(recordingButtons);

  const startRecordingButton = document.getElementById(
    "start_recording_button"
  );
  hideElement(startRecordingButton);
};

export const resetRecordingButton = () => {
  const recordingButtons = document.getElementById("video_recording_buttons");
  hideElement(recordingButtons);

  const startRecordingButton = document.getElementById(
    "start_recording_button"
  );
  showElement(startRecordingButton);
};

export const switchRecordingButtons = (switchForResumeButton) => {
  const resumeButton = document.getElementById("resume_recording_button");
  const pauseButton = document.getElementById("pause_recording_button");

  if (switchForResumeButton) {
    hideElement(pauseButton);
    showElement(resumeButton);
  } else {
    hideElement(resumeButton);
    showElement(pauseButton);
  }
};

// UI After hangUp
export const updateUIAfterHangUp = (callType) => {
  enableDashboard();

  if (
    callType === constants.callType.VIDEO_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_STRANGER
  ) {
    const callButtons = document.getElementById("call_buttons");
    hideElement(callButtons);
  } else {
    const chatCallButtons = document.getElementById(
      "finish_chat_button_container"
    );
    hideElement(chatCallButtons);
  }
  const newMessageInput = document.getElementById("new_message");
  hideElement(newMessageInput);
  clearMessages();

  updateMicButton(false);
  updateCameraButton(false);

  const placeholder = document.getElementById("video_placeholder");
  showElement(placeholder);

  const remoteVideo = document.getElementById("remote_video");
  hideElement(remoteVideo);

  removeAllDialogs();
};

// UI HELPER FUNCTIONS

const enableDashboard = () => {
  const dashboardBlocker = document.getElementById("dashboard_blur");
  if (!dashboardBlocker.classList.contains("display_none")) {
    dashboardBlocker.classList.add("display_none");
  }
};

const disableDashboard = () => {
  const dashboardBlocker = document.getElementById("dashboard_blur");
  if (dashboardBlocker.classList.contains("display_none")) {
    dashboardBlocker.classList.remove("display_none");
  }
};

const hideElement = (element) => {
  if (!element.classList.contains("display_none")) {
    element.classList.add("display_none");
  }
};

const showElement = (element) => {
  if (element.classList.contains("display_none")) {
    element.classList.remove("display_none");
  }
};
