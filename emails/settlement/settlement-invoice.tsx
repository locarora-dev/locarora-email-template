import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export interface SettlementInvoiceEmailProps {
  partnerName: string;
  invoiceNumber?: string;
  periodStart: string;
  periodEnd: string;
  netAmount: string;
  currency: string;
  settlementUrl?: string;
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

function formatCurrencyEmail(amount: string, currency: string): string {
  const num = Number(amount);
  if (currency === "KRW") return `${num.toLocaleString("ko-KR")}원`;
  if (currency === "JPY") return `¥${num.toLocaleString("ja-JP")}`;
  if (currency === "USD") return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  return `${num.toLocaleString()} ${currency}`;
}

const translations: Record<
  string,
  {
    preview: string;
    title: string;
    greeting: (name: string) => string;
    message: string;
    invoiceNo: string;
    period: string;
    amount: string;
    viewDetail: string;
    footer: string;
    attachment: string;
    poweredBy: string;
  }
> = {
  ko: {
    preview: "정산 명세서가 발행되었습니다",
    title: "정산 명세서",
    greeting: (name) => `${name}님,`,
    message:
      "정산이 확정되어 명세서를 발행합니다. 아래 내용을 확인해 주세요.",
    invoiceNo: "명세서 번호",
    period: "정산 기간",
    amount: "정산 금액",
    viewDetail: "파트너 정산 페이지에서 확인",
    footer: "본 메일은 LOCARORA 플랫폼에서 자동으로 발송되었습니다.",
    attachment: "PDF 명세서가 첨부되어 있습니다.",
    poweredBy: "Powered by LOCARORA",
  },
  en: {
    preview: "Your settlement statement has been issued",
    title: "Settlement Statement",
    greeting: (name) => `Dear ${name},`,
    message:
      "Your settlement has been confirmed and the statement has been issued. Please review the details below.",
    invoiceNo: "Invoice No.",
    period: "Settlement Period",
    amount: "Net Amount",
    viewDetail: "View in Partner Settlements",
    footer: "This email was automatically sent from the LOCARORA platform.",
    attachment: "PDF statement is attached.",
    poweredBy: "Powered by LOCARORA",
  },
  ja: {
    preview: "精算明細書が発行されました",
    title: "精算明細書",
    greeting: (name) => `${name}様`,
    message:
      "精算が確定し、明細書を発行いたしました。以下の内容をご確認ください。",
    invoiceNo: "明細書番号",
    period: "精算期間",
    amount: "精算額",
    viewDetail: "パートナー精算ページで確認",
    footer: "このメールはLOCARORAプラットフォームから自動送信されました。",
    attachment: "PDF明細書が添付されています。",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-CN": {
    preview: "结算明细已发布",
    title: "结算明细",
    greeting: (name) => `${name}，您好`,
    message: "结算已确认，明细已发布。请查看以下详情。",
    invoiceNo: "明细编号",
    period: "结算期间",
    amount: "结算金额",
    viewDetail: "在合作伙伴结算页面查看",
    footer: "此邮件由LOCARORA平台自动发送。",
    attachment: "PDF明细已附上。",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-TW": {
    preview: "結算明細已發布",
    title: "結算明細",
    greeting: (name) => `${name}，您好`,
    message: "結算已確認，明細已發布。請查看以下詳情。",
    invoiceNo: "明細編號",
    period: "結算期間",
    amount: "結算金額",
    viewDetail: "在合作夥伴結算頁面查看",
    footer: "此郵件由LOCARORA平台自動發送。",
    attachment: "PDF明細已附上。",
    poweredBy: "Powered by LOCARORA",
  },
};

function getT(locale: string) {
  return translations[locale] || translations.ko;
}

export default function SettlementInvoiceEmail({
  partnerName = "파트너",
  periodStart = "2026-04-01",
  periodEnd = "2026-04-30",
  netAmount = "1000000",
  currency = "KRW",
  settlementUrl,
  locale = "ko",
}: SettlementInvoiceEmailProps) {
  const t = getT(locale);
  const ctaHref =
    settlementUrl || "https://partner.locarora.com/partner/settlements";

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img src={logoUrl} width="140" height="auto" alt="LOCARORA" />
          </Section>

          <Hr style={hr} />

          {/* Title */}
          <Heading style={heading}>{t.title}</Heading>

          {/* Greeting */}
          <Text style={text}>{t.greeting(partnerName)}</Text>
          <Text style={text}>{t.message}</Text>

          {/* Info Box */}
          <Section style={infoBoxWrapper}>
            <Section style={infoBox}>
              <Text style={infoLabel}>{t.period}</Text>
              <Text style={infoValue}>
                {formatDate(periodStart, locale)} ~{" "}
                {formatDate(periodEnd, locale)}
              </Text>

              <Text style={infoLabel}>{t.amount}</Text>
              <Text style={amountValue}>
                {formatCurrencyEmail(netAmount, currency)}
              </Text>
            </Section>
          </Section>

          <Text style={attachmentText}>{t.attachment}</Text>

          {/* CTA */}
          <Section style={ctaSection}>
            <Button style={ctaButton} href={ctaHref}>
              {t.viewDetail}
            </Button>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Text style={footer}>{t.footer}</Text>
          <Text style={poweredBy}>{t.poweredBy}</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "580px",
};

const logoSection = {
  padding: "20px 30px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const heading = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "bold" as const,
  padding: "0 30px",
  margin: "0 0 16px",
};

const text = {
  color: "#525f7f",
  fontSize: "14px",
  lineHeight: "24px",
  padding: "0 30px",
};

const infoBoxWrapper = {
  padding: "0 30px",
};

const infoBox = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "20px 24px",
  margin: "16px 0 0",
};

const infoLabel = {
  color: "#8898aa",
  fontSize: "12px",
  fontWeight: "600" as const,
  textTransform: "uppercase" as const,
  margin: "0 0 4px",
};

const infoValue = {
  color: "#1a1a1a",
  fontSize: "15px",
  fontWeight: "500" as const,
  margin: "0 0 16px",
};

const amountValue = {
  color: "#1a1a1a",
  fontSize: "22px",
  fontWeight: "bold" as const,
  margin: "0",
};

const attachmentText = {
  color: "#8898aa",
  fontSize: "13px",
  fontStyle: "italic" as const,
  padding: "0 30px",
  margin: "8px 0 0",
};

const ctaSection = {
  padding: "16px 30px 0",
};

const ctaButton = {
  backgroundColor: "#f97316",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "600" as const,
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 20px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 30px",
  textAlign: "center" as const,
};

const poweredBy = {
  color: "#c0c0c0",
  fontSize: "11px",
  padding: "0 30px",
  textAlign: "center" as const,
};
