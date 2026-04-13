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

export type MethodType = "pickup" | "delivery" | "shipping";

export type RentalType = "daily" | "timeslot" | "option_only";

export interface ReservationConfirmedEmailProps {
  customerName: string;
  reservationNumber: string;
  productName: string;
  productImageUrl?: string;

  rentalType?: RentalType;
  timeslotLabel?: string;

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
  totalPrice: number;
  currency: string;
  locale: string;
  reservationUrl: string;

  partnerName?: string;
  partnerLogoUrl?: string;
}

const logoUrl =
  "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png";

function formatTime(time?: string): string {
  if (!time) return "";
  return time.replace(/^(\d{1,2}:\d{2})(:\d{2})?$/, "$1");
}

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

const translations: Record<
  string,
  {
    preview: string;
    title: string;
    greeting: (name: string) => string;
    confirmedMessage: string;
    reservationInfo: string;
    reservationNo: string;
    product: string;
    totalAmount: string;
    rentalInfo: string;
    pickup: string;
    return: string;
    days: string;
    methodPickup: string;
    methodDelivery: string;
    methodShipping: string;
    date: string;
    time: string;
    timeslot: string;
    method: string;
    location: string;
    address: string;
    viewReservation: string;
    footer: string;
    support: string;
    contactSupport: string;
    poweredBy: string;
  }
> = {
  ko: {
    preview: "예약이 확정되었습니다",
    title: "예약 확정",
    greeting: (name) => `안녕하세요, ${name}님`,
    confirmedMessage:
      "파트너가 예약을 확정하였습니다. 아래 이용 정보를 확인해 주세요.",
    reservationInfo: "예약 정보",
    reservationNo: "예약번호",
    product: "상품",
    totalAmount: "결제 금액",
    rentalInfo: "이용 정보",
    pickup: "수령",
    return: "반납",
    days: "일",
    methodPickup: "현장 수령",
    methodDelivery: "배송",
    methodShipping: "숙소 배송",
    date: "날짜",
    time: "시간",
    timeslot: "이용 시간",
    method: "수령 방법",
    location: "장소",
    address: "주소",
    viewReservation: "예약 상세 보기",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "고객센터",
    poweredBy: "Powered by LOCARORA",
  },
  en: {
    preview: "Your reservation has been confirmed",
    title: "Reservation Confirmed",
    greeting: (name) => `Hello, ${name}`,
    confirmedMessage:
      "Your reservation has been confirmed by the partner. Please review your rental details below.",
    reservationInfo: "Reservation Details",
    reservationNo: "Reservation No.",
    product: "Product",
    totalAmount: "Total Amount",
    rentalInfo: "Rental Details",
    pickup: "Pickup",
    return: "Return",
    days: "days",
    methodPickup: "Branch Pickup",
    methodDelivery: "Delivery",
    methodShipping: "Hotel Delivery",
    date: "Date",
    time: "Time",
    timeslot: "Time Slot",
    method: "Pickup Method",
    location: "Location",
    address: "Address",
    viewReservation: "View Reservation",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Contact Support",
    poweredBy: "Powered by LOCARORA",
  },
  ja: {
    preview: "ご予約が確定しました",
    title: "予約確定",
    greeting: (name) => `${name}様`,
    confirmedMessage:
      "パートナーがご予約を確定しました。以下のご利用情報をご確認ください。",
    reservationInfo: "予約情報",
    reservationNo: "予約番号",
    product: "商品",
    totalAmount: "お支払い金額",
    rentalInfo: "ご利用情報",
    pickup: "受取",
    return: "返却",
    days: "日間",
    methodPickup: "店舗受取",
    methodDelivery: "配送",
    methodShipping: "ホテル配送",
    date: "日付",
    time: "時間",
    timeslot: "ご利用時間",
    method: "受取方法",
    location: "場所",
    address: "住所",
    viewReservation: "予約を確認する",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "サポート",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-TW": {
    preview: "您的預約已確認",
    title: "預約確認",
    greeting: (name) => `您好，${name}`,
    confirmedMessage:
      "合作夥伴已確認您的預約。請確認以下租借資訊。",
    reservationInfo: "預約資訊",
    reservationNo: "預約編號",
    product: "商品",
    totalAmount: "付款金額",
    rentalInfo: "租借資訊",
    pickup: "取件",
    return: "歸還",
    days: "天",
    methodPickup: "門市取件",
    methodDelivery: "宅配",
    methodShipping: "飯店配送",
    date: "日期",
    time: "時間",
    timeslot: "使用時段",
    method: "取件方式",
    location: "地點",
    address: "地址",
    viewReservation: "查看預約",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "聯繫客服",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-CN": {
    preview: "您的预约已确认",
    title: "预约确认",
    greeting: (name) => `您好，${name}`,
    confirmedMessage:
      "合作伙伴已确认您的预约。请确认以下租借信息。",
    reservationInfo: "预约信息",
    reservationNo: "预约编号",
    product: "商品",
    totalAmount: "付款金额",
    rentalInfo: "租借信息",
    pickup: "取件",
    return: "归还",
    days: "天",
    methodPickup: "门店取件",
    methodDelivery: "快递",
    methodShipping: "酒店配送",
    date: "日期",
    time: "时间",
    timeslot: "使用时段",
    method: "取件方式",
    location: "地点",
    address: "地址",
    viewReservation: "查看预约",
    footer: "此邮件由 LOCARORA 自动发送。",
    support: "需要帮助吗？",
    contactSupport: "联系客服",
    poweredBy: "Powered by LOCARORA",
  },
};

export const ReservationConfirmedEmail = ({
  customerName,
  reservationNumber,
  productName,
  productImageUrl,
  rentalType = "daily",
  timeslotLabel,
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
  totalPrice,
  currency,
  locale = "ko",
  reservationUrl,
  partnerName,
  partnerLogoUrl,
}: ReservationConfirmedEmailProps) => {
  const t = translations[locale] || translations.ko;
  const isTimeslot = rentalType === "timeslot";
  const pickupLocation = pickupBranchName || "";
  const returnLocation = returnBranchName || "";

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

          {/* Title with Check Icon */}
          <Section style={titleSection}>
            <Text style={confirmIcon}>✓</Text>
            <Heading style={heading}>{t.title}</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>{t.greeting(customerName)}</Text>
            <Text style={paragraph}>{t.confirmedMessage}</Text>

            {/* Reservation Info */}
            <Section style={infoSection}>
              <Text style={sectionTitle}>{t.reservationInfo}</Text>
              <Hr style={sectionDivider} />

              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>{t.reservationNo}</Text>
                </Column>
                <Column style={valueColumn}>
                  <Link href={reservationUrl} style={orderLink}>
                    {reservationNumber}
                  </Link>
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
                  <Text style={label}>{t.totalAmount}</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={valueBold}>
                    {formatCurrency(totalPrice, currency)}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Rental Info (option_only면 숨김) */}
            {rentalType !== "option_only" && (
            <Section style={rentalSection}>
              <Text style={sectionTitle}>{t.rentalInfo}</Text>
              <Hr style={sectionDivider} />

              {isTimeslot ? (
                /* Timeslot: Single column card */
                <Section style={ticketCard}>
                  <Row style={infoRow}>
                    <Column style={labelColumn}>
                      <Text style={label}>{t.date}</Text>
                    </Column>
                    <Column style={valueColumn}>
                      <Text style={valueBold}>
                        {formatDate(pickupDate, locale)}
                      </Text>
                    </Column>
                  </Row>
                  <Row style={infoRow}>
                    <Column style={labelColumn}>
                      <Text style={label}>{t.timeslot}</Text>
                    </Column>
                    <Column style={valueColumn}>
                      <Text style={valueBold}>
                        {timeslotLabel || `${formatTime(pickupTime)} - ${formatTime(returnTime)}`}
                      </Text>
                    </Column>
                  </Row>
                  <Row style={infoRow}>
                    <Column style={labelColumn}>
                      <Text style={label}>{t.method}</Text>
                    </Column>
                    <Column style={valueColumn}>
                      <Text style={methodBadge}>
                        {getMethodLabel(pickupMethodType, t)}
                      </Text>
                    </Column>
                  </Row>
                  {pickupLocation && (
                    <Row style={infoRow}>
                      <Column style={labelColumn}>
                        <Text style={label}>{t.location}</Text>
                      </Column>
                      <Column style={valueColumn}>
                        <Text style={value}>{pickupLocation}</Text>
                      </Column>
                    </Row>
                  )}
                  {pickupAddress && (
                    <Row style={infoRow}>
                      <Column style={labelColumn}>
                        <Text style={label}>{t.address}</Text>
                      </Column>
                      <Column style={valueColumn}>
                        <Text style={value}>{pickupAddress}</Text>
                      </Column>
                    </Row>
                  )}
                </Section>
              ) : (
                /* Daily: Flight ticket style (2 columns) */
                <Section style={ticketCard}>
                  <Row>
                    {/* Pickup Column */}
                    <Column style={timelineColumn}>
                      <Text style={timelineLabelText}>{t.pickup}</Text>
                      <Text style={timelineDate}>
                        {formatDate(pickupDate, locale)}
                      </Text>
                      <Text style={timelineTime}>{formatTime(pickupTime)}</Text>
                      <Text style={methodBadge}>
                        {getMethodLabel(pickupMethodType, t)}
                      </Text>
                      {pickupLocation && (
                        <Text style={locationText}>{pickupLocation}</Text>
                      )}
                      {pickupAddress && (
                        <Text style={locationText}>{pickupAddress}</Text>
                      )}
                    </Column>

                    {/* Duration Column */}
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
                      <Text style={timelineTime}>{formatTime(returnTime)}</Text>
                      <Text style={methodBadge}>
                        {getMethodLabel(returnMethodType, t)}
                      </Text>
                      {returnLocation && (
                        <Text style={locationText}>{returnLocation}</Text>
                      )}
                      {returnAddress && (
                        <Text style={locationText}>{returnAddress}</Text>
                      )}
                    </Column>
                  </Row>
                </Section>
              )}
            </Section>
            )}

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

ReservationConfirmedEmail.PreviewProps = {
  customerName: "홍길동",
  reservationNumber: "202601210635420",
  productName: "Galaxy S25 Ultra 렌탈 (3일~)",
  productImageUrl: undefined,
  rentalType: "daily",
  timeslotLabel: undefined,
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
  totalPrice: 53510,
  currency: "KRW",
  locale: "ko",
  reservationUrl: "https://locarora.com/ko/reservations/abc123",
  partnerName: "ABC 렌탈",
  partnerLogoUrl: undefined,
} satisfies ReservationConfirmedEmailProps;

export default ReservationConfirmedEmail;

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

const confirmIcon = {
  fontSize: "48px",
  color: "#22c55e",
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

const valueBold = {
  color: "#18181b",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};

const orderLink = {
  color: "#2563eb",
  fontSize: "14px",
  textDecoration: "underline",
};

// Rental Info - Ticket Style
const rentalSection = {
  margin: "0 0 24px",
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
  padding: "14px 48px",
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
