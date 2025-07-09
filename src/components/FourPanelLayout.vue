<template>
	<div class="w-full h-full overflow-auto bg-grey text-white flex flex-col">
		<!-- Top Panel -->
		<div class="w-full border-b border-white/20">
			<slot name="top"> </slot>
		</div>

		<!-- Middle Section (Left and Right Panels) - Shared Scroll -->
		<div class="flex-1 overflow-auto min-h-0">
			<div class="grid grid-cols-1 lg:grid-cols-2 min-h-full">
				<!-- Left Panel -->
				<div class="p-8 lg:border-r lg:border-white/20">
					<slot name="left">
						<div class="text-center text-white/60 py-8">
							<h3 class="text-xl font-semibold mb-2">
								Left Panel
							</h3>
							<p>Left content goes here.</p>
						</div>
					</slot>
				</div>

				<!-- Right Panel -->
				<div class="p-8 lg:border-l lg:border-white/20">
					<slot name="right">
						<div class="text-center text-white/60 py-8">
							<h3 class="text-xl font-semibold mb-2">
								Right Panel
							</h3>
							<p>Right content goes here.</p>
						</div>
					</slot>
				</div>
			</div>
		</div>

		<!-- Bottom Panel -->
		<div class="w-full border-t border-white/20">
			<slot name="bottom"> </slot>
		</div>
	</div>
</template>
