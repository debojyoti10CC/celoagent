// HACKATHON FIX: This entire file is stubbed out to avoid database errors
// We are not using a database for this 8-hour hackathon.

// NOTE: Removed 'server-only' import to fix client/server conflict

import type { Chat } from '@/lib/types'
import type { VisibilityType } from '@/components/visibility-selector'

// ============================================
// HACKATHON FIX: Added back PUBLIC_USER_ID constant
// ============================================
export const PUBLIC_USER_ID = "11111111-1111-1111-1111-111111111111";
// ============================================
// HACKATHON FIX ENDS HERE
// ============================================


// Stubbing out all database functions - just return empty/null values

export async function getChats(userId: string) {
  return []
}

export async function getChat(id: string, userId: string) {
  return null
}

export async function getMessagesByChatId(chatId: string) {
  return []
}

export async function getMessageById(params: { id: string }) {
  return []
}

export async function saveChat(chat: Chat, userId: string) {
  return { id: chat.id }
}

export async function saveMessages(messages: any[]) {
  return
}

export async function updateMessage(message: any) {
  return
}

export async function deleteMessagesByChatIdAfterTimestamp(params: {
  chatId: string
  timestamp: Date
}) {
  return
}

export async function removeChat(params: { id: string; userId: string }) {
  return
}

export async function clearChats(userId: string) {
  return
}

export async function getSharedChat(id: string) {
  return null
}

export async function shareChat(chat: Chat, userId: string) {
  return { id: chat.id, sharePath: null }
}

export async function updateChatVisiblityById(params: {
  chatId: string
  visibility: VisibilityType
}) {
  return
}

export async function vote(params: {
  messageId: string
  vote: 'up' | 'down'
}) {
  return
}

export async function getArtifactsByChatId(params: { chatId: string }) {
  return []
}

export async function saveArtifact(artifact: any) {
  return
}

export async function updateArtifact(artifact: any) {
  return
}

export async function deleteArtifact(params: { id: string }) {
  return
}

// --- Added missing functions from original file ---
export async function getUser(email: string) {
    return [];
}
export async function getChatsByWalletAddress(params: any) {
    return { chats: [], hasMore: false };
}
export async function getOrCreateUserByWalletAddress(params: { walletAddress: string }) {
    // Return a dummy user object
    return { id: 'dummy-user-id', email: 'dummy@example.com', walletAddress: params.walletAddress.toLowerCase() };
}
export async function getOrCreatePublicUser() {
    return { id: PUBLIC_USER_ID, email: 'public@local' }; // Use the constant here
}
export async function createUser(email: string, password: string) {
    return;
}
export async function createGuestUser() {
    return [{ id: 'dummy-guest-id', email: `guest-${Date.now()}` }];
}
export async function deleteChatById(params: { id: string }) {
    return;
}
export async function getChatsByUserId(params: any) {
    return { chats: [], hasMore: false };
}
export async function getChatById(params: { id: string }) {
    return null; // Or return a dummy chat object if needed elsewhere
}
export async function saveDocument(params: any) {
    return [];
}
export async function getDocumentsById(params: { id: string }) {
    return [];
}
export async function getDocumentById(params: { id: string }) {
    return null;
}
export async function deleteDocumentsByIdAfterTimestamp(params: any) {
    return [];
}
export async function saveSuggestions(params: any) {
    return;
}
export async function getSuggestionsByDocumentId(params: { documentId: string }) {
    return [];
}
export async function reassignChatToUser(params: any) {
    return;
}
export async function getMessageCountByUserId(params: any) {
    return 0;
}
export async function createStreamId(params: any) {
    return;
}
export async function getStreamIdsByChatId(params: { chatId: string }) {
    return [];
}

// --- Added missing function to fix import error ---
export async function deleteTrailingMessages(params: { id: string }) {
    // HACKATHON FIX: Database disabled
    // This function exists so the app doesn't crash on import.

    // Call our dummy getMessageById
    const message = await getMessageById({ id: params.id });

    if (message.length === 0) {
        // No message found, do nothing
        return;
    }

    // Call our dummy deleteMessages
    // const msg = message[0]; // msg would have .chatId and .createdAt
    // await deleteMessagesByChatIdAfterTimestamp({
    //     chatId: msg.chatId,
    //     timestamp: msg.createdAt
    // });

    return;
}
