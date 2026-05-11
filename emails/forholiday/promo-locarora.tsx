import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

export type Locale = "ko" | "ja" | "en";

export interface PromoLocaroraEmailProps {
  locale: Locale;
  customerName?: string;
  utmCampaign?: string;
  /**
   * Override default `utm_source` (default: "email"). Used by admin's
   * test-send feature to render a preview with any UTM combination from
   * the campaign_links table, not just email.
   */
  utmSource?: string;
  /**
   * Override default `utm_medium` (default: "promo_email").
   */
  utmMedium?: string;
}

const locaroraLogoUrl =
  "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png";

const forholidayLogoUrl =
  "https://ofpgmxsfmimhoizdnfqc.supabase.co/storage/v1/object/public/email-assets/forholiday.png";

const LOCARORA_URL_BY_LOCALE: Record<Locale, string> = {
  ko: "https://locarora.com/ko/promotions/busan",
  ja: "https://locarora.com/ja/promotions/busan",
  en: "https://locarora.com/en/promotions/busan",
};

// UTM tagging — lets analytics attribute sign-ups / clicks back to this campaign.
// `utmCampaign` / `utmSource` / `utmMedium` passed per-send so the same template
// can render with any UTM combination (e.g. admin test-send from Instagram link).
const DEFAULT_UTM_CAMPAIGN = "forholiday_bts2026";
const DEFAULT_UTM_SOURCE = "email";
const DEFAULT_UTM_MEDIUM = "promo_email";

function buildLocaroraUrl(
  locale: Locale,
  utmContent: string,
  utmCampaign: string,
  utmSource: string,
  utmMedium: string,
): string {
  const base = LOCARORA_URL_BY_LOCALE[locale];
  const params = new URLSearchParams({
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    utm_content: utmContent,
  });
  return `${base}?${params.toString()}`;
}

// ---- Coupon data ----
// Brand names sourced from Locarora `partners` table (per lang_code).
// Email recipient sees their localized partner name → builds trust + recognition.
interface Coupon {
  brand: Record<Locale, string>;
  logoUrl: string;
  accentColor: string;
  discount: Record<Locale, string>;
  description: Record<Locale, string>;
  code: string;
}

interface Partner {
  brand: Record<Locale, string>;
  logoUrl: string;
  description: Record<Locale, string>;
  tagLabel: Record<Locale, string>;
}

const coupons: Coupon[] = [
  {
    brand: {
      ko: "포할리데이",
      ja: "forholiday",
      en: "forholiday",
    },
    logoUrl:
      "https://ofpgmxsfmimhoizdnfqc.supabase.co/storage/v1/object/public/partner-images/26d65b9d-a95e-4841-94f0-ba6caed83e17/logo_1767751981429.png",
    accentColor: "#FF6600",
    discount: { ko: "₩5,000 OFF", ja: "₩5,000 OFF", en: "₩5,000 OFF" },
    description: {
      ko: "인천공항 + 부산공연장 수령·반납 5,000원 할인",
      ja: "仁川空港 + 釜山公演会場 受け取り・返却 5,000ウォン割引",
      en: "₩5,000 off at Incheon Airport + Busan Concert Venue pickup & return",
    },
    code: "FORHOLIDAY01",
  },
  {
    brand: {
      ko: "스냅렌탈",
      ja: "スナップレンタル",
      en: "Snap rental",
    },
    logoUrl:
      "https://ofpgmxsfmimhoizdnfqc.supabase.co/storage/v1/object/public/partner-images/5e4df413-fbc4-4b2c-88cf-20882a54e5b8/logo_1769492634376.jpg",
    accentColor: "#FF6600",
    discount: { ko: "₩5,000 OFF", ja: "₩5,000 OFF", en: "₩5,000 OFF" },
    description: {
      ko: "인천공항 + 부산공연장 수령·반납 5,000원 할인",
      ja: "仁川空港 + 釜山公演会場 受け取り・返却 5,000ウォン割引",
      en: "₩5,000 off at Incheon Airport + Busan Concert Venue pickup & return",
    },
    code: "R8Y3FDCN",
  },
  {
    brand: {
      ko: "로트박스",
      ja: "ロットボックス",
      en: "Lotbox",
    },
    logoUrl:
      "https://ofpgmxsfmimhoizdnfqc.supabase.co/storage/v1/object/public/partner-images/2be09325-0fb2-4bbc-972a-841a74f0e5e3/logo_1771470987612.png",
    accentColor: "#FF6600",
    discount: { ko: "10% OFF", ja: "10% OFF", en: "10% OFF" },
    description: {
      ko: "서울 + 부산공연장 수령·반납 전 제품 10% 할인",
      ja: "ソウル + 釜山公演会場 受け取り・返却、全商品10%割引",
      en: "10% off all products at Seoul + Busan Concert Venue pickup & return",
    },
    code: "LOTBOX10",
  },
];

const partners: Partner[] = [
  {
    brand: {
      ko: "NC대여",
      ja: "NCレンタル",
      en: "NC Rental",
    },
    logoUrl:
      "https://ofpgmxsfmimhoizdnfqc.supabase.co/storage/v1/object/public/partner-images/ea9c14ca-b50e-4a36-9404-7c7513396e94/logo_1769680863760.png",
    description: {
      ko: "일본 내 전국 택배로 수령·반납이 가능한 렌탈 서비스예요.",
      ja: "日本全国宅配で受け取り・返却ができるレンタルサービスです。",
      en: "A rental service available across Japan via nationwide delivery.",
    },
    tagLabel: {
      ko: "일본 전국 택배",
      ja: "日本全国宅配",
      en: "Japan nationwide",
    },
  },
  {
    brand: {
      ko: "주식회사 InterK",
      ja: "株式会社InterK",
      en: "InterK Co., Ltd.",
    },
    logoUrl:
      "https://ofpgmxsfmimhoizdnfqc.supabase.co/storage/v1/object/public/partner-images/1c662635-4215-43e0-84a5-d3b7a77329a5/logo_1769775684815.png",
    description: {
      ko: "일본 내 전국 택배로 수령·반납이 가능한 렌탈 서비스예요.",
      ja: "日本全国宅配で受け取り・返却ができるレンタルサービスです。",
      en: "A rental service available across Japan via nationwide delivery.",
    },
    tagLabel: {
      ko: "일본 전국 택배",
      ja: "日本全国宅配",
      en: "Japan nationwide",
    },
  },
];

// ---- Translations ----
const t: Record<
  Locale,
  {
    preview: string;
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    greeting: string;
    thanks: string;
    intro1: string;
    intro2: string;
    couponHeading: string;
    couponSubheading: string;
    couponCodeLabel: string;
    coverageLabel: string;
    partnerHeading: string;
    partnerSubheading: string;
    stepsHeading: string;
    step1: string;
    step2: string;
    step3: string;
    btsBadge: string;
    btsHeading: string;
    btsBody1: string;
    btsBody2: string;
    ctaHeadline: string;
    cta: string;
    closing: string;
    signOff: string;
    signature: string;
    footerNotice: string;
    unsubscribe: string;
  }
> = {
  ko: {
    preview:
      "포할리데이 × 로카로라 — BTS 부산 공연장 수령·반납 안내드립니다",
    heroBadge: "FORHOLIDAY × LOCARORA",
    heroTitle: "포할리데이 고객님께 안내드립니다",
    heroSubtitle: "로카로라 파트너십 + BTS 부산 공연장 수령·반납 안내",
    greeting: "안녕하세요, 포할리데이입니다.",
    thanks: "항상 포할리데이를 이용해주셔서 진심으로 감사드립니다.",
    intro1:
      "렌탈 플랫폼 로카로라와 제휴를 맺게 되어 소개해드리고 싶어서 연락드렸어요.\n로카로라는 여행·일상에서 유용한 여러 렌탈 업체들이 모여있는 플랫폼이에요.",
    intro2:
      "포할리데이 고객님께는 가입 즉시 바로 쓸 수 있는 쿠폰을 드리고 있으니, 한번 들러봐 주세요.",
    couponHeading: "쿠폰 안내",
    couponSubheading: "로카로라 가입 후 결제 시 쿠폰 코드를 입력하세요",
    couponCodeLabel: "COUPON CODE",
    coverageLabel: "COVERAGE",
    partnerHeading: "일본에서도 이용 가능해요",
    partnerSubheading: "일본 여행·거주 중이라면 아래 파트너도 둘러보세요",
    stepsHeading: "쿠폰 사용 방법",
    step1: "로카로라 가입하기",
    step2: "원하는 상품 선택",
    step3: "결제 시 쿠폰 코드 입력",
    btsBadge: "6월 12~13일",
    btsHeading: "BTS 부산 콘서트 오시나요?",
    btsBody1:
      "포할리데이·스냅렌탈·로트박스 모두 부산 공연장에서 수령·반납이 가능해요.",
    btsBody2: "지금 바로 예약 가능합니다.",
    ctaHeadline: "로카로라에서 자세히 확인해보세요",
    cta: "로카로라에서 자세히 보기",
    closing: "앞으로도 포할리데이와 로카로라 모두 잘 부탁드립니다.",
    signOff: "감사합니다,",
    signature: "포할리데이 드림",
    footerNotice:
      "앞으로 다양한 할인, 이벤트를 보내드릴 예정입니다. 수신을 원치 않으시면 아래의 수신거부를 클릭해주세요.",
    unsubscribe: "수신거부",
  },
  ja: {
    preview:
      "ForHoliday × Locarora — BTS釜山公演 受け取り・返却のご案内",
    heroBadge: "FORHOLIDAY × LOCARORA",
    heroTitle: "ForHolidayお客様へのご案内",
    heroSubtitle: "ロカロラとの提携、BTS釜山公演会場での受け取り・返却のご案内",
    greeting: "こんにちは、ForHolidayです。",
    thanks:
      "いつもForHolidayをご利用いただき、誠にありがとうございます。",
    intro1:
      "この度、レンタルプラットフォーム「ロカロラ」と提携を結ぶことになりましたので、ぜひご紹介させてください。\nロカロラは、旅行や日常で役立つさまざまなレンタル業者が集まったプラットフォームです。",
    intro2:
      "ForHolidayのお客様には、会員登録後すぐに使えるクーポンをご用意しています。ぜひ一度のぞいてみてください。",
    couponHeading: "クーポンのご案内",
    couponSubheading: "ロカロラ登録後、決済時にクーポンコードを入力してください",
    couponCodeLabel: "COUPON CODE",
    coverageLabel: "COVERAGE",
    partnerHeading: "日本でもご利用いただけます",
    partnerSubheading: "日本にご滞在の方は、以下のパートナーもご覧ください",
    stepsHeading: "クーポンの使い方",
    step1: "ロカロラに登録",
    step2: "ご希望の商品を選択",
    step3: "決済時にクーポンコード入力",
    btsBadge: "6月12~13日",
    btsHeading: "BTSの釜山コンサートに行かれますか？",
    btsBody1:
      "ForHoliday・SnapRental・Lotboxはすべて釜山公演会場での受け取り・返却に対応しています。",
    btsBody2:
      "現在、ご予約いただけます。",
    ctaHeadline: "ロカロラで詳細をご確認ください",
    cta: "ロカロラで詳細を見る",
    closing:
      "引き続き、ForHolidayとロカロラをよろしくお願いいたします。",
    signOff: "ありがとうございました、",
    signature: "ForHoliday より",
    footerNotice:
      "今後もさまざまな割引やイベント情報をお届けする予定です。受信を希望されない場合は、下記の配信停止をクリックしてください。",
    unsubscribe: "配信停止",
  },
  en: {
    preview:
      "ForHoliday × Locarora — Pickup and Return at the BTS Busan Venue",
    heroBadge: "FORHOLIDAY × LOCARORA",
    heroTitle: "A note for our ForHoliday customers",
    heroSubtitle: "Locarora partnership and BTS Busan venue pickup and return information",
    greeting: "Hello, this is ForHoliday.",
    thanks:
      "Thank you so much for always using ForHoliday — we truly appreciate your support.",
    intro1:
      "We're writing to share that we've partnered with LOCARORA, a rental platform.\nLocarora is where you can find a variety of useful rental services for travel and everyday life.",
    intro2:
      "As a ForHoliday customer, we have coupons ready for you to use right after signing up. Feel free to take a look.",
    couponHeading: "Coupon information",
    couponSubheading: "Enter the coupon code at checkout after signing up on Locarora",
    couponCodeLabel: "COUPON CODE",
    coverageLabel: "COVERAGE",
    partnerHeading: "Also available in Japan",
    partnerSubheading: "If you're traveling or living in Japan, check out these partners too",
    stepsHeading: "How to use",
    step1: "Sign up for Locarora",
    step2: "Pick the item you want",
    step3: "Apply the coupon code at checkout",
    btsBadge: "JUN 12~13",
    btsHeading: "Going to the BTS Busan Concert?",
    btsBody1:
      "ForHoliday, SnapRental, and Lotbox all offer pickup and return at the Busan concert venue.",
    btsBody2:
      "Pickup and return at the venue is available for booking now.",
    ctaHeadline: "See more on Locarora",
    cta: "View details on Locarora",
    closing:
      "We hope you continue to enjoy both ForHoliday and Locarora.",
    signOff: "Thank you,",
    signature: "From ForHoliday",
    footerNotice:
      "We plan to send you various discounts and events in the future. If you no longer wish to receive emails, please click the unsubscribe link below.",
    unsubscribe: "Unsubscribe",
  },
};

// ---- Coupon Card (simplified — informational layout, low promo signal) ----
const CouponTicket = ({
  coupon,
  locale,
  labels,
}: {
  coupon: Coupon;
  locale: Locale;
  labels: (typeof t)[Locale];
}) => {
  return (
    <Section style={cardWrap}>
      <Row>
        <Column style={{ width: "44px", verticalAlign: "middle" as const }}>
          <Img
            src={coupon.logoUrl}
            width="36"
            height="36"
            alt={coupon.brand[locale]}
            style={logoImg}
          />
        </Column>
        <Column style={{ paddingLeft: "10px", verticalAlign: "middle" as const }}>
          <Text style={brandName}>{coupon.brand[locale]}</Text>
          <Text style={brandSubtitle}>{coupon.discount[locale]}</Text>
        </Column>
      </Row>

      <Row style={{ marginTop: "12px" }}>
        <Column>
          <Text style={cardCodeLabel}>{labels.couponCodeLabel}</Text>
          <Text style={cardCodeValue}>{coupon.code}</Text>
        </Column>
      </Row>

      <Row style={{ marginTop: "8px" }}>
        <Column>
          <Text style={cardDescription}>{coupon.description[locale]}</Text>
        </Column>
      </Row>
    </Section>
  );
};

// ---- Partner Intro Card (non-coupon, just information) ----
const PartnerIntroCard = ({
  partner,
  locale,
}: {
  partner: Partner;
  locale: Locale;
}) => (
  <Section style={partnerCard}>
    <Row>
      <Column style={partnerLogoCell}>
        <Img
          src={partner.logoUrl}
          width="56"
          height="56"
          alt={partner.brand[locale]}
          style={partnerLogo}
        />
      </Column>
      <Column style={partnerTextCell}>
        <Row>
          <Column>
            <Text className="m-partner-brand" style={partnerBrand}>
              {partner.brand[locale]}
            </Text>
          </Column>
          <Column style={{ textAlign: "right" as const }}>
            <Text className="m-partner-tag" style={partnerTag}>
              {partner.tagLabel[locale]}
            </Text>
          </Column>
        </Row>
        <Text style={partnerDesc}>{partner.description[locale]}</Text>
      </Column>
    </Row>
  </Section>
);

export const PromoLocaroraEmail = ({
  locale,
  customerName,
  utmCampaign = DEFAULT_UTM_CAMPAIGN,
  utmSource = DEFAULT_UTM_SOURCE,
  utmMedium = DEFAULT_UTM_MEDIUM,
}: PromoLocaroraEmailProps) => {
  const tx = t[locale];
  const ctaHref = buildLocaroraUrl(
    locale,
    "cta_button",
    utmCampaign,
    utmSource,
    utmMedium,
  );
  const linkHref = buildLocaroraUrl(
    locale,
    "text_link",
    utmCampaign,
    utmSource,
    utmMedium,
  );

  return (
    <Html lang={locale}>
      <Head>
        <style>{`
          @media only screen and (max-width: 480px) {
            .m-hero-title { font-size: 20px !important; }
            .m-section-heading { font-size: 18px !important; }
            .m-paragraph { font-size: 13px !important; line-height: 1.6 !important; }
            .m-coupon-code { font-size: 20px !important; letter-spacing: 1px !important; }
            .m-stub-discount { font-size: 17px !important; }
            .m-partner-brand { font-size: 15px !important; }
            .m-partner-tag { font-size: 11px !important; }
            .m-bts-title { font-size: 15px !important; }
            .m-cta-headline { font-size: 14px !important; }
          }
        `}</style>
      </Head>
      <Preview>{tx.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Hero */}
          <Section style={hero}>
            <Img
              src={forholidayLogoUrl}
              width="140"
              height="29"
              alt="Forholiday"
              style={heroLogo}
            />
            <Text style={heroBadge}>{tx.heroBadge}</Text>
            <Heading className="m-hero-title" style={heroTitle}>
              {tx.heroTitle}
            </Heading>
            <Text style={heroSubtitle}>{tx.heroSubtitle}</Text>
          </Section>

          {/* Intro */}
          <Section style={content}>
            <Text className="m-paragraph" style={paragraph}>
              {customerName
                ? `${customerName}${locale === "ko" ? "님, " : locale === "ja" ? "様、" : ", "}${tx.greeting}`
                : tx.greeting}
            </Text>
            <Text className="m-paragraph" style={paragraph}>
              {tx.thanks}
            </Text>
            <Text className="m-paragraph" style={paragraph}>
              {tx.intro1}
            </Text>
            <Text className="m-paragraph" style={paragraph}>
              {tx.intro2}
            </Text>
          </Section>

          {/* Primary CTA — moved above coupon section so users can click
              early without scrolling. Bottom CTA removed (redundancy increases
              promo signal density). */}
          <Section style={ctaSection}>
            <Text className="m-cta-headline" style={ctaHeadline}>
              {tx.ctaHeadline}
            </Text>
            <Section style={buttonSection}>
              <Button style={button} href={ctaHref}>
                {tx.cta}
              </Button>
            </Section>
          </Section>

          {/* Coupon section heading */}
          <Section style={sectionHeadingWrap}>
            <Heading
              as="h2"
              className="m-section-heading"
              style={sectionHeading}
            >
              {tx.couponHeading}
            </Heading>
            <Text style={sectionSubheading}>{tx.couponSubheading}</Text>
          </Section>

          {/* Coupon tickets */}
          <Section style={couponListSection}>
            {coupons.map((coupon) => (
              <CouponTicket
                key={coupon.code}
                coupon={coupon}
                locale={locale}
                labels={tx}
              />
            ))}
          </Section>

          {/* Partner intros (Japan — no coupon) */}
          <Section style={partnerSectionHeadingWrap}>
            <Heading
              as="h3"
              className="m-section-heading"
              style={partnerSectionHeading}
            >
              {tx.partnerHeading}
            </Heading>
            <Text style={partnerSectionSubheading}>
              {tx.partnerSubheading}
            </Text>
          </Section>

          <Section style={partnerListSection}>
            {partners.map((partner) => (
              <PartnerIntroCard
                key={partner.brand.en}
                partner={partner}
                locale={locale}
              />
            ))}
          </Section>

          {/* Steps */}
          <Section style={stepsOuter}>
            <Section style={stepsSection}>
              <Text style={stepsHeading}>{tx.stepsHeading}</Text>
              <Row style={stepsRow}>
                <Column style={stepCell}>
                  <Text style={stepNumber}>1</Text>
                  <Text style={stepText}>{tx.step1}</Text>
                </Column>
                <Column style={stepCell}>
                  <Text style={stepNumber}>2</Text>
                  <Text style={stepText}>{tx.step2}</Text>
                </Column>
                <Column style={stepCell}>
                  <Text style={stepNumber}>3</Text>
                  <Text style={stepText}>{tx.step3}</Text>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* BTS Callout */}
          <Section style={btsSectionWrap}>
            <Section style={btsSection}>
              <Text style={btsBadge}>{tx.btsBadge}</Text>
              <Text className="m-bts-title" style={btsTitle}>
                🎤 {tx.btsHeading}
              </Text>
              <Text style={btsText}>{tx.btsBody1}</Text>
              <Text style={btsText}>{tx.btsBody2}</Text>
            </Section>
          </Section>

          {/* Closing — signature at the natural end of the email body */}
          <Section style={closingSection}>
            <Text className="m-paragraph" style={paragraph}>
              {tx.closing}
            </Text>
            <Text className="m-paragraph" style={paragraph}>
              {tx.signOff} {tx.signature}
            </Text>
            <Text style={ctaLinkText}>
              <Link href={linkHref} style={ctaLink}>
                locarora.com
              </Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Img
              src={locaroraLogoUrl}
              width="100"
              height="22"
              alt="LOCARORA"
              style={footerLogo}
            />
            <Text style={footerNotice}>{tx.footerNotice}</Text>
            <Text style={footerText}>
              {/*
                {{UNSUBSCRIBE_URL}} is a placeholder replaced per-recipient by
                the batch sender (HMAC-signed token URL). If sender doesn't
                replace it, falls back to mailto via post-render rewrite.
              */}
              <Link href="{{UNSUBSCRIBE_URL}}" style={unsubscribeLink}>
                {tx.unsubscribe}
              </Link>
            </Text>
            <Text style={copyright}>© 2026 LOCARORA. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default PromoLocaroraEmail;

PromoLocaroraEmail.PreviewProps = {
  locale: "ko",
  customerName: "홍길동",
} satisfies PromoLocaroraEmailProps;

// ---- Styles ----
const main = {
  backgroundColor: "#f4f4f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Apple SD Gothic Neo", "Hiragino Sans", Ubuntu, sans-serif',
  padding: "40px 0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "600px",
  borderRadius: "16px",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
  overflow: "hidden",
};

// ---- Hero (Tier 3: removed gradient, white background, subdued tone) ----
const hero = {
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e4e4e7",
  padding: "32px 40px 24px",
  textAlign: "left" as const,
};

const heroLogo = {
  display: "block",
  margin: "0 0 14px",
  height: "auto",
  maxWidth: "140px",
};

const heroBadge = {
  color: "#71717a",
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: "1.5px",
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
};

const heroTitle = {
  color: "#18181b",
  fontSize: "22px",
  fontWeight: "700",
  lineHeight: "1.35",
  margin: "0 0 6px",
  letterSpacing: "-0.3px",
};

const heroSubtitle = {
  color: "#52525b",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "1.55",
  margin: "0",
};

const content = {
  padding: "32px 40px 8px",
};

const paragraph = {
  color: "#3f3f46",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0 0 12px",
  whiteSpace: "pre-line" as const,
};

// ---- Section heading ----
const sectionHeadingWrap = {
  padding: "24px 40px 16px",
  textAlign: "center" as const,
};

const sectionHeading = {
  color: "#18181b",
  fontSize: "22px",
  fontWeight: "800",
  margin: "0 0 6px",
  letterSpacing: "-0.3px",
};

const sectionSubheading = {
  color: "#71717a",
  fontSize: "13px",
  margin: "0",
};

// ---- Coupon ticket ----
const couponListSection = {
  padding: "0 16px 16px",
};

const ticketWrap = {
  backgroundColor: "#ffffff",
  border: "1px solid #e4e4e7",
  borderRadius: "14px",
  overflow: "hidden",
  margin: "0 0 16px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
};

// ---- Simplified card (Tier 3) ----
const cardWrap = {
  backgroundColor: "#ffffff",
  border: "1px solid #e4e4e7",
  borderRadius: "10px",
  padding: "16px 16px 14px",
  margin: "0 0 12px",
};

const brandSubtitle = {
  color: "#71717a",
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
  letterSpacing: "0.1px",
};

const cardCodeLabel = {
  color: "#a1a1aa",
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
  margin: "0 0 2px",
};

const cardCodeValue = {
  color: "#18181b",
  fontSize: "16px",
  fontWeight: "700",
  fontFamily: '"SF Mono", "Monaco", "Menlo", monospace',
  letterSpacing: "1px",
  margin: "0",
  lineHeight: "1.2",
};

const cardDescription = {
  color: "#52525b",
  fontSize: "12px",
  fontWeight: "400",
  lineHeight: "1.5",
  margin: "0",
};

const topStrip = {
  padding: "9px 0",
};

const topStripText = {
  color: "#ffffff",
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "3px",
  margin: "0",
  textTransform: "uppercase" as const,
};

// ---- Left (main) ----
const leftCol = {
  verticalAlign: "top" as const,
  padding: "18px 18px 16px",
  width: "72%",
};

const logoImg = {
  borderRadius: "8px",
  border: "1px solid #e4e4e7",
  backgroundColor: "#ffffff",
  display: "block",
  objectFit: "contain" as const,
};

const brandName = {
  color: "#18181b",
  fontSize: "15px",
  fontWeight: "800",
  lineHeight: "1.2",
  margin: "0 0 2px",
  letterSpacing: "-0.2px",
};

const brandTagline = {
  color: "#a1a1aa",
  fontSize: "9px",
  fontWeight: "700",
  letterSpacing: "2px",
  margin: "0",
  textTransform: "uppercase" as const,
};

const discountPill = {
  display: "inline-block",
  border: "1.5px solid",
  borderRadius: "999px",
  padding: "4px 10px",
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "0.3px",
  margin: "0",
  lineHeight: "1.2",
  textAlign: "center" as const,
};

// Hero code box
const codeHeroBox = {
  border: "2px dashed",
  borderRadius: "10px",
  padding: "18px 14px",
  textAlign: "center" as const,
  margin: "0 0 12px",
  backgroundColor: "#fafafa",
};

const codeHeroLabel = {
  color: "#71717a",
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  margin: "0 0 8px",
};

const codeHeroValue = {
  fontSize: "26px",
  fontWeight: "900",
  fontFamily: '"SF Mono", "Monaco", "Menlo", monospace',
  letterSpacing: "2px",
  margin: "0",
  lineHeight: "1.1",
  wordBreak: "break-all" as const,
  textAlign: "center" as const,
};

const descriptionText = {
  color: "#52525b",
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "1.5",
  margin: "0",
  textAlign: "center" as const,
};

// ---- Perforation ----
const perfCol = {
  width: "1px",
  verticalAlign: "middle" as const,
  padding: "8px 0",
  textAlign: "center" as const,
};

const perfText = {
  color: "#d4d4d8",
  fontSize: "10px",
  fontFamily: "monospace",
  lineHeight: "1.5",
  margin: "0",
};

// ---- Right (stub) ----
const stubCol = {
  verticalAlign: "middle" as const,
  padding: "18px 12px",
  width: "27%",
  backgroundColor: "#fafafa",
  textAlign: "center" as const,
};

const stubDiscount = {
  fontSize: "22px",
  fontWeight: "900",
  fontFamily: '"SF Mono", "Monaco", "Menlo", monospace',
  textAlign: "center" as const,
  margin: "0",
  lineHeight: "1.1",
  letterSpacing: "-0.5px",
};

const stubBrandWrap = {
  borderTop: "1px dashed #d4d4d8",
  marginTop: "12px",
  paddingTop: "10px",
};

const stubBrand = {
  color: "#52525b",
  fontSize: "11px",
  fontWeight: "700",
  textAlign: "center" as const,
  margin: "0",
  letterSpacing: "0.3px",
};

// ---- Partner intro section ----
const partnerSectionHeadingWrap = {
  padding: "16px 40px 12px",
  textAlign: "center" as const,
};

const partnerSectionHeading = {
  color: "#18181b",
  fontSize: "17px",
  fontWeight: "700",
  margin: "0 0 4px",
  letterSpacing: "-0.2px",
};

const partnerSectionSubheading = {
  color: "#71717a",
  fontSize: "12px",
  margin: "0",
};

const partnerListSection = {
  padding: "0 20px 8px",
};

const partnerCard = {
  backgroundColor: "#f4f4f5",
  borderRadius: "10px",
  padding: "14px 16px",
  margin: "0 0 10px",
};

const partnerLogoCell = {
  width: "64px",
  verticalAlign: "middle" as const,
};

const partnerLogo = {
  borderRadius: "10px",
  border: "1px solid #e4e4e7",
  backgroundColor: "#ffffff",
  display: "block",
  objectFit: "contain" as const,
};

const partnerTextCell = {
  verticalAlign: "middle" as const,
  paddingLeft: "14px",
};

const partnerBrand = {
  color: "#18181b",
  fontSize: "18px",
  fontWeight: "800",
  margin: "0",
  letterSpacing: "-0.3px",
  lineHeight: "1.3",
};

const partnerTag = {
  display: "inline-block",
  backgroundColor: "#ffffff",
  border: "1px solid #e4e4e7",
  borderRadius: "999px",
  color: "#3f3f46",
  fontSize: "12px",
  fontWeight: "700",
  padding: "5px 12px",
  margin: "0",
  whiteSpace: "nowrap" as const,
};

const partnerDesc = {
  color: "#52525b",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "6px 0 0",
};

// ---- Steps ----
const stepsOuter = {
  padding: "16px 20px 24px",
};

const stepsSection = {
  padding: "20px 12px 24px",
  backgroundColor: "#fafafa",
  borderRadius: "12px",
};

const stepsHeading = {
  color: "#18181b",
  fontSize: "13px",
  fontWeight: "700",
  textAlign: "center" as const,
  margin: "0 0 16px",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
};

const stepsRow = {
  width: "100%",
  tableLayout: "fixed" as const,
};

const stepCell = {
  textAlign: "center" as const,
  verticalAlign: "top" as const,
  padding: "0 4px",
  width: "33.33%",
};

const stepNumber = {
  display: "inline-block",
  width: "32px",
  height: "32px",
  lineHeight: "32px",
  backgroundColor: "#FF6600",
  color: "#ffffff",
  borderRadius: "50%",
  fontSize: "14px",
  fontWeight: "800",
  margin: "0 auto 8px",
  textAlign: "center" as const,
};

const stepText = {
  color: "#3f3f46",
  fontSize: "12px",
  fontWeight: "600",
  lineHeight: "1.4",
  margin: "0",
};

// ---- BTS ----
const btsSectionWrap = {
  padding: "0 20px 24px",
};

const btsSection = {
  backgroundColor: "#fafafa",
  border: "1px solid #e4e4e7",
  borderRadius: "10px",
  padding: "16px 18px",
};

const btsBadge = {
  display: "inline-block",
  color: "#71717a",
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: "0.5px",
  margin: "0 0 6px",
};

const btsTitle = {
  color: "#18181b",
  fontSize: "16px",
  fontWeight: "700",
  lineHeight: "1.35",
  margin: "0 0 8px",
};

const btsText = {
  color: "#52525b",
  fontSize: "13px",
  lineHeight: "1.6",
  margin: "0 0 4px",
};

// ---- CTA ----
const ctaSection = {
  padding: "8px 40px 36px",
  textAlign: "center" as const,
};

const ctaHeadline = {
  color: "#18181b",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 16px",
};

const buttonSection = {
  textAlign: "center" as const,
};

const button = {
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 28px",
  borderRadius: "8px",
  backgroundColor: "#18181b",
};

const ctaLinkText = {
  textAlign: "center" as const,
  margin: "10px 0 0",
  fontSize: "13px",
};

const ctaLink = {
  color: "#0066cc",
  textDecoration: "underline",
};

// ---- Closing ----
const closingSection = {
  padding: "8px 40px 16px",
};

// ---- Footer ----
const footer = {
  padding: "24px 40px 32px",
  textAlign: "center" as const,
};

const footerLogo = {
  margin: "0 auto 8px",
  opacity: 0.6,
};

const footerNotice = {
  color: "#71717a",
  fontSize: "12px",
  lineHeight: "1.6",
  margin: "8px 0",
};

const footerText = {
  color: "#a1a1aa",
  fontSize: "12px",
  margin: "4px 0",
};

const unsubscribeLink = {
  color: "#71717a",
  textDecoration: "underline",
};

const copyright = {
  color: "#d4d4d8",
  fontSize: "12px",
  marginTop: "12px",
};
