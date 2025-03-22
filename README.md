# **EchoCast - Podcast Streaming App**

## **Overview**  
EchoCast is a modern, minimalistic, and fully responsive podcast streaming application built with **Next.js**, **ShadCN**, **TypeScript**, and **Tailwind CSS**. It allows users to explore, favorite, and listen to their favorite podcasts in a seamless and user-friendly environment.  

---

## **Features**  
✅ **Dark Mode Support** - Easily switch between light and dark themes using the built-in toggle.  
✅ **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices.  
✅ **Favorites System** - Users can mark podcasts as favorites for easy access.  
✅ **Podcast Streaming** - Browse and stream various podcasts effortlessly.  
✅ **Modern UI/UX** - A sleek, accessible, and intuitive interface.  

---

## **Pages & Functionality**  

### 🏠 **Home Page**  
- Displays a list of featured and trending podcasts.  
- Provides a search bar for users to find specific podcasts.  

### ⭐ **Favorites Page**  
- Shows a list of podcasts that the user has marked as favorites.  
- Allows users to remove items from their favorites list.  

### 🎙️ **Podcasts Page**  
- Displays a catalog of available podcasts.  
- Provides detailed information about each podcast.  
- Allows users to play and stream podcast episodes.  

### 📊 **Dashboard Page**  
- **User Stats Overview** - Displays an overview of user activity, such as total listening time, number of favorited podcasts, and last played episodes.  
- **Listening History** - Shows a log of recently played episodes.  
- **Top Podcasts** - Highlights the most listened-to podcasts by the user.  
- **Recommended Podcasts** - Displays personalized podcast suggestions (feature in progress).  
- **Account Information** - Users can see their profile details and authentication status.  

> **Note:**  
> - **User Data (such as authentication details) is real**, but other dashboard statistics (like total listening time and recommended podcasts) use **dummy data** for now.  
> - **Bio information is also currently placeholder text** and will be replaced with actual user input in the future.  

---

## **User Stories**  

### **General User Stories**  
- [x] Browse and explore different podcasts.  
- [x] Search for specific podcasts by name or category.  
- [x] Sort podcasts in ascending or descending order.  
- [x] Play podcast episodes directly in the app (same audio for all episodes).  
- [x] Mark podcasts as favorites for easy access later.  
- [x] View a list of my favorited podcasts on a dedicated page.  
- [x] Remove a podcast from my favorites list when I no longer want it.  
- [x] Toggle between light and dark mode for better visual comfort.  
- [x] Enjoy a seamless, modern, and intuitive user experience.  
- [x] Experience a responsive design that adapts seamlessly across mobile, tablet, and desktop devices.  
- [ ] See detailed podcast information, including description, host details, episode count, and listener ratings.  
- [x] Access a dedicated episode page for each podcast, where I can see show notes and timestamps.  
- [ ] Download episodes for offline listening.  
- [ ] Share a podcast or episode via social media or direct links.  
- [x] Adjust playback speed (e.g., 1.0x, 1.5x, 2.0x).  
- [x] Switch between grid and list views when browsing podcasts for a better user experience.  
- [x] Experience smooth animations and transitions for a modern and polished UI.  

---

### **Dashboard-Specific User Stories**  
- [ ] View my total listening time and number of podcasts listened to.  
- [ ] See a list of my recently played podcast episodes.  
- [ ] Check which podcasts I’ve favorited the most.  
- [ ] View a summary of my podcast listening habits over time.  
- [ ] Receive recommended podcasts based on my listening preferences (coming soon).  
- [x] Access my profile details and authentication status in the dashboard.  
- [x] See dummy data placeholders for stats until real tracking is implemented.  
- [ ] Filter my listening history by time (e.g., last week, last month).  
- [ ] See upcoming new features for tracking personal podcast stats.  

---

### **Authentication & User Management (Firebase Auth)**  
- [x] Sign up and log in using email/password or Google authentication.  
- [x] Log out securely from the app.  
- [x] Reset my password if I forget it via email verification.  
- [ ] Update my profile details (username, avatar, email).  
- [ ] Delete my account and associated data if I choose to.  
- [x] See a personalized welcome message or dashboard after logging in.  

---

### **Enhanced Podcast & Episode Management (MongoDB Storage)**  
- [ ] Upload and manage my own podcast episodes if I’m a creator.  
- [ ] Edit or delete my uploaded episodes as a podcast creator.  
- [ ] Manage my podcast metadata (title, description, category, artwork).  
- [ ] View analytics on my podcast, including listener count and engagement.  

---

### **Advanced Playback & Listening Experience**  
- [ ] Use **server-side session storage** to sync playback position across devices.  
- [ ] Auto-play the next episode in a series.  
- [ ] Enable **smart resume**, which starts the episode a few seconds before where I left off.  
- [ ] Have an audio equalizer with customizable settings (e.g., bass boost, treble control).  
- [ ] Support **transcripts** for episodes, allowing users to read along.  

---

### **Social & Community Features**  
- [ ] Leave ratings and reviews for podcasts.  
- [ ] Follow other users and see what they’re listening to.  
- [ ] Comment on episodes and participate in discussions.  
- [ ] Join live audio rooms for real-time discussions on trending topics.  

---

### **Notifications & Updates**  
- [ ] Get push notifications when a new episode from my favorite podcast is released.  
- [ ] Receive updates when someone interacts with my content (likes, comments, follows).  
- [ ] Set reminders for upcoming podcast releases.  

---

### **Admin & Moderation (For Admin Users)**  
- [ ] Manage reported content (flag inappropriate comments, podcasts).  
- [ ] Verify and approve new podcast submissions.  
- [ ] Ban users violating community guidelines.  

---

### **Performance & Optimization**  
- [ ] Lazy-load images and audio files for faster browsing.  
- [ ] Use caching and indexing in MongoDB for improved query performance.  

---

## **Tech Stack**  
- **Frontend:** Next.js, TypeScript, Tailwind CSS, Framer Motion  
- **UI Components:** ShadCN  
- **State Management:** Still to decide (considering options like Zustand, Redux, or Context API)  
- **Backend:** Firebase, MongoDB, Next.js APIs  
- **Data Visualization:** Recharts  



## Installation & Setup
bash
# Clone the repository
git clone https://github.com/NelsonMALGAS/EchoCast.git

# Navigate into the project directory
cd EchoCast

# Install dependencies
npm install  # or yarn install

# Start the development server
npm run dev  # or yarn dev


## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to create an issue or submit a pull request.


---
🚀 **Enjoy streaming your favorite podcasts with EchoCast!** 🎧