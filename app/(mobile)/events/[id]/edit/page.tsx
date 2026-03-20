export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { EventEditForm } from "@/components/features/events/event-edit-form";
import { getEventById } from "@/lib/dummy";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) notFound();
  return <EventEditForm event={event} />;
}
