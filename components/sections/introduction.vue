<template>
  <b-container fluid class="break-after p-0 m-0">
    <slot name="heading" />
    <b-row>
      <b-col cols="6">
        <h2 class="intro-heading">
          WHAT IS WEBSITE ACCESSIBILITY?
        </h2>
        <p class="intro-paragraph">
          Website accessibility refers to development and design best- practices that all users -- regardless of their disability -- need to perceive, understand, navigate, and interact with a website. The most widely accepted standards for website accessibility are the Web Content Accessibility Guidelines (WCAG) 2.0. These standards provide guidelines for developing websites that accommodate users who rely on assistive devices, adding a layer of usability and improving the experience for all users.
        </p>
        <h2 class="intro-heading">
          ABOUT THE G5 WEBSITE ACCESSIBILITY REVIEW REPORT
        </h2>
        <p class="intro-paragraph">
          The G5 Website Accessibility Review Report identifies issues that may be limiting the accessibility and the performance of your website. To develop this report, we performed a complete scan of your website to assess how well it adheres to WCAG 2.0 Level A standards. We looked at more than 40 elements of accessibility to conduct this report.
        </p>
        <p class="intro-paragraph">
          This Accessibility Review Report includes a summary of accessibility issues identified in our review, along with details about why those elements should be addressed in order to improve accessibility.
        </p>
        <p class="intro-paragraph">
          G5 will review this report with you and provide guidance for selecting and prioritizing elements to address in order for your website to meet the WCAG 2.0 Level A standards.
        </p>
      </b-col>
      <b-col cols="6">
        <h2 class="intro-heading">
          WHY IS WEBSITE ACCESSIBILITY IMPORTANT?
        </h2>
        <ol class="intro-list">
          <li class="intro-paragraph">
            <span class="intro-bold">Reduce legal risk.</span>
            Addressing accessibility issues, maintaining an accessibility statement, and providing options for users to contact you when they encounter issues on your website are key steps to preventing litigation.
          </li>
          <li class="intro-paragraph">
            <span class="intro-bold">Improve website performance.</span>
            General accessibility updates can have a positive impact on overall website performance, including usability and search engine optimization (SEO).
          </li>
          <li class="intro-paragraph">
            <span class="intro-bold">Reach a wider audience.</span>
            Adhering to website accessibility best practices ensures that all visitors to your website have a good user experience and are able to easily access information about your property.
          </li>
          <li class="intro-paragraph">
            <span class="intro-bold">Stand out from your competition.</span>
            Potential renters are likely to move on to another property in the area if they cannot understand content on your property’s website. Ensuring your website meets these guidelines can help your property stand out from local competition.
          </li>
          <li class="intro-paragraph">
            <span class="intro-bold">Show your customers you care.</span>
            By taking steps to make your website more accessible, you communicate to your customers that you care. With an accessible website you communicate your focus on providing a positive experience to your customers.
          </li>
        </ol>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {}
</script>

<style>
.intro-heading {
  font-size: 16pt;
  font-weight: 700;
  letter-spacing: 0.1rem;
  margin-bottom: 15px;
}
.intro-list li {
  margin-bottom: 15px;
}
.intro-paragraph {
  font-size: 12pt;
  font-weight: 300;
}
.intro-bold {
  font-weight: 700;
}
</style>
