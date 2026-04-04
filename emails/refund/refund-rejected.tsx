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

interface RefundRejectedEmailProps {
  customerName: string;
  reservationNumber: string;
  productName: string;
  rejectionReason?: string;
  reservationUrl: string;
  partnerName?: string;
  partnerLogoUrl?: string;
  locale: string;
}

const logoUrl =
  "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png";

const translations: Record<
  string,
  {
    preview: string;
    title: string;
    greeting: (name: string) => string;
    message: (resNo: string, product: string) => string;
    rejectionReason: string;
    nextSteps: string;
    nextStepsMessage: string;
    viewReservation: string;
    footer: string;
    support: string;
    contactSupport: string;
    poweredBy: string;
  }
> = {
  ko: {
    preview: "환불 요청이 거절되었습니다",
    title: "환불 요청 거절",
    greeting: (name) => `안녕하세요, ${name}님`,
    message: (resNo, product) =>
      `${product} (${resNo}) 예약에 대한 환불 요청이 거절되었습니다.`,
    rejectionReason: "거절 사유",
    nextSteps: "다음 단계",
    nextStepsMessage:
      "환불 거절에 이의가 있으시면 고객센터로 문의해 주세요. 담당자가 확인 후 안내드리겠습니다.",
    viewReservation: "예약 내역 보기",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "고객센터",
    poweredBy: "Powered by LOCARORA",
  },
  en: {
    preview: "Your refund request has been rejected",
    title: "Refund Request Rejected",
    greeting: (name) => `Hello, ${name}`,
    message: (resNo, product) =>
      `Your refund request for ${product} (${resNo}) has been rejected.`,
    rejectionReason: "Rejection Reason",
    nextSteps: "Next Steps",
    nextStepsMessage:
      "If you disagree with this decision, please contact our support team. We'll review and assist you.",
    viewReservation: "View Reservation",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Contact Support",
    poweredBy: "Powered by LOCARORA",
  },
  ja: {
    preview: "返金リクエストが却下されました",
    title: "返金リクエスト却下",
    greeting: (name) => `${name}様`,
    message: (resNo, product) =>
      `${product}（${resNo}）のご予約に対する返金リクエストが却下されました。`,
    rejectionReason: "却下理由",
    nextSteps: "次のステップ",
    nextStepsMessage:
      "この決定にご異議がある場合は、サポートチームまでお問い合わせください。確認後ご案内いたします。",
    viewReservation: "予約を確認する",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "サポート",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-TW": {
    preview: "您的退款申請已被拒絕",
    title: "退款申請拒絕",
    greeting: (name) => `您好，${name}`,
    message: (resNo, product) =>
      `您的 ${product}（${resNo}）預約退款申請已被拒絕。`,
    rejectionReason: "拒絕原因",
    nextSteps: "後續步驟",
    nextStepsMessage:
      "如您對此決定有異議，請聯繫客服團隊。我們會進行審查並提供協助。",
    viewReservation: "查看預約",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "聯繫客服",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-CN": {
    preview: "您的退款申请已被拒绝",
    title: "退款申请拒绝",
    greeting: (name) => `您好，${name}`,
    message: (resNo, product) =>
      `您的 ${product}（${resNo}）预约退款申请已被拒绝。`,
    rejectionReason: "拒绝原因",
    nextSteps: "后续步骤",
    nextStepsMessage:
      "如您对此决定有异议，请联系客服团队。我们会进行审查并提供协助。",
    viewReservation: "查看预约",
    footer: "此邮件由 LOCARORA 自动发送。",
    support: "需要帮助吗？",
    contactSupport: "联系客服",
    poweredBy: "Powered by LOCARORA",
  },
};

export const RefundRejectedEmail = ({
  customerName,
  reservationNumber,
  productName,
  rejectionReason,
  reservationUrl,
  partnerName,
  partnerLogoUrl,
  locale = "ko",
}: RefundRejectedEmailProps) => {
  const t = translations[locale] || translations.ko;

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          {partnerName ? (
            <Section style={partnerHeaderSection}>
              {partnerLogoUrl ? (
                <Img
                  src={partnerLogoUrl}
                  width="80"
                  height="80"
                  alt={partnerName}
                  style={partnerLogoStyle}
                />
              ) : (
                <div style={partnerInitial}>
                  {partnerName.charAt(0).toUpperCase()}
                </div>
              )}
              <Heading style={partnerNameHeading}>{partnerName}</Heading>
            </Section>
          ) : (
            <Section style={logoSection}>
              <Img
                src={logoUrl}
                width="180"
                height="40"
                alt="LOCARORA"
                style={logoImg}
              />
            </Section>
          )}

          <Hr style={divider} />

          {/* Title */}
          <Section style={titleSection}>
            <Heading style={heading}>{t.title}</Heading>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>{t.greeting(customerName)}</Text>
            <Text style={paragraph}>
              {t.message(reservationNumber, productName)}
            </Text>

            {/* Rejection Reason */}
            {rejectionReason && (
              <Section style={reasonBox}>
                <Text style={reasonBoxTitle}>{t.rejectionReason}</Text>
                <Text style={reasonBoxText}>{rejectionReason}</Text>
              </Section>
            )}

            <Text style={noticeText}>{t.nextStepsMessage}</Text>

            {/* CTA */}
            <Section style={buttonSection}>
              <Button style={button} href={reservationUrl}>
                {t.viewReservation}
              </Button>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            {partnerName && (
              <>
                <Img
                  src={logoUrl}
                  width="100"
                  height="22"
                  alt="LOCARORA"
                  style={footerLogo}
                />
                <Text style={poweredByText}>{t.poweredBy}</Text>
              </>
            )}
            <Text style={footerText}>{t.footer}</Text>
            <Text style={footerText}>
              {t.support}{" "}
              <Link href="https://locarora.com/help" style={footerLink}>
                {t.contactSupport}
              </Link>
            </Text>
            <Text style={copyrightText}>
              &copy; 2025 LOCARORA. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

RefundRejectedEmail.PreviewProps = {
  customerName: "홍길동",
  reservationNumber: "202601210635420",
  productName: "Galaxy S25 Ultra 렌탈 (3일~)",
  rejectionReason:
    "이용 시작일이 지난 예약은 환불이 불가합니다. 자세한 내용은 환불 정책을 확인해 주세요.",
  reservationUrl: "https://locarora.com/ko/reservations/abc123",
  partnerName: "ABC 렌탈",
  partnerLogoUrl: undefined,
  locale: "ko",
} satisfies RefundRejectedEmailProps;

export default RefundRejectedEmail;

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
  padding: "32px 40px 24px",
  textAlign: "center" as const,
};

const logoImg = {
  margin: "0 auto",
};

const partnerHeaderSection = {
  padding: "32px 40px 24px",
  textAlign: "center" as const,
  backgroundColor: "#fafafa",
};

const partnerLogoStyle = {
  margin: "0 auto 12px",
  borderRadius: "12px",
  objectFit: "contain" as const,
};

const partnerInitial = {
  width: "80px",
  height: "80px",
  backgroundColor: "#FF6600",
  borderRadius: "12px",
  margin: "0 auto 12px",
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "bold" as const,
  lineHeight: "80px",
  textAlign: "center" as const,
};

const partnerNameHeading = {
  color: "#18181b",
  fontSize: "22px",
  fontWeight: "600",
  margin: "0",
};

const divider = {
  borderColor: "#e4e4e7",
  margin: "0",
};

const titleSection = {
  padding: "32px 40px 24px",
  textAlign: "center" as const,
};

const heading = {
  color: "#18181b",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.4",
  margin: "0",
};

const content = {
  padding: "0 40px 32px",
};

const greeting = {
  color: "#18181b",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 16px",
};

const paragraph = {
  color: "#3f3f46",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 24px",
};

const reasonBox = {
  border: "2px solid #ef4444",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "0 0 24px",
};

const reasonBoxTitle = {
  color: "#18181b",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 8px",
};

const reasonBoxText = {
  color: "#3f3f46",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
};

const noticeText = {
  color: "#71717a",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "8px 0",
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

const footer = {
  padding: "24px 40px 32px",
  textAlign: "center" as const,
};

const footerLogo = {
  margin: "0 auto 8px",
  opacity: 0.6,
};

const poweredByText = {
  color: "#a1a1aa",
  fontSize: "11px",
  margin: "0 0 12px",
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

const copyrightText = {
  color: "#d4d4d8",
  fontSize: "12px",
  marginTop: "16px",
};
