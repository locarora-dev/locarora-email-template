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

interface ReservationCompletedEmailProps {
  customerName: string;
  reservationNumber: string;
  productName: string;
  productImageUrl?: string;
  pickupDate: string;
  returnDate: string;
  reviewUrl: string;
  reservationUrl: string;
  partnerName?: string;
  partnerLogoUrl?: string;
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
    preview: string;
    title: string;
    greeting: (name: string) => string;
    message: string;
    reservationInfo: string;
    reservationNo: string;
    product: string;
    rentalPeriod: string;
    reviewRequest: string;
    reviewMessage: string;
    writeReview: string;
    viewReservation: string;
    footer: string;
    support: string;
    contactSupport: string;
    poweredBy: string;
  }
> = {
  ko: {
    preview: "이용이 완료되었습니다. 리뷰를 남겨주세요!",
    title: "이용 완료",
    greeting: (name) => `안녕하세요, ${name}님`,
    message: "이용이 완료되었습니다. 즐거운 경험이 되셨기를 바랍니다!",
    reservationInfo: "이용 내역",
    reservationNo: "예약번호",
    product: "상품",
    rentalPeriod: "이용 기간",
    reviewRequest: "리뷰를 남겨주세요!",
    reviewMessage:
      "소중한 리뷰는 다른 고객과 파트너에게 큰 도움이 됩니다. 경험을 공유해 주세요.",
    writeReview: "리뷰 작성하기",
    viewReservation: "예약 내역 보기",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "고객센터",
    poweredBy: "Powered by LOCARORA",
  },
  en: {
    preview: "Your rental is complete. Leave a review!",
    title: "Rental Complete",
    greeting: (name) => `Hello, ${name}`,
    message: "Your rental is complete. We hope you had a great experience!",
    reservationInfo: "Rental Summary",
    reservationNo: "Reservation No.",
    product: "Product",
    rentalPeriod: "Rental Period",
    reviewRequest: "Share your experience!",
    reviewMessage:
      "Your review helps other customers and partners. Please share your experience.",
    writeReview: "Write a Review",
    viewReservation: "View Reservation",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Contact Support",
    poweredBy: "Powered by LOCARORA",
  },
  ja: {
    preview: "ご利用が完了しました。レビューをお願いします！",
    title: "ご利用完了",
    greeting: (name) => `${name}様`,
    message:
      "ご利用が完了しました。素敵な体験になりましたら幸いです！",
    reservationInfo: "ご利用内容",
    reservationNo: "予約番号",
    product: "商品",
    rentalPeriod: "ご利用期間",
    reviewRequest: "レビューをお願いします！",
    reviewMessage:
      "お客様のレビューは他のお客様やパートナーにとって大変参考になります。ご経験を共有してください。",
    writeReview: "レビューを書く",
    viewReservation: "予約を確認する",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "サポート",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-TW": {
    preview: "租借已完成。請留下評價！",
    title: "租借完成",
    greeting: (name) => `您好，${name}`,
    message: "您的租借已完成。希望您度過了愉快的體驗！",
    reservationInfo: "租借摘要",
    reservationNo: "預約編號",
    product: "商品",
    rentalPeriod: "租借期間",
    reviewRequest: "分享您的體驗！",
    reviewMessage: "您的評價對其他客戶和合作夥伴非常有幫助。請分享您的體驗。",
    writeReview: "撰寫評價",
    viewReservation: "查看預約",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "聯繫客服",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-CN": {
    preview: "租借已完成。请留下评价！",
    title: "租借完成",
    greeting: (name) => `您好，${name}`,
    message: "您的租借已完成。希望您度过了愉快的体验！",
    reservationInfo: "租借摘要",
    reservationNo: "预约编号",
    product: "商品",
    rentalPeriod: "租借期间",
    reviewRequest: "分享您的体验！",
    reviewMessage: "您的评价对其他客户和合作伙伴非常有帮助。请分享您的体验。",
    writeReview: "撰写评价",
    viewReservation: "查看预约",
    footer: "此邮件由 LOCARORA 自动发送。",
    support: "需要帮助吗？",
    contactSupport: "联系客服",
    poweredBy: "Powered by LOCARORA",
  },
};

export const ReservationCompletedEmail = ({
  customerName,
  reservationNumber,
  productName,
  productImageUrl,
  pickupDate,
  returnDate,
  reviewUrl,
  reservationUrl,
  partnerName,
  partnerLogoUrl,
  locale = "ko",
}: ReservationCompletedEmailProps) => {
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

            {/* Reservation Info */}
            <Section style={infoSection}>
              <Text style={sectionTitle}>{t.reservationInfo}</Text>
              <Hr style={sectionDivider} />

              {productImageUrl && (
                <Img
                  src={productImageUrl}
                  width="100"
                  height="100"
                  alt={productName}
                  style={productImage}
                />
              )}

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
                    {formatDate(pickupDate, locale)} &mdash;{" "}
                    {formatDate(returnDate, locale)}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Review Request */}
            <Section style={reviewSection}>
              <Heading style={reviewHeading}>{t.reviewRequest}</Heading>
              <Text style={reviewDescription}>{t.reviewMessage}</Text>
              <Section style={buttonSection}>
                <Button style={button} href={reviewUrl}>
                  {t.writeReview}
                </Button>
              </Section>
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

ReservationCompletedEmail.PreviewProps = {
  customerName: "홍길동",
  reservationNumber: "202601210635420",
  productName: "Galaxy S25 Ultra 렌탈 (3일~)",
  productImageUrl: undefined,
  pickupDate: "2026-01-23",
  returnDate: "2026-01-26",
  reviewUrl: "https://locarora.com/ko/products/abc123/review?reservationId=xyz",
  reservationUrl: "https://locarora.com/ko/reservations/abc123",
  partnerName: "ABC 렌탈",
  partnerLogoUrl: undefined,
  locale: "ko",
} satisfies ReservationCompletedEmailProps;

export default ReservationCompletedEmail;

// Styles
const main = { backgroundColor: "#f4f4f5", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif', padding: "40px 0" };
const container = { backgroundColor: "#ffffff", margin: "0 auto", maxWidth: "560px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)", overflow: "hidden" };
const logoSection = { padding: "32px 40px 24px", textAlign: "center" as const };
const logoImg = { margin: "0 auto" };
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
const productImage = { borderRadius: "8px", margin: "0 0 16px", objectFit: "cover" as const };
const infoRow = { marginBottom: "8px" };
const labelColumn = { width: "100px", verticalAlign: "top" as const };
const valueColumn = { verticalAlign: "top" as const };
const label = { color: "#71717a", fontSize: "14px", margin: "0" };
const value = { color: "#3f3f46", fontSize: "14px", margin: "0" };
const reviewSection = { margin: "0 0 24px", textAlign: "center" as const };
const reviewHeading = { color: "#18181b", fontSize: "18px", fontWeight: "600", margin: "0 0 8px" };
const reviewDescription = { color: "#71717a", fontSize: "14px", lineHeight: "1.6", margin: "0 0 20px" };
const button = { backgroundColor: "#FF6600", borderRadius: "8px", color: "#ffffff", fontSize: "16px", fontWeight: "600", textDecoration: "none", textAlign: "center" as const, display: "inline-block", padding: "14px 32px", boxShadow: "0 2px 4px rgba(255, 102, 0, 0.2)" };
const footer = { padding: "24px 40px 32px", textAlign: "center" as const };
const footerLogo = { margin: "0 auto 8px", opacity: 0.6 };
const poweredByText = { color: "#a1a1aa", fontSize: "11px", margin: "0 0 12px" };
const footerText = { color: "#a1a1aa", fontSize: "13px", lineHeight: "1.5", margin: "0 0 4px" };
const footerLink = { color: "#71717a", textDecoration: "underline" };
const copyrightText = { color: "#d4d4d8", fontSize: "12px", marginTop: "16px" };
