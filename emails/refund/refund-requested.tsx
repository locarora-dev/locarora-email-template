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

interface RefundRequestedEmailProps {
  partnerName: string;
  partnerLogoUrl?: string;
  customerName: string;
  reservationNumber: string;
  productName: string;
  refundAmount: number;
  currency: string;
  reason: string;
  reasonCategory?: string;
  requestedAt: string;
  ordersUrl: string;
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

function formatDateTime(dateStr: string, locale: string): string {
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
    hour: "2-digit",
    minute: "2-digit",
  });
}

const translations: Record<
  string,
  {
    preview: string;
    title: string;
    greeting: (name: string) => string;
    message: string;
    requestInfo: string;
    reservationNo: string;
    product: string;
    customer: string;
    requestedAmount: string;
    requestedAt: string;
    reasonLabel: string;
    actionRequired: string;
    actionMessage: string;
    viewOrders: string;
    footer: string;
    support: string;
    contactSupport: string;
    poweredBy: string;
  }
> = {
  ko: {
    preview: "새로운 환불 요청이 접수되었습니다",
    title: "환불 요청 접수",
    greeting: (name) => `${name} 파트너님`,
    message: "고객으로부터 환불 요청이 접수되었습니다. 확인 후 처리해 주세요.",
    requestInfo: "환불 요청 정보",
    reservationNo: "예약번호",
    product: "상품",
    customer: "고객",
    requestedAmount: "요청 금액",
    requestedAt: "요청 일시",
    reasonLabel: "환불 사유",
    actionRequired: "처리 필요",
    actionMessage:
      "주문 관리에서 환불 요청을 확인하고 승인 또는 거절해 주세요.",
    viewOrders: "주문 관리로 이동",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "고객센터",
    poweredBy: "Powered by LOCARORA",
  },
  en: {
    preview: "A new refund request has been submitted",
    title: "Refund Request Received",
    greeting: (name) => `Dear ${name}`,
    message:
      "A refund request has been submitted by a customer. Please review and process it.",
    requestInfo: "Refund Request Details",
    reservationNo: "Reservation No.",
    product: "Product",
    customer: "Customer",
    requestedAmount: "Requested Amount",
    requestedAt: "Requested At",
    reasonLabel: "Reason",
    actionRequired: "Action Required",
    actionMessage:
      "Please review the refund request in Order Management and approve or reject it.",
    viewOrders: "Go to Order Management",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Contact Support",
    poweredBy: "Powered by LOCARORA",
  },
  ja: {
    preview: "新しい返金リクエストが届きました",
    title: "返金リクエスト受付",
    greeting: (name) => `${name}パートナー様`,
    message:
      "お客様から返金リクエストが届きました。ご確認のうえ、対応をお願いいたします。",
    requestInfo: "返金リクエスト情報",
    reservationNo: "予約番号",
    product: "商品",
    customer: "お客様",
    requestedAmount: "リクエスト金額",
    requestedAt: "リクエスト日時",
    reasonLabel: "返金理由",
    actionRequired: "対応が必要です",
    actionMessage:
      "注文管理から返金リクエストを確認し、承認または却下してください。",
    viewOrders: "注文管理へ移動",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "サポート",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-TW": {
    preview: "收到新的退款申請",
    title: "退款申請通知",
    greeting: (name) => `${name} 合作夥伴您好`,
    message: "有客戶提交了退款申請，請查看並處理。",
    requestInfo: "退款申請詳情",
    reservationNo: "預約編號",
    product: "商品",
    customer: "客戶",
    requestedAmount: "申請金額",
    requestedAt: "申請時間",
    reasonLabel: "退款原因",
    actionRequired: "需要處理",
    actionMessage: "請在訂單管理中查看退款申請並批准或拒絕。",
    viewOrders: "前往訂單管理",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "聯繫客服",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-CN": {
    preview: "收到新的退款申请",
    title: "退款申请通知",
    greeting: (name) => `${name} 合作伙伴您好`,
    message: "有客户提交了退款申请，请查看并处理。",
    requestInfo: "退款申请详情",
    reservationNo: "预约编号",
    product: "商品",
    customer: "客户",
    requestedAmount: "申请金额",
    requestedAt: "申请时间",
    reasonLabel: "退款原因",
    actionRequired: "需要处理",
    actionMessage: "请在订单管理中查看退款申请并批准或拒绝。",
    viewOrders: "前往订单管理",
    footer: "此邮件由 LOCARORA 自动发送。",
    support: "需要帮助吗？",
    contactSupport: "联系客服",
    poweredBy: "Powered by LOCARORA",
  },
};

export const RefundRequestedEmail = ({
  partnerName,
  partnerLogoUrl,
  customerName,
  reservationNumber,
  productName,
  refundAmount,
  currency,
  reason,
  requestedAt,
  ordersUrl,
  locale = "ko",
}: RefundRequestedEmailProps) => {
  const t = translations[locale] || translations.ko;

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Partner Header */}
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

          <Hr style={divider} />

          {/* Title */}
          <Section style={titleSection}>
            <Heading style={heading}>{t.title}</Heading>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>{t.greeting(partnerName)}</Text>
            <Text style={paragraph}>{t.message}</Text>

            {/* Request Info */}
            <Section style={infoSection}>
              <Text style={sectionTitle}>{t.requestInfo}</Text>
              <Hr style={sectionDivider} />

              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>{t.reservationNo}</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={valueBold}>{reservationNumber}</Text>
                </Column>
              </Row>

              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>{t.product}</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{productName}</Text>
                </Column>
              </Row>

              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>{t.customer}</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{customerName}</Text>
                </Column>
              </Row>

              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>{t.requestedAmount}</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={valueHighlight}>
                    {formatCurrency(refundAmount, currency)}
                  </Text>
                </Column>
              </Row>

              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>{t.requestedAt}</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{formatDateTime(requestedAt, locale)}</Text>
                </Column>
              </Row>
            </Section>

            {/* Reason */}
            <Section style={reasonBox}>
              <Text style={reasonBoxTitle}>{t.reasonLabel}</Text>
              <Text style={reasonBoxText}>{reason}</Text>
            </Section>

            <Text style={noticeText}>{t.actionMessage}</Text>

            {/* CTA */}
            <Section style={buttonSection}>
              <Button style={button} href={ordersUrl}>
                {t.viewOrders}
              </Button>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Img
              src={logoUrl}
              width="100"
              height="22"
              alt="LOCARORA"
              style={footerLogo}
            />
            <Text style={poweredByText}>{t.poweredBy}</Text>
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

RefundRequestedEmail.PreviewProps = {
  partnerName: "ABC 렌탈",
  partnerLogoUrl: undefined,
  customerName: "홍길동",
  reservationNumber: "202601210635420",
  productName: "Galaxy S25 Ultra 렌탈 (3일~)",
  refundAmount: 53510,
  currency: "KRW",
  reason: "일정 변경으로 인한 환불 요청",
  requestedAt: "2026-01-22T14:30:00Z",
  ordersUrl: "https://admin.locarora.com/ko/partner/orders",
  locale: "ko",
} satisfies RefundRequestedEmailProps;

export default RefundRequestedEmail;

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

const infoSection = {
  margin: "0 0 24px",
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

const infoRow = {
  marginBottom: "8px",
};

const labelColumn = {
  width: "110px",
  verticalAlign: "top" as const,
};

const valueColumn = {
  verticalAlign: "top" as const,
};

const label = {
  color: "#71717a",
  fontSize: "14px",
  margin: "0",
};

const value = {
  color: "#3f3f46",
  fontSize: "14px",
  margin: "0",
};

const valueBold = {
  color: "#18181b",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};

const valueHighlight = {
  color: "#ef4444",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0",
};

const reasonBox = {
  border: "2px solid #FF6600",
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
