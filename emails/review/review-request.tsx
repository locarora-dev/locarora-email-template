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

interface ReviewRequestEmailProps {
  customerName: string;
  productName: string;
  productImageUrl?: string;
  partnerName: string;
  pickupDate: string;
  returnDate: string;
  reviewUrl: string;
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
    completedMessage: (product: string, partner: string) => string;
    askReview: string;
    rentalPeriod: string;
    stars: string;
    writeReview: string;
    skipNotice: string;
    footer: string;
    support: string;
    contactSupport: string;
  }
> = {
  ko: {
    preview: "이용은 어떠셨나요? 리뷰를 남겨주세요",
    title: "이용은 만족스러우셨나요?",
    greeting: (name) => `안녕하세요, ${name}님`,
    completedMessage: (product, partner) =>
      `${partner}에서 "${product}" 이용이 완료되었습니다.`,
    askReview:
      "소중한 경험을 공유해 주세요! 다른 고객들에게 큰 도움이 됩니다.",
    rentalPeriod: "이용 기간",
    stars: "★★★★★",
    writeReview: "리뷰 작성하기",
    skipNotice: "리뷰를 원하지 않으시면 이 이메일을 무시하셔도 됩니다.",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "고객센터",
  },
  en: {
    preview: "How was your experience? Leave a review",
    title: "How was your experience?",
    greeting: (name) => `Hello, ${name}`,
    completedMessage: (product, partner) =>
      `Your rental of "${product}" from ${partner} has been completed.`,
    askReview:
      "Share your experience! Your review helps other customers make better decisions.",
    rentalPeriod: "Rental Period",
    stars: "★★★★★",
    writeReview: "Write a Review",
    skipNotice:
      "If you don't wish to leave a review, you can ignore this email.",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Contact Support",
  },
  ja: {
    preview: "ご利用はいかがでしたか？レビューをお待ちしています",
    title: "ご利用はいかがでしたか？",
    greeting: (name) => `${name}様`,
    completedMessage: (product, partner) =>
      `${partner}での「${product}」のご利用が完了しました。`,
    askReview:
      "ぜひご感想をお聞かせください！他のお客様の参考になります。",
    rentalPeriod: "ご利用期間",
    stars: "★★★★★",
    writeReview: "レビューを書く",
    skipNotice:
      "レビューをご希望でない場合は、このメールを無視してください。",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "サポート",
  },
  "zh-TW": {
    preview: "您的使用體驗如何？請留下評價",
    title: "您的使用體驗如何？",
    greeting: (name) => `您好，${name}`,
    completedMessage: (product, partner) =>
      `您在 ${partner} 租借的「${product}」已完成。`,
    askReview: "分享您的體驗！您的評價將幫助其他顧客做出更好的選擇。",
    rentalPeriod: "租借期間",
    stars: "★★★★★",
    writeReview: "撰寫評價",
    skipNotice: "如果您不想留下評價，可以忽略此郵件。",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "聯繫客服",
  },
  "zh-CN": {
    preview: "您的使用体验如何？请留下评价",
    title: "您的使用体验如何？",
    greeting: (name) => `您好，${name}`,
    completedMessage: (product, partner) =>
      `您在 ${partner} 租借的「${product}」已完成。`,
    askReview: "分享您的体验！您的评价将帮助其他顾客做出更好的选择。",
    rentalPeriod: "租借期间",
    stars: "★★★★★",
    writeReview: "撰写评价",
    skipNotice: "如果您不想留下评价，可以忽略此邮件。",
    footer: "此邮件由 LOCARORA 自动发送。",
    support: "需要帮助吗？",
    contactSupport: "联系客服",
  },
};

export const ReviewRequestEmail = ({
  customerName,
  productName,
  productImageUrl,
  partnerName,
  pickupDate,
  returnDate,
  reviewUrl,
  locale = "ko",
}: ReviewRequestEmailProps) => {
  const t = translations[locale] || translations.ko;
  const formattedPickup = formatDate(pickupDate, locale);
  const formattedReturn = formatDate(returnDate, locale);

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

          {/* Main Content */}
          <Section style={content}>
            <Text style={paragraph}>{t.greeting(customerName)}</Text>
            <Text style={paragraph}>
              {t.completedMessage(productName, partnerName)}
            </Text>

            {/* Product Card */}
            <Section style={productCard}>
              {productImageUrl && (
                <Img
                  src={productImageUrl}
                  width="100%"
                  height="180"
                  alt={productName}
                  style={productImage}
                />
              )}
              <Section style={productInfo}>
                <Text style={productNameStyle}>{productName}</Text>
                <Text style={partnerNameStyle}>{partnerName}</Text>
                <Text style={rentalPeriodStyle}>
                  {t.rentalPeriod}: {formattedPickup} — {formattedReturn}
                </Text>
              </Section>
            </Section>

            {/* Stars */}
            <Section style={starsSection}>
              <Text style={starsText}>{t.stars}</Text>
            </Section>

            {/* Ask Review */}
            <Text style={askReviewText}>{t.askReview}</Text>

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

ReviewRequestEmail.PreviewProps = {
  customerName: "홍길동",
  productName: "Galaxy S25 Ultra 렌탈 (3일~)",
  productImageUrl:
    "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/product-images/sample.jpg",
  partnerName: "ABC 렌탈",
  pickupDate: "2026-01-23",
  returnDate: "2026-01-26",
  reviewUrl: "https://locarora.com/ko/reservations/abc123/review",
  locale: "ko",
} satisfies ReviewRequestEmailProps;

export default ReviewRequestEmail;

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

const titleSection = {
  padding: "32px 40px 16px",
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

const paragraph = {
  color: "#3f3f46",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const productCard = {
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid #e4e4e7",
  margin: "24px 0",
};

const productImage = {
  objectFit: "cover" as const,
  display: "block",
};

const productInfo = {
  padding: "16px 20px",
};

const productNameStyle = {
  color: "#18181b",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 4px",
};

const partnerNameStyle = {
  color: "#71717a",
  fontSize: "14px",
  margin: "0 0 8px",
};

const rentalPeriodStyle = {
  color: "#71717a",
  fontSize: "13px",
  margin: "0",
};

const starsSection = {
  textAlign: "center" as const,
  margin: "8px 0 16px",
};

const starsText = {
  fontSize: "36px",
  color: "#fbbf24",
  margin: "0",
  letterSpacing: "4px",
};

const askReviewText = {
  color: "#3f3f46",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "8px 0 24px",
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

const skipNotice = {
  color: "#a1a1aa",
  fontSize: "13px",
  textAlign: "center" as const,
  margin: "0",
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
