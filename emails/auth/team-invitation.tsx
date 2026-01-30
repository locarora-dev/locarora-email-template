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

interface TeamInvitationEmailProps {
  partnerName: string;
  partnerLogoUrl?: string;
  inviterName: string;
  inviteUrl: string;
  role: "partner_manager" | "partner_member";
  locale: string;
  expiresAt: string;
}

// Supabase Storage에 호스팅된 이미지 URL
const logoUrl =
  "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png";

// 다국어 텍스트
const translations: Record<
  string,
  {
    preview: (partnerName: string) => string;
    greeting: string;
    inviteMessage: (inviter: string, partner: string) => string;
    roleLabel: string;
    managerRole: string;
    memberRole: string;
    acceptButton: string;
    expiresMessage: (date: string) => string;
    ignoreMessage: string;
    footer: string;
    linkFallback: string;
  }
> = {
  ko: {
    preview: (partnerName) => `${partnerName}에서 팀원으로 초대합니다`,
    greeting: "안녕하세요,",
    inviteMessage: (inviter, partner) =>
      `${inviter}님이 ${partner} 팀에 초대했습니다.`,
    roleLabel: "부여될 역할",
    managerRole: "매니저",
    memberRole: "멤버",
    acceptButton: "초대 수락하기",
    expiresMessage: (date) => `이 초대는 ${date}까지 유효합니다.`,
    ignoreMessage: "초대를 원하지 않으시면 이 이메일을 무시하셔도 됩니다.",
    footer: "본 이메일은 LOCARORA에서 발송되었습니다.",
    linkFallback: "버튼이 작동하지 않으면 아래 링크를 브라우저에 복사하세요:",
  },
  en: {
    preview: (partnerName) => `You're invited to join ${partnerName}`,
    greeting: "Hello,",
    inviteMessage: (inviter, partner) =>
      `${inviter} has invited you to join the ${partner} team.`,
    roleLabel: "Your role will be",
    managerRole: "Manager",
    memberRole: "Member",
    acceptButton: "Accept Invitation",
    expiresMessage: (date) => `This invitation is valid until ${date}.`,
    ignoreMessage:
      "If you don't want to accept this invitation, you can ignore this email.",
    footer: "This email was sent by LOCARORA.",
    linkFallback:
      "If the button doesn't work, copy and paste this link into your browser:",
  },
  ja: {
    preview: (partnerName) => `${partnerName}からチームへの招待`,
    greeting: "こんにちは、",
    inviteMessage: (inviter, partner) =>
      `${inviter}さんが${partner}チームに招待しました。`,
    roleLabel: "付与される役割",
    managerRole: "マネージャー",
    memberRole: "メンバー",
    acceptButton: "招待を受け入れる",
    expiresMessage: (date) => `この招待は${date}まで有効です。`,
    ignoreMessage: "招待を希望されない場合は、このメールを無視してください。",
    footer: "このメールはLOCARORAから送信されました。",
    linkFallback:
      "ボタンが機能しない場合は、以下のリンクをブラウザにコピーしてください:",
  },
  "zh-TW": {
    preview: (partnerName) => `${partnerName}邀請您加入團隊`,
    greeting: "您好，",
    inviteMessage: (inviter, partner) =>
      `${inviter} 邀請您加入 ${partner} 團隊。`,
    roleLabel: "您的角色將是",
    managerRole: "經理",
    memberRole: "成員",
    acceptButton: "接受邀請",
    expiresMessage: (date) => `此邀請在 ${date} 前有效。`,
    ignoreMessage: "如果您不想接受此邀請，可以忽略此郵件。",
    footer: "此郵件由 LOCARORA 發送。",
    linkFallback: "如果按鈕無法使用，請將以下連結複製到瀏覽器：",
  },
  "zh-CN": {
    preview: (partnerName) => `${partnerName}邀请您加入团队`,
    greeting: "您好，",
    inviteMessage: (inviter, partner) =>
      `${inviter} 邀请您加入 ${partner} 团队。`,
    roleLabel: "您的角色将是",
    managerRole: "经理",
    memberRole: "成员",
    acceptButton: "接受邀请",
    expiresMessage: (date) => `此邀请在 ${date} 前有效。`,
    ignoreMessage: "如果您不想接受此邀请，可以忽略此邮件。",
    footer: "此邮件由 LOCARORA 发送。",
    linkFallback: "如果按钮无法使用，请将以下链接复制到浏览器：",
  },
};

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  const localeMap: Record<string, string> = {
    ko: "ko-KR",
    en: "en-US",
    ja: "ja-JP",
    "zh-TW": "zh-TW",
    "zh-CN": "zh-CN",
  };
  return date.toLocaleDateString(localeMap[locale] || "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const TeamInvitationEmail = ({
  partnerName,
  partnerLogoUrl,
  inviterName,
  inviteUrl,
  role,
  locale = "ko",
  expiresAt,
}: TeamInvitationEmailProps) => {
  const t = translations[locale] || translations.ko;
  const roleName = role === "partner_manager" ? t.managerRole : t.memberRole;
  const formattedDate = formatDate(expiresAt, locale);

  return (
    <Html>
      <Head />
      <Preview>{t.preview(partnerName)}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* LOCARORA 로고 */}
          <Section style={logoSection}>
            <Img
              src={logoUrl}
              width="180"
              height="40"
              alt="LOCARORA"
              style={logo}
            />
          </Section>

          <Hr style={divider} />

          {/* 파트너 정보 */}
          <Section style={partnerSection}>
            {partnerLogoUrl ? (
              <Img
                src={partnerLogoUrl}
                width="60"
                height="60"
                alt={partnerName}
                style={partnerLogo}
              />
            ) : (
              <div style={partnerInitial}>
                {partnerName.charAt(0).toUpperCase()}
              </div>
            )}
            <Heading style={partnerNameStyle}>{partnerName}</Heading>
          </Section>

          {/* 메인 컨텐츠 */}
          <Section style={content}>
            <Text style={paragraph}>{t.greeting}</Text>

            <Text style={paragraph}>
              <strong>{inviterName}</strong>
              {locale === "ko" && "님이 "}
              {locale === "ja" && "さんが"}
              {locale !== "ko" && locale !== "ja" && " has invited you to join "}
              <strong>{partnerName}</strong>
              {locale === "ko" && " 팀에 초대했습니다."}
              {locale === "ja" && "チームに招待しました。"}
              {locale === "en" && " team."}
              {locale === "zh-TW" && " 團隊。"}
              {locale === "zh-CN" && " 团队。"}
            </Text>

            {/* 역할 배지 */}
            <Section style={roleBadgeSection}>
              <Text style={roleLabel}>{t.roleLabel}:</Text>
              <Text style={roleValue}>{roleName}</Text>
            </Section>

            {/* CTA 버튼 */}
            <Section style={buttonSection}>
              <Button style={button} href={inviteUrl}>
                {t.acceptButton}
              </Button>
            </Section>

            {/* 만료일 안내 */}
            <Text style={expiresText}>{t.expiresMessage(formattedDate)}</Text>
            <Text style={ignoreText}>{t.ignoreMessage}</Text>

            {/* 링크 폴백 */}
            <Text style={subText}>{t.linkFallback}</Text>
            <Text style={linkText}>
              <Link href={inviteUrl} style={link}>
                {inviteUrl}
              </Link>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* 푸터 */}
          <Section style={footer}>
            <Text style={footerText}>{t.footer}</Text>
            <Text style={copyright}>© 2025 LOCARORA. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

TeamInvitationEmail.PreviewProps = {
  partnerName: "ABC 파트너",
  partnerLogoUrl: undefined,
  inviterName: "홍길동",
  inviteUrl: "https://partner.locarora.com/invite/abc123",
  role: "partner_manager",
  locale: "ko",
  expiresAt: "2026-02-06T00:00:00Z",
} satisfies TeamInvitationEmailProps;

export default TeamInvitationEmail;

// 스타일 (confirm-signup.tsx와 일관성 유지)
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
  padding: "32px 40px 24px",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

const divider = {
  borderColor: "#e4e4e7",
  margin: "0",
};

const partnerSection = {
  padding: "24px 40px",
  textAlign: "center" as const,
  backgroundColor: "#fafafa",
};

const partnerLogo = {
  margin: "0 auto 12px",
  borderRadius: "12px",
};

const partnerInitial = {
  width: "60px",
  height: "60px",
  backgroundColor: "#FF6600",
  borderRadius: "12px",
  margin: "0 auto 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold" as const,
  lineHeight: "60px",
  textAlign: "center" as const,
};

const partnerNameStyle = {
  color: "#18181b",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0",
};

const content = {
  padding: "32px 40px",
};

const paragraph = {
  color: "#3f3f46",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const roleBadgeSection = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "16px",
  margin: "24px 0",
  textAlign: "center" as const,
};

const roleLabel = {
  color: "#71717a",
  fontSize: "14px",
  margin: "0 0 4px",
};

const roleValue = {
  color: "#7c3aed",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0",
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
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
  padding: "14px 32px",
  boxShadow: "0 2px 4px rgba(255, 102, 0, 0.2)",
};

const expiresText = {
  color: "#71717a",
  fontSize: "14px",
  textAlign: "center" as const,
  margin: "0 0 8px",
};

const ignoreText = {
  color: "#a1a1aa",
  fontSize: "13px",
  textAlign: "center" as const,
  margin: "0 0 24px",
};

const subText = {
  color: "#71717a",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "24px 0 8px",
};

const linkText = {
  margin: "0",
  wordBreak: "break-all" as const,
};

const link = {
  color: "#FF6600",
  fontSize: "13px",
  textDecoration: "underline",
};

const footer = {
  padding: "24px 40px 32px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#a1a1aa",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0 0 4px",
};

const copyright = {
  color: "#d4d4d8",
  fontSize: "12px",
  marginTop: "16px",
};
