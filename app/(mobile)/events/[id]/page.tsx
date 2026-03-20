interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        이벤트 상세
      </h1>
      <p className="mt-2 text-gray-500">이벤트 ID: {id}</p>
    </div>
  );
}
