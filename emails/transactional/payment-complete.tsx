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

type MethodType = "pickup" | "delivery" | "shipping";

interface PaymentCompleteEmailProps {
  // Order info
  reservationNumber: string;
  reservationId: string;
  customerName: string;
  orderDate: string;

  // Product info
  productName: string;
  productImageUrl?: string;
  quantity: number;

  // Rental period info (like flight ticket)
  pickupDate: string;
  pickupTime: string;
  pickupMethodType: MethodType;
  pickupBranchName?: string;
  pickupAddress?: string;

  returnDate: string;
  returnTime: string;
  returnMethodType: MethodType;
  returnBranchName?: string;
  returnAddress?: string;

  rentalDays: number;

  // Payment info (locarora rental structure)
  basePrice: number;
  optionsPrice: number;
  discountAmount: number;
  depositAmount: number;
  totalPrice: number;

  // Payment method
  paymentMethod?: string;

  // Currency & Locale
  currency: string;
  locale: string;
}

// Supabase Storage hosted image URL
const logoUrl =
  "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png";

// Multi-language translations
const translations: Record<
  string,
  {
    preview: string;
    title: string;
    orderInfo: string;
    buyerName: string;
    orderNumber: string;
    orderDate: string;
    productInfo: string;
    rentalInfo: string;
    pickup: string;
    return: string;
    rentalPeriod: string;
    days: string;
    methodPickup: string;
    methodDelivery: string;
    methodShipping: string;
    paymentInfo: string;
    basePrice: string;
    options: string;
    discount: string;
    deposit: string;
    totalPrice: string;
    paymentMethod: string;
    amount: string;
    actualPaymentAmount: string;
    orderManagement: string;
    footer: string;
    support: string;
    contactSupport: string;
  }
> = {
  ko: {
    preview: "예약이 완료되었습니다",
    title: "예약 완료",
    orderInfo: "예약 정보",
    buyerName: "예약자명",
    orderNumber: "예약번호",
    orderDate: "예약일시",
    productInfo: "상품 정보",
    rentalInfo: "이용 정보",
    pickup: "수령",
    return: "반납",
    rentalPeriod: "이용 기간",
    days: "일",
    methodPickup: "현장 수령",
    methodDelivery: "배송",
    methodShipping: "숙소 배송",
    paymentInfo: "결제 정보",
    basePrice: "기본 요금",
    options: "옵션",
    discount: "할인 (-)",
    deposit: "보증금",
    totalPrice: "총 결제금액",
    paymentMethod: "결제수단",
    amount: "결제금액",
    actualPaymentAmount: "실결제금액",
    orderManagement: "예약 관리",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "고객센터",
  },
  en: {
    preview: "Your reservation is complete",
    title: "Reservation Complete",
    orderInfo: "Reservation Information",
    buyerName: "Name",
    orderNumber: "Reservation Number",
    orderDate: "Reservation Date",
    productInfo: "Product Information",
    rentalInfo: "Rental Details",
    pickup: "Pickup",
    return: "Return",
    rentalPeriod: "Rental Period",
    days: "days",
    methodPickup: "Branch Pickup",
    methodDelivery: "Delivery",
    methodShipping: "Hotel Delivery",
    paymentInfo: "Payment Information",
    basePrice: "Base Price",
    options: "Options",
    discount: "Discount (-)",
    deposit: "Deposit",
    totalPrice: "Total Amount",
    paymentMethod: "Payment Method",
    amount: "Amount",
    actualPaymentAmount: "Total Paid",
    orderManagement: "Manage Reservation",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Contact Support",
  },
  ja: {
    preview: "ご予約が完了しました",
    title: "予約完了",
    orderInfo: "予約情報",
    buyerName: "ご予約者名",
    orderNumber: "予約番号",
    orderDate: "予約日時",
    productInfo: "商品情報",
    rentalInfo: "ご利用情報",
    pickup: "受取",
    return: "返却",
    rentalPeriod: "ご利用期間",
    days: "日間",
    methodPickup: "店舗受取",
    methodDelivery: "配送",
    methodShipping: "ホテル配送",
    paymentInfo: "お支払い情報",
    basePrice: "基本料金",
    options: "オプション",
    discount: "割引 (-)",
    deposit: "保証金",
    totalPrice: "合計金額",
    paymentMethod: "お支払い方法",
    amount: "お支払い金額",
    actualPaymentAmount: "お支払い総額",
    orderManagement: "予約管理",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "サポート",
  },
  "zh-TW": {
    preview: "您的預約已完成",
    title: "預約完成",
    orderInfo: "預約資訊",
    buyerName: "預約人",
    orderNumber: "預約編號",
    orderDate: "預約日期",
    productInfo: "商品資訊",
    rentalInfo: "租借資訊",
    pickup: "取件",
    return: "歸還",
    rentalPeriod: "租借期間",
    days: "天",
    methodPickup: "門市取件",
    methodDelivery: "宅配",
    methodShipping: "飯店配送",
    paymentInfo: "付款資訊",
    basePrice: "基本費用",
    options: "選項",
    discount: "折扣 (-)",
    deposit: "押金",
    totalPrice: "總金額",
    paymentMethod: "付款方式",
    amount: "付款金額",
    actualPaymentAmount: "實際付款金額",
    orderManagement: "預約管理",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "聯繫客服",
  },
  "zh-CN": {
    preview: "您的预约已完成",
    title: "预约完成",
    orderInfo: "预约信息",
    buyerName: "预约人",
    orderNumber: "预约编号",
    orderDate: "预约日期",
    productInfo: "商品信息",
    rentalInfo: "租借信息",
    pickup: "取件",
    return: "归还",
    rentalPeriod: "租借期间",
    days: "天",
    methodPickup: "门店取件",
    methodDelivery: "快递",
    methodShipping: "酒店配送",
    paymentInfo: "付款信息",
    basePrice: "基本费用",
    options: "选项",
    discount: "折扣 (-)",
    deposit: "押金",
    totalPrice: "总金额",
    paymentMethod: "付款方式",
    amount: "付款金额",
    actualPaymentAmount: "实际付款金额",
    orderManagement: "预约管理",
    footer: "此邮件由 LOCARORA 自动发送。",
    support: "需要帮助吗？",
    contactSupport: "联系客服",
  },
};

// Helper functions
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
    month: "short",
    day: "numeric",
  });
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

  return date.toLocaleString(localeMap[locale] || "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getMethodLabel(
  method: MethodType,
  t: (typeof translations)[string]
): string {
  const labels: Record<MethodType, string> = {
    pickup: t.methodPickup,
    delivery: t.methodDelivery,
    shipping: t.methodShipping,
  };
  return labels[method] || method;
}

export const PaymentCompleteEmail = ({
  reservationNumber,
  reservationId,
  customerName,
  orderDate,
  productName,
  productImageUrl,
  quantity,
  pickupDate,
  pickupTime,
  pickupMethodType,
  pickupBranchName,
  pickupAddress,
  returnDate,
  returnTime,
  returnMethodType,
  returnBranchName,
  returnAddress,
  rentalDays,
  basePrice,
  optionsPrice,
  discountAmount,
  depositAmount,
  totalPrice,
  paymentMethod,
  currency,
  locale = "en",
}: PaymentCompleteEmailProps) => {
  const t = translations[locale] || translations.en;
  const orderUrl = `https://locarora.com/${locale}/reservations/${reservationId}`;

  // Format pickup/return display
  const pickupLocation = pickupBranchName || pickupAddress || "";
  const returnLocation = returnBranchName || returnAddress || "";

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
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

          {/* Title */}
          <Section style={titleSection}>
            <Heading style={heading}>{t.title}</Heading>
          </Section>

          {/* Order Information */}
          <Section style={infoSection}>
            <Text style={sectionTitle}>{t.orderInfo}</Text>
            <Hr style={sectionDivider} />

            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>{t.buyerName}</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{customerName}</Text>
              </Column>
            </Row>

            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>{t.orderNumber}</Text>
              </Column>
              <Column style={valueColumn}>
                <Link href={orderUrl} style={orderLink}>
                  {reservationNumber}
                </Link>
              </Column>
            </Row>

            <Row style={infoRow}>
              <Column style={labelColumn}>
                <Text style={label}>{t.orderDate}</Text>
              </Column>
              <Column style={valueColumn}>
                <Text style={value}>{formatDateTime(orderDate, locale)}</Text>
              </Column>
            </Row>
          </Section>

          {/* Product Information */}
          <Section style={infoSection}>
            <Text style={sectionTitle}>{t.productInfo}</Text>
            <Hr style={sectionDivider} />

            <Row style={productRow}>
              {productImageUrl && (
                <Column style={productImageColumn}>
                  <Img
                    src={productImageUrl}
                    width="80"
                    height="80"
                    alt={productName}
                    style={productImage}
                  />
                </Column>
              )}
              <Column style={productInfoColumn}>
                <Text style={productNameText}>
                  {productName}
                  {quantity > 1 && ` x ${quantity}`}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Rental Info - Flight Ticket Style */}
          <Section style={rentalSection}>
            <Text style={sectionTitle}>{t.rentalInfo}</Text>
            <Hr style={sectionDivider} />

            <Section style={ticketCard}>
              {/* Pickup / Return Timeline */}
              <Row>
                {/* Pickup Column */}
                <Column style={timelineColumn}>
                  <Text style={timelineLabelText}>{t.pickup}</Text>
                  <Text style={timelineDate}>
                    {formatDate(pickupDate, locale)}
                  </Text>
                  <Text style={timelineTime}>{pickupTime}</Text>
                  <Text style={methodBadge}>
                    {getMethodLabel(pickupMethodType, t)}
                  </Text>
                  <Text style={locationText}>{pickupLocation}</Text>
                </Column>

                {/* Arrow / Duration Column */}
                <Column style={durationColumn}>
                  <Text style={durationDays}>
                    {rentalDays}
                    {t.days}
                  </Text>
                  <Text style={arrowText}>→</Text>
                </Column>

                {/* Return Column */}
                <Column style={timelineColumn}>
                  <Text style={timelineLabelText}>{t.return}</Text>
                  <Text style={timelineDate}>
                    {formatDate(returnDate, locale)}
                  </Text>
                  <Text style={timelineTime}>{returnTime}</Text>
                  <Text style={methodBadge}>
                    {getMethodLabel(returnMethodType, t)}
                  </Text>
                  <Text style={locationText}>{returnLocation}</Text>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* Payment Information */}
          <Section style={infoSection}>
            <Text style={sectionTitle}>{t.paymentInfo}</Text>
            <Hr style={sectionDivider} />

            {/* Base Rental Price */}
            <Row style={paymentRow}>
              <Column style={paymentLabelColumn}>
                <Text style={paymentLabel}>{t.basePrice}</Text>
              </Column>
              <Column style={paymentValueColumn}>
                <Text style={paymentValue}>
                  {formatCurrency(basePrice, currency)}
                </Text>
              </Column>
            </Row>

            {/* Options Price */}
            {optionsPrice > 0 && (
              <Row style={paymentRow}>
                <Column style={paymentLabelColumn}>
                  <Text style={paymentLabel}>{t.options}</Text>
                </Column>
                <Column style={paymentValueColumn}>
                  <Text style={paymentValue}>
                    {formatCurrency(optionsPrice, currency)}
                  </Text>
                </Column>
              </Row>
            )}

            {/* Discount */}
            {discountAmount > 0 && (
              <Row style={paymentRow}>
                <Column style={paymentLabelColumn}>
                  <Text style={paymentLabel}>{t.discount}</Text>
                </Column>
                <Column style={paymentValueColumn}>
                  <Text style={discountValue}>
                    -{formatCurrency(discountAmount, currency)}
                  </Text>
                </Column>
              </Row>
            )}

            {/* Deposit */}
            {depositAmount > 0 && (
              <Row style={paymentRow}>
                <Column style={paymentLabelColumn}>
                  <Text style={paymentLabel}>{t.deposit}</Text>
                </Column>
                <Column style={paymentValueColumn}>
                  <Text style={paymentValue}>
                    {formatCurrency(depositAmount, currency)}
                  </Text>
                </Column>
              </Row>
            )}

            <Hr style={paymentDivider} />

            {/* Total Price */}
            <Row style={paymentRow}>
              <Column style={paymentLabelColumn}>
                <Text style={paymentLabelBold}>{t.totalPrice}</Text>
              </Column>
              <Column style={paymentValueColumn}>
                <Text style={paymentValueBold}>
                  {formatCurrency(totalPrice, currency)}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Payment Method */}
          {paymentMethod && (
            <Section style={paymentMethodWrapper}>
              <table style={paymentMethodCard}>
                <tr>
                  <td style={paymentMethodTd}>
                    <Text style={paymentMethodLabel}>{t.paymentMethod}</Text>
                  </td>
                  <td style={paymentMethodTdRight}>
                    <Text style={paymentMethodValue}>{paymentMethod}</Text>
                  </td>
                </tr>
                <tr>
                  <td style={paymentMethodTd}>
                    <Text style={paymentMethodLabel}>{t.amount}</Text>
                  </td>
                  <td style={paymentMethodTdRight}>
                    <Text style={paymentMethodValue}>
                      {formatCurrency(totalPrice, currency)}
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>
          )}

          {/* Actual Payment Amount */}
          <Section style={actualPaymentSection}>
            <Row>
              <Column style={actualPaymentLabelColumn}>
                <Text style={actualPaymentLabel}>{t.actualPaymentAmount}</Text>
              </Column>
              <Column style={actualPaymentValueColumn}>
                <Text style={actualPaymentValue}>
                  {formatCurrency(totalPrice, currency)}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* CTA Button */}
          <Section style={buttonSection}>
            <Button style={button} href={orderUrl}>
              {t.orderManagement}
            </Button>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>{t.footer}</Text>
            <Text style={footerText}>
              {t.support}{" "}
              <Link href="https://locarora.com/support" style={footerLink}>
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

PaymentCompleteEmail.PreviewProps = {
  reservationNumber: "202601210635420",
  reservationId: "abc123",
  customerName: "홍길동",
  orderDate: "2026-01-21T11:11:00Z",
  productName: "Galaxy S25 Ultra 렌탈 (3일~)",
  productImageUrl:
    "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/product-images/sample.jpg",
  quantity: 1,
  pickupDate: "2026-01-23",
  pickupTime: "10:00",
  pickupMethodType: "pickup",
  pickupBranchName: "인천공항 제1터미널",
  pickupAddress: undefined,
  returnDate: "2026-01-26",
  returnTime: "13:30",
  returnMethodType: "pickup",
  returnBranchName: "인천공항 제2터미널",
  returnAddress: undefined,
  rentalDays: 3,
  basePrice: 45000,
  optionsPrice: 8510,
  discountAmount: 0,
  depositAmount: 0,
  totalPrice: 53510,
  paymentMethod: "신용카드",
  currency: "KRW",
  locale: "ko",
} satisfies PaymentCompleteEmailProps;

export default PaymentCompleteEmail;

// Styles (consistent with confirm-signup.tsx and team-invitation.tsx)
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

const infoSection = {
  padding: "24px 40px",
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
  width: "120px",
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

const orderLink = {
  color: "#2563eb",
  fontSize: "14px",
  textDecoration: "underline",
};

// Product styles
const productRow = {
  marginTop: "8px",
};

const productImageColumn = {
  width: "90px",
  verticalAlign: "top" as const,
};

const productImage = {
  borderRadius: "8px",
  objectFit: "cover" as const,
};

const productInfoColumn = {
  verticalAlign: "middle" as const,
  paddingLeft: "12px",
};

const productNameText = {
  color: "#18181b",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};

// Rental Info - Ticket Style
const rentalSection = {
  padding: "24px 40px",
};

const ticketCard = {
  backgroundColor: "#fafafa",
  borderRadius: "12px",
  padding: "24px 16px",
  border: "1px solid #e4e4e7",
};

const timelineColumn = {
  width: "40%",
  textAlign: "center" as const,
  verticalAlign: "top" as const,
};

const durationColumn = {
  width: "20%",
  textAlign: "center" as const,
  verticalAlign: "middle" as const,
};

const timelineLabelText = {
  color: "#71717a",
  fontSize: "12px",
  fontWeight: "500",
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
};

const timelineDate = {
  color: "#18181b",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0",
};

const timelineTime = {
  color: "#18181b",
  fontSize: "24px",
  fontWeight: "700",
  margin: "4px 0 12px",
};

const methodBadge = {
  color: "#FF6600",
  fontSize: "11px",
  fontWeight: "600",
  margin: "0 0 4px",
  padding: "4px 8px",
  backgroundColor: "#fff7ed",
  borderRadius: "4px",
  display: "inline-block",
};

const locationText = {
  color: "#71717a",
  fontSize: "12px",
  margin: "8px 0 0",
  lineHeight: "1.4",
};

const durationDays = {
  color: "#FF6600",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 4px",
};

const arrowText = {
  color: "#d4d4d8",
  fontSize: "24px",
  margin: "0",
};

// Payment styles
const paymentRow = {
  marginBottom: "12px",
};

const paymentLabelColumn = {
  width: "50%",
  verticalAlign: "top" as const,
};

const paymentValueColumn = {
  width: "50%",
  verticalAlign: "top" as const,
  textAlign: "right" as const,
};

const paymentLabel = {
  color: "#18181b",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const paymentValue = {
  color: "#3f3f46",
  fontSize: "14px",
  margin: "0",
};

const discountValue = {
  color: "#dc2626",
  fontSize: "14px",
  margin: "0",
};

const paymentDivider = {
  borderColor: "#e4e4e7",
  margin: "8px 0 16px",
};

const paymentLabelBold = {
  color: "#18181b",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};

const paymentValueBold = {
  color: "#18181b",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};

// Payment Method section
const paymentMethodWrapper = {
  padding: "0 40px 24px",
};

const paymentMethodCard = {
  width: "100%",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "16px",
  borderCollapse: "collapse" as const,
};

const paymentMethodTd = {
  padding: "8px 16px",
  verticalAlign: "top" as const,
};

const paymentMethodTdRight = {
  padding: "8px 16px",
  verticalAlign: "top" as const,
  textAlign: "right" as const,
};

const paymentMethodLabel = {
  color: "#71717a",
  fontSize: "14px",
  margin: "0",
};

const paymentMethodValue = {
  color: "#3f3f46",
  fontSize: "14px",
  margin: "0",
};

// Actual Payment Amount
const actualPaymentSection = {
  padding: "24px 40px",
};

const actualPaymentLabelColumn = {
  width: "50%",
  verticalAlign: "middle" as const,
};

const actualPaymentValueColumn = {
  width: "50%",
  verticalAlign: "middle" as const,
  textAlign: "right" as const,
};

const actualPaymentLabel = {
  color: "#18181b",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0",
};

const actualPaymentValue = {
  color: "#FF6600",
  fontSize: "20px",
  fontWeight: "700",
  margin: "0",
};

// Button - LOCARORA Orange Theme
const buttonSection = {
  textAlign: "center" as const,
  padding: "8px 40px 32px",
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
  padding: "14px 48px",
  boxShadow: "0 2px 4px rgba(255, 102, 0, 0.2)",
};

// Footer
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
