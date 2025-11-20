<div style="background: linear-gradient(135deg,#f1f7f4,#e4f0ea); min-height: calc(100vh - 64px); padding: 3.5rem 0 4rem;">
  <div style="max-width: 960px; margin: 0 auto; padding: 0 1.5rem;">

<h1 align="center">Manoa Lost &amp; Found</h1>
<p align="center"><em>A UH Mānoa app for reporting, browsing, and recovering lost items — built by students for students.</em></p>

<p align="center">
  <a href="https://manoa-lost-and-found.vercel.app/"><strong>Live Site</strong></a> ·
  <a href="https://github.com/manoa-lost-found/manoa-lost-and-found"><strong>View on GitHub</strong></a>
</p>

---

## Table of Contents
- [Overview](#overview)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [User Roles & Features](#user-roles--features)
- [Deployment](#deployment)
- [User Guide](#user-guide)
  - [Landing Page](#landing-page)
  - [Sign In Page](#sign-in-page)
  - [Item Feed](#item-feed)
  - [Report Lost Item](#report-lost-item)
  - [Report Found Item](#report-found-item)
  - [FAQ Page](#faq-page)
- [Mockups](#mockups)
- [Architecture Overview](#architecture-overview)
- [Development History](#development-history)
- [Future Enhancements](#future-enhancements)
- [Team](#team)

---

## Overview

**Manoa Lost &amp; Found** is a centralized platform for the UH Mānoa community to report, browse, and recover lost items. Students and staff can:

- Report **Lost** items  
- Report **Found** items  
- Browse a searchable feed  
- Follow a consistent UH-approved recovery process  
- Turn in all items through **official UH offices**

The goal is to replace UH Mānoa’s fragmented lost-and-found experience with one clean, unified tool.

---

## The Problem

UH Mānoa currently has:

- Separate lost-and-found desks across many buildings  
- No central system to report or search items  
- Confusing and inconsistent recovery processes  
- Low recovery rates for lost belongings  

Students often don’t know where to go, who to contact, or whether their item has been found.

---

## The Solution

Manoa Lost &amp; Found creates one unified process:

- A single online feed for **all** lost and found posts  
- Secure sign-in using **UH Login**  
- Standardized **Report Lost** and **Report Found** forms  
- Clear, step-by-step instructions for turning in and recovering items  
- Admin verification (future milestone)

This ensures every student knows **exactly what to do** when they lose or find something.

---

## User Roles & Features

### 🧑‍🎓 Students & Staff
- Log in with UH identity  
- Submit Lost Item reports  
- Submit Found Item reports  
- View their own posts  
- Browse all public Lost/Found posts  

### 🧭 Finders
Any authenticated user can:

- Report a found item  
- Specify where they turned it in  
- Provide identifying details  
- Help reconnect the item with the owner safely  

### 🛠️ Admins (Future Milestone)
Staff at Campus Center / Library will be able to:

- Verify items turned in  
- Update statuses (Received → Ready for Pickup)  
- Moderate posts  
- Manage FAQ content  

---

## Deployment

- **Live Site:** https://manoa-lost-and-found.vercel.app/  
- **GitHub Repository:** https://github.com/manoa-lost-found/manoa-lost-and-found  

The site is deployed using **Vercel**, which rebuilds automatically when changes are pushed to `main`.

---

## User Guide

### Landing Page
Introduces the app and provides a clean call-to-action to **Sign in with UH**.

![Landing](images/mockup-landing.jpg)

---

### Sign In Page
Users authenticate with UH Login for secure campus-only usage.

![Login](images/mockup-landing.jpg)

---

### Item Feed
Users browse Lost or Found posts with filters such as:

- Category  
- Location  
- Date  
- Keywords  

![Feed](images/mockup-feed.jpg)

---

### Report Lost Item
Form for reporting lost items, including:

- Category  
- Description  
- Last seen location  
- Image upload  

![Post Lost](images/mockup-post-lost.jpg)

---

### Report Found Item
Form for users who find an item and want to report where it was turned in.

![Post Found](images/mockup-post-found.jpg)

---

### FAQ Page
Explains:

- How to report lost items  
- How to report found items  
- Where items are kept  
- UH’s official recovery process  

![FAQ](images/mockup-recovery.jpg)

---

## Mockups

Mockups are located under:

/docs/images/


Current mockups include:

- Landing Page  
- Login / Sign In  
- Lost & Found Feed  
- Report Lost Item  
- Report Found Item  
- FAQ / Recovery Instructions  

(You will update these later with new images.)

---

## Architecture Overview

For Milestone 1, the focus is on UI and flow, not backend logic.

### Key Conceptual Elements

- **Items** – Lost or Found posts (category, description, location, image, status)  
- **Users** – UH-authenticated members submitting posts  
- **Locations** – Official drop-off/pickup sites  
- **Content** – FAQ, recovery instructions, static pages  

This lightweight model will evolve during future milestones.

---

## Development History

Manoa Lost & Found uses issue-driven project management.

### Milestone 1 (M1): UI, Mockups & Project Page

**Completed**
- #1 Implement Landing page mockup  
- #2 Implement LostFoundFeed page mockup  
- #7 Build Project Page  
- #12 Implement admin-login mockup  
- #13 Implement user-login mockup  

**In Progress**
- #10 Implement Lost Item Form page mockup  
- #11 Implement Found Item Form page mockup  
- #14 Implement FAQ page mockup  
- #15 Update Project Page  
- #16 UH Login integration on Landing Page  

Milestone 1 establishes the design foundation and user flow.

---

## Future Enhancements

- Admin dashboards  
- Smarter matching between Lost & Found posts  
- Email or in-app notifications  
- Map-based visualization of found locations  
- Recovery statistics (“X items returned this semester”)  

---

## Team

- **Jermaine Bruno**  
- **Michael Lau**  
- **Brandon Nguyen**  
- **Edward Uzueta**  
- **Justin Lai**

  </div>
</div>
