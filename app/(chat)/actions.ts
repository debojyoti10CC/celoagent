'use server';

import { generateText, type UIMessage } from 'ai';
import { cookies } from 'next/headers';
import {
  // We import the dummy functions from our hacked queries.ts
  deleteMessagesByChatIdAfterTimestamp,
  getMessageById,
  updateChatVisiblityById,
} from '@/lib/db/queries';
import type { VisibilityType } from '@/components/visibility-selector';
import { myProvider } from '@/lib/ai/providers';

export async function saveChatModelAsCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set('chat-model', model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: UIMessage;
}) {
  const { text: title } = await generateText({
    model: myProvider.languageModel('title-model'),
    system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}

// ============================================
// HACKATHON FIX STARTS HERE
// ============================================
// Replace the original deleteTrailingMessages function with this one:
export async function deleteTrailingMessages({ id }: { id: string }) {
  // HACKATHON FIX: Check if message exists before using it
  // Our dummy getMessageById (in lib/db/queries.ts) returns [],
  // so we must add this check to prevent a crash.
  const messages = await getMessageById({ id });

  // If messages is empty, messages[0] is undefined.
  // This 'if' block fixes the crash.
  if (messages.length === 0) {
    return; // Do nothing
  }

  // This code below will only run if a message is found (which it won't with the dummy DB)
  // It won't crash because of the 'if' block above.
  const message = messages[0];

  await deleteMessagesByChatIdAfterTimestamp({
    chatId: message.chatId,
    timestamp: message.createdAt,
  });
}
// ============================================
// HACKATHON FIX ENDS HERE
// ============================================


export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  await updateChatVisiblityById({ chatId, visibility });
}
