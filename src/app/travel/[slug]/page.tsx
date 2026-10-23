import { notFound } from "next/navigation";

import { TravelScenePage } from "@/features/travel/components/travel-scene-page";
import { getTravelScene, travelScenes } from "@/features/travel/model/content";

export function generateStaticParams() {
  return travelScenes.map((scene) => ({ slug: scene.id }));
}

export default async function TravelSceneRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scene = getTravelScene(slug);

  if (!scene) notFound();

  return <TravelScenePage scene={scene} />;
}
