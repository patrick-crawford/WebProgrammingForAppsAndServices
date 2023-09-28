#!/usr/bin/env bash

npx mr-pdf \
  --initialDocURLs="http://localhost:3000" \
  --contentSelector="article" \
  --paginationSelector="a.pagination-nav__link--next" \
  --excludeSelectors=".margin-vert--xl a,.theme-edit-this-page,.tocCollapsible_1PrD theme-doc-toc-mobile tocMobile_3Hoh,.tocCollapsibleButton_2O1e" \
  --coverImage="https://download.logo.wine/logo/Seneca_College/Seneca_College-Logo.wine.png" \
  --coverTitle="Web Programming for Apps and Services" \
  --outputPDFFilename "./static/Web-Programming-for-Apps-and-Services.pdf"
