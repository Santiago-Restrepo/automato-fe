export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const ID = (await params).id;
  return <div>Flow: {ID}</div>;
}
