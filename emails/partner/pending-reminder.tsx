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

type ReminderLevel = "24h" | "48h" | "5d";

interface PendingReminderEmailProps {
  partnerName: string;
  partnerLogoUrl?: string;
  customerName: string;
  reservationNumber: string;
  productName: string;
  rentalType?: string;
  pickupDate?: string;
  returnDate?: string;
  ordersUrl: string;
  reminderLevel: ReminderLevel;
  locale: string;
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
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const translations: Record<
  string,
  {
    preview: Record<ReminderLevel, string>;
    title: Record<ReminderLevel, string>;
    greeting: (name: string) => string;
    message: Record<ReminderLevel, string>;
    reservationInfo: string;
    reservationNo: string;
    product: string;
    customer: string;
    rentalPeriod: string;
    confirmNow: string;
    footer: string;
    support: string;
    contactSupport: string;
    poweredBy: string;
  }
> = {
  ko: {
    preview: {
      "24h": "확정 대기 중인 예약이 있습니다",
      "48h": "예약 확정이 필요합니다",
      "5d": "⚠️ 예약이 곧 자동 취소됩니다",
    },
    title: {
      "24h": "예약 확정 대기 중",
      "48h": "예약 확정이 필요합니다",
      "5d": "⚠️ 예약 자동 취소 예정",
    },
    greeting: (name) => `${name} 파트너님`,
    message: {
      "24h": "아래 예약이 24시간 넘게 확정 대기 중입니다. 확인 후 확정해주세요.",
      "48h": "아래 예약이 48시간 넘게 확정 대기 중입니다. 빠른 확정 부탁드립니다.",
      "5d": "아래 예약이 5일째 미확정 상태입니다. 2일 내 확정하지 않으면 자동으로 취소됩니다.",
    },
    reservationInfo: "대기 중인 예약",
    reservationNo: "예약번호",
    product: "상품",
    customer: "고객",
    rentalPeriod: "이용 기간",
    confirmNow: "지금 확정하기",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "고객센터",
    poweredBy: "Powered by LOCARORA",
  },
  en: {
    preview: {
      "24h": "You have a reservation awaiting confirmation",
      "48h": "Reservation confirmation needed",
      "5d": "⚠️ Reservation will be auto-cancelled soon",
    },
    title: {
      "24h": "Reservation Awaiting Confirmation",
      "48h": "Confirmation Needed",
      "5d": "⚠️ Auto-Cancellation Warning",
    },
    greeting: (name) => `Dear ${name}`,
    message: {
      "24h": "The reservation below has been pending for over 24 hours. Please review and confirm.",
      "48h": "The reservation below has been pending for over 48 hours. Please confirm as soon as possible.",
      "5d": "The reservation below has been pending for 5 days. It will be automatically cancelled if not confirmed within 2 days.",
    },
    reservationInfo: "Pending Reservation",
    reservationNo: "Reservation No.",
    product: "Product",
    customer: "Customer",
    rentalPeriod: "Rental Period",
    confirmNow: "Confirm Now",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Contact Support",
    poweredBy: "Powered by LOCARORA",
  },
  ja: {
    preview: {
      "24h": "確定待ちの予約があります",
      "48h": "予約の確定が必要です",
      "5d": "⚠️ 予約が自動キャンセルされます",
    },
    title: {
      "24h": "予約確定待ち",
      "48h": "予約の確定が必要です",
      "5d": "⚠️ 予約自動キャンセル予定",
    },
    greeting: (name) => `${name}パートナー様`,
    message: {
      "24h": "以下の予約が24時間以上確定待ちです。ご確認の上、確定してください。",
      "48h": "以下の予約が48時間以上確定待ちです。早急な確定をお願いいたします。",
      "5d": "以下の予約が5日間未確定です。2日以内に確定されない場合、自動キャンセルされます。",
    },
    reservationInfo: "確定待ちの予約",
    reservationNo: "予約番号",
    product: "商品",
    customer: "お客様",
    rentalPeriod: "ご利用期間",
    confirmNow: "今すぐ確定する",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "サポート",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-TW": {
    preview: {
      "24h": "有待確認的預約",
      "48h": "預約需要確認",
      "5d": "⚠️ 預約即將自動取消",
    },
    title: {
      "24h": "預約待確認",
      "48h": "需要確認預約",
      "5d": "⚠️ 預約即將自動取消",
    },
    greeting: (name) => `${name} 合作夥伴您好`,
    message: {
      "24h": "以下預約已等待確認超過24小時，請確認。",
      "48h": "以下預約已等待確認超過48小時，請儘快確認。",
      "5d": "以下預約已5天未確認。如2天內未確認，將自動取消。",
    },
    reservationInfo: "待確認預約",
    reservationNo: "預約編號",
    product: "商品",
    customer: "客戶",
    rentalPeriod: "租借期間",
    confirmNow: "立即確認",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "聯繫客服",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-CN": {
    preview: {
      "24h": "有待确认的预约",
      "48h": "预约需要确认",
      "5d": "⚠️ 预约即将自动取消",
    },
    title: {
      "24h": "预约待确认",
      "48h": "需要确认预约",
      "5d": "⚠️ 预约即将自动取消",
    },
    greeting: (name) => `${name} 合作伙伴您好`,
    message: {
      "24h": "以下预约已等待确认超过24小时，请确认。",
      "48h": "以下预约已等待确认超过48小时，请尽快确认。",
      "5d": "以下预约已5天未确认。如2天内未确认，将自动取消。",
    },
    reservationInfo: "待确认预约",
    reservationNo: "预约编号",
    product: "商品",
    customer: "客户",
    rentalPeriod: "租借期间",
    confirmNow: "立即确认",
    footer: "此邮件由 LOCARORA 自动发送。",
    support: "需要帮助吗？",
    contactSupport: "联系客服",
    poweredBy: "Powered by LOCARORA",
  },
};

export const PendingReminderEmail = ({
  partnerName,
  partnerLogoUrl,
  customerName,
  reservationNumber,
  productName,
  rentalType,
  pickupDate,
  returnDate,
  ordersUrl,
  reminderLevel = "24h",
  locale = "ko",
}: PendingReminderEmailProps) => {
  const t = translations[locale] || translations.ko;
  const isUrgent = reminderLevel === "5d";

  return (
    <Html>
      <Head />
      <Preview>{t.preview[reminderLevel]}</Preview>
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
            <Heading style={isUrgent ? headingUrgent : heading}>
              {t.title[reminderLevel]}
            </Heading>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>{t.greeting(partnerName)}</Text>
            <Text style={paragraph}>{t.message[reminderLevel]}</Text>

            {/* Reservation Info */}
            <Section style={isUrgent ? infoSectionUrgent : infoSection}>
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

              {rentalType !== "option_only" && pickupDate && (
              <Row style={infoRow}>
                <Column style={labelColumn}>
                  <Text style={label}>{t.rentalPeriod}</Text>
                </Column>
                <Column style={valueColumn}>
                  <Text style={value}>
                    {formatDate(pickupDate, locale)}
                    {returnDate && <> &mdash; {formatDate(returnDate, locale)}</>}
                  </Text>
                </Column>
              </Row>
              )}
            </Section>

            {/* CTA */}
            <Section style={buttonSection}>
              <Button style={isUrgent ? buttonUrgent : button} href={ordersUrl}>
                {t.confirmNow}
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

PendingReminderEmail.PreviewProps = {
  partnerName: "ABC 렌탈",
  partnerLogoUrl: undefined,
  customerName: "홍길동",
  reservationNumber: "REV-20260408-KVZE",
  productName: "Galaxy S25 Ultra 렌탈 (3일~)",
  pickupDate: "2026-04-12",
  returnDate: "2026-04-15",
  ordersUrl: "https://admin.locarora.com/ko/partner/orders",
  reminderLevel: "5d" as ReminderLevel,
  locale: "ko",
} satisfies PendingReminderEmailProps;

export default PendingReminderEmail;

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
const headingUrgent = { color: "#dc2626", fontSize: "24px", fontWeight: "600", lineHeight: "1.4", margin: "0" };
const content = { padding: "0 40px 32px" };
const greeting = { color: "#18181b", fontSize: "16px", fontWeight: "600", margin: "0 0 16px" };
const paragraph = { color: "#3f3f46", fontSize: "16px", lineHeight: "1.6", margin: "0 0 24px" };
const infoSection = { margin: "0 0 24px" };
const infoSectionUrgent = { margin: "0 0 24px", border: "2px solid #dc2626", borderRadius: "12px", padding: "20px" };
const sectionTitle = { color: "#18181b", fontSize: "16px", fontWeight: "600", margin: "0 0 12px" };
const sectionDivider = { borderColor: "#18181b", borderWidth: "1px", margin: "0 0 16px" };
const infoRow = { marginBottom: "8px" };
const labelColumn = { width: "100px", verticalAlign: "top" as const };
const valueColumn = { verticalAlign: "top" as const };
const label = { color: "#71717a", fontSize: "14px", margin: "0" };
const value = { color: "#3f3f46", fontSize: "14px", margin: "0" };
const valueBold = { color: "#18181b", fontSize: "14px", fontWeight: "600", margin: "0" };
const buttonSection = { textAlign: "center" as const, margin: "8px 0" };
const button = { backgroundColor: "#FF6600", borderRadius: "8px", color: "#ffffff", fontSize: "16px", fontWeight: "600", textDecoration: "none", textAlign: "center" as const, display: "inline-block", padding: "14px 32px", boxShadow: "0 2px 4px rgba(255, 102, 0, 0.2)" };
const buttonUrgent = { backgroundColor: "#dc2626", borderRadius: "8px", color: "#ffffff", fontSize: "16px", fontWeight: "600", textDecoration: "none", textAlign: "center" as const, display: "inline-block", padding: "14px 32px", boxShadow: "0 2px 4px rgba(220, 38, 38, 0.2)" };
const footer = { padding: "24px 40px 32px", textAlign: "center" as const };
const footerLogo = { margin: "0 auto 8px", opacity: 0.6 };
const poweredByText = { color: "#a1a1aa", fontSize: "11px", margin: "0 0 12px" };
const footerText = { color: "#a1a1aa", fontSize: "13px", lineHeight: "1.5", margin: "0 0 4px" };
const footerLink = { color: "#71717a", textDecoration: "underline" };
const copyrightText = { color: "#d4d4d8", fontSize: "12px", marginTop: "16px" };
