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

interface OptionItem {
  name: string;
  value?: string;
  price: number;
  quantity: number;
}

interface OptionPurchaseConfirmedEmailProps {
  customerName: string;
  reservationNumber: string;
  productName: string;
  options: OptionItem[];
  totalPrice: number;
  currency: string;
  locale: string;
  reservationUrl: string;
  partnerName?: string;
  partnerLogoUrl?: string;
}

const logoUrl =
  "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png";

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
    optionsInfo: string;
    optionName: string;
    optionQuantity: string;
    optionPrice: string;
    viewReservation: string;
    footer: string;
    support: string;
    contactSupport: string;
    poweredBy: string;
  }
> = {
  ko: {
    preview: "옵션 구매가 완료되었습니다",
    title: "옵션 구매 완료",
    greeting: (name) => `안녕하세요, ${name}님`,
    confirmedMessage:
      "옵션 구매가 완료되었습니다. 아래 구매 내역을 확인해 주세요.",
    reservationInfo: "주문 정보",
    reservationNo: "주문번호",
    product: "상품",
    totalAmount: "결제 금액",
    optionsInfo: "구매 옵션",
    optionName: "옵션",
    optionQuantity: "수량",
    optionPrice: "금액",
    viewReservation: "주문 상세 보기",
    footer: "본 이메일은 LOCARORA에서 자동 발송되었습니다.",
    support: "도움이 필요하시면",
    contactSupport: "고객센터",
    poweredBy: "Powered by LOCARORA",
  },
  en: {
    preview: "Your option purchase is complete",
    title: "Option Purchase Complete",
    greeting: (name) => `Hello, ${name}`,
    confirmedMessage:
      "Your option purchase is complete. Please review your order details below.",
    reservationInfo: "Order Details",
    reservationNo: "Order No.",
    product: "Product",
    totalAmount: "Total Amount",
    optionsInfo: "Purchased Options",
    optionName: "Option",
    optionQuantity: "Qty",
    optionPrice: "Price",
    viewReservation: "View Order",
    footer: "This email was automatically sent by LOCARORA.",
    support: "Need help?",
    contactSupport: "Contact Support",
    poweredBy: "Powered by LOCARORA",
  },
  ja: {
    preview: "オプション購入が完了しました",
    title: "オプション購入完了",
    greeting: (name) => `${name}様`,
    confirmedMessage:
      "オプションの購入が完了しました。以下のご購入内容をご確認ください。",
    reservationInfo: "注文情報",
    reservationNo: "注文番号",
    product: "商品",
    totalAmount: "お支払い金額",
    optionsInfo: "購入オプション",
    optionName: "オプション",
    optionQuantity: "数量",
    optionPrice: "金額",
    viewReservation: "注文を確認する",
    footer: "このメールはLOCARORAから自動送信されました。",
    support: "お困りの場合は",
    contactSupport: "サポート",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-TW": {
    preview: "選項購買已完成",
    title: "選項購買完成",
    greeting: (name) => `您好，${name}`,
    confirmedMessage:
      "選項購買已完成。請確認以下購買明細。",
    reservationInfo: "訂單資訊",
    reservationNo: "訂單編號",
    product: "商品",
    totalAmount: "付款金額",
    optionsInfo: "購買選項",
    optionName: "選項",
    optionQuantity: "數量",
    optionPrice: "金額",
    viewReservation: "查看訂單",
    footer: "此郵件由 LOCARORA 自動發送。",
    support: "需要幫助嗎？",
    contactSupport: "聯繫客服",
    poweredBy: "Powered by LOCARORA",
  },
  "zh-CN": {
    preview: "选项购买已完成",
    title: "选项购买完成",
    greeting: (name) => `您好，${name}`,
    confirmedMessage:
      "选项购买已完成。请确认以下购买明细。",
    reservationInfo: "订单信息",
    reservationNo: "订单编号",
    product: "商品",
    totalAmount: "付款金额",
    optionsInfo: "购买选项",
    optionName: "选项",
    optionQuantity: "数量",
    optionPrice: "金额",
    viewReservation: "查看订单",
    footer: "此邮件由 LOCARORA 自动发送。",
    support: "需要帮助吗？",
    contactSupport: "联系客服",
    poweredBy: "Powered by LOCARORA",
  },
};

export const OptionPurchaseConfirmedEmail = ({
  customerName,
  reservationNumber,
  productName,
  options,
  totalPrice,
  currency,
  locale = "ko",
  reservationUrl,
  partnerName,
  partnerLogoUrl,
}: OptionPurchaseConfirmedEmailProps) => {
  const t = translations[locale] || translations.ko;

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

            {/* Order Info */}
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

            {/* Options List */}
            <Section style={optionsSection}>
              <Text style={sectionTitle}>{t.optionsInfo}</Text>
              <Hr style={sectionDivider} />

              {options.map((option, index) => (
                <Row key={index} style={optionRow}>
                  <Column style={optionNameColumn}>
                    <Text style={optionNameText}>
                      {option.name}
                      {option.value && (
                        <span style={optionValueText}> ({option.value})</span>
                      )}
                    </Text>
                  </Column>
                  <Column style={optionQtyColumn}>
                    <Text style={optionQtyText}>x{option.quantity}</Text>
                  </Column>
                  <Column style={optionPriceColumn}>
                    <Text style={optionPriceText}>
                      {formatCurrency(option.price * option.quantity, currency)}
                    </Text>
                  </Column>
                </Row>
              ))}
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

OptionPurchaseConfirmedEmail.PreviewProps = {
  customerName: "홍길동",
  reservationNumber: "REV-20260409-A3F9",
  productName: "Galaxy S25 Ultra",
  options: [
    { name: "데이터 전송 서비스", value: undefined, price: 5000, quantity: 1 },
    { name: "연장 비용", value: "1일", price: 6800, quantity: 1 },
  ],
  totalPrice: 11800,
  currency: "KRW",
  locale: "ko",
  reservationUrl: "https://locarora.com/ko/reservations/abc123",
  partnerName: "ABC 렌탈",
  partnerLogoUrl: undefined,
} satisfies OptionPurchaseConfirmedEmailProps;

export default OptionPurchaseConfirmedEmail;

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

// Options section
const optionsSection = {
  margin: "0 0 24px",
};

const optionRow = {
  marginBottom: "12px",
  padding: "12px 16px",
  backgroundColor: "#fafafa",
  borderRadius: "8px",
  border: "1px solid #e4e4e7",
};

const optionNameColumn = {
  verticalAlign: "middle" as const,
};

const optionQtyColumn = {
  width: "50px",
  textAlign: "center" as const,
  verticalAlign: "middle" as const,
};

const optionPriceColumn = {
  width: "100px",
  textAlign: "right" as const,
  verticalAlign: "middle" as const,
};

const optionNameText = {
  color: "#18181b",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const optionValueText = {
  color: "#71717a",
  fontSize: "13px",
  fontWeight: "400" as const,
};

const optionQtyText = {
  color: "#71717a",
  fontSize: "13px",
  margin: "0",
};

const optionPriceText = {
  color: "#18181b",
  fontSize: "14px",
  fontWeight: "600",
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

const footerLogo = {
  margin: "0 auto 8px",
};

const poweredByText = {
  color: "#a1a1aa",
  fontSize: "11px",
  margin: "0 0 16px",
};

const footerText = {
  color: "#a1a1aa",
  fontSize: "13px",
  lineHeight: "1.6",
  margin: "0 0 8px",
};

const footerLink = {
  color: "#FF6600",
  textDecoration: "underline",
};

const copyright = {
  color: "#d4d4d8",
  fontSize: "12px",
  margin: "16px 0 0",
};
