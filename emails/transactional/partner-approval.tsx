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

type ApprovalType = "branch" | "product";

interface PartnerApprovalEmailProps {
  // Approval type
  type: ApprovalType;

  // Partner info
  partnerName: string;

  // Item info (branch or product) - optional for general approval notifications
  itemName?: string;
  itemId?: string;

  // Optional additional info
  message?: string;

  // Locale
  locale: string;
}

// Supabase Storage hosted image URL
const logoUrl =
  "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png";

// Multi-language translations
const translations: Record<
  string,
  {
    branchPreview: string;
    productPreview: string;
    branchTitle: string;
    productTitle: string;
    greeting: (name: string) => string;
    branchApprovedMessage: (itemName?: string) => string;
    productApprovedMessage: (itemName?: string) => string;
    branchNextSteps: string;
    productNextSteps: string;
    branchStep1: string;
    branchStep2: string;
    productStep1: string;
    productStep2: string;
    goToAdmin: string;
    footer: string;
    support: string;
    contactSupport: string;
  }
> = {
  ko: {
    branchPreview: "지점이 승인되었습니다",
    productPreview: "상품이 승인되었습니다",
    branchTitle: "지점 승인 완료",
    productTitle: "상품 승인 완료",
    greeting: (name) => `안녕하세요, ${name}님`,
    branchApprovedMessage: (itemName) =>
      itemName
        ? `축하합니다! "${itemName}" 지점이 승인되었습니다.`
        : `축하합니다! 지점이 승인되었습니다.`,
    productApprovedMessage: (itemName) =>
      itemName
        ? `축하합니다! "${itemName}" 상품이 승인되었습니다.`
        : `축하합니다! 상품이 승인되었습니다.`,
    branchNextSteps: "다음 단계를 진행해주세요",
    productNextSteps: "다음 단계를 진행해주세요",
    branchStep1: "파트너 관리자에서 지점 정보를 확인하세요",
    branchStep2: "상품을 등록하여 판매를 시작하세요",
    productStep1: "파트너 관리자에서 상품 정보를 확인하세요",
    productStep2: "이제 고객들이 상품을 예약할 수 있습니다",
    goToAdmin: "파트너 관리자로 이동",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "파트너 지원팀",
  },
  en: {
    branchPreview: "Your branch has been approved",
    productPreview: "Your product has been approved",
    branchTitle: "Branch Approved",
    productTitle: "Product Approved",
    greeting: (name) => `Hello, ${name}`,
    branchApprovedMessage: (itemName) =>
      itemName
        ? `Congratulations! Your branch "${itemName}" has been approved.`
        : `Congratulations! Your branch has been approved.`,
    productApprovedMessage: (itemName) =>
      itemName
        ? `Congratulations! Your product "${itemName}" has been approved.`
        : `Congratulations! Your product has been approved.`,
    branchNextSteps: "Next steps",
    productNextSteps: "Next steps",
    branchStep1: "Review your branch information in Partner Admin",
    branchStep2: "Register products to start selling",
    productStep1: "Review your product information in Partner Admin",
    productStep2: "Customers can now book your product",
    goToAdmin: "Go to Partner Admin",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Partner Support",
  },
  ja: {
    branchPreview: "店舗が承認されました",
    productPreview: "商品が承認されました",
    branchTitle: "店舗承認完了",
    productTitle: "商品承認完了",
    greeting: (name) => `${name}様`,
    branchApprovedMessage: (itemName) =>
      itemName
        ? `おめでとうございます！「${itemName}」店舗が承認されました。`
        : `おめでとうございます！店舗が承認されました。`,
    productApprovedMessage: (itemName) =>
      itemName
        ? `おめでとうございます！「${itemName}」商品が承認されました。`
        : `おめでとうございます！商品が承認されました。`,
    branchNextSteps: "次のステップ",
    productNextSteps: "次のステップ",
    branchStep1: "パートナー管理画面で店舗情報をご確認ください",
    branchStep2: "商品を登録して販売を開始しましょう",
    productStep1: "パートナー管理画面で商品情報をご確認ください",
    productStep2: "お客様が商品を予約できるようになりました",
    goToAdmin: "パートナー管理画面へ",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "パートナーサポート",
  },
  "zh-TW": {
    branchPreview: "您的門市已獲批准",
    productPreview: "您的商品已獲批准",
    branchTitle: "門市審核通過",
    productTitle: "商品審核通過",
    greeting: (name) => `您好，${name}`,
    branchApprovedMessage: (itemName) =>
      itemName
        ? `恭喜！您的門市「${itemName}」已獲批准。`
        : `恭喜！您的門市已獲批准。`,
    productApprovedMessage: (itemName) =>
      itemName
        ? `恭喜！您的商品「${itemName}」已獲批准。`
        : `恭喜！您的商品已獲批准。`,
    branchNextSteps: "後續步驟",
    productNextSteps: "後續步驟",
    branchStep1: "在合作夥伴管理後台確認門市資訊",
    branchStep2: "上架商品開始銷售",
    productStep1: "在合作夥伴管理後台確認商品資訊",
    productStep2: "顧客現在可以預訂您的商品了",
    goToAdmin: "前往合作夥伴管理後台",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "合作夥伴支援",
  },
  "zh-CN": {
    branchPreview: "您的门店已获批准",
    productPreview: "您的商品已获批准",
    branchTitle: "门店审核通过",
    productTitle: "商品审核通过",
    greeting: (name) => `您好，${name}`,
    branchApprovedMessage: (itemName) =>
      itemName
        ? `恭喜！您的门店「${itemName}」已获批准。`
        : `恭喜！您的门店已获批准。`,
    productApprovedMessage: (itemName) =>
      itemName
        ? `恭喜！您的商品「${itemName}」已获批准。`
        : `恭喜！您的商品已获批准。`,
    branchNextSteps: "后续步骤",
    productNextSteps: "后续步骤",
    branchStep1: "在合作伙伴管理后台确认门店信息",
    branchStep2: "上架商品开始销售",
    productStep1: "在合作伙伴管理后台确认商品信息",
    productStep2: "顾客现在可以预订您的商品了",
    goToAdmin: "前往合作伙伴管理后台",
    footer: "此邮件由 LOCARORA 自动发送。",
    support: "需要帮助吗？",
    contactSupport: "合作伙伴支持",
  },
};

export const PartnerApprovalEmail = ({
  type,
  partnerName,
  itemName,
  itemId,
  message,
  locale = "ko",
}: PartnerApprovalEmailProps) => {
  const t = translations[locale] || translations.ko;

  const isBranch = type === "branch";
  const preview = isBranch ? t.branchPreview : t.productPreview;
  const title = isBranch ? t.branchTitle : t.productTitle;
  const approvedMessage = isBranch
    ? t.branchApprovedMessage(itemName)
    : t.productApprovedMessage(itemName);
  const nextSteps = isBranch ? t.branchNextSteps : t.productNextSteps;
  const steps = isBranch
    ? [t.branchStep1, t.branchStep2]
    : [t.productStep1, t.productStep2];

  // If itemId is provided, link to specific item; otherwise link to dashboard
  const adminUrl = itemId
    ? isBranch
      ? `https://partner.locarora.com/branches/${itemId}`
      : `https://partner.locarora.com/products/${itemId}`
    : "https://partner.locarora.com";

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
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

          {/* Title with Check Icon */}
          <Section style={titleSection}>
            <Text style={checkIcon}>✓</Text>
            <Heading style={heading}>{title}</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>{t.greeting(partnerName)}</Text>

            <Text style={approvedText}>{approvedMessage}</Text>

            {message && <Text style={customMessage}>{message}</Text>}

            {/* Next Steps */}
            <Section style={stepsSection}>
              <Text style={stepsTitle}>{nextSteps}</Text>
              <Text style={stepItem}>1. {steps[0]}</Text>
              <Text style={stepItem}>2. {steps[1]}</Text>
            </Section>

            {/* CTA Button */}
            <Section style={buttonSection}>
              <Button style={button} href={adminUrl}>
                {t.goToAdmin}
              </Button>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>{t.footer}</Text>
            <Text style={footerText}>
              {t.support}{" "}
              <Link
                href="https://partner.locarora.com/support"
                style={footerLink}
              >
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

PartnerApprovalEmail.PreviewProps = {
  type: "branch",
  partnerName: "로카로라 파트너",
  itemName: "인천공항 제1터미널점",
  itemId: "branch_abc123",
  message: undefined,
  locale: "ko",
} satisfies PartnerApprovalEmailProps;

export default PartnerApprovalEmail;

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
  padding: "32px 40px 24px",
  textAlign: "center" as const,
};

const checkIcon = {
  fontSize: "48px",
  color: "#22c55e",
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

const greeting = {
  color: "#18181b",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 16px",
};

const approvedText = {
  color: "#3f3f46",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 24px",
};

const customMessage = {
  color: "#71717a",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 24px",
  padding: "16px",
  backgroundColor: "#fafafa",
  borderRadius: "8px",
};

const stepsSection = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "20px",
  margin: "0 0 24px",
};

const stepsTitle = {
  color: "#18181b",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 12px",
};

const stepItem = {
  color: "#3f3f46",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 8px",
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
