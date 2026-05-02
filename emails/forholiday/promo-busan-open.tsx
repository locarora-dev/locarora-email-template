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

export type Locale = "ko" | "ja" | "en" | "zh-TW" | "zh-CN";

export interface PromoBusanOpenEmailProps {
  locale: Locale;
  utmCampaign?: string;
  utmSource?: string;
  utmMedium?: string;
}

const PRODUCT_ID = "d8efa43f-7ff7-4998-a238-5cc57e4ed366";

const locaroraLogoUrl =
  "https://eafmpgmhtlhqvdpjucgb.supabase.co/storage/v1/object/public/email-assets/locarora.png";

const forholidayLogoUrl =
  "https://ofpgmxsfmimhoizdnfqc.supabase.co/storage/v1/object/public/partner-images/26d65b9d-a95e-4841-94f0-ba6caed83e17/logo_1767751981429.png";

const DEFAULT_UTM_CAMPAIGN = "busan_open_2026";
const DEFAULT_UTM_SOURCE = "email";
const DEFAULT_UTM_MEDIUM = "promo_email";

function buildProductUrl(
  locale: Locale,
  utmContent: string,
  utmCampaign: string,
  utmSource: string,
  utmMedium: string,
): string {
  const params = new URLSearchParams({
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    utm_content: utmContent,
  });
  return `https://locarora.com/${locale}/products/${PRODUCT_ID}?${params.toString()}`;
}

const couponDiscount: Record<Locale, string> = {
  ko: "₩5,000 OFF",
  ja: "₩5,000 OFF",
  en: "₩5,000 OFF",
  "zh-TW": "₩5,000 OFF",
  "zh-CN": "₩5,000 OFF",
};

const couponDescription: Record<Locale, string> = {
  ko: "인천공항 + 부산공연장 수령·반납 ₩5,000 할인",
  ja: "仁川空港 + 釜山公演会場 受け取り・返却 ₩5,000割引",
  en: "₩5,000 off at Incheon Airport + Busan Concert Venue pickup & return",
  "zh-TW": "仁川機場 + 釜山演唱會場 取貨・歸還 ₩5,000折扣",
  "zh-CN": "仁川机场 + 釜山演唱会场 取货·归还 ₩5,000折扣",
};

const couponBrand: Record<Locale, string> = {
  ko: "포할리데이",
  ja: "forholiday",
  en: "forholiday",
  "zh-TW": "forholiday",
  "zh-CN": "forholiday",
};

const COUPON_CODE = "FORHOLIDAY01";
const COUPON_ACCENT = "#FF6600";

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
    productHeading: string;
    productSubheading: string;
    productBadge: string;
    productName: string;
    productDesc: string;
    productHighlight1: string;
    productHighlight2: string;
    productHighlight3: string;
    ctaHeadline: string;
    cta: string;
    couponHeading: string;
    couponSubheading: string;
    couponCodeLabel: string;
    couponHowTo: string;
    closing: string;
    signOff: string;
    signature: string;
    footerNotice: string;
    unsubscribe: string;
  }
> = {
  ko: {
    preview:
      "부산이 열렸습니다 — BTS 콘서트 갤럭시 울트라 대여, 지금 바로 예약 가능",
    heroBadge: "NOW OPEN · BUSAN",
    heroTitle: "부산이 열렸습니다",
    heroSubtitle: "지금 바로 예약하실 수 있어요",
    greeting: "안녕하세요, 로카로라입니다.",
    thanks: "부산 오픈을 기다려주셔서 진심으로 감사드려요.",
    intro1:
      "드디어 부산 지점이 정식 오픈했습니다.\n사전 등록해 주신 분들께 가장 먼저 소식 전합니다.",
    intro2:
      "특히 6월 BTS 부산 콘서트에 가시는 분들을 위해, 공연장에서 바로 수령·반납 가능한 갤럭시 울트라 대여 상품을 준비했어요.",
    productHeading: "🎤 콘서트 추천 상품",
    productSubheading: "공연장에서 수령하고 공연장에서 반납하세요",
    productBadge: "BTS 부산 · 6월 12~13일",
    productName: "Galaxy S Ultra",
    productDesc: "부산 BTS 콘서트 — 공연장 수령·반납 가능",
    productHighlight1: "✓ 부산 공연장 직접 수령·반납",
    productHighlight2: "✓ BTS 콘서트(6/12~13) 일정 최적",
    productHighlight3: "✓ 갤럭시 S 울트라 최신 모델",
    ctaHeadline: "지금 바로 예약하세요",
    cta: "상품 보러가기",
    couponHeading: "🎫 포할리데이 ₩5,000 할인 쿠폰",
    couponSubheading: "결제 시 아래 쿠폰 코드를 입력하세요",
    couponCodeLabel: "COUPON CODE",
    couponHowTo: "로카로라 결제 페이지에서 위 코드를 입력하면 자동 할인됩니다.",
    closing: "부산에서 즐거운 시간 보내시길 바랍니다 😊",
    signOff: "감사합니다,",
    signature: "로카로라 드림",
    footerNotice:
      "앞으로 다양한 할인, 이벤트를 보내드릴 예정입니다. 수신을 원치 않으시면 아래의 수신거부를 클릭해주세요.",
    unsubscribe: "수신거부",
  },
  ja: {
    preview:
      "釜山、ついにオープン — BTS釜山コンサート向け Galaxy Ultraレンタル、今すぐ予約可能",
    heroBadge: "NOW OPEN · BUSAN",
    heroTitle: "釜山、オープンしました",
    heroSubtitle: "今すぐご予約いただけます",
    greeting: "こんにちは、LOCARORAです。",
    thanks: "釜山オープンをお待ちいただき、誠にありがとうございました。",
    intro1:
      "釜山店舗が正式にオープンしました。\n事前登録いただいた皆さまに、いち早くお知らせします。",
    intro2:
      "6月のBTS釜山コンサートに行かれる方には、公演会場で直接受け取り・返却ができるGalaxy Ultraレンタルをご用意しました。",
    productHeading: "🎤 コンサート参戦者へのおすすめ",
    productSubheading: "会場で受け取り、会場で返却。",
    productBadge: "BTS 釜山 · 6月12~13日",
    productName: "Galaxy S Ultra",
    productDesc: "BTS釜山コンサート向け Galaxy Ultraレンタル — 会場受け取り・返却対応",
    productHighlight1: "✓ 釜山公演会場で直接受け取り・返却",
    productHighlight2: "✓ BTS 6月12〜13日の日程に最適",
    productHighlight3: "✓ 最新Galaxy S Ultraモデル",
    ctaHeadline: "今すぐご予約ください",
    cta: "商品を見る",
    couponHeading: "🎫 ForHoliday ₩5,000 OFFクーポン",
    couponSubheading: "決済時に下記のクーポンコードを入力してください",
    couponCodeLabel: "COUPON CODE",
    couponHowTo:
      "LOCARORAの決済ページで上記コードを入力すると、自動的に割引が適用されます。",
    closing: "釜山で素敵な時間をお過ごしください 😊",
    signOff: "ありがとうございました、",
    signature: "LOCARORA より",
    footerNotice:
      "今後もさまざまな割引やイベント情報をお届けする予定です。受信を希望されない場合は、下記の配信停止をクリックしてください。",
    unsubscribe: "配信停止",
  },
  en: {
    preview:
      "Busan is now open — book your Galaxy Ultra rental for the BTS concert today.",
    heroBadge: "NOW OPEN · BUSAN",
    heroTitle: "Busan is Now Open",
    heroSubtitle: "Reservations are live, starting today.",
    greeting: "Hello from LOCARORA.",
    thanks: "Thank you so much for waiting for our Busan launch.",
    intro1:
      "Our Busan location is officially open.\nAs a waitlist member, you're hearing it first.",
    intro2:
      "For everyone heading to the BTS Busan Concert this June, we've prepared a Galaxy Ultra rental that you can pick up and return right at the concert venue.",
    productHeading: "🎤 For BTS Concert-Goers",
    productSubheading: "Pickup at the venue. Return at the venue.",
    productBadge: "BTS BUSAN · JUN 12-13",
    productName: "Galaxy S Ultra",
    productDesc:
      "Galaxy Ultra rental for the BTS Busan Concert — venue pickup & return",
    productHighlight1: "✓ Pickup & return right at the Busan concert venue",
    productHighlight2: "✓ Schedules tuned for BTS June 12–13 dates",
    productHighlight3: "✓ Latest Galaxy S Ultra model",
    ctaHeadline: "Reserve yours now",
    cta: "View Product",
    couponHeading: "🎫 ₩5,000 OFF — ForHoliday Coupon",
    couponSubheading: "Apply this coupon code at checkout",
    couponCodeLabel: "COUPON CODE",
    couponHowTo:
      "Enter this code on the LOCARORA checkout page to apply the discount automatically.",
    closing: "Wishing you a wonderful time in Busan 😊",
    signOff: "Thank you,",
    signature: "From LOCARORA",
    footerNotice:
      "We plan to send you various discounts and events in the future. If you no longer wish to receive emails, please click the unsubscribe link below.",
    unsubscribe: "Unsubscribe",
  },
  "zh-TW": {
    preview:
      "釜山正式開幕 — BTS演唱會 Galaxy Ultra租賃，立即預約。",
    heroBadge: "NOW OPEN · BUSAN",
    heroTitle: "釜山正式開幕",
    heroSubtitle: "現在即可立即預約。",
    greeting: "您好，這裡是LOCARORA。",
    thanks: "感謝您耐心等候釜山的開幕。",
    intro1:
      "我們的釜山據點現已正式開幕。\n優先向預先登錄的您報告這個好消息。",
    intro2:
      "為6月參加BTS釜山演唱會的您，我們特別準備了可在演唱會場直接取貨與歸還的Galaxy Ultra租賃服務。",
    productHeading: "🎤 演唱會推薦商品",
    productSubheading: "在場館取貨，在場館歸還。",
    productBadge: "BTS 釜山 · 6月12~13日",
    productName: "Galaxy S Ultra",
    productDesc:
      "BTS釜山演唱會 Galaxy Ultra租賃 — 演唱會場取貨・歸還",
    productHighlight1: "✓ 釜山演唱會場直接取貨與歸還",
    productHighlight2: "✓ 配合BTS 6月12-13日行程",
    productHighlight3: "✓ 最新Galaxy S Ultra機型",
    ctaHeadline: "立即預約",
    cta: "查看商品",
    couponHeading: "🎫 ForHoliday ₩5,000 折扣券",
    couponSubheading: "請於結帳時輸入下方折扣碼",
    couponCodeLabel: "COUPON CODE",
    couponHowTo:
      "在LOCARORA結帳頁面輸入此代碼即可自動套用折扣。",
    closing: "祝您在釜山度過愉快的時光 😊",
    signOff: "謝謝您，",
    signature: "LOCARORA 敬上",
    footerNotice:
      "我們將持續為您提供更多優惠與活動資訊。如果您不希望繼續收到郵件，請點擊下方的取消訂閱。",
    unsubscribe: "取消訂閱",
  },
  "zh-CN": {
    preview:
      "釜山正式开幕 — BTS演唱会 Galaxy Ultra租赁，立即预订。",
    heroBadge: "NOW OPEN · BUSAN",
    heroTitle: "釜山正式开幕",
    heroSubtitle: "现在即可立即预订。",
    greeting: "您好，这里是LOCARORA。",
    thanks: "感谢您耐心等候釜山的开幕。",
    intro1:
      "我们的釜山门店现已正式开幕。\n优先向预先登记的您报告这个好消息。",
    intro2:
      "为6月参加BTS釜山演唱会的您，我们特别准备了可在演唱会场直接取货与归还的Galaxy Ultra租赁服务。",
    productHeading: "🎤 演唱会推荐商品",
    productSubheading: "在场馆取货，在场馆归还。",
    productBadge: "BTS 釜山 · 6月12~13日",
    productName: "Galaxy S Ultra",
    productDesc:
      "BTS釜山演唱会 Galaxy Ultra租赁 — 演唱会场取货·归还",
    productHighlight1: "✓ 釜山演唱会场直接取货与归还",
    productHighlight2: "✓ 配合BTS 6月12-13日行程",
    productHighlight3: "✓ 最新Galaxy S Ultra机型",
    ctaHeadline: "立即预订",
    cta: "查看商品",
    couponHeading: "🎫 ForHoliday ₩5,000 折扣券",
    couponSubheading: "请于结账时输入下方折扣码",
    couponCodeLabel: "COUPON CODE",
    couponHowTo:
      "在LOCARORA结账页面输入此代码即可自动套用折扣。",
    closing: "祝您在釜山度过愉快的时光 😊",
    signOff: "谢谢您，",
    signature: "LOCARORA 敬上",
    footerNotice:
      "我们将持续为您提供更多优惠与活动信息。如果您不希望继续收到邮件，请点击下方的取消订阅。",
    unsubscribe: "取消订阅",
  },
};

const CouponTicket = ({
  locale,
  labels,
}: {
  locale: Locale;
  labels: (typeof t)[Locale];
}) => (
  <Section style={ticketWrap}>
    <Section style={{ ...topStrip, backgroundColor: COUPON_ACCENT }}>
      <Row>
        <Column style={{ width: "72%", textAlign: "center" as const }}>
          <Text style={topStripText}>DISCOUNT COUPON</Text>
        </Column>
        <Column
          style={{
            width: "28%",
            textAlign: "center" as const,
            borderLeft: "1.5px dashed rgba(255, 255, 255, 0.5)",
          }}
        >
          <Text style={topStripText}>COUPON</Text>
        </Column>
      </Row>
    </Section>

    <Row>
      <Column style={leftCol}>
        <Row style={{ margin: "0 0 16px" }}>
          <Column style={{ width: "44px", verticalAlign: "middle" as const }}>
            <Img
              src={forholidayLogoUrl}
              width="40"
              height="40"
              alt={couponBrand[locale]}
              style={logoImg}
            />
          </Column>
          <Column
            style={{ paddingLeft: "10px", verticalAlign: "middle" as const }}
          >
            <Text style={brandName}>{couponBrand[locale]}</Text>
            <Text style={brandTagline}>LOCARORA PARTNER</Text>
          </Column>
          <Column
            style={{
              width: "96px",
              textAlign: "right" as const,
              verticalAlign: "middle" as const,
            }}
          >
            <Text
              style={{
                ...discountPill,
                color: COUPON_ACCENT,
                borderColor: COUPON_ACCENT,
              }}
            >
              {couponDiscount[locale]}
            </Text>
          </Column>
        </Row>

        <Section
          style={{
            ...codeHeroBox,
            borderColor: COUPON_ACCENT,
          }}
        >
          <Text style={codeHeroLabel}>{labels.couponCodeLabel}</Text>
          <Text
            className="m-coupon-code"
            style={{
              ...codeHeroValue,
              color: COUPON_ACCENT,
            }}
          >
            {COUPON_CODE}
          </Text>
        </Section>

        <Text style={descriptionText}>{couponDescription[locale]}</Text>
      </Column>

      <Column style={perfCol}>
        <Text style={perfText}>
          <span>┊</span>
          <br />
          <span>┊</span>
          <br />
          <span>┊</span>
          <br />
          <span>┊</span>
          <br />
          <span>┊</span>
          <br />
          <span>┊</span>
          <br />
          <span>┊</span>
          <br />
          <span>┊</span>
        </Text>
      </Column>

      <Column style={stubCol}>
        <Text
          className="m-stub-discount"
          style={{
            ...stubDiscount,
            color: COUPON_ACCENT,
          }}
        >
          {couponDiscount[locale]}
        </Text>
        <Section style={stubBrandWrap}>
          <Text style={stubBrand}>{couponBrand[locale]}</Text>
        </Section>
      </Column>
    </Row>
  </Section>
);

export const PromoBusanOpenEmail = ({
  locale,
  utmCampaign = DEFAULT_UTM_CAMPAIGN,
  utmSource = DEFAULT_UTM_SOURCE,
  utmMedium = DEFAULT_UTM_MEDIUM,
}: PromoBusanOpenEmailProps) => {
  const tx = t[locale];
  const ctaHref = buildProductUrl(
    locale,
    "cta_button",
    utmCampaign,
    utmSource,
    utmMedium,
  );
  const cardHref = buildProductUrl(
    locale,
    "product_card",
    utmCampaign,
    utmSource,
    utmMedium,
  );
  const linkHref = buildProductUrl(
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
            .m-hero-title { font-size: 22px !important; }
            .m-section-heading { font-size: 18px !important; }
            .m-paragraph { font-size: 13px !important; line-height: 1.6 !important; }
            .m-coupon-code { font-size: 20px !important; letter-spacing: 1px !important; }
            .m-stub-discount { font-size: 17px !important; }
            .m-product-name { font-size: 22px !important; }
            .m-cta-headline { font-size: 14px !important; }
          }
        `}</style>
      </Head>
      <Preview>{tx.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Hero */}
          <Section style={hero}>
            <Text style={heroBadge}>{tx.heroBadge}</Text>
            <Heading className="m-hero-title" style={heroTitle}>
              {tx.heroTitle}
            </Heading>
            <Text style={heroSubtitle}>{tx.heroSubtitle}</Text>
          </Section>

          {/* Intro */}
          <Section style={content}>
            <Text className="m-paragraph" style={paragraph}>
              {tx.greeting}
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

          {/* Product showcase heading */}
          <Section style={sectionHeadingWrap}>
            <Heading
              as="h2"
              className="m-section-heading"
              style={sectionHeading}
            >
              {tx.productHeading}
            </Heading>
            <Text style={sectionSubheading}>{tx.productSubheading}</Text>
          </Section>

          {/* Product card */}
          <Section style={productCardWrap}>
            <Section style={productCard}>
              <Text style={productBadge}>{tx.productBadge}</Text>
              <Heading
                as="h3"
                className="m-product-name"
                style={productName}
              >
                {tx.productName}
              </Heading>
              <Text style={productDesc}>{tx.productDesc}</Text>
              <Section style={productHighlightsWrap}>
                <Text style={productHighlight}>{tx.productHighlight1}</Text>
                <Text style={productHighlight}>{tx.productHighlight2}</Text>
                <Text style={productHighlight}>{tx.productHighlight3}</Text>
              </Section>
              <Section style={productCardCtaWrap}>
                <Button style={productCardButton} href={cardHref}>
                  {tx.cta} →
                </Button>
              </Section>
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

          {/* Coupon ticket */}
          <Section style={couponListSection}>
            <CouponTicket locale={locale} labels={tx} />
            <Text style={couponHowToText}>{tx.couponHowTo}</Text>
          </Section>

          {/* Closing */}
          <Section style={closingSection}>
            <Text className="m-paragraph" style={paragraph}>
              {tx.closing}
            </Text>
            <Text className="m-paragraph" style={paragraph}>
              {tx.signOff} {tx.signature}
            </Text>
          </Section>

          {/* CTA */}
          <Section style={ctaSection}>
            <Text className="m-cta-headline" style={ctaHeadline}>
              {tx.ctaHeadline}
            </Text>
            <Section style={buttonSection}>
              <Button style={button} href={ctaHref}>
                {tx.cta}
              </Button>
            </Section>
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

export default PromoBusanOpenEmail;

PromoBusanOpenEmail.PreviewProps = {
  locale: "ko",
} satisfies PromoBusanOpenEmailProps;

// ---- Styles ----
const main = {
  backgroundColor: "#f4f4f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Apple SD Gothic Neo", "Hiragino Sans", "Microsoft YaHei", "PingFang TC", "PingFang SC", Ubuntu, sans-serif',
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

// ---- Hero ----
const hero = {
  background:
    "linear-gradient(135deg, #FF6600 0%, #FF8C42 50%, #FFA76A 100%)",
  backgroundColor: "#FF6600",
  padding: "48px 40px 40px",
  textAlign: "center" as const,
};

const heroBadge = {
  color: "rgba(255, 255, 255, 0.9)",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "3px",
  margin: "0 0 12px",
  textTransform: "uppercase" as const,
};

const heroTitle = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "800",
  lineHeight: "1.3",
  margin: "0 0 10px",
  letterSpacing: "-0.5px",
};

const heroSubtitle = {
  color: "rgba(255, 255, 255, 0.95)",
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "1.5",
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

// ---- Product card ----
const productCardWrap = {
  padding: "0 20px 8px",
};

const productCard = {
  background: "linear-gradient(135deg, #FFF4EC 0%, #FFE6D5 100%)",
  backgroundColor: "#FFF4EC",
  border: "1px solid #FFD3B0",
  borderRadius: "14px",
  padding: "24px 22px",
  textAlign: "center" as const,
};

const productBadge = {
  display: "inline-block",
  backgroundColor: "#FF6600",
  color: "#ffffff",
  fontSize: "10px",
  fontWeight: "800",
  letterSpacing: "2px",
  padding: "4px 12px",
  borderRadius: "999px",
  margin: "0 0 14px",
  textTransform: "uppercase" as const,
};

const productName = {
  color: "#18181b",
  fontSize: "26px",
  fontWeight: "900",
  lineHeight: "1.2",
  margin: "0 0 6px",
  letterSpacing: "-0.5px",
};

const productDesc = {
  color: "#52525b",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0 0 16px",
};

const productHighlightsWrap = {
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  borderRadius: "10px",
  padding: "14px 16px",
  margin: "0 0 18px",
  textAlign: "left" as const,
};

const productHighlight = {
  color: "#3f3f46",
  fontSize: "13px",
  fontWeight: "600",
  lineHeight: "1.7",
  margin: "0",
};

const productCardCtaWrap = {
  textAlign: "center" as const,
};

const productCardButton = {
  backgroundColor: "#FF6600",
  borderRadius: "10px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "700",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "13px 32px",
  boxShadow: "0 4px 14px rgba(255, 102, 0, 0.3)",
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
  margin: "0 0 12px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
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

const couponHowToText = {
  color: "#71717a",
  fontSize: "12px",
  lineHeight: "1.6",
  margin: "0",
  textAlign: "center" as const,
  padding: "0 12px",
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
  backgroundColor: "#FF6600",
  borderRadius: "10px",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "700",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "15px 40px",
  boxShadow: "0 4px 14px rgba(255, 102, 0, 0.35)",
};

const ctaLinkText = {
  textAlign: "center" as const,
  margin: "14px 0 0",
  fontSize: "13px",
};

const ctaLink = {
  color: "#FF6600",
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
