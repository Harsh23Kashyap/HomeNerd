# Nerd family homepage

The site has ten project cards, a separate People page, and a shared asterisk favicon (`favicon.svg`). Deploy `index.html`, `people.html`, `styles.css`, `script.js`, `favicon.svg`, and the `assets/` directory together at the site root. The pages also work from `file://` for a local check.

## Cards and navigation

On each page load, DietChat, CustomNerd, WirelessNerd, HallucinationNerd, and NewsNerd shuffle among the first five positions. The other five cards shuffle among the lower five positions. The visual order is the DOM and keyboard-focus order; position numbers update on each load. Category filters still follow the project's identity rather than its current position. With local storage available, a reload that coincidentally repeats the entire previous order swaps two cards in each zone.

The linked cards open their destinations in a new tab on click, Enter, or Space. On desktop, pointer hover shows the reverse with a description and image where provided. On touch, a linked card opens its destination directly. PatentNerd has no verified website link. AnomalyNerd and OperationsNerd are under construction and have no outbound destination. Their cards toggle a non-navigating preview on click, Enter, or Space. The reduced-motion preference removes the animated transitions. Artwork uses inline SVGs; pointer tilt and staggered entrance animate where motion is enabled.

Destinations checked September 27, 2026:
- DietChat: https://dietchat.org/
- DietNerd: https://dietnerd.org/
- NewsNerd: http://newsnerd-prod.s3-website-us-east-1.amazonaws.com/ (temporary S3 address; the custom domain was not working when checked)
- HallucinationNerd: https://hallucinationnerd.org/
- InvestorNerd: https://www.investornerd.org/
- WirelessNerd: https://wirelessnerd.org/
- CustomNerd: https://github.com/Harsh23Kashyap/Custom-Nerd (public source repository, not a deployed site)

PatentNerd, AnomalyNerd, and OperationsNerd have no outbound link. ChronicNerd is represented by DietChat and WorldNewsNerd by NewsNerd, so neither appears twice.

## Card images

Five backs contain cropped captures of the associated public sites, taken September 27, 2026. DietChat uses its public About page. NewsNerd displays an image placeholder rather than its public site's configuration-warning screen. CustomNerd contains a crop of the homepage image documented in its GitHub README; that image contains diet-themed example copy and is not a deployed CustomNerd site. AnomalyNerd shows a violet local UI mock, while OperationsNerd shows a prototype approval-queue image from https://github.com/AmaanIlahi/OperationsNerd/pull/9. The latter contains demo data and simulated sending. Neither preview implies that the underlying app is deployed. These captures can age and should be recaptured when the sites change.

Card descriptions and sample questions are short explanations, not verified claims that the underlying services support every specific sample prompt.

## People credits and sources

Credits were checked September 27, 2026:
- DietNerd: Dennis Shasha, Shela Wu, Zubair Yacub - https://dietnerd.org/about.html
- HallucinationNerd: Taranum Wasu, Harsh Kashyap, Vishnu Chennur, Dennis Shasha - https://hallucinationnerd.org/about.html
- InvestorNerd: John Castillo, Rishika Gautam, Xinyu Wang, Harsh Kashyap, Dennis Shasha - https://arxiv.org/abs/2609.24658
- WirelessNerd: Dennis Shasha - https://wireless.engineering.nyu.edu/wireless-nerd/ ; Shela Wu - https://www.linkedin.com/posts/shelawu_wirelesstechnology-llm-b6gs-activity-7262120711031328768-wcac
- NewsNerd: Harsh Kashyap - https://www.linkedin.com/posts/harsh-kashyap_a-lot-of-the-time-the-news-we-consume-is-activity-7436136521776275457-r65a ; https://harshkashyapportfolio.netlify.app/assets/documents/Harsh_Kashyap_Resume.pdf

No contributor credits are shown for DietChat or PatentNerd pending a direct source. Vedant Pradhan is omitted because the available sources did not connect that name to NewsNerd.
