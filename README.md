# Manoa Lost & Found

> A UH Mānoa community app to report, browse, and recover lost items — built by students for students.

**Proposers:** Jermaine Bruno • Michael Lau • Brandon Nguyen • Edward Uzueta  
**Date:** November 4, 2025  

---

## 📘 Overview

### The Problem
Each semester, UH Mānoa students lose countless items — IDs, water bottles, textbooks, AirPods, and other valuables. While the university technically has a Lost & Found system, it’s inefficient and fragmented. The current process involves emailing departments, calling offices, or physically visiting locations like Campus Center or the Library. There’s no centralized platform for checking updates, leaving students frustrated and unsure if their lost items will ever be found.

### The Solution
**Manoa Lost & Found** is a centralized digital platform designed to simplify and unify the process of reporting and recovering lost items across UH Mānoa’s campus.  

Students and staff can:
- Post **Lost** or **Found** items with descriptions, images, and locations.
- Receive **notifications** when matching items are found.
- Use **UH authentication** for security and campus-only access.
- Route all physical returns through **official UH offices** for verified recovery.

This platform will drastically reduce confusion and improve item recovery efficiency for the UH community.

---

## 👥 Roles & Capabilities

### 🧑‍🎓 Users (Students & Staff)
- Create **Lost Item** reports including photo, category, description, and last-seen location/time.
- Set **alerts/preferences** (keywords, buildings, or item types).
- Access a **personal dashboard** showing “My Lost Items,” “My Found Items,” and “Matches & Alerts.”

### 🧾 Finders (Any Authenticated User)
- Post **Found Item** reports (photo, where/when found, where turned in).
- Use an in-app **“How to Turn In Items”** page that lists drop-off offices and instructions.
- Notify the rightful owner securely via UH email without direct contact.

### 🛠️ Admins (Campus Center / Library Staff)
- **Verify** items received at official drop-off points.
- Update item status (Received → Ready for Pickup → Recovered).
- **Flag duplicates**, moderate posts, and manage user roles.
- Configure **drop-off locations**, contact info, and office hours.

> All item exchanges are handled through official UH offices — no private handoffs.

---

## 💡 App Features (Milestone M1 Scope)

- UH-authenticated access (campus-only)
- Tabs for **Lost** and **Found** item feeds  
- Advanced filters: category, date, building, keyword  
- Create/Edit/Delete posts with photo uploads  
- Notification system for potential matches  
- Admin verification dashboard  
- “How to Turn In Items” instructions page  
- Locations directory (Campus Center, Library, etc.)  

---

## 🖼️ Mockups (Paper or Digital)

> For Milestone M1, simple **paper-and-pencil mockups** are fine.  
> Save them in `/docs/images/` and embed them like this:

- **Landing Page**  
  ![Landing mockup](docs/images/mockup-landing.jpg)

- **Lost/Found Feed with Filters**  
  ![Feed mockup](docs/images/mockup-feed.jpg)

- **User Dashboard (My Lost / My Found / Matches)**  
  ![Dashboard mockup](docs/images/mockup-dashboard.jpg)

- **Post Lost Item Form**  
  ![Post Lost mockup](docs/images/mockup-post-lost.jpg)

- **Post Found Item Form**  
  ![Post Found mockup](docs/images/mockup-post-found.jpg)

- **Item Details Page**  
  ![Item details mockup](docs/images/mockup-item-details.jpg)

- **Recovery Instructions**  
  ![Recovery instructions mockup](docs/images/mockup-recovery.jpg)

- **Admin Panel**  
  ![Admin mockup](docs/images/mockup-admin.jpg)

- **Locations & Offices Directory**  
  ![Locations mockup](docs/images/mockup-locations.jpg)

---

## 🧭 Example Use Cases

1. A student logs in with their UH account and lands on the dashboard.  
2. They report a lost item:  
   - **Category:** Bottle  
   - **Description:** Blue Hydroflask with straw and dog stickers  
   - **Last Seen:** POST Room 318  
   - **Photo:** Uploaded from phone  
3. Their post appears in the **Lost Items** feed and “My Lost Items.”  
4. They get an alert when someone uploads a Found item matching “Hydroflask.”  
5. The finder reports it, turns it in at Campus Center, and marks it “Delivered.”  
6. The admin verifies it and updates the item status to “Ready for Pickup.”  
7. The owner retrieves the item and the system logs a successful recovery.

---

## 🗃️ Data & Status Model (Draft)

### **Item**
| Field | Type | Description |
|-------|------|--------------|
| type | enum(`lost`, `found`) | Whether the item is lost or found |
| category | string | e.g., Electronics, Books, Clothing |
| description | text | Details about the item |
| photo[] | image | Uploaded images |
| location | string | Where item was last seen / turned in |
| status | enum(`Open`, `Received`, `Ready for Pickup`, `Recovered`) | Item progress |
| timestamps | datetime | Created & updated times |
| ownerId / finderId / verifiedBy | string | UH user IDs for each role |

### **Location**
- name, hours, contact, mapLink  

### **AlertPreference**
- userId, keywords[], categories[], buildings[]  

---

## 🧰 Proposed Tech Stack

| Component | Technology |
|------------|-------------|
| **Frontend** | React (Next.js) or Meteor + React |
| **Backend** | Node.js / Express |
| **Database** | MongoDB or Firebase Firestore |
| **Auth** | UH CAS / UH OIDC (campus SSO) |
| **Storage** | Cloud bucket for images |
| **Maps** | UH Campus Map or Google Maps integration |
| **Notifications** | UH email + in-app alerts |

> M1 focuses on **design, data model, and mockups**, not implementation yet.

---

## 🧱 Repository Structure


