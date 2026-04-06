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

interface ReservationCancelledPartnerEmailProps {
  partnerName: string;
  partnerLogoUrl?: string;
  customerName: string;
  reservationNumber: string;
  productName: string;
  cancelReason?: string;
  refundAmount: number;
  originalAmount: number;
  currency: string;
  pickupDate: string;
  returnDate: string;
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
    message: string;
    reservationInfo: string;
    reservationNo: string;
    product: string;
    customer: string;
    rentalPeriod: string;
    cancelReason: string;
    refundInfo: string;
    originalAmount: string;
    refundAmount: string;
    viewOrders: string;
    footer: string;
    support: string;
    contactSupport: string;
    poweredBy: string;
  }
> = {
  ko: {
    preview: "고객이 예약을 취소했습니다",
    title: "예약 취소 알림",
    greeting: (name) => `${name} 파트너님`,
    message: "고객이 예약을 취소했습니다. 아래에서 상세 내역을 확인하세요.",
    reservationInfo: "취소된 예약 정보",
    reservationNo: "예약번호",
    product: "상품",
    customer: "고객",
    rentalPeriod: "이용 기간",
    cancelReason: "취소 사유",
    refundInfo: "환불 정보",
    originalAmount: "결제 금액",
    refundAmount: "환불 금액",
    viewOrders: "주문 관리로 이동",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "고객센터",
    poweredBy: "Powered by LOCARORA",
  },
  en: {
    preview: "A customer has cancelled their reservation",
    title: "Reservation Cancelled",
    greeting: (name) => `Dear ${name}`,
    message:
      "A customer has cancelled their reservation. Please check the details below.",
    reservationInfo: "Cancelled Reservation Details",
    reservationNo: "Reservation No.",
    product: "Product",
    customer: "Customer",
    rentalPeriod: "Rental Period",
    cancelReason: "Cancellation Reason",
    refundInfo: "Refund Information",
    originalAmount: "Original Amount",
    refundAmount: "Refund Amount",
    viewOrders: "Go to Order Management",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Contact Support",
    poweredBy: "Powered by LOCARORA",
  },
  ja: {
    preview: "お客様が予約をキャンセルしました",
    title: "予約キャンセル通知",
    greeting: (name) => `${name}パートナー様`,
    message:
      "お客様が予約をキャンセルしました。以下の詳細をご確認ください。",
    reservationInfo: "キャンセルされた予約情報",
    reservationNo: "予約番号",
    product: "商品",
    customer: "お客様",
    rentalPeriod: "ご利用期間",
    cancelReason: "キャンセル理由",
    refundInfo: "返金情報",
    originalAmount: "お支払い金額",
    refundAmount: "返金金額",
    viewOrders: "注文管理へ移動",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "サポート",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-TW": {
    preview: "客戶已取消預約",
    title: "預約取消通知",
    greeting: (name) => `${name} 合作夥伴您好`,
    message: "客戶已取消預約。請查看以下詳細資訊。",
    reservationInfo: "已取消的預約資訊",
    reservationNo: "預約編號",
    product: "商品",
    customer: "客戶",
    rentalPeriod: "租借期間",
    cancelReason: "取消原因",
    refundInfo: "退款資訊",
    originalAmount: "付款金額",
    refundAmount: "退款金額",
    viewOrders: "前往訂單管理",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "聯繫客服",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-CN": {
    preview: "客户已取消预约",
    title: "预约取消通知",
    greeting: (name) => `${name} 合作伙伴您好`,
    message: "客户已取消预约。请查看以下详细信息。",
    reservationInfo: "已取消的预约信息",
    reservationNo: "预约编号",
    product: "商品",
    customer: "客户",
    rentalPeriod: "租借期间",
    cancelReason: "取消原因",
    refundInfo: "退款信息",
    originalAmount: "付款金额",
    refundAmount: "退款金额",
    viewOrders: "前往订单管理",
    footer: "此邮件由 LOCARORA 自动发送。",
    support: "需要帮助吗？",
    contactSupport: "联系客服",
    poweredBy: "Powered by LOCARORA",
  },
};

export const ReservationCancelledPartnerEmail = ({
  partnerName,
  partnerLogoUrl,
  customerName,
  reservationNumber,
  productName,
  cancelReason,
  refundAmount,
  originalAmount,
  currency,
  pickupDate,
  returnDate,
  ordersUrl,
  locale = "ko",
}: ReservationCancelledPartnerEmailProps) => {
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

            {/* Reservation Info */}
            <Section style={infoSection}>
              <Text style={sectionTitle}>{t.reservationInfo}</Text>
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
                  <Text style={label}>{t.rentalPeriod}</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>
                    {formatDate(pickupDate, locale)} &mdash;{" "}
                    {formatDate(returnDate, locale)}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Cancel Reason */}
            {cancelReason && (
              <Section style={reasonBox}>
                <Text style={reasonBoxTitle}>{t.cancelReason}</Text>
                <Text style={reasonBoxText}>{cancelReason}</Text>
              </Section>
            )}

            {/* Refund Info */}
            <Section style={refundSection}>
              <Text style={sectionTitle}>{t.refundInfo}</Text>
              <Hr style={refundSectionDivider} />

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
            </Section>

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

ReservationCancelledPartnerEmail.PreviewProps = {
  partnerName: "ABC 렌탈",
  partnerLogoUrl: undefined,
  customerName: "홍길동",
  reservationNumber: "202601210635420",
  productName: "Galaxy S25 Ultra 렌탈 (3일~)",
  cancelReason: "일정 변경",
  refundAmount: 53510,
  originalAmount: 53510,
  currency: "KRW",
  pickupDate: "2026-01-23",
  returnDate: "2026-01-26",
  ordersUrl: "https://admin.locarora.com/ko/partner/orders",
  locale: "ko",
} satisfies ReservationCancelledPartnerEmailProps;

export default ReservationCancelledPartnerEmail;

// Styles
const main = { backgroundColor: "#f4f4f5", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif', padding: "40px 0" };
const container = { backgroundColor: "#ffffff", margin: "0 auto", maxWidth: "560px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)", overflow: "hidden" };
const partnerHeaderSection = { padding: "32px 40px 24px", textAlign: "center" as const, backgroundColor: "#fafafa" };
const partnerLogoStyle = { margin: "0 auto 12px", borderRadius: "12px", objectFit: "contain" as const };
const partnerInitial = { width: "80px", height: "80px", backgroundColor: "#FF6600", borderRadius: "12px", margin: "0 auto 12px", color: "#ffffff", fontSize: "32px", fontWeight: "bold" as const, lineHeight: "80px", textAlign: "center" as const };
const partnerNameHeading = { color: "#18181b", fontSize: "22px", fontWeight: "600", margin: "0" };
const divider = { borderColor: "#e4e4e7", margin: "0" };
const titleSection = { padding: "32px 40px 24px", textAlign: "center" as const };
const heading = { color: "#18181b", fontSize: "24px", fontWeight: "600", lineHeight: "1.4", margin: "0" };
const content = { padding: "0 40px 32px" };
const greeting = { color: "#18181b", fontSize: "16px", fontWeight: "600", margin: "0 0 16px" };
const paragraph = { color: "#3f3f46", fontSize: "16px", lineHeight: "1.6", margin: "0 0 24px" };
const infoSection = { margin: "0 0 24px" };
const sectionTitle = { color: "#18181b", fontSize: "16px", fontWeight: "600", margin: "0 0 12px" };
const sectionDivider = { borderColor: "#18181b", borderWidth: "1px", margin: "0 0 16px" };
const infoRow = { marginBottom: "8px" };
const labelColumn = { width: "100px", verticalAlign: "top" as const };
const valueColumn = { verticalAlign: "top" as const };
const label = { color: "#71717a", fontSize: "14px", margin: "0" };
const value = { color: "#3f3f46", fontSize: "14px", margin: "0" };
const valueBold = { color: "#18181b", fontSize: "14px", fontWeight: "600", margin: "0" };
const reasonBox = { border: "2px solid #FF6600", borderRadius: "12px", padding: "20px 24px", margin: "0 0 24px" };
const reasonBoxTitle = { color: "#18181b", fontSize: "14px", fontWeight: "600", margin: "0 0 8px" };
const reasonBoxText = { color: "#3f3f46", fontSize: "14px", lineHeight: "1.6", margin: "0" };
const refundSection = { backgroundColor: "#f8f9fa", borderRadius: "8px", padding: "20px", margin: "0 0 24px" };
const refundSectionDivider = { borderColor: "#18181b", borderWidth: "1px", margin: "0 0 16px" };
const refundRow = { marginBottom: "12px" };
const refundLabelColumn = { width: "50%", verticalAlign: "top" as const };
const refundValueColumn = { width: "50%", verticalAlign: "top" as const, textAlign: "right" as const };
const refundLabel = { color: "#71717a", fontSize: "14px", margin: "0" };
const refundValue = { color: "#3f3f46", fontSize: "14px", margin: "0" };
const refundDivider = { borderColor: "#e4e4e7", margin: "8px 0 16px" };
const refundLabelBold = { color: "#18181b", fontSize: "14px", fontWeight: "600", margin: "0" };
const refundValueHighlight = { color: "#ef4444", fontSize: "16px", fontWeight: "700", margin: "0" };
const buttonSection = { textAlign: "center" as const, margin: "8px 0" };
const button = { backgroundColor: "#FF6600", borderRadius: "8px", color: "#ffffff", fontSize: "16px", fontWeight: "600", textDecoration: "none", textAlign: "center" as const, display: "inline-block", padding: "14px 32px", boxShadow: "0 2px 4px rgba(255, 102, 0, 0.2)" };
const footer = { padding: "24px 40px 32px", textAlign: "center" as const };
const footerLogo = { margin: "0 auto 8px", opacity: 0.6 };
const poweredByText = { color: "#a1a1aa", fontSize: "11px", margin: "0 0 12px" };
const footerText = { color: "#a1a1aa", fontSize: "13px", lineHeight: "1.5", margin: "0 0 4px" };
const footerLink = { color: "#71717a", textDecoration: "underline" };
const copyrightText = { color: "#d4d4d8", fontSize: "12px", marginTop: "16px" };
