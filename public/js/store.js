import * as constants from "./constants.js";

let state = {
  socketId: null,
  localStream: null,
  remoteStream: null,
  screenSharingStream: null,
  screenSharingActive: false,
  allowConnectionsFromStrangers: false,
  callState: constants.callState.CALL_AVAILABLE_ONLY_CHAT,
};

export const setSocketId = (socketId) => {
  state = { ...state, socketId };
};

export const setLocalStream = (localStream) => {
  state = { ...state, localStream };
};

export const setRemoteStream = (remoteStream) => {
  state = { ...state, remoteStream };
};

export const setScreenSharingStream = (screenSharingStream) => {
  state = { ...state, screenSharingStream };
};

export const setScreenSharingActive = (screenSharingActive) => {
  state = { ...state, screenSharingActive };
};

export const setAllowConnectionsFromStrangers = (allowConnect) => {
  state = { ...state, allowConnectionsFromStrangers: allowConnect };
};

export const setCallState = (callState) => {
  state = { ...state, callState };
};

export const getState = () => state;
