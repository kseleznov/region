import { PublicProfile } from "@/widgets/public-profile";

interface PublicProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  const { username } = await params;

  return <PublicProfile username={username} />;
}
