import { test, expect } from '@playwright/test';

// Shared tests that apply to both landing page variants
function sharedLandingTests(variant, basePath) {
  test.describe(`${variant} - Shared`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(basePath);
    });

    test('all sections are visible', async ({ page }) => {
      await expect(page.locator('#hero-heading')).toBeVisible();
      await expect(page.locator('#value-heading')).toBeVisible();
      await expect(page.locator('#features-heading')).toBeVisible();
      await expect(page.locator('#integrations-heading')).toBeVisible();
      await expect(page.locator('#pricing-heading')).toBeVisible();
      await expect(page.locator('#cta-heading')).toBeVisible();
    });

    test('navigation links exist', async ({ page }) => {
      await expect(page.locator('header nav a[href="#features"]').first()).toBeVisible();
      await expect(page.locator('header nav a[href="#pricing"]').first()).toBeVisible();
      await expect(page.locator('header nav a[href="#integrations"]').first()).toBeVisible();
    });

    test('pricing displays correct amounts with strikethrough', async ({ page }) => {
      await expect(page.getByText('$29')).toBeVisible();
      await expect(page.getByText('$169')).toBeVisible();
      await expect(page.getByText('$348')).toBeVisible();
      await expect(page.getByText('Save 52%')).toBeVisible();
    });

    test('heading hierarchy is correct', async ({ page }) => {
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
      const h2Count = await page.locator('h2').count();
      expect(h2Count).toBeGreaterThanOrEqual(4);
    });

    test('feature cards are visible', async ({ page }) => {
      await expect(page.getByText('AI Race Plans')).toBeVisible();
      await expect(page.getByText('Smart Workouts')).toBeVisible();
      await expect(page.getByText('Continuous Coaching')).toBeVisible();
    });

    test('integration icons are visible', async ({ page }) => {
      const labels = page.locator('#integrations span.uppercase');
      await expect(labels.getByText('Garmin')).toBeVisible();
      await expect(labels.getByText('Strava')).toBeVisible();
      await expect(labels.getByText('Apple Health')).toBeVisible();
      await expect(labels.getByText('Google Fit')).toBeVisible();
      await expect(labels.getByText('Zwift')).toBeVisible();
    });
  });

  test.describe(`${variant} - Mobile`, () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('mobile menu opens and closes', async ({ page }) => {
      await page.goto(basePath);
      await expect(page.locator('#mobile-menu-btn')).toBeVisible();

      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).toBeHidden();

      await page.locator('#mobile-menu-btn').click();
      await expect(mobileMenu).toBeVisible();

      await page.locator('#mobile-menu-btn').click();
      await expect(mobileMenu).toBeHidden();
    });
  });
}

// Shared form tests (core behavior)
function sharedFormTests(variant, formPath) {
  test.describe(`${variant} - Form Page`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(formPath);
    });

    test('form has email and sport fields', async ({ page }) => {
      await expect(page.locator('#email')).toBeVisible();
      await expect(page.locator('input[name="sport"]').first()).toBeAttached();
      await expect(page.locator('#races')).toBeVisible();
    });

    test('only email is required', async ({ page }) => {
      await expect(page.locator('#email')).toHaveAttribute('required', '');
      await expect(page.locator('#races')).not.toHaveAttribute('required', '');
    });

    test('sport options are present', async ({ page }) => {
      const inputs = page.locator('input[name="sport"]');
      expect(await inputs.count()).toBe(6);
    });

    test('shows success state after valid submission', async ({ page }) => {
      await page.fill('#email', 'test@example.com');
      await page.locator('#submit-btn').click();
      await expect(page.locator('#success-state')).toBeVisible();
      await expect(page.locator('#icp-form')).toBeHidden();
    });

    test('validates email before submission', async ({ page }) => {
      await page.locator('#submit-btn').click();
      await expect(page.locator('#icp-form')).toBeVisible();
      await expect(page.locator('#success-state')).toBeHidden();
    });

    test('back link navigates to landing page', async ({ page }) => {
      const backLink = page.locator('a[href="index.html"]').first();
      await expect(backLink).toBeVisible();
    });
  });
}

// Run shared landing page tests for both variants
sharedLandingTests('Interest Test', '/interest-test/');
sharedLandingTests('Sign-Up Test', '/sign-up-test/');

// Run shared form tests for both form pages
sharedFormTests('Interest Test', '/interest-test/waitlist.html');
sharedFormTests('Sign-Up Test', '/sign-up-test/early-access.html');

// Variant-specific CTA tests
test.describe('Interest Test - CTAs', () => {
  test('shows soft interest CTAs', async ({ page }) => {
    await page.goto('/interest-test/');
    await expect(page.getByText('Get Early Access')).toBeVisible();
    await expect(page.getByText('Join Waitlist').first()).toBeVisible();
  });

  test('pricing buttons link to waitlist form', async ({ page }) => {
    await page.goto('/interest-test/');
    const pricingCTA = page.locator('#pricing a[href="waitlist.html"]').first();
    await expect(pricingCTA).toBeVisible();
  });
});

test.describe('Sign-Up Test - CTAs', () => {
  test('shows hard sign-up CTAs', async ({ page }) => {
    await page.goto('/sign-up-test/');
    const signUpButtons = page.getByText('Sign Up', { exact: true });
    expect(await signUpButtons.count()).toBeGreaterThanOrEqual(3);

    await expect(page.getByText('Join Waitlist')).toHaveCount(0);
    await expect(page.getByText('Get Early Access')).toHaveCount(0);
    await expect(page.getByText('Get Started')).toHaveCount(0);
  });

  test('shows purchase-oriented copy', async ({ page }) => {
    await page.goto('/sign-up-test/');
    await expect(page.getByText('30-day money-back guarantee')).toBeVisible();
  });

  test('pricing buttons link to early access form', async ({ page }) => {
    await page.goto('/sign-up-test/');
    const pricingCTA = page.locator('#pricing a[href="early-access.html"]').first();
    await expect(pricingCTA).toBeVisible();
  });
});

test.describe('Interest Test - Waitlist Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/interest-test/waitlist.html');
  });

  test('has waitlist-specific heading', async ({ page }) => {
    await expect(page.getByText('Join the Waitlist')).toBeVisible();
  });

  test('sports are multiselect checkboxes', async ({ page }) => {
    const checkboxes = page.locator('input[name="sport"][type="checkbox"]');
    expect(await checkboxes.count()).toBe(6);
    // Can select multiple
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();
    await expect(checkboxes.nth(0)).toBeChecked();
    await expect(checkboxes.nth(1)).toBeChecked();
  });

  test('other sport shows write-in field', async ({ page }) => {
    const otherText = page.locator('#sport-other-text');
    await expect(otherText).toBeHidden();
    await page.locator('#sport-other-check').check();
    await expect(otherText).toBeVisible();
  });

  test('looking-for has freeform textarea and checkbox options', async ({ page }) => {
    await expect(page.locator('#looking-for-freeform')).toBeVisible();
    const options = page.locator('input[name="looking_for"]');
    expect(await options.count()).toBe(6);
    await expect(page.getByText('A dedicated coach at an affordable price')).toBeVisible();
    await expect(page.getByText('Training plans built specifically for me')).toBeVisible();
    await expect(page.getByText('Real-time plan adjustments based on my progress')).toBeVisible();
  });
});

test.describe('Sign-Up Test - Early Access Page', () => {
  test('has early-access-specific heading', async ({ page }) => {
    await page.goto('/sign-up-test/early-access.html');
    await expect(page.getByText('Get Early Access')).toBeVisible();
  });
});

// Directory page test
test.describe('Directory Page', () => {
  test('links to both variants', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Interest Test')).toBeVisible();
    await expect(page.getByText('Sign-Up Test')).toBeVisible();
  });
});
