export const SEND_CHANNEL_MANAGEMENT_LINK = 'SEND_CHANNEL_MANAGEMENT_LINK';
export const UPDATE_PERSONAL_CHANNELS = 'UPDATE_PERSONAL_CHANNELS';
export const TOKEN_VERIFY_PERSONAL_CHANNELS = 'TOKEN_VERIFY_PERSONAL_CHANNELS';

export function sendChannelManagementLink(data) {
  return {
    type: SEND_CHANNEL_MANAGEMENT_LINK,
    request: {
      op: 'post',
      path: `/@personal-channels-management-send-link`,
      data,
    },
  };
}

export function resetSendChannelManagementLink() {
  return {
    type: `${SEND_CHANNEL_MANAGEMENT_LINK}_RESET`,
  };
}

export function updatePersonalChannels(data) {
  return {
    type: UPDATE_PERSONAL_CHANNELS,
    request: {
      op: 'post',
      path: `/@personal-channels-management-update`,
      data,
    },
  };
}

export function resetUpdatePersonalChannels() {
  return {
    type: `${UPDATE_PERSONAL_CHANNELS}_RESET`,
  };
}

export function verifyToken(data) {
  return {
    type: TOKEN_VERIFY_PERSONAL_CHANNELS,
    request: {
      op: 'post',
      path: `/@personal-channels-management-token-verify`,
      data,
    },
  };
}

export function resetVerifyToken() {
  return {
    type: `${TOKEN_VERIFY_PERSONAL_CHANNELS}_RESET`,
  };
}
