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
} from '@react-email/components';

interface ConfirmSignupEmailProps {
  confirmationUrl: string;
  userName?: string;
}

// Supabase Storage에 호스팅된 이미지 URL
const logoUrl = 'https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png';

export const ConfirmSignupEmail = ({
  confirmationUrl,
  userName = 'there',
}: ConfirmSignupEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Please verify your email address</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* 로고 */}
          <Section style={logoSection}>
            <Img
              src={logoUrl}
              width="180"
              height="40"
              alt="Locarora"
              style={logo}
            />
          </Section>

          <Hr style={divider} />

          {/* 메인 컨텐츠 */}
          <Section style={content}>
            <Heading style={heading}>
              Welcome, {userName}!
            </Heading>

            <Text style={paragraph}>
              Thank you for signing up for Locarora.
            </Text>

            <Text style={paragraph}>
              Please click the button below to verify your email address.
              Once verified, you'll have full access to all our services.
            </Text>

            {/* 버튼 */}
            <Section style={buttonSection}>
              <Button style={button} href={confirmationUrl}>
                Verify Email
              </Button>
            </Section>

            <Text style={subText}>
              If the button doesn't work, copy and paste this link into your browser:
            </Text>

            <Text style={linkText}>
              <Link href={confirmationUrl} style={link}>
                {confirmationUrl}
              </Link>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* 푸터 */}
          <Section style={footer}>
            <Text style={footerText}>
              This is an automated message. Please do not reply.
            </Text>
            <Text style={footerText}>
              Need help?{' '}
              <Link href="https://locarora.com/support" style={footerLink}>
                Contact Support
              </Link>
            </Text>
            <Text style={copyright}>
              © 2025 Locarora. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ConfirmSignupEmail.PreviewProps = {
  // Supabase 템플릿 변수 - Dashboard에 복사할 때 이 값들이 사용됨
  // {{ .ConfirmationURL }} - 인증 링크
  // {{ .Email }} - 사용자 이메일
  confirmationUrl: '{{ .ConfirmationURL }}',
  userName: '{{ .Email }}',
} satisfies ConfirmSignupEmailProps;

export default ConfirmSignupEmail;

// 스타일
const main = {
  backgroundColor: '#f4f4f5',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  maxWidth: '560px',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',
};

const logoSection = {
  padding: '32px 40px 24px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const divider = {
  borderColor: '#e4e4e7',
  margin: '0',
};

const content = {
  padding: '32px 40px',
};

const heading = {
  color: '#18181b',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.4',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const paragraph = {
  color: '#3f3f46',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const buttonSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#FF6600',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
  boxShadow: '0 2px 4px rgba(255, 102, 0, 0.2)',
};

const subText = {
  color: '#71717a',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '24px 0 8px',
};

const linkText = {
  margin: '0',
  wordBreak: 'break-all' as const,
};

const link = {
  color: '#FF6600',
  fontSize: '13px',
  textDecoration: 'underline',
};

const footer = {
  padding: '24px 40px 32px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#a1a1aa',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '0 0 4px',
};

const footerLink = {
  color: '#71717a',
  textDecoration: 'underline',
};

const copyright = {
  color: '#d4d4d8',
  fontSize: '12px',
  marginTop: '16px',
};
