import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface RefundApprovedEmailProps {
  customerName: string;
  reservationNumber: string;
  productName: string;
  refundAmount: number;
  originalAmount: number;
  currency: string;
  refundMethod?: string;
  reservationUrl: string;
  partnerName?: string;
  partnerLogoUrl?: string;
  locale: string;
}

const logoUrl =
  "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png";

function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    KRW: "\u20a9",
    JPY: "\u00a5",
    USD: "$",
    CNY: "\u00a5",
    TWD: "NT$",
  };
  const symbol = symbols[currency] || currency;
  return `${symbol} ${amount.toLocaleString()}`;
}

const translations: Record<
  string,
  {
    preview: string;
    title: string;
    greeting: (name: string) => string;
    message: string;
    refundInfo: string;
    reservationNo: string;
    product: string;
    originalAmount: string;
    refundAmount: string;
    refundMethod: string;
    refundNotice: string;
    viewReservation: string;
    footer: string;
    support: string;
    contactSupport: string;
    poweredBy: string;
  }
> = {
  ko: {
    preview: "환불이 승인되었습니다",
    title: "환불 승인",
    greeting: (name) => `안녕하세요, ${name}님`,
    message:
      "요청하신 환불이 승인되었습니다. 아래에서 환불 상세 내역을 확인하세요.",
    refundInfo: "환불 정보",
    reservationNo: "예약번호",
    product: "상품",
    originalAmount: "결제 금액",
    refundAmount: "환불 금액",
    refundMethod: "환불 수단",
    refundNotice: "환불은 결제 수단에 따라 3~7영업일 내에 처리됩니다.",
    viewReservation: "예약 내역 보기",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "고객센터",
    poweredBy: "Powered by LOCARORA",
  },
  en: {
    preview: "Your refund has been approved",
    title: "Refund Approved",
    greeting: (name) => `Hello, ${name}`,
    message:
      "Your refund request has been approved. Please check the refund details below.",
    refundInfo: "Refund Details",
    reservationNo: "Reservation No.",
    product: "Product",
    originalAmount: "Original Amount",
    refundAmount: "Refund Amount",
    refundMethod: "Refund Method",
    refundNotice:
      "Refunds are typically processed within 3-7 business days depending on your payment method.",
    viewReservation: "View Reservation",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Contact Support",
    poweredBy: "Powered by LOCARORA",
  },
  ja: {
    preview: "返金が承認されました",
    title: "返金承認",
    greeting: (name) => `${name}様`,
    message:
      "返金リクエストが承認されました。以下で返金の詳細をご確認ください。",
    refundInfo: "返金情報",
    reservationNo: "予約番号",
    product: "商品",
    originalAmount: "お支払い金額",
    refundAmount: "返金金額",
    refundMethod: "返金方法",
    refundNotice:
      "返金はお支払い方法により、3〜7営業日以内に処理されます。",
    viewReservation: "予約を確認する",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "サポート",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-TW": {
    preview: "您的退款已獲批准",
    title: "退款批准",
    greeting: (name) => `您好，${name}`,
    message: "您的退款申請已獲批准。請查看以下退款詳情。",
    refundInfo: "退款資訊",
    reservationNo: "預約編號",
    product: "商品",
    originalAmount: "付款金額",
    refundAmount: "退款金額",
    refundMethod: "退款方式",
    refundNotice: "退款將根據付款方式在 3-7 個工作天內處理。",
    viewReservation: "查看預約",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "聯繫客服",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-CN": {
    preview: "您的退款已获批准",
    title: "退款批准",
    greeting: (name) => `您好，${name}`,
    message: "您的退款申请已获批准。请查看以下退款详情。",
    refundInfo: "退款信息",
    reservationNo: "预约编号",
    product: "商品",
    originalAmount: "付款金额",
    refundAmount: "退款金额",
    refundMethod: "退款方式",
    refundNotice: "退款将根据付款方式在 3-7 个工作日内处理。",
    viewReservation: "查看预约",
    footer: "此邮件由 LOCARORA 自动发送。",
    support: "需要帮助吗？",
    contactSupport: "联系客服",
    poweredBy: "Powered by LOCARORA",
  },
};

export const RefundApprovedEmail = ({
  customerName,
  reservationNumber,
  productName,
  refundAmount,
  originalAmount,
  currency,
  refundMethod,
  reservationUrl,
  partnerName,
  partnerLogoUrl,
  locale = "ko",
}: RefundApprovedEmailProps) => {
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
            <Text style={paragraph}>{t.message}</Text>

            {/* Refund Info Card */}
            <Section style={refundSection}>
              <Text style={sectionTitle}>{t.refundInfo}</Text>
              <Hr style={sectionDivider} />

              <Row style={refundRow}>
                <Column style={refundLabelColumn}>
                  <Text style={refundLabel}>{t.reservationNo}</Text>
                </Column>
                <Column style={refundValueColumn}>
                  <Text style={refundValue}>{reservationNumber}</Text>
                </Column>
              </Row>

              <Row style={refundRow}>
                <Column style={refundLabelColumn}>
                  <Text style={refundLabel}>{t.product}</Text>
                </Column>
                <Column style={refundValueColumn}>
                  <Text style={refundValue}>{productName}</Text>
                </Column>
              </Row>

              <Hr style={refundDivider} />

              <Row style={refundRow}>
                <Column style={refundLabelColumn}>
                  <Text style={refundLabel}>{t.originalAmount}</Text>
                </Column>
                <Column style={refundValueColumn}>
                  <Text style={refundValue}>
                    {formatCurrency(originalAmount, currency)}
                  </Text>
                </Column>
              </Row>

              <Row style={refundRow}>
                <Column style={refundLabelColumn}>
                  <Text style={refundLabelBold}>{t.refundAmount}</Text>
                </Column>
                <Column style={refundValueColumn}>
                  <Text style={refundValueHighlight}>
                    {formatCurrency(refundAmount, currency)}
                  </Text>
                </Column>
              </Row>

              {refundMethod && (
                <Row style={refundRow}>
                  <Column style={refundLabelColumn}>
                    <Text style={refundLabel}>{t.refundMethod}</Text>
                  </Column>
                  <Column style={refundValueColumn}>
                    <Text style={refundValue}>{refundMethod}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            <Text style={refundNotice}>{t.refundNotice}</Text>

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

RefundApprovedEmail.PreviewProps = {
  customerName: "홍길동",
  reservationNumber: "202601210635420",
  productName: "Galaxy S25 Ultra 렌탈 (3일~)",
  refundAmount: 53510,
  originalAmount: 53510,
  currency: "KRW",
  refundMethod: "신용카드",
  reservationUrl: "https://locarora.com/ko/reservations/abc123",
  partnerName: "ABC 렌탈",
  partnerLogoUrl: undefined,
  locale: "ko",
} satisfies RefundApprovedEmailProps;

export default RefundApprovedEmail;

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

const refundSection = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "20px",
  margin: "0 0 16px",
};

const sectionTitle = {
  color: "#18181b",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 12px",
};

const sectionDivider = {
  borderColor: "#18181b",
  borderWidth: "1px",
  margin: "0 0 16px",
};

const refundRow = {
  marginBottom: "12px",
};

const refundLabelColumn = {
  width: "50%",
  verticalAlign: "top" as const,
};

const refundValueColumn = {
  width: "50%",
  verticalAlign: "top" as const,
  textAlign: "right" as const,
};

const refundLabel = {
  color: "#71717a",
  fontSize: "14px",
  margin: "0",
};

const refundValue = {
  color: "#3f3f46",
  fontSize: "14px",
  margin: "0",
};

const refundDivider = {
  borderColor: "#e4e4e7",
  margin: "8px 0 16px",
};

const refundLabelBold = {
  color: "#18181b",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};

const refundValueHighlight = {
  color: "#18181b",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0",
};

const refundNotice = {
  color: "#71717a",
  fontSize: "13px",
  lineHeight: "1.5",
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
