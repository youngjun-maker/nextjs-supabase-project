import { ProfileView } from "@/components/features/profile/profile-view";
import { DEMO_ROLE } from "@/lib/demo-config";

export default function ProfilePage() {
  // DEMO_ROLE에 따라 variant 전달
  return <ProfileView variant={DEMO_ROLE === "participant" ? "participant" : "organizer"} />;
}
