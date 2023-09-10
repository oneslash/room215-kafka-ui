<script lang="ts">
	// @ts-nocheck
	import { page } from "$app/stores";

	import { listen } from "@tauri-apps/api/event";
	import { invoke } from "@tauri-apps/api/tauri";
	import { getFromLocalStorage } from "../../../../lib/local-storage";

	let topics = [];

	async function list_events() {
		let bootstrap = getFromLocalStorage("bootstrap");
		let configs = getFromLocalStorage("configs");
		let topic = $page.params.slug;
		await invoke("get_events", { bootstrap, configs, topic }).then(
			(res) => {
				console.log(res);
			}
		);
	}

	list_events();
	listen("topics", (event) => {
		console.log(event);
		topics = [...topics,{
			key: event.payload.key,
			value: event.payload.value,
		}];
	});

</script>

<div class="min-h-full">
	<header class="bg-white shadow">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900">
				View {$page.params.slug}
			</h1>
			<a href = "/ui/" class="text-base font-medium text-blue-900 hover:text-blue-400">Back</a> &nbsp;
		</div>
	</header>
	<div class="flex flex-col">
		<div class="overflow-x-auto">
			<div class="p-1.5 min-w-full inline-block align-middle">
				<div class="overflow-hidden">
					<table
						class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
					>
						<thead>
							<tr>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
									>Key</th
								>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
									>JSON</th
								>
							</tr>
						</thead>
						<tbody
							class="divide-y divide-gray-200 dark:divide-gray-700"
						>
							{#each topics as topic}
								<tr>
									<td
										class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
									>
										<code>{topic.key}</code>
									</td>
									<td
										class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
									>
									  <div class="break-all">{JSON.stringify(topic.value)}</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
