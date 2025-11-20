<style>
  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: linear-gradient(135deg,#f1f7f4,#e4f0ea);
    color: #0f172a;
  }

  /* Hide GitHub Pages default header */
  body > header {
    display: none !important;
  }

  /* Main container */
  #content, main, article {
    max-width: 960px;
    margin: 0 auto;
    padding: 3.5rem 1.5rem 4rem;
  }

  h1, h2, h3 {
    color: #022c22;
  }

  a {
    color: #14532d;
    font-weight: 600;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  code {
    background: #e4f0ea;
    padding: 2px 4px;
    border-radius: 4px;
  }

  hr {
    border: none;
    border-top: 1px solid #cbd5e1;
    margin: 2rem 0;
  }
</style>

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

Every day at UH Mānoa, students lose IDs, water bottles, laptops, and other things they actually depend on. There is no single place to check if something was found — and no clear process for turning items in.

**Manoa Lost & Found** solves this by offering one place to:

- Report items you’ve **lost**
- Report items you’ve **found**
- Browse and filter a shared feed
- Follow a UH-approved, safe recovery process

Built by UH Mānoa students, for UH Mānoa students.

---

## Why It Matters

Right now, UH Mānoa’s lost-and-found system is:

- Scattered across buildings  
- Inconsistent  
- Hard to navigate  
- Easy to miss  

Our app fixes this by:

- Providing **one central location**
- Making the process **simple and predictable**
- Keeping handoffs **safe** through UH offices only

---

## What You Can Do

With Manoa Lost & Found, users can:

- **Post a Lost Item**
- **Post a Found Item**
- Browse all campus posts
- Follow the official recovery steps
- Access everything through UH Login

---

## User Roles

### Students & Staff  
- Log in with UH credentials  
- Report lost & found items  
- Manage their own posts  
- Browse the full campus feed  

### Finders  
- Report found items  
- State where the item was turned in  
- Help reconnect items safely  

### Admins (future)  
- Verify turned-in items  
- Update statuses (Received → Ready → Recovered)  
- Moderate posts  
- Manage official locations & FAQ  

---

## Deployment

- **Live Site:** https://manoa-lost-and-found.vercel.app/  
- **GitHub Repo:** https://github.com/manoa-lost-found/manoa-lost-and-found  
- **GitHub Pages (Project Page):** https://manoa-lost-found.github.io/manoa-lost-and-found/

---

# User Guide

## Landing Page

The landing page introduces the app:

- “Find it. Report it. Reunite it.”  
- Short explanation  
- UH SSO login button  

**(**__IMAGE PLACEHOLDER: Landing Page mockup — `mockup-landing-v2.png`__**)**

---

## Sign In

Users authenticate through UH Login to ensure campus-only access.

**(**__IMAGE PLACEHOLDER: Sign In / UH Login mockup — `mockup-sign-in-v2.png`__**)**

---

## Item Feed

After signing in, users see the main feed:

- Lost & Found items  
- Card-style layout  
- Filters (category, location, etc.)

**(**__IMAGE PLACEHOLDER: Item Feed mockup — `mockup-feed-v2.png`__**)**

---

## Report Lost Item

A simple form that allows users to report something they lost:

- Category  
- Description  
- Last location  
- Optional photo  

**(**__IMAGE PLACEHOLDER: Lost Item form mockup — `mockup-report-lost-v2.png`__**)**

---

## Report Found Item

Finders can report items they turn in:

- Where it was found  
- Where it was turned in  
- Photo / description  

**(**__IMAGE PLACEHOLDER: Found Item form mockup — `mockup-report-found-v2.png`__**)**

---

## FAQ

Explains:

- How to report lost items  
- How to report found items  
- Where to pick up items  
- How long items stay on file  
- Privacy and safety rules  

**(**__IMAGE PLACEHOLDER: FAQ Page mockup — `mockup-faq-v2.png`__**)**

---

# Mockups

These placeholders will be replaced once final UI screenshots are exported.

- **Landing Page** — (**IMAGE PLACEHOLDER**)  
- **Sign In / UH Login** — (**IMAGE PLACEHOLDER**)  
- **Item Feed** — (**IMAGE PLACEHOLDER**)  
- **Report Lost Item** — (**IMAGE PLACEHOLDER**)  
- **Report Found Item** — (**IMAGE PLACEHOLDER**)  
- **FAQ** — (**IMAGE PLACEHOLDER**)  
- **(Optional) Data Model Diagram** — (**IMAGE PLACEHOLDER**)  

---

# Architecture Overview

Milestone 1 focuses entirely on UI and user flow, not backend infrastructure.

Conceptual components:

- **Items** — lost/found posts with category, description, location, photo, status  
- **Users** — UH-authenticated students/staff  
- **Locations** — campus drop-off and pick-up points  
- **Content** — static FAQ + instructions  

Future milestones will expand this into full backend services.

---

# Development History

We follow issue-driven project management.

## Milestone 1 (M1): Mockups & Project Page

### ✔️ Completed  
- Landing page mockup  
- Item feed mockup  
- Login mockups  
- Initial project page  

### 🔧 In Progress  
- Lost Item form mockup  
- Found Item form mockup  
- FAQ page mockup  
- UH Login integration planning  
- Updating this project page  

Milestone 1 goal: finalize **flow + design** before implementation.

---

# Future Enhancements

- Admin dashboard  
- Smart Lost/Found matching  
- Email or in-app notifications  
- Map view for common found locations  
- Recovery statistics:  
  > “X items reunited this semester”

**(**__IMAGE PLACEHOLDER: Future stats or map mockup__**)**

---

# Team

Manoa Lost & Found is designed and developed by UH Mānoa students:

- **Jermaine Bruno**  
- **Michael Lau**  
- **Brandon Nguyen**  
- **Edward Uzueta**  
- **Justin Lai**
