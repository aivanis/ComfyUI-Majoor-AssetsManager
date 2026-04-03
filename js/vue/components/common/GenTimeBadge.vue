<script setup>
/**
 * GenTimeBadge.vue — Generation time badge overlay on asset thumbnails.
 * Replaces createGenTimeBadge() from Badges.js.
 */
import { computed } from "vue";
import { genTimeColor } from "../../../components/Badges.js";

const props = defineProps({
    genTimeMs: { type: Number, default: 0 },
});

const ms = computed(() => Number(props.genTimeMs) || 0);
const isValid = computed(() => ms.value > 0 && Number.isFinite(ms.value) && ms.value < 86_400_000);
const secs = computed(() => (ms.value / 1000).toFixed(1));
const color = computed(() => genTimeColor(ms.value));
</script>

<template>
    <div
        v-if="isValid"
        class="mjr-gentime-badge"
        :title="`Generation time: ${secs} seconds`"
        :style="{ color }"
    >
        {{ secs }}s
    </div>
</template>
