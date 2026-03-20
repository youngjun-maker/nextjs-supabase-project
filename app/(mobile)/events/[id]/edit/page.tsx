interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        이벤트 수정
      </h1>
      <p className="mt-2 text-gray-500">이벤트 ID: {id} 수정 페이지입니다.</p>
    </div>
  );
}
