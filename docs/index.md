# Manoa Lost & Found

_A UH Mānoa web application for reporting, browsing, and recovering lost items on campus._

**Live Site:** https://manoa-lost-and-found.vercel.app/  
**GitHub Repository:** https://github.com/manoa-lost-found/manoa-lost-and-found  
**Project Page (GitHub Pages):** https://manoa-lost-found.github.io/manoa-lost-and-found/

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

Every semester at UH Mānoa, students lose important belongings — student IDs, water bottles, laptops, headphones, and more. Right now, there is no centralized place to check whether an item has been found or to report something you lost.

**Manoa Lost & Found** provides a single, campus-focused web app where students and staff can:

- Report items they’ve **lost**
- Report items they’ve **found**
- Browse a shared **Lost & Found feed**
- Follow a clear, UH-friendly **recovery process**

The app is built by UH Mānoa students, for UH Mānoa students.

---

## Why It Matters

The current lost-and-found experience at UH Mānoa is:

- Scattered across different buildings and offices  
- Not clearly documented online  
- Inconsistent from place to place  
- Difficult and frustrating for students to navigate  

As a result, many students simply give up and assume their items are gone.

Manoa Lost & Found aims to:

- Create **one URL** for all lost and found activity  
- Make the process **clear, simple, and predictable**  
- Keep item exchange **safe**, using official UH locations instead of informal meetups  

---

## What You Can Do

Using the Manoa Lost & Found app, a UH student or staff member can:

- **Report a Lost Item** – with description, location, and optional photo  
- **Report a Found Item** – with details and where it was turned in  
- Browse and filter the **Lost & Found feed**  
- Use the **FAQ** to understand what to do in different situations  

Future milestones will build on this, adding smarter matching, notifications, and staff tools.

---

## User Roles

### 1. Students & Staff

Students and staff can:

- Log in with their UH credentials  
- Report lost items  
- Report found items  
- View and manage their own posts  
- Browse all public lost and found posts on campus  

### 2. Finders

Any authenticated user who finds an item can:

- Report that they found it  
- Describe the item and where it was found  
- Indicate where they turned it in (e.g., Campus Center, Library)  

This ensures items are routed through official UH locations, not informal exchanges.

### 3. Admins (Planned for Future Milestones)

In later milestones, UH staff (e.g., at Campus Center or the Library) will be able to:

- View items reported as turned in  
- Update item status (for example: **Open → Received → Ready for Pickup → Recovered**)  
- Moderate and clean up posts if needed  
- Maintain FAQ content and location information  

---

## Deployment

The Manoa Lost & Found application is deployed using **Vercel**.

- **Production Site:** https://manoa-lost-and-found.vercel.app/  
- **Application Repository:** https://github.com/manoa-lost-found/manoa-lost-found  

This **project documentation page** is hosted via **GitHub Pages** from the `docs/` directory of the `manoa-lost-and-found` organization repository:

- **Project Page (GitHub Pages):** https://manoa-lost-found.github.io/manoa-lost-and-found/

---

## User Guide

This section describes the main pages and a typical usage flow for a UH Mānoa student.

### Landing Page

The landing page introduces the app and sets the tone:

- Short description of what the app does  
- Emphasis on the idea: **“Find it. Report it. Reunite it.”**  
- A clear call-to-action to sign in with UH credentials  

**(IMAGE PLACEHOLDER: Landing Page mockup — for example, `images/mockup-landing-v2.png`)**

---

### Sign In

When users choose to sign in, they are redirected to a UH authentication flow (UH SSO), ensuring that only UH Mānoa students and staff can use the app.

**(IMAGE PLACEHOLDER: Sign In / UH Login mockup — for example, `images/mockup-sign-in-v2.png`)**

---

### Item Feed

After successful sign-in, users are taken to the **Item Feed**.

Key aspects:

- Shows both **Lost** and **Found** posts in a card-style list  
- Each card includes a brief description, category, location, and status  
- Basic filtering or search is available (e.g., by category or keyword, depending on milestone)  

This is the main place where users look to see if their item has already been reported, or to browse recent lost and found activity.

**(IMAGE PLACEHOLDER: Item Feed mockup — for example, `images/mockup-feed-v2.png`)**

---

### Report Lost Item

Users who have lost an item can use the **Report Lost Item** page.

The form typically includes:

- Item category (e.g., ID, bottle, electronics, clothing)  
- Description (brand, color, unique markings, etc.)  
- Where and when the item was last seen  
- Optional photo of the item  

The goal is to help others and staff recognize the item quickly and accurately.

**(IMAGE PLACEHOLDER: Report Lost Item form mockup — for example, `images/mockup-report-lost-v2.png`)**

---

### Report Found Item

Users who find something can use the **Report Found Item** page.

The form includes:

- Where the item was found  
- When it was found  
- Where it was turned in (e.g., Campus Center, Library, other official UH office)  
- Short description and optional photo  

This ensures items are turned in to official locations, and that the app communicates where owners should go to recover them.

**(IMAGE PLACEHOLDER: Report Found Item form mockup — for example, `images/mockup-report-found-v2.png`)**

---

### FAQ

The **FAQ page** answers common questions and explains the process step-by-step, such as:

- “What should I do if I lost something?”  
- “What should I do if I find something?”  
- “Where do I pick up items that have been turned in?”  
- “How long are items kept?”  
- “Is my name or email visible to other users?”  

The FAQ helps new users quickly understand how to use the app and how the campus lost-and-found system works.

**(IMAGE PLACEHOLDER: FAQ page mockup — for example, `images/mockup-faq-v2.png`)**

---

## Mockups

Design mockups will be stored under the `docs/images/` directory. Planned mockups include:

- **Landing Page mockup**  
  - (IMAGE PLACEHOLDER: `images/mockup-landing-v2.png`)  

- **Sign In / UH Login mockup**  
  - (IMAGE PLACEHOLDER: `images/mockup-sign-in-v2.png`)  

- **Item Feed mockup**  
  - (IMAGE PLACEHOLDER: `images/mockup-feed-v2.png`)  

- **Report Lost Item mockup**  
  - (IMAGE PLACEHOLDER: `images/mockup-report-lost-v2.png`)  

- **Report Found Item mockup**  
  - (IMAGE PLACEHOLDER: `images/mockup-report-found-v2.png`)  

- **FAQ Page mockup**  
  - (IMAGE PLACEHOLDER: `images/mockup-faq-v2.png`)  

When final screenshots are ready, each placeholder can be replaced with an actual image, for example:

**`![Landing Page](images/mockup-landing-v2.png)`**

---

## Architecture Overview

For **Milestone 1**, the focus is on:

- Defining user flows  
- Designing core pages  
- Creating mockups and this documentation page  

A high-level conceptual model includes:

### Item

Represents a lost or found item.

Example fields (conceptual):

- `type`: lost or found  
- `category`: ID, bottle, electronics, clothing, etc.  
- `description`: text description of the item  
- `location`: where it was lost or found  
- `timestamp`: when it was reported  
- `status`: planned states such as Open, Received, Ready for Pickup, Recovered  
- `photoUrl`: optional image  

### User

Represents a UH-authenticated student or staff member.

Conceptually:

- `uhEmail` or UH ID  
- Link to the items they have reported  

### Location

Represents official drop-off / pick-up locations, such as:

- Campus Center  
- Library  
- Other designated offices  

### FAQ / Content

Represents static content used to explain:

- How to report lost items  
- How to report found items  
- Where and how to recover items  

The exact database schema and backend implementation will be finalized in later milestones.

---

## Development History

We follow an **issue-driven project management** approach, using milestones and GitHub issues.

### Milestone 1 (M1): Mockups & Project Page

**Goals:**

- Define the problem and proposed solution  
- Design the main user flows and page structure  
- Create mockups for key pages  
- Build this project documentation page  

**Example M1 tasks (summarized):**

- Implement landing page mockup  
- Implement item feed mockup  
- Implement sign-in page mockups  
- Implement Lost Item form mockup  
- Implement Found Item form mockup  
- Implement FAQ page mockup  
- Create and refine the project page (`docs/index.md`)  

Milestone 1 emphasizes design and structure. Future milestones will focus more on full implementation, database integration, and admin workflows.

---

## Future Enhancements

Some planned or potential enhancements include:

- Admin dashboard for UH staff (view and manage items more efficiently)  
- Smarter matching between Lost and Found posts (for example, by category, description similarity, or location)  
- Email or in-app notifications when a likely match is created  
- Map-based visualization of where items are most commonly found or turned in  
- Recovery statistics, such as:  
  > “X items reunited with their owners this semester.”  

**(IMAGE PLACEHOLDER: future “stats” or “map” mockup, if created)**

---

## Team

**Manoa Lost & Found** is designed and developed by UH Mānoa students:

- **Jermaine Bruno**  
- **Michael Lau**  
- **Brandon Nguyen**  
- **Edward Uzueta**  
- **Justin Lai**
