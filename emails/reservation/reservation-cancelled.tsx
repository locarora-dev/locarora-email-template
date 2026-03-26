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

interface ReservationCancelledEmailProps {
  customerName: string;
  reservationNumber: string;
  productName: string;
  productImageUrl?: string;
  cancelReason?: string;
  refundAmount: number;
  originalAmount: number;
  refundMethod?: string;
  pickupDate: string;
  returnDate: string;
  currency: string;
  locale: string;
  reservationUrl: string;
  partnerName?: string;
  partnerLogoUrl?: string;
}

const logoUrl =
  "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png";

function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    KRW: "₩",
    JPY: "¥",
    USD: "$",
    CNY: "¥",
    TWD: "NT$",
  };
  const symbol = symbols[currency] || currency;
  return `${symbol} ${amount.toLocaleString()}`;
}

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

const translations: Record<
  string,
  {
    preview: string;
    title: string;
    greeting: (name: string) => string;
    cancelledMessage: string;
    cancelReason: string;
    reservationInfo: string;
    reservationNo: string;
    product: string;
    rentalPeriod: string;
    refundInfo: string;
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
    preview: "예약이 취소되었습니다",
    title: "예약 취소",
    greeting: (name) => `안녕하세요, ${name}님`,
    cancelledMessage: "요청하신 예약이 취소되었습니다.",
    cancelReason: "취소 사유",
    reservationInfo: "예약 정보",
    reservationNo: "예약번호",
    product: "상품",
    rentalPeriod: "이용 기간",
    refundInfo: "환불 정보",
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
    preview: "Your reservation has been cancelled",
    title: "Reservation Cancelled",
    greeting: (name) => `Hello, ${name}`,
    cancelledMessage: "Your reservation has been cancelled.",
    cancelReason: "Cancellation Reason",
    reservationInfo: "Reservation Details",
    reservationNo: "Reservation No.",
    product: "Product",
    rentalPeriod: "Rental Period",
    refundInfo: "Refund Information",
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
    preview: "ご予約がキャンセルされました",
    title: "予約キャンセル",
    greeting: (name) => `${name}様`,
    cancelledMessage: "ご予約がキャンセルされました。",
    cancelReason: "キャンセル理由",
    reservationInfo: "予約情報",
    reservationNo: "予約番号",
    product: "商品",
    rentalPeriod: "ご利用期間",
    refundInfo: "返金情報",
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
    preview: "您的預約已取消",
    title: "預約取消",
    greeting: (name) => `您好，${name}`,
    cancelledMessage: "您的預約已被取消。",
    cancelReason: "取消原因",
    reservationInfo: "預約資訊",
    reservationNo: "預約編號",
    product: "商品",
    rentalPeriod: "租借期間",
    refundInfo: "退款資訊",
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
    preview: "您的预约已取消",
    title: "预约取消",
    greeting: (name) => `您好，${name}`,
    cancelledMessage: "您的预约已被取消。",
    cancelReason: "取消原因",
    reservationInfo: "预约信息",
    reservationNo: "预约编号",
    product: "商品",
    rentalPeriod: "租借期间",
    refundInfo: "退款信息",
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

export const ReservationCancelledEmail = ({
  customerName,
  reservationNumber,
  productName,
  productImageUrl,
  cancelReason,
  refundAmount,
  originalAmount,
  refundMethod,
  pickupDate,
  returnDate,
  currency,
  locale = "ko",
  reservationUrl,
  partnerName,
  partnerLogoUrl,
}: ReservationCancelledEmailProps) => {
  const t = translations[locale] || translations.ko;
  const formattedPickup = formatDate(pickupDate, locale);
  const formattedReturn = formatDate(returnDate, locale);

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Partner Header or LOCARORA Logo */}
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
                style={logo}
              />
            </Section>
          )}

          <Hr style={divider} />

          {/* Title with Cancel Icon */}
          <Section style={titleSection}>
            <Text style={cancelIcon}>✕</Text>
            <Heading style={heading}>{t.title}</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>{t.greeting(customerName)}</Text>
            <Text style={paragraph}>{t.cancelledMessage}</Text>

            {/* Cancel Reason */}
            {cancelReason && (
              <Section style={reasonCard}>
                <Text style={reasonLabel}>{t.cancelReason}</Text>
                <Text style={reasonText}>{cancelReason}</Text>
              </Section>
            )}

            {/* Reservation Info */}
            <Section style={infoSection}>
              <Text style={sectionTitle}>{t.reservationInfo}</Text>
              <Hr style={sectionDivider} />

              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>{t.reservationNo}</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>{reservationNumber}</Text>
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
                  <Text style={label}>{t.rentalPeriod}</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>
                    {formattedPickup} — {formattedReturn}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Refund Info */}
            <Section style={refundSection}>
              <Text style={sectionTitle}>{t.refundInfo}</Text>
              <Hr style={sectionDivider} />

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

              <Hr style={refundDivider} />

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

            {/* CTA Button */}
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
            <Text style={copyright}>© 2025 LOCARORA. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ReservationCancelledEmail.PreviewProps = {
  customerName: "홍길동",
  reservationNumber: "202601210635420",
  productName: "Galaxy S25 Ultra 렌탈 (3일~)",
  productImageUrl: undefined,
  cancelReason: "개인 사정으로 인한 취소",
  refundAmount: 53510,
  originalAmount: 53510,
  refundMethod: "신용카드",
  pickupDate: "2026-01-23",
  returnDate: "2026-01-26",
  currency: "KRW",
  locale: "ko",
  reservationUrl: "https://locarora.com/ko/reservations/abc123",
  partnerName: "ABC 렌탈",
  partnerLogoUrl: undefined,
} satisfies ReservationCancelledEmailProps;

export default ReservationCancelledEmail;

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

const logo = {
  margin: "0 auto",
};

const divider = {
  borderColor: "#e4e4e7",
  margin: "0",
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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

const titleSection = {
  padding: "32px 40px 24px",
  textAlign: "center" as const,
};

const cancelIcon = {
  fontSize: "48px",
  color: "#ef4444",
  margin: "0 0 16px",
  fontWeight: "bold" as const,
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

const reasonCard = {
  backgroundColor: "#fef2f2",
  borderRadius: "8px",
  padding: "16px 20px",
  margin: "0 0 24px",
  borderLeft: "4px solid #ef4444",
};

const reasonLabel = {
  color: "#991b1b",
  fontSize: "13px",
  fontWeight: "600",
  margin: "0 0 4px",
};

const reasonText = {
  color: "#dc2626",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0",
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
  width: "100px",
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

const refundSection = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "20px",
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
  color: "#ef4444",
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

const footerLogo = {
  margin: "0 auto 8px",
  opacity: 0.6,
};

const poweredByText = {
  color: "#a1a1aa",
  fontSize: "11px",
  margin: "0 0 12px",
};
