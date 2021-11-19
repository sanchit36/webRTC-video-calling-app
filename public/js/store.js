let state = {
  socketId: null,
  localStream: null,
  remoteStream: null,
  screenSharingStream: null,
  screenSharingActive: false,
  allowConnectionsFromStrangers: false,
};

export const setSocketId = (socketId) => {
  state = { ...state, socketId };
  console.log(state);
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

export const getState = () => state;
