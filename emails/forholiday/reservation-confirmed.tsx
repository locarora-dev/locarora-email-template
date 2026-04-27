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

interface ForholidayReservationConfirmedEmailProps {
  customerName: string;
}

const logoUrl =
  "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png";

const USER_GUIDE_URL =
  "https://www.notion.so/USER-GUIDE-feff9a5d2cae4f5a8bfd2119bdc94a90?pvs=21";
const STAFF_CALL_URL =
  "https://forholiday.vercel.app/arrival-checkin?lang=en";
const LOCARORA_URL = "https://locarora.com/en";
const COUPON_CODE = "FORHOLIDAY01";

export const ForholidayReservationConfirmedEmail = ({
  customerName,
}: ForholidayReservationConfirmedEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your reservation has been confirmed - Forholiday</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerSection}>
            <Text style={brandName}>Forholiday</Text>
          </Section>

          <Hr style={divider} />

          {/* Title */}
          <Section style={titleSection}>
            <Text style={confirmIcon}>✓</Text>
            <Heading style={heading}>Reservation Confirmed</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={paragraph}>
              Hello, Forholiday here.
            </Text>
            <Text style={paragraph}>
              Your reservation has been confirmed. Thank you for choosing us 😊
            </Text>

            {/* Important Notice */}
            <Section style={noticeSection}>
              <Text style={noticeTitle}>
                📋 Please read before your visit !!!
              </Text>

              <Text style={noticeText}>
                Please check the user guide at the link below.
              </Text>
              <Section style={buttonSection}>
                <Button style={outlineButton} href={USER_GUIDE_URL}>
                  👉 User Guide
                </Button>
              </Section>

              <Text style={noticeText}>
                After arriving at the location, please call a staff member using the link below. (Same for pickup & return)
              </Text>
              <Section style={buttonSection}>
                <Button style={outlineButton} href={STAFF_CALL_URL}>
                  👉 Call Staff
                </Button>
              </Section>
            </Section>

            {/* Time Change Notice */}
            <Section style={timeNoticeSection}>
              <Text style={timeNoticeTitle}>⏰ Time Change Notice</Text>
              <Text style={timeNoticeText}>
                Arriving slightly early or late is perfectly fine.
              </Text>
              <Text style={timeNoticeText}>
                However, if you need to change between AM ↔ PM, please contact us in advance.
              </Text>
            </Section>

            {/* CS Contact */}
            <Text style={paragraph}>
              If you have any questions, feel free to contact us anytime.{"\n"}
              Thank you 🙏
            </Text>

            <Section style={contactSection}>
              <Text style={contactText}>
                <strong>LINE</strong> : @558hovam
              </Text>
              <Text style={contactText}>
                <strong>WhatsApp</strong> : +82 10 7582 4470
              </Text>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Promo Section */}
          <Section style={promoSection}>
            <Text style={promoHeading}>LOCARORA X FORHOLIDAY</Text>
            <Text style={promoText}>
              Book through LOCARORA next time and get ₩5,000 off!
            </Text>

            {/* Coupon Ticket */}
            <Section style={couponTicket}>
              <Text style={couponLabel}>✂ DISCOUNT COUPON</Text>
              <Text style={couponCode}>{COUPON_CODE}</Text>
              <Text style={couponHint}>Enter this code at checkout</Text>
            </Section>

            <Section style={buttonSection}>
              <Button style={button} href={LOCARORA_URL}>
                Visit LOCARORA
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
            <Text style={footerText}>
              This email was sent by Forholiday via LOCARORA.
            </Text>
            <Text style={copyright}>© 2025 LOCARORA. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ForholidayReservationConfirmedEmail.PreviewProps = {
  customerName: "John Doe",
} satisfies ForholidayReservationConfirmedEmailProps;

export default ForholidayReservationConfirmedEmail;

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

const headerSection = {
  padding: "32px 40px 24px",
  textAlign: "center" as const,
};

const brandName = {
  color: "#18181b",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0",
};

const divider = {
  borderColor: "#e4e4e7",
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

const paragraph = {
  color: "#3f3f46",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px",
  whiteSpace: "pre-line" as const,
};

// Important Notice
const noticeSection = {
  backgroundColor: "#fff7ed",
  border: "1px solid #fed7aa",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "0 0 20px",
};

const noticeTitle = {
  color: "#18181b",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 16px",
};

const noticeText = {
  color: "#3f3f46",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 8px",
};

const outlineButton = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  border: "1px solid #FF6600",
  color: "#FF6600",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "10px 24px",
  margin: "0 0 16px",
};

// Time Change Notice
const timeNoticeSection = {
  backgroundColor: "#fefce8",
  border: "1px solid #fde68a",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "0 0 20px",
};

const timeNoticeTitle = {
  color: "#18181b",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 12px",
};

const timeNoticeText = {
  color: "#3f3f46",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 4px",
};

// Contact
const contactSection = {
  backgroundColor: "#fafafa",
  borderRadius: "8px",
  padding: "16px 20px",
  margin: "0 0 8px",
};

const contactText = {
  color: "#3f3f46",
  fontSize: "14px",
  margin: "0 0 4px",
};

// Promo
const promoSection = {
  padding: "24px 40px",
  textAlign: "center" as const,
  backgroundColor: "#fafafa",
};

const promoHeading = {
  color: "#18181b",
  fontSize: "18px",
  fontWeight: "700",
  margin: "0 0 12px",
  letterSpacing: "1px",
};

const promoText = {
  color: "#3f3f46",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const couponTicket = {
  border: "2px dashed #FF6600",
  borderRadius: "12px",
  backgroundColor: "#fff7ed",
  padding: "20px 24px",
  margin: "0 auto 20px",
  textAlign: "center" as const,
  maxWidth: "320px",
};

const couponLabel = {
  color: "#FF6600",
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  margin: "0 0 8px",
};

const couponCode = {
  color: "#18181b",
  fontSize: "24px",
  fontWeight: "800",
  fontFamily: "monospace",
  letterSpacing: "3px",
  margin: "0 0 8px",
};

const couponHint = {
  color: "#a1a1aa",
  fontSize: "12px",
  margin: "0",
};

const buttonSection = {
  textAlign: "center" as const,
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
  opacity: 0.6,
};

const footerText = {
  color: "#a1a1aa",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0 0 4px",
};

const copyright = {
  color: "#d4d4d8",
  fontSize: "12px",
  marginTop: "16px",
};
