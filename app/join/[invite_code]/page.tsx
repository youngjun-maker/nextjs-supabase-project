interface JoinPageProps {
  params: Promise<{ invite_code: string }>;
}

export default async function JoinPage({ params }: JoinPageProps) {
  const { invite_code } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          이벤트 참여
        </h1>
        <p className="mt-2 text-gray-500">초대 코드: {invite_code}</p>
      </div>
    </div>
  );
}
