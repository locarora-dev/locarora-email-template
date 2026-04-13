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

export interface ReturnReminderSoonEmailProps {
  customerName: string;
  reservationNumber: string;
  productName: string;
  returnDate: string;
  returnTime: string;
  returnMethodType: MethodType;
  returnBranchName?: string;
  returnAddress?: string;
  reservationUrl: string;
  locale: string;
  partnerName?: string;
  partnerLogoUrl?: string;
}

const logoUrl =
  "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png";

function formatTime(time?: string): string {
  if (!time) return "";
  return time.replace(/^(\d{1,2}:\d{2})(:\d{2})?$/, "$1");
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

const translations: Record<
  string,
  {
    preview: string;
    title: string;
    badge: string;
    greeting: (name: string) => string;
    reminderMessage: string;
    returnInfo: string;
    date: string;
    time: string;
    method: string;
    location: string;
    methodPickup: string;
    methodDelivery: string;
    methodShipping: string;
    reservationNo: string;
    product: string;
    viewReservation: string;
    footer: string;
    support: string;
    contactSupport: string;
    poweredBy: string;
  }
> = {
  ko: {
    preview: "오늘 반납 예정입니다",
    title: "반납 시간 안내",
    badge: "오늘",
    greeting: (name) => `안녕하세요, ${name}님`,
    reminderMessage: "곧 반납 시간입니다. 반납 정보를 다시 확인해 주세요.",
    returnInfo: "반납 정보",
    date: "날짜",
    time: "시간",
    method: "반납 방법",
    location: "장소",
    methodPickup: "현장 반납",
    methodDelivery: "수거",
    methodShipping: "택배 반납",
    reservationNo: "예약번호",
    product: "상품",
    viewReservation: "예약 상세 보기",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "고객센터",
    poweredBy: "Powered by LOCARORA",
  },
  en: {
    preview: "Your return is today",
    title: "Return Time Reminder",
    badge: "Today",
    greeting: (name) => `Hello, ${name}`,
    reminderMessage: "Your return is coming up soon. Please confirm the details below.",
    returnInfo: "Return Information",
    date: "Date",
    time: "Time",
    method: "Return Method",
    location: "Location",
    methodPickup: "Branch Return",
    methodDelivery: "Pickup",
    methodShipping: "Shipping Return",
    reservationNo: "Reservation No.",
    product: "Product",
    viewReservation: "View Reservation",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Contact Support",
    poweredBy: "Powered by LOCARORA",
  },
  ja: {
    preview: "本日が返却日です",
    title: "返却時間のご案内",
    badge: "本日",
    greeting: (name) => `${name}様`,
    reminderMessage: "まもなく返却時間です。返却情報をご確認ください。",
    returnInfo: "返却情報",
    date: "日付",
    time: "時間",
    method: "返却方法",
    location: "場所",
    methodPickup: "店舗返却",
    methodDelivery: "集荷",
    methodShipping: "配送返却",
    reservationNo: "予約番号",
    product: "商品",
    viewReservation: "予約を確認する",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "サポート",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-TW": {
    preview: "今天是歸還日",
    title: "歸還時間提醒",
    badge: "今天",
    greeting: (name) => `您好，${name}`,
    reminderMessage: "即將到達歸還時間。請確認以下歸還資訊。",
    returnInfo: "歸還資訊",
    date: "日期",
    time: "時間",
    method: "歸還方式",
    location: "地點",
    methodPickup: "門市歸還",
    methodDelivery: "收件",
    methodShipping: "寄送歸還",
    reservationNo: "預約編號",
    product: "商品",
    viewReservation: "查看預約",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "聯繫客服",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-CN": {
    preview: "今天是归还日",
    title: "归还时间提醒",
    badge: "今天",
    greeting: (name) => `您好，${name}`,
    reminderMessage: "即将到达归还时间。请确认以下归还信息。",
    returnInfo: "归还信息",
    date: "日期",
    time: "时间",
    method: "归还方式",
    location: "地点",
    methodPickup: "门店归还",
    methodDelivery: "收件",
    methodShipping: "寄送归还",
    reservationNo: "预约编号",
    product: "商品",
    viewReservation: "查看预约",
    footer: "此邮件由 LOCARORA 自动发送。",
    support: "需要帮助吗？",
    contactSupport: "联系客服",
    poweredBy: "Powered by LOCARORA",
  },
};

function getMethodLabel(
  method: MethodType,
  t: (typeof translations)[string],
): string {
  const labels: Record<MethodType, string> = {
    pickup: t.methodPickup,
    delivery: t.methodDelivery,
    shipping: t.methodShipping,
  };
  return labels[method] || method;
}

export const ReturnReminderSoonEmail = ({
  customerName,
  reservationNumber,
  productName,
  returnDate,
  returnTime,
  returnMethodType,
  returnBranchName,
  returnAddress,
  reservationUrl,
  locale = "ko",
  partnerName,
  partnerLogoUrl,
}: ReturnReminderSoonEmailProps) => {
  const t = translations[locale] || translations.ko;
  const returnLocation = returnBranchName || returnAddress || "";

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {partnerName ? (
            <Section style={partnerHeaderSection}>
              {partnerLogoUrl ? (
                <Img src={partnerLogoUrl} width="80" height="80" alt={partnerName} style={partnerLogoStyle} />
              ) : (
                <div style={partnerInitial}>{partnerName.charAt(0).toUpperCase()}</div>
              )}
              <Heading style={partnerNameHeading}>{partnerName}</Heading>
            </Section>
          ) : (
            <Section style={logoSection}>
              <Img src={logoUrl} width="180" height="40" alt="LOCARORA" style={logo} />
            </Section>
          )}

          <Hr style={divider} />

          <Section style={titleSection}>
            <Text style={todayBadge}>{t.badge}</Text>
            <Heading style={heading}>{t.title}</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>{t.greeting(customerName)}</Text>
            <Text style={paragraph}>{t.reminderMessage}</Text>

            <Section style={returnCard}>
              <Text style={cardTitle}>{t.returnInfo}</Text>
              <Hr style={cardDivider} />

              <Row style={infoRow}>
                <Column style={labelColumn}><Text style={labelText}>{t.date}</Text></Column>
                <Column style={valueColumn}><Text style={valueTextBold}>{formatDate(returnDate, locale)}</Text></Column>
              </Row>

              <Row style={infoRow}>
                <Column style={labelColumn}><Text style={labelText}>{t.time}</Text></Column>
                <Column style={valueColumn}><Text style={valueTextBold}>{formatTime(returnTime)}</Text></Column>
              </Row>

              <Row style={infoRow}>
                <Column style={labelColumn}><Text style={labelText}>{t.method}</Text></Column>
                <Column style={valueColumn}><Text style={methodBadge}>{getMethodLabel(returnMethodType, t)}</Text></Column>
              </Row>

              {returnLocation && (
                <Row style={infoRow}>
                  <Column style={labelColumn}><Text style={labelText}>{t.location}</Text></Column>
                  <Column style={valueColumn}><Text style={valueText}>{returnLocation}</Text></Column>
                </Row>
              )}

              <Row style={infoRow}>
                <Column style={labelColumn}><Text style={labelText}>{t.reservationNo}</Text></Column>
                <Column style={valueColumn}><Text style={valueText}>{reservationNumber}</Text></Column>
              </Row>
            </Section>

            <Section style={buttonSection}>
              <Button style={button} href={reservationUrl}>{t.viewReservation}</Button>
            </Section>
          </Section>

          <Hr style={divider} />

          <Section style={footer}>
            {partnerName && (
              <>
                <Img src={logoUrl} width="100" height="22" alt="LOCARORA" style={footerLogo} />
                <Text style={poweredByText}>{t.poweredBy}</Text>
              </>
            )}
            <Text style={footerText}>{t.footer}</Text>
            <Text style={footerText}>
              {t.support}{" "}
              <Link href="https://locarora.com/help" style={footerLink}>{t.contactSupport}</Link>
            </Text>
            <Text style={copyright}>© 2025 LOCARORA. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ReturnReminderSoonEmail.PreviewProps = {
  customerName: "홍길동",
  reservationNumber: "202601210635420",
  productName: "Galaxy S25 Ultra 렌탈 (3일~)",
  returnDate: "2026-01-26",
  returnTime: "13:30",
  returnMethodType: "pickup",
  returnBranchName: "인천공항 제1터미널",
  reservationUrl: "https://locarora.com/ko/reservations/abc123",
  locale: "ko",
  partnerName: "ABC 렌탈",
} satisfies ReturnReminderSoonEmailProps;

export default ReturnReminderSoonEmail;

// Styles
const main = { backgroundColor: "#f4f4f5", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif', padding: "40px 0" };
const container = { backgroundColor: "#ffffff", margin: "0 auto", maxWidth: "560px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)", overflow: "hidden" };
const logoSection = { padding: "32px 40px 24px", textAlign: "center" as const };
const logo = { margin: "0 auto" };
const divider = { borderColor: "#e4e4e7", margin: "0" };
const partnerHeaderSection = { padding: "32px 40px 24px", textAlign: "center" as const, backgroundColor: "#fafafa" };
const partnerLogoStyle = { margin: "0 auto 12px", borderRadius: "12px", objectFit: "contain" as const };
const partnerInitial = { width: "80px", height: "80px", backgroundColor: "#FF6600", borderRadius: "12px", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: "32px", fontWeight: "bold" as const, lineHeight: "80px", textAlign: "center" as const };
const partnerNameHeading = { color: "#18181b", fontSize: "22px", fontWeight: "600", margin: "0" };
const titleSection = { padding: "32px 40px 24px", textAlign: "center" as const };
const todayBadge = { fontSize: "16px", fontWeight: "700", color: "#ffffff", backgroundColor: "#ef4444", padding: "6px 16px", borderRadius: "20px", display: "inline-block", margin: "0 0 16px" };
const heading = { color: "#18181b", fontSize: "24px", fontWeight: "600", lineHeight: "1.4", margin: "0" };
const content = { padding: "0 40px 32px" };
const paragraph = { color: "#3f3f46", fontSize: "16px", lineHeight: "1.6", margin: "0 0 16px" };
const returnCard = { backgroundColor: "#fef2f2", borderRadius: "12px", padding: "20px", margin: "24px 0", border: "1px solid #fecaca" };
const cardTitle = { color: "#dc2626", fontSize: "14px", fontWeight: "600", margin: "0 0 12px" };
const cardDivider = { borderColor: "#fecaca", margin: "0 0 16px" };
const infoRow = { marginBottom: "10px" };
const labelColumn = { width: "90px", verticalAlign: "top" as const };
const valueColumn = { verticalAlign: "top" as const };
const labelText = { color: "#71717a", fontSize: "14px", margin: "0" };
const valueText = { color: "#3f3f46", fontSize: "14px", margin: "0" };
const valueTextBold = { color: "#18181b", fontSize: "14px", fontWeight: "600", margin: "0" };
const methodBadge = { color: "#1d4ed8", fontSize: "12px", fontWeight: "600", margin: "0", padding: "3px 8px", backgroundColor: "#eff6ff", borderRadius: "4px", display: "inline-block" };
const buttonSection = { textAlign: "center" as const, margin: "8px 0" };
const button = { backgroundColor: "#FF6600", borderRadius: "8px", color: "#ffffff", fontSize: "16px", fontWeight: "600", textDecoration: "none", textAlign: "center" as const, display: "inline-block", padding: "14px 48px", boxShadow: "0 2px 4px rgba(255, 102, 0, 0.2)" };
const footer = { padding: "24px 40px 32px", textAlign: "center" as const };
const footerText = { color: "#a1a1aa", fontSize: "13px", lineHeight: "1.5", margin: "0 0 4px" };
const footerLink = { color: "#71717a", textDecoration: "underline" };
const copyright = { color: "#d4d4d8", fontSize: "12px", marginTop: "16px" };
const footerLogo = { margin: "0 auto 8px", opacity: 0.6 };
const poweredByText = { color: "#a1a1aa", fontSize: "11px", margin: "0 0 12px" };
