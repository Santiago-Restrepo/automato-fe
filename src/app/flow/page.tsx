import { getAllFlows } from "@/services/flow.service";

export default async function FlowsPage() {
  const data = await getAllFlows();
  return (
    <div className="mx-auto max-w-screen-xl p-4">
      <h1 className="text-3xl text-center text-gray-300 my-4 pb-4 font-bold border-b border-gray-500">
        Flows
      </h1>
      <ul className="mx-auto max-w-screen-xl p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((flow) => (
          <a
            key={flow.id}
            href={`/flow/${flow.id}`}
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Flow {flow.id}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {flow.name}
            </p>
          </a>
        ))}
      </ul>
    </div>
  );
}
