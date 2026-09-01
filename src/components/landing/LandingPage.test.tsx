import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LandingPage } from "@/components/landing/LandingPage";
import { ruContent } from "@/content/local/ru";

describe("LandingPage structure", () => {
  const html = renderToStaticMarkup(<LandingPage content={ruContent} />);

  it("renders one page heading and the expected semantic landmarks", () => {
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html.match(/<main/g)).toHaveLength(1);
    expect(html.match(/<header/g)).toHaveLength(1);
    expect(html.match(/<footer/g)).toHaveLength(1);
    expect(html).toContain('href="#content"');
    expect(html).toContain('id="content"');
  });

  it("uses real links for navigation and buttons for interface actions", () => {
    expect(html).toContain('href="https://lk.rublix-wallet.com"');
    expect(html).toContain('href="https://t.me/rublix_support"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain('tabindex="1"');
  });

  it("does not expose unpublished legal pages or a fake English route", () => {
    expect(html).not.toContain("Условия использования");
    expect(html).not.toContain('href="/en"');
    expect(html).toContain('aria-disabled="true"');
  });
});
