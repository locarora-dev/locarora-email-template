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

type RejectionType = "partner" | "branch" | "product";

interface PartnerRejectionEmailProps {
  type: RejectionType;
  partnerName: string;
  itemName?: string;
  rejectionReason?: string;
  locale: string;
}

const logoUrl =
  "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png";

const translations: Record<
  string,
  {
    partnerPreview: string;
    branchPreview: string;
    productPreview: string;
    partnerTitle: string;
    branchTitle: string;
    productTitle: string;
    greeting: (name: string) => string;
    partnerRejectedMessage: string;
    branchRejectedMessage: (itemName?: string) => string;
    productRejectedMessage: (itemName?: string) => string;
    rejectionReasonLabel: string;
    whatNext: string;
    partnerStep1: string;
    partnerStep2: string;
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
    partnerPreview: "파트너 신청이 반려되었습니다",
    branchPreview: "지점 등록이 반려되었습니다",
    productPreview: "상품 등록이 반려되었습니다",
    partnerTitle: "파트너 신청 반려",
    branchTitle: "지점 등록 반려",
    productTitle: "상품 등록 반려",
    greeting: (name) => `안녕하세요, ${name}님`,
    partnerRejectedMessage:
      "파트너 신청이 반려되었습니다. 아래 사유를 확인 후 수정하여 다시 신청해 주세요.",
    branchRejectedMessage: (itemName) =>
      itemName
        ? `"${itemName}" 지점 등록이 반려되었습니다. 아래 사유를 확인 후 수정하여 다시 제출해 주세요.`
        : "지점 등록이 반려되었습니다. 아래 사유를 확인 후 수정하여 다시 제출해 주세요.",
    productRejectedMessage: (itemName) =>
      itemName
        ? `"${itemName}" 상품 등록이 반려되었습니다. 아래 사유를 확인 후 수정하여 다시 제출해 주세요.`
        : "상품 등록이 반려되었습니다. 아래 사유를 확인 후 수정하여 다시 제출해 주세요.",
    rejectionReasonLabel: "반려 사유",
    whatNext: "다음 단계",
    partnerStep1: "반려 사유를 확인하고 필요한 정보를 수정해 주세요",
    partnerStep2: "수정 완료 후 다시 파트너 신청을 제출해 주세요",
    branchStep1: "반려 사유를 확인하고 지점 정보를 수정해 주세요",
    branchStep2: "수정 완료 후 다시 승인 요청을 제출해 주세요",
    productStep1: "반려 사유를 확인하고 상품 정보를 수정해 주세요",
    productStep2: "수정 완료 후 다시 승인 요청을 제출해 주세요",
    goToAdmin: "파트너 관리자로 이동",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "파트너 지원팀",
  },
  en: {
    partnerPreview: "Your partner application has been declined",
    branchPreview: "Your branch registration has been declined",
    productPreview: "Your product registration has been declined",
    partnerTitle: "Partner Application Declined",
    branchTitle: "Branch Registration Declined",
    productTitle: "Product Registration Declined",
    greeting: (name) => `Hello, ${name}`,
    partnerRejectedMessage:
      "Your partner application has been declined. Please review the reason below, make the necessary changes, and resubmit.",
    branchRejectedMessage: (itemName) =>
      itemName
        ? `Your branch "${itemName}" registration has been declined. Please review the reason below and resubmit after making corrections.`
        : "Your branch registration has been declined. Please review the reason below and resubmit after making corrections.",
    productRejectedMessage: (itemName) =>
      itemName
        ? `Your product "${itemName}" registration has been declined. Please review the reason below and resubmit after making corrections.`
        : "Your product registration has been declined. Please review the reason below and resubmit after making corrections.",
    rejectionReasonLabel: "Reason for Decline",
    whatNext: "Next Steps",
    partnerStep1: "Review the reason for decline and update the required information",
    partnerStep2: "Resubmit your partner application after making corrections",
    branchStep1: "Review the reason for decline and update your branch information",
    branchStep2: "Resubmit for approval after making corrections",
    productStep1: "Review the reason for decline and update your product information",
    productStep2: "Resubmit for approval after making corrections",
    goToAdmin: "Go to Partner Admin",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Partner Support",
  },
  ja: {
    partnerPreview: "パートナー申請が却下されました",
    branchPreview: "店舗登録が却下されました",
    productPreview: "商品登録が却下されました",
    partnerTitle: "パートナー申請却下",
    branchTitle: "店舗登録却下",
    productTitle: "商品登録却下",
    greeting: (name) => `${name}様`,
    partnerRejectedMessage:
      "パートナー申請が却下されました。以下の理由をご確認の上、修正して再申請してください。",
    branchRejectedMessage: (itemName) =>
      itemName
        ? `「${itemName}」店舗の登録が却下されました。以下の理由をご確認の上、修正して再提出してください。`
        : "店舗の登録が却下されました。以下の理由をご確認の上、修正して再提出してください。",
    productRejectedMessage: (itemName) =>
      itemName
        ? `「${itemName}」商品の登録が却下されました。以下の理由をご確認の上、修正して再提出してください。`
        : "商品の登録が却下されました。以下の理由をご確認の上、修正して再提出してください。",
    rejectionReasonLabel: "却下理由",
    whatNext: "次のステップ",
    partnerStep1: "却下理由を確認し、必要な情報を修正してください",
    partnerStep2: "修正完了後、再度パートナー申請を提出してください",
    branchStep1: "却下理由を確認し、店舗情報を修正してください",
    branchStep2: "修正完了後、再度承認申請を提出してください",
    productStep1: "却下理由を確認し、商品情報を修正してください",
    productStep2: "修正完了後、再度承認申請を提出してください",
    goToAdmin: "パートナー管理画面へ",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "パートナーサポート",
  },
  "zh-TW": {
    partnerPreview: "您的合作夥伴申請已被退回",
    branchPreview: "您的門市登記已被退回",
    productPreview: "您的商品登記已被退回",
    partnerTitle: "合作夥伴申請退回",
    branchTitle: "門市登記退回",
    productTitle: "商品登記退回",
    greeting: (name) => `您好，${name}`,
    partnerRejectedMessage:
      "您的合作夥伴申請已被退回。請查看以下原因，修改後重新提交。",
    branchRejectedMessage: (itemName) =>
      itemName
        ? `您的門市「${itemName}」登記已被退回。請查看以下原因，修改後重新提交。`
        : "您的門市登記已被退回。請查看以下原因，修改後重新提交。",
    productRejectedMessage: (itemName) =>
      itemName
        ? `您的商品「${itemName}」登記已被退回。請查看以下原因，修改後重新提交。`
        : "您的商品登記已被退回。請查看以下原因，修改後重新提交。",
    rejectionReasonLabel: "退回原因",
    whatNext: "後續步驟",
    partnerStep1: "確認退回原因並修改所需資訊",
    partnerStep2: "修改完成後重新提交合作夥伴申請",
    branchStep1: "確認退回原因並修改門市資訊",
    branchStep2: "修改完成後重新提交審核",
    productStep1: "確認退回原因並修改商品資訊",
    productStep2: "修改完成後重新提交審核",
    goToAdmin: "前往合作夥伴管理後台",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "合作夥伴支援",
  },
  "zh-CN": {
    partnerPreview: "您的合作伙伴申请已被退回",
    branchPreview: "您的门店登记已被退回",
    productPreview: "您的商品登记已被退回",
    partnerTitle: "合作伙伴申请退回",
    branchTitle: "门店登记退回",
    productTitle: "商品登记退回",
    greeting: (name) => `您好，${name}`,
    partnerRejectedMessage:
      "您的合作伙伴申请已被退回。请查看以下原因，修改后重新提交。",
    branchRejectedMessage: (itemName) =>
      itemName
        ? `您的门店「${itemName}」登记已被退回。请查看以下原因，修改后重新提交。`
        : "您的门店登记已被退回。请查看以下原因，修改后重新提交。",
    productRejectedMessage: (itemName) =>
      itemName
        ? `您的商品「${itemName}」登记已被退回。请查看以下原因，修改后重新提交。`
        : "您的商品登记已被退回。请查看以下原因，修改后重新提交。",
    rejectionReasonLabel: "退回原因",
    whatNext: "后续步骤",
    partnerStep1: "确认退回原因并修改所需信息",
    partnerStep2: "修改完成后重新提交合作伙伴申请",
    branchStep1: "确认退回原因并修改门店信息",
    branchStep2: "修改完成后重新提交审核",
    productStep1: "确认退回原因并修改商品信息",
    productStep2: "修改完成后重新提交审核",
    goToAdmin: "前往合作伙伴管理后台",
    footer: "此邮件由 LOCARORA 自动发送。",
    support: "需要帮助吗？",
    contactSupport: "合作伙伴支持",
  },
};

export const PartnerRejectionEmail = ({
  type,
  partnerName,
  itemName,
  rejectionReason,
  locale = "ko",
}: PartnerRejectionEmailProps) => {
  const t = translations[locale] || translations.ko;

  const previewMap: Record<RejectionType, string> = {
    partner: t.partnerPreview,
    branch: t.branchPreview,
    product: t.productPreview,
  };

  const titleMap: Record<RejectionType, string> = {
    partner: t.partnerTitle,
    branch: t.branchTitle,
    product: t.productTitle,
  };

  const messageMap: Record<RejectionType, string> = {
    partner: t.partnerRejectedMessage,
    branch: t.branchRejectedMessage(itemName),
    product: t.productRejectedMessage(itemName),
  };

  const stepsMap: Record<RejectionType, [string, string]> = {
    partner: [t.partnerStep1, t.partnerStep2],
    branch: [t.branchStep1, t.branchStep2],
    product: [t.productStep1, t.productStep2],
  };

  const preview = previewMap[type];
  const title = titleMap[type];
  const message = messageMap[type];
  const steps = stepsMap[type];

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

          {/* Title */}
          <Section style={titleSection}>
            <Heading style={heading}>{title}</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>{t.greeting(partnerName)}</Text>
            <Text style={paragraph}>{message}</Text>

            {/* Rejection Reason */}
            {rejectionReason && (
              <Section style={reasonBox}>
                <Text style={reasonBoxTitle}>{t.rejectionReasonLabel}</Text>
                <Text style={reasonBoxText}>{rejectionReason}</Text>
              </Section>
            )}

            {/* Next Steps */}
            <Section style={stepsSection}>
              <Text style={stepsTitle}>{t.whatNext}</Text>
              <Text style={stepItem}>1. {steps[0]}</Text>
              <Text style={stepItem}>2. {steps[1]}</Text>
            </Section>

            {/* CTA Button */}
            <Section style={buttonSection}>
              <Button style={button} href="https://partner.locarora.com">
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
                href="https://locarora.com/help"
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

PartnerRejectionEmail.PreviewProps = {
  type: "branch",
  partnerName: "로카로라 파트너",
  itemName: "인천공항 제1터미널점",
  rejectionReason:
    "사업자등록증 이미지가 불명확합니다. 선명한 이미지로 다시 업로드해 주세요.",
  locale: "ko",
} satisfies PartnerRejectionEmailProps;

export default PartnerRejectionEmail;

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

const reasonBox = {
  border: "2px solid #ef4444",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "0 0 24px",
};

const reasonBoxTitle = {
  color: "#18181b",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 8px",
};

const reasonBoxText = {
  color: "#3f3f46",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
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
