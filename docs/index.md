<div style="background: linear-gradient(135deg,#f1f7f4,#e4f0ea); min-height: 100vh; padding: 3.5rem 0 4rem;">
  <div style="max-width: 960px; margin: 0 auto; padding: 0 1.5rem;">

# Manoa Lost & Found

## Find it. Report it. Reunite it.

A simple way for UH Mānoa students to report lost items, browse found items, and reconnect belongings with their owners.

[**Live Site**](https://manoa-lost-and-found.vercel.app/) · [**GitHub Repository**](https://github.com/manoa-lost-found/manoa-lost-and-found)

---

## Table of Contents

- [Overview](#overview)
- [Why It Matters](#why-it-matters)
- [What You Can Do](#what-you-can-do)
- [User Roles](#user-roles)
- [Deployment](#deployment)
- [User Guide](#user-guide)
  - [Landing Page](#landing-page)
  - [Sign In](#sign-in)
  - [Item Feed](#item-feed)
  - [Report Lost Item](#report-lost-item)
  - [Report Found Item](#report-found-item)
  - [FAQ](#faq)
- [Mockups](#mockups)
- [Architecture Overview](#architecture-overview)
- [Development History](#development-history)
- [Future Enhancements](#future-enhancements)
- [Team](#team)

---

## Overview

Every day at UH Mānoa, students lose IDs, water bottles, laptops, and other things that actually matter to them. Right now, there is no single place to see what’s been found on campus or to report what you lost.

**Manoa Lost & Found** is our attempt to fix that.

The app pulls the experience into one spot:

- Report items you’ve **lost**
- Report items you’ve **found**
- Browse and filter a shared feed
- Follow a clear, UH-friendly recovery process

The app is built by UH Mānoa students for students, with the goal of making it easier for lost stuff to find its way back home.

---

## Why It Matters

Currently, UH Mānoa has:

- Separate lost & found desks in different buildings  
- No central system to browse lost or found items  
- No consistent or obvious process for recovery  

If you’re new to campus, or just busy, it’s easy to give up and assume your item is gone forever.

Our app is meant to:

- Give students **one URL** to remember  
- Make the process feel **simple and intuitive**  
- Keep item handoff **safe** by using official UH offices, not random meetups

---

## What You Can Do

With Manoa Lost & Found, a UH student or staff member can:

- **Post a Lost Item** with details and a photo  
- **Post a Found Item** and mark where it was turned in  
- **Browse the feed** of all lost and found items on campus  
- **See what to do next** via an FAQ and clear instructions  

Later milestones add more admin tools, smarter matching, and better ways to follow up.

---

## User Roles

### Students & Staff

- Log in with UH credentials  
- Report lost items  
- Report found items  
- View and manage their own posts  
- Browse the campus-wide feed

### Finders

Any authenticated user can act as a finder:

- Report a found item  
- Indicate where it was found and where it was turned in  
- Help the owner reconnect with their stuff in a safe way

### Admins (Planned)

In future milestones, UH staff (e.g., Campus Center / Library) will be able to:

- View items that have been physically turned in  
- Mark items as received, ready for pickup, or recovered  
- Moderate and clean up posts  
- Maintain FAQ and help content

---

## Deployment

- **Live Site:** https://manoa-lost-and-found.vercel.app/  
- **GitHub Repo:** https://github.com/manoa-lost-found/manoa-lost-and-found  
- **Project Page (GitHub Pages):** https://manoa-lost-found.github.io/manoa-lost-and-found/

The app itself is deployed with **Vercel**, which rebuilds automatically when changes are pushed to `main`.  
GitHub Pages is used for this **project documentation page**.

---

## User Guide

This section mirrors the main flows of the app.

### Landing Page

The landing page introduces the app and sets the tone:

- Hero text (ex: “Find it. Report it. Reunite it.”)  
- Short explanation of what the app does  
- Prominent button like **“Login with UH SSO”**  

**(**__IMAGE PLACEHOLDER: Landing Page mockup screenshot — save later as `docs/images/mockup-landing-v2.png`__**)**

---

### Sign In

When a user clicks to log in, they’re taken through UH SSO.

- Only UH students/staff can use the app  
- Keeps lost and found information within the UH community  
- Sets the stage for future role-based features (students, staff, admins)

**(**__IMAGE PLACEHOLDER: Sign In / UH SSO screen mockup — e.g. `docs/images/mockup-sign-in-v2.png`__**)**

---

### Item Feed

After logging in, users arrive at the **item feed**:

- Lost and Found posts shown in a clean card layout  
- Each card shows an image (if available), brief description, location, and status  
- Filters for category, location, and other basic properties (design-level in M1)

**(**__IMAGE PLACEHOLDER: Item Feed / Lost & Found list mockup — e.g. `docs/images/mockup-feed-v2.png`__**)**

---

### Report Lost Item

From the navigation, users can choose **“Report Lost Item”**.

The form allows them to submit:

- Category (ID, bottle, electronics, etc.)  
- Description (color, brand, stickers, unique markings)  
- Last known location and approximate time  
- Optional photo of the item  

**(**__IMAGE PLACEHOLDER: Report Lost Item form mockup — e.g. `docs/images/mockup-report-lost-v2.png`__**)**

---

### Report Found Item

If someone finds an item, they can choose **“Report Found Item”**.

They fill in:

- Where and when the item was found  
- Where they turned it in (e.g. Campus Center, Library)  
- A short description and optional photo  

This allows the owner to confirm it’s theirs without forcing a direct meetup.

**(**__IMAGE PLACEHOLDER: Report Found Item form mockup — e.g. `docs/images/mockup-report-found-v2.png`__**)**

---

### FAQ

The FAQ page explains the common questions students actually have, such as:

- “What should I do if I lost something on campus?”  
- “What should I do if I find something?”  
- “Where do I go to pick up items?”  
- “How long are items kept before they’re donated or handled differently?”  
- “Is my name or email visible to other users?”

**(**__IMAGE PLACEHOLDER: FAQ page mockup, showing questions & answers — e.g. `docs/images/mockup-faq-v2.png`__**)**

---

## Mockups

When you have your final screenshots, you can add them under `/docs/images/` and replace the placeholders above with actual image tags, for example:

```md
![Landing Page](images/mockup-landing-v2.png)
