import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ReservationCompletedEmailProps {
  customerName: string;
  reservationNumber: string;
  productName: string;
  productImageUrl?: string;
  rentalType?: string;
  pickupDate?: string;
  returnDate?: string;
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
    rentalPeriod: string;
    stars: string;
    reviewMessage: string;
    writeReview: string;
    skipNotice: string;
    footer: string;
    support: string;
    contactSupport: string;
    poweredBy: string;
  }
> = {
  ko: {
    preview: "이용이 완료되었습니다. 리뷰를 남겨주세요!",
    title: "이용은 만족스러우셨나요?",
    greeting: (name) => `안녕하세요, ${name}님`,
    message: "이용이 완료되었습니다. 즐거운 경험이 되셨기를 바랍니다!",
    rentalPeriod: "이용 기간",
    stars: "★★★★★",
    reviewMessage:
      "소중한 경험을 공유해 주세요! 다른 고객들에게 큰 도움이 됩니다.",
    writeReview: "리뷰 작성하기",
    skipNotice: "리뷰를 원하지 않으시면 이 이메일을 무시하셔도 됩니다.",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "고객센터",
    poweredBy: "Powered by LOCARORA",
  },
  en: {
    preview: "Your rental is complete. Leave a review!",
    title: "How was your experience?",
    greeting: (name) => `Hello, ${name}`,
    message: "Your rental is complete. We hope you had a great experience!",
    rentalPeriod: "Rental Period",
    stars: "★★★★★",
    reviewMessage:
      "Share your experience! Your review helps other customers make better decisions.",
    writeReview: "Write a Review",
    skipNotice:
      "If you don't wish to leave a review, you can ignore this email.",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Contact Support",
    poweredBy: "Powered by LOCARORA",
  },
  ja: {
    preview: "ご利用が完了しました。レビューをお願いします！",
    title: "ご利用はいかがでしたか？",
    greeting: (name) => `${name}様`,
    message:
      "ご利用が完了しました。素敵な体験になりましたら幸いです！",
    rentalPeriod: "ご利用期間",
    stars: "★★★★★",
    reviewMessage:
      "ぜひご感想をお聞かせください！他のお客様の参考になります。",
    writeReview: "レビューを書く",
    skipNotice:
      "レビューをご希望でない場合は、このメールを無視してください。",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "サポート",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-TW": {
    preview: "租借已完成。請留下評價！",
    title: "您的使用體驗如何？",
    greeting: (name) => `您好，${name}`,
    message: "您的租借已完成。希望您度過了愉快的體驗！",
    rentalPeriod: "租借期間",
    stars: "★★★★★",
    reviewMessage: "分享您的體驗！您的評價將幫助其他顧客做出更好的選擇。",
    writeReview: "撰寫評價",
    skipNotice: "如果您不想留下評價，可以忽略此郵件。",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "聯繫客服",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-CN": {
    preview: "租借已完成。请留下评价！",
    title: "您的使用体验如何？",
    greeting: (name) => `您好，${name}`,
    message: "您的租借已完成。希望您度过了愉快的体验！",
    rentalPeriod: "租借期间",
    stars: "★★★★★",
    reviewMessage: "分享您的体验！您的评价将帮助其他顾客做出更好的选择。",
    writeReview: "撰写评价",
    skipNotice: "如果您不想留下评价，可以忽略此邮件。",
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
  rentalType,
  pickupDate,
  returnDate,
  reviewUrl,
  reservationUrl,
  partnerName,
  partnerLogoUrl,
  locale = "ko",
}: ReservationCompletedEmailProps) => {
  const t = translations[locale] || translations.ko;
  const isOptionOnly = rentalType === "option_only";
  const formattedPickup = pickupDate ? formatDate(pickupDate, locale) : "";
  const formattedReturn = returnDate ? formatDate(returnDate, locale) : "";

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
            <Text style={checkIcon}>✓</Text>
            <Heading style={heading}>{t.title}</Heading>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>{t.greeting(customerName)}</Text>
            <Text style={paragraph}>{t.message}</Text>

            {/* Product Card */}
            <Section style={productCard}>
              {productImageUrl && (
                <Img
                  src={productImageUrl}
                  width="100%"
                  height="180"
                  alt={productName}
                  style={productImageStyle}
                />
              )}
              <Section style={productInfo}>
                <Text style={productNameStyle}>{productName}</Text>
                {partnerName && (
                  <Text style={productPartnerName}>{partnerName}</Text>
                )}
                {!isOptionOnly && formattedPickup && (
                <Text style={rentalPeriodStyle}>
                  {t.rentalPeriod}: {formattedPickup}{formattedReturn && ` — ${formattedReturn}`}
                </Text>
                )}
              </Section>
            </Section>

            {/* Stars */}
            <Section style={starsSection}>
              <Text style={starsText}>{t.stars}</Text>
            </Section>

            {/* Review Message */}
            <Text style={reviewMessage}>{t.reviewMessage}</Text>

            {/* CTA Button */}
            <Section style={buttonSection}>
              <Button style={button} href={reviewUrl}>
                {t.writeReview}
              </Button>
            </Section>

            <Text style={skipNotice}>{t.skipNotice}</Text>
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
const checkIcon = { fontSize: "48px", color: "#22c55e", margin: "0 0 16px" };
const heading = { color: "#18181b", fontSize: "24px", fontWeight: "600", lineHeight: "1.4", margin: "0" };
const content = { padding: "0 40px 32px" };
const greeting = { color: "#18181b", fontSize: "16px", fontWeight: "600", margin: "0 0 16px" };
const paragraph = { color: "#3f3f46", fontSize: "16px", lineHeight: "1.6", margin: "0 0 24px" };
const productCard = { borderRadius: "12px", overflow: "hidden", border: "1px solid #e4e4e7", margin: "0 0 24px" };
const productImageStyle = { objectFit: "cover" as const, display: "block" };
const productInfo = { padding: "16px 20px" };
const productNameStyle = { color: "#18181b", fontSize: "16px", fontWeight: "600", margin: "0 0 4px" };
const productPartnerName = { color: "#71717a", fontSize: "14px", margin: "0 0 8px" };
const rentalPeriodStyle = { color: "#71717a", fontSize: "13px", margin: "0" };
const starsSection = { textAlign: "center" as const, margin: "0 0 16px" };
const starsText = { fontSize: "36px", color: "#fbbf24", margin: "0", letterSpacing: "4px" };
const reviewMessage = { color: "#3f3f46", fontSize: "15px", lineHeight: "1.6", margin: "0 0 24px", textAlign: "center" as const };
const buttonSection = { textAlign: "center" as const, margin: "8px 0 24px" };
const button = { backgroundColor: "#FF6600", borderRadius: "8px", color: "#ffffff", fontSize: "16px", fontWeight: "600", textDecoration: "none", textAlign: "center" as const, display: "inline-block", padding: "14px 32px", boxShadow: "0 2px 4px rgba(255, 102, 0, 0.2)" };
const skipNotice = { color: "#a1a1aa", fontSize: "13px", textAlign: "center" as const, margin: "0" };
const footer = { padding: "24px 40px 32px", textAlign: "center" as const };
const footerLogo = { margin: "0 auto 8px", opacity: 0.6 };
const poweredByText = { color: "#a1a1aa", fontSize: "11px", margin: "0 0 12px" };
const footerText = { color: "#a1a1aa", fontSize: "13px", lineHeight: "1.5", margin: "0 0 4px" };
const footerLink = { color: "#71717a", textDecoration: "underline" };
const copyrightText = { color: "#d4d4d8", fontSize: "12px", marginTop: "16px" };
