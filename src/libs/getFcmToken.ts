import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

export const getFcmToken = async () => {
  try {
    if (!messaging) return null;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notif ditolak");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: "BK1VZE8X2OePax7q4FXWeuecFQJ4LYBenhyWPnVrtLukD7M9p936_A0H6j3FBl4bH84_bFWf0ArOKyjZeM-iAWw",
    });

    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Error ambil token:", error);
    return null;
  }
};