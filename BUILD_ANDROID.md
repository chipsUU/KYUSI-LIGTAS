# Building & Installing the KYUSI-LIGTAS Native Android APK

This guide explains how to generate the real, standalone native Android application (`.apk`) for the **KYUSI-LIGTAS** Resident Experience without developer tooling on your computer.

---

## What is in this APK?
The Android APK contains **exclusively** the resident mobile experience:
- **Direct Entry:** Opens straight into `ResidentAuth` (household onboarding / login).
- **Core Triage Terminal:** Advances to `ResidentMobileApp` (offline QR token passes, emergency routes, shelter headcount census, and disaster emergency go-bag checklist).
- **Zero Distractions:** Excludes the public landing page, marketing sections, BDRRMC command dashboard, and standalone download buttons.
- **Offline & Hardware-Ready:** Uses encrypted client-side storage with ISO-standard QR codes for optical scanners (e.g. ESP32-CAM and RC522 gate terminals).

---

## Method 1: Automatic Cloud Build via GitHub Actions (Recommended)

You don't need Android Studio or Java installed on your computer. GitHub will compile the APK for you in the cloud.

### Step 1: Push Code to GitHub
Push your repository to GitHub:
```bash
git add .
git commit -m "Add Capacitor Android project and mobile entry"
git push origin main
```

### Step 2: Download the APK
1. Open your repository on GitHub in your web browser.
2. Click on the **Actions** tab at the top.
3. In the left sidebar, click **Build KYUSI-LIGTAS Native Android APK**.
4. Click on the latest workflow run.
5. Scroll down to the **Artifacts** section at the bottom.
6. Click **`kyusi-ligtas-resident-debug.apk`** to download the compiled APK file (zipped).

### Step 3: Install the APK on Your Android Device
1. Transfer the `.apk` file to your phone via USB, Google Drive, WhatsApp, or Telegram (or open GitHub directly in Chrome on your phone).
2. Tap the downloaded `.apk` file.
3. If Android displays **"For your security, your phone is not allowed to install unknown apps from this source"**:
   - Tap **Settings**.
   - Toggle **Allow from this source** to ON.
   - Return and tap **Install**.
4. Tap **Open** to launch **KYUSI-LIGTAS** on your device.

---

## Method 2: Local Build via Android Studio

If you have Android Studio installed on your computer:

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Build the Android mobile bundle and synchronize Capacitor:
   ```bash
   npm run build:android
   ```

3. Open the Android project in Android Studio:
   ```bash
   npx cap open android
   ```
   *Or launch Android Studio, click **Open**, and select the `/android` folder in this repository.*

4. In Android Studio:
   - Wait for Gradle sync to complete.
   - Click **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
   - When finished, click **locate** in the popup notification to get your `app-debug.apk`.
   - To test directly on your phone: connect your phone via USB with *USB Debugging* enabled, and click the green **Run (▶)** button.

---

## Method 3: Command-Line Build (Linux / macOS / WSL)

If you have Java JDK 17 and Android SDK command-line tools installed:

```bash
npm install
npm run build:android
cd android
./gradlew assembleDebug
```
The compiled APK will be created at:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## Generating a Signed Release APK for Production

For official distribution or uploading to the Google Play Store:

1. Generate a keystore file (if you do not have one):
   ```bash
   keytool -genkey -v -keystore kyusi-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias kyusi-key
   ```
2. Place the keystore in your secure directory or configure GitHub Secrets:
   - `KEYSTORE_BASE64`
   - `KEYSTORE_PASSWORD`
   - `KEY_ALIAS`
   - `KEY_PASSWORD`
3. Run `./gradlew assembleRelease` inside the `android/` directory.
