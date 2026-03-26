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

interface PickupReminderEmailProps {
  customerName: string;
  reservationNumber: string;
  productName: string;
  productImageUrl?: string;
  pickupDate: string;
  pickupTime: string;
  pickupMethodType: MethodType;
  pickupBranchName?: string;
  pickupAddress?: string;
  returnDate: string;
  returnTime: string;
  rentalDays: number;
  reservationUrl: string;
  locale: string;
  partnerName?: string;
  partnerLogoUrl?: string;
}

const logoUrl =
  "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png";

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

const translations: Record<
  string,
  {
    preview: string;
    title: string;
    dDay: string;
    greeting: (name: string) => string;
    reminderMessage: string;
    pickupInfo: string;
    date: string;
    time: string;
    method: string;
    location: string;
    methodPickup: string;
    methodDelivery: string;
    methodShipping: string;
    productInfo: string;
    rentalPeriod: string;
    days: string;
    reservationNo: string;
    pickup: string;
    return: string;
    viewReservation: string;
    footer: string;
    support: string;
    contactSupport: string;
    poweredBy: string;
  }
> = {
  ko: {
    preview: "내일 수령 예정입니다",
    title: "수령일 안내",
    dDay: "D-1",
    greeting: (name) => `안녕하세요, ${name}님`,
    reminderMessage: "내일 수령 예정인 예약이 있습니다. 아래 정보를 확인해 주세요.",
    pickupInfo: "수령 정보",
    date: "날짜",
    time: "시간",
    method: "수령 방법",
    location: "장소",
    methodPickup: "현장 수령",
    methodDelivery: "배송",
    methodShipping: "숙소 배송",
    productInfo: "상품 정보",
    rentalPeriod: "이용 기간",
    days: "일",
    reservationNo: "예약번호",
    pickup: "수령",
    return: "반납",
    viewReservation: "예약 상세 보기",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "고객센터",
    poweredBy: "Powered by LOCARORA",
  },
  en: {
    preview: "Your pickup is tomorrow",
    title: "Pickup Reminder",
    dDay: "D-1",
    greeting: (name) => `Hello, ${name}`,
    reminderMessage:
      "You have a pickup scheduled for tomorrow. Please review the details below.",
    pickupInfo: "Pickup Information",
    date: "Date",
    time: "Time",
    method: "Pickup Method",
    location: "Location",
    methodPickup: "Branch Pickup",
    methodDelivery: "Delivery",
    methodShipping: "Hotel Delivery",
    productInfo: "Product",
    rentalPeriod: "Rental Period",
    days: "days",
    reservationNo: "Reservation No.",
    pickup: "Pickup",
    return: "Return",
    viewReservation: "View Reservation",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Contact Support",
    poweredBy: "Powered by LOCARORA",
  },
  ja: {
    preview: "明日が受取日です",
    title: "受取日のご案内",
    dDay: "D-1",
    greeting: (name) => `${name}様`,
    reminderMessage:
      "明日受取予定のご予約がございます。以下の情報をご確認ください。",
    pickupInfo: "受取情報",
    date: "日付",
    time: "時間",
    method: "受取方法",
    location: "場所",
    methodPickup: "店舗受取",
    methodDelivery: "配送",
    methodShipping: "ホテル配送",
    productInfo: "商品",
    rentalPeriod: "ご利用期間",
    days: "日間",
    reservationNo: "予約番号",
    pickup: "受取",
    return: "返却",
    viewReservation: "予約を確認する",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "サポート",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-TW": {
    preview: "明天是取件日",
    title: "取件提醒",
    dDay: "D-1",
    greeting: (name) => `您好，${name}`,
    reminderMessage: "您有一筆預約明天取件。請確認以下資訊。",
    pickupInfo: "取件資訊",
    date: "日期",
    time: "時間",
    method: "取件方式",
    location: "地點",
    methodPickup: "門市取件",
    methodDelivery: "宅配",
    methodShipping: "飯店配送",
    productInfo: "商品",
    rentalPeriod: "租借期間",
    days: "天",
    reservationNo: "預約編號",
    pickup: "取件",
    return: "歸還",
    viewReservation: "查看預約",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "聯繫客服",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-CN": {
    preview: "明天是取件日",
    title: "取件提醒",
    dDay: "D-1",
    greeting: (name) => `您好，${name}`,
    reminderMessage: "您有一笔预约明天取件。请确认以下信息。",
    pickupInfo: "取件信息",
    date: "日期",
    time: "时间",
    method: "取件方式",
    location: "地点",
    methodPickup: "门店取件",
    methodDelivery: "快递",
    methodShipping: "酒店配送",
    productInfo: "商品",
    rentalPeriod: "租借期间",
    days: "天",
    reservationNo: "预约编号",
    pickup: "取件",
    return: "归还",
    viewReservation: "查看预约",
    footer: "此邮件由 LOCARORA 自动发送。",
    support: "需要帮助吗？",
    contactSupport: "联系客服",
    poweredBy: "Powered by LOCARORA",
  },
};

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

export const PickupReminderEmail = ({
  customerName,
  reservationNumber,
  productName,
  productImageUrl,
  pickupDate,
  pickupTime,
  pickupMethodType,
  pickupBranchName,
  pickupAddress,
  returnDate,
  returnTime,
  rentalDays,
  reservationUrl,
  locale = "ko",
  partnerName,
  partnerLogoUrl,
}: PickupReminderEmailProps) => {
  const t = translations[locale] || translations.ko;
  const pickupLocation = pickupBranchName || pickupAddress || "";

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

          {/* Title with D-1 Badge */}
          <Section style={titleSection}>
            <Text style={dDayBadge}>{t.dDay}</Text>
            <Heading style={heading}>{t.title}</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={paragraph}>{t.greeting(customerName)}</Text>
            <Text style={paragraph}>{t.reminderMessage}</Text>

            {/* Pickup Info Card */}
            <Section style={pickupCard}>
              <Text style={cardTitle}>{t.pickupInfo}</Text>
              <Hr style={cardDivider} />

              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={labelText}>{t.date}</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={valueTextBold}>
                    {formatDate(pickupDate, locale)}
                  </Text>
                </Column>
              </Row>

              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={labelText}>{t.time}</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={valueTextBold}>{pickupTime}</Text>
                </Column>
              </Row>

              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={labelText}>{t.method}</Text>
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
                    <Text style={labelText}>{t.location}</Text>
                  </Column>
                  <Column style={valueColumn}>
                    <Text style={valueText}>{pickupLocation}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            {/* Rental Timeline - Flight Ticket Style */}
            <Section style={ticketCard}>
              <Row>
                {/* Pickup Column */}
                <Column style={timelineColumn}>
                  <Text style={timelineLabelText}>{t.pickup}</Text>
                  <Text style={timelineDate}>
                    {formatDate(pickupDate, locale)}
                  </Text>
                  <Text style={timelineTime}>{pickupTime}</Text>
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
                  <Text style={timelineTime}>{returnTime}</Text>
                </Column>
              </Row>
            </Section>

            {/* Product & Reservation Info */}
            <Section style={detailsSection}>
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={labelText}>{t.productInfo}</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={valueText}>{productName}</Text>
                </Column>
              </Row>
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={labelText}>{t.reservationNo}</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={valueText}>{reservationNumber}</Text>
                </Column>
              </Row>
            </Section>

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

PickupReminderEmail.PreviewProps = {
  customerName: "홍길동",
  reservationNumber: "202601210635420",
  productName: "Galaxy S25 Ultra 렌탈 (3일~)",
  productImageUrl: undefined,
  pickupDate: "2026-01-23",
  pickupTime: "10:00",
  pickupMethodType: "pickup",
  pickupBranchName: "인천공항 제1터미널",
  pickupAddress: undefined,
  returnDate: "2026-01-26",
  returnTime: "13:30",
  rentalDays: 3,
  reservationUrl: "https://locarora.com/ko/reservations/abc123",
  locale: "ko",
  partnerName: "ABC 렌탈",
  partnerLogoUrl: undefined,
} satisfies PickupReminderEmailProps;

export default PickupReminderEmail;

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

const dDayBadge = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#ffffff",
  backgroundColor: "#FF6600",
  padding: "6px 16px",
  borderRadius: "20px",
  display: "inline-block",
  margin: "0 0 16px",
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

const paragraph = {
  color: "#3f3f46",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const pickupCard = {
  backgroundColor: "#fff7ed",
  borderRadius: "12px",
  padding: "20px",
  margin: "24px 0",
  border: "1px solid #fed7aa",
};

const cardTitle = {
  color: "#c2410c",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 12px",
};

const cardDivider = {
  borderColor: "#fed7aa",
  margin: "0 0 16px",
};

const infoRow = {
  marginBottom: "10px",
};

const labelColumn = {
  width: "90px",
  verticalAlign: "top" as const,
};

const valueColumn = {
  verticalAlign: "top" as const,
};

const labelText = {
  color: "#71717a",
  fontSize: "14px",
  margin: "0",
};

const valueText = {
  color: "#3f3f46",
  fontSize: "14px",
  margin: "0",
};

const valueTextBold = {
  color: "#18181b",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};

const methodBadge = {
  color: "#FF6600",
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
  padding: "3px 8px",
  backgroundColor: "#fff7ed",
  borderRadius: "4px",
  display: "inline-block",
};

// Ticket timeline style (reused from payment-complete)
const ticketCard = {
  backgroundColor: "#fafafa",
  borderRadius: "12px",
  padding: "24px 16px",
  border: "1px solid #e4e4e7",
  margin: "0 0 24px",
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
  margin: "4px 0 0",
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

const detailsSection = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "16px",
  margin: "0 0 24px",
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
