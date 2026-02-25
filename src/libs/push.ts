import apiServices from "@/service/api.service";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export const subscribePush = async () => {
  console.log("SUBSCRIBE FUNCTION CALLED");
  try {
    if (!("serviceWorker" in navigator)) return;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    const registration = await navigator.serviceWorker.ready;

    // 🔥 cek apakah sudah subscribe sebelumnya
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }

    const subJSON = subscription.toJSON();

    if (!subJSON.keys) {
      console.error("Push subscription keys not found");
      return;
    }

    await apiServices.pushNotification({
      endpoint: subJSON.endpoint,
      keys: {
        p256dh: subJSON.keys.p256dh || "",
        auth: subJSON.keys.auth || "",
      },
    });

    console.log("Push subscribed");
  } catch (error) {
    console.error("Subscribe push failed:", error);
  }
};
