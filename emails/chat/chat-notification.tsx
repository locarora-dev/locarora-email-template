import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type RecipientType = "partner" | "customer";

interface ChatNotificationEmailProps {
  recipientName: string;
  recipientType: RecipientType;
  senderName: string;
  messagePreview: string;
  unreadCount?: number;
  productName?: string;
  reservationNumber?: string;
  chatUrl: string;
  locale: string;
}

const logoUrl =
  "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png";

const translations: Record<
  string,
  {
    previewPartner: (sender: string) => string;
    previewCustomer: (sender: string) => string;
    title: string;
    greeting: (name: string) => string;
    newMessagePartner: (sender: string) => string;
    newMessageCustomer: (sender: string) => string;
    unreadBadge: (count: number) => string;
    goToChat: string;
    noReplyNotice: string;
    footer: string;
    support: string;
    contactSupport: string;
  }
> = {
  ko: {
    previewPartner: (sender) => `${sender}님이 새 메시지를 보냈습니다`,
    previewCustomer: (sender) => `${sender}에서 답변이 도착했습니다`,
    title: "새 메시지가 도착했습니다.",
    greeting: (name) => `${name} 님, 안녕하세요.`,
    newMessagePartner: (sender) =>
      `${sender}님의 메시지가 도착했습니다.`,
    newMessageCustomer: (sender) =>
      `${sender}에서 답변이 도착했습니다.`,
    unreadBadge: (count) => `+${count}건의 읽지 않은 메시지`,
    goToChat: "채팅방으로 이동",
    noReplyNotice:
      "※ 본 메일은 발신전용입니다. 메시지에 대한 답변은 위 버튼을 클릭하여 보내주세요.",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "고객센터",
  },
  en: {
    previewPartner: (sender) => `${sender} sent you a new message`,
    previewCustomer: (sender) => `${sender} replied to your inquiry`,
    title: "You have a new message.",
    greeting: (name) => `Hello, ${name}.`,
    newMessagePartner: (sender) =>
      `You have a new message from ${sender}.`,
    newMessageCustomer: (sender) =>
      `${sender} replied to your inquiry.`,
    unreadBadge: (count) =>
      `+${count} unread message${count > 1 ? "s" : ""}`,
    goToChat: "Go to Chat",
    noReplyNotice:
      "※ This is a no-reply email. Please use the button above to respond to the message.",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Contact Support",
  },
  ja: {
    previewPartner: (sender) => `${sender}さんから新しいメッセージが届きました`,
    previewCustomer: (sender) => `${sender}から返信が届きました`,
    title: "新着メッセージが届きました。",
    greeting: (name) => `${name}様、こんにちは。`,
    newMessagePartner: (sender) =>
      `${sender}さんからメッセージが届きました。`,
    newMessageCustomer: (sender) =>
      `${sender}から返信が届きました。`,
    unreadBadge: (count) => `+${count}件の未読メッセージ`,
    goToChat: "チャットを開く",
    noReplyNotice:
      "※ 本メールは送信専用です。メッセージへの返信は上のボタンからお願いします。",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "サポート",
  },
  "zh-TW": {
    previewPartner: (sender) => `${sender} 傳送了新訊息`,
    previewCustomer: (sender) => `${sender} 已回覆您的諮詢`,
    title: "您有新訊息。",
    greeting: (name) => `${name}，您好。`,
    newMessagePartner: (sender) =>
      `您收到了 ${sender} 的新訊息。`,
    newMessageCustomer: (sender) =>
      `${sender} 已回覆您的諮詢。`,
    unreadBadge: (count) => `+${count} 則未讀訊息`,
    goToChat: "前往聊天室",
    noReplyNotice:
      "※ 本郵件為系統自動發送，請勿直接回覆。請點擊上方按鈕回覆訊息。",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "聯繫客服",
  },
  "zh-CN": {
    previewPartner: (sender) => `${sender} 发送了新消息`,
    previewCustomer: (sender) => `${sender} 已回复您的咨询`,
    title: "您有新消息。",
    greeting: (name) => `${name}，您好。`,
    newMessagePartner: (sender) =>
      `您收到了 ${sender} 的新消息。`,
    newMessageCustomer: (sender) =>
      `${sender} 已回复您的咨询。`,
    unreadBadge: (count) => `+${count} 条未读消息`,
    goToChat: "前往聊天室",
    noReplyNotice:
      "※ 本邮件为系统自动发送，请勿直接回复。请点击上方按钮回复消息。",
    footer: "此邮件由 LOCARORA 自动发送。",
    support: "需要帮助吗？",
    contactSupport: "联系客服",
  },
};

export const ChatNotificationEmail = ({
  recipientName,
  recipientType = "partner",
  senderName,
  messagePreview,
  unreadCount,
  productName,
  reservationNumber,
  chatUrl,
  locale = "ko",
}: ChatNotificationEmailProps) => {
  const t = translations[locale] || translations.ko;
  const isPartner = recipientType === "partner";
  const preview = isPartner
    ? t.previewPartner(senderName)
    : t.previewCustomer(senderName);
  const newMessage = isPartner
    ? t.newMessagePartner(senderName)
    : t.newMessageCustomer(senderName);

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src={logoUrl}
              width="140"
              height="32"
              alt="LOCARORA"
              style={logo}
            />
          </Section>

          {/* Title */}
          <Section style={titleSection}>
            <Heading style={heading}>{t.title}</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greetingText}>{t.greeting(recipientName)}</Text>
            <Text style={paragraph}>{newMessage}</Text>
          </Section>

          <Hr style={divider} />

          {/* Message Preview - Chat Bubble */}
          <Section style={messageSection}>
            <table cellPadding="0" cellSpacing="0" style={bubbleWrapper}>
              <tr>
                <td style={avatarTd}>
                  <div style={avatar}>
                    {senderName.charAt(0).toUpperCase()}
                  </div>
                </td>
                <td style={bubbleTd}>
                  <Text style={senderNameStyle}>{senderName}</Text>
                  <div style={bubble}>
                    <Text style={messagePreviewStyle}>{messagePreview}</Text>
                  </div>
                </td>
              </tr>
            </table>

            {unreadCount && unreadCount > 1 && (
              <Text style={unreadBadgeStyle}>
                {t.unreadBadge(unreadCount)}
              </Text>
            )}
          </Section>

          <Hr style={divider} />

          {/* CTA Buttons */}
          <Section style={buttonSection}>
            <Button style={button} href={chatUrl}>
              {t.goToChat}
            </Button>
          </Section>

          {/* No-reply Notice */}
          <Section style={noticeSection}>
            <Text style={noticeText}>{t.noReplyNotice}</Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>{t.footer}</Text>
            <Text style={footerText}>
              {t.support}{" "}
              <Link href="https://locarora.com/help" style={footerLink}>
                {t.contactSupport}
              </Link>
            </Text>
            <Text style={copyright}>© 2025 LOCARORA. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ChatNotificationEmail.PreviewProps = {
  recipientName: "ABC 렌탈",
  recipientType: "partner",
  senderName: "홍길동",
  messagePreview:
    "안녕하세요 대여일자가 어떻게 되실까요?",
  unreadCount: 3,
  productName: undefined,
  reservationNumber: undefined,
  chatUrl: "https://partner.locarora.com/messages/room123",
  locale: "ko",
} satisfies ChatNotificationEmailProps;

export default ChatNotificationEmail;

// Styles
const main = {
  backgroundColor: "#f4f4f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
  padding: "40px 0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "560px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  overflow: "hidden",
};

const logoSection = {
  padding: "32px 40px 0",
  textAlign: "left" as const,
};

const logo = {
  display: "block",
};

const titleSection = {
  padding: "32px 40px 0",
  textAlign: "left" as const,
};

const heading = {
  color: "#18181b",
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.3",
  margin: "0",
};

const content = {
  padding: "24px 40px 0",
};

const greetingText = {
  color: "#18181b",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "1.6",
  margin: "0 0 8px",
};

const paragraph = {
  color: "#3f3f46",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0",
};

const divider = {
  borderColor: "#e4e4e7",
  margin: "24px 40px",
};

const messageSection = {
  padding: "0 40px",
};

const bubbleWrapper = {
  width: "100%",
};

const avatarTd = {
  width: "48px",
  verticalAlign: "top" as const,
  paddingRight: "12px",
};

const avatar = {
  width: "44px",
  height: "44px",
  backgroundColor: "#FF6600",
  borderRadius: "50%",
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "bold" as const,
  lineHeight: "44px",
  textAlign: "center" as const,
};

const bubbleTd = {
  verticalAlign: "top" as const,
};

const senderNameStyle = {
  color: "#18181b",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 6px",
};

const bubble = {
  backgroundColor: "#f4f4f5",
  borderRadius: "4px 16px 16px 16px",
  padding: "14px 18px",
};

const messagePreviewStyle = {
  color: "#18181b",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0",
};

const unreadBadgeStyle = {
  color: "#FF6600",
  fontSize: "14px",
  fontWeight: "600",
  margin: "12px 0 0",
  textAlign: "center" as const,
};

const buttonSection = {
  textAlign: "center" as const,
  padding: "0 40px",
};

const button = {
  backgroundColor: "#FF6600",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "16px 32px",
};

const noticeSection = {
  padding: "16px 40px 0",
};

const noticeText = {
  color: "#a1a1aa",
  fontSize: "13px",
  lineHeight: "1.6",
  margin: "0",
};

const footer = {
  padding: "0 40px 32px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#a1a1aa",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0 0 4px",
};

const footerLink = {
  color: "#71717a",
  textDecoration: "underline",
};

const copyright = {
  color: "#d4d4d8",
  fontSize: "12px",
  marginTop: "16px",
};
