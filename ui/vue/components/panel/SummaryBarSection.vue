<script setup>
/**
 * SummaryBarSection.vue — Phase-2→3 transition component for the summary bar.
 *
 * This replaces the previous renderless wrapper with a real Vue template while
 * keeping the same `defineExpose()` contract expected by `App.vue` and the
 * panel runtime: `{ summaryBar, updateSummaryBar, folderBreadcrumb }`.
 *
 * The controller layer still calls `updateSummaryBar()` imperatively for now.
 * That function synchronizes transient counts into Pinia and updates the Vue
 * view without changing the existing controller wiring.
 */
import { computed, onMounted, ref } from "vue";
import { createContextPillsView } from "../../../features/panel/views/contextPillsView.js";
import { t } from "../../../app/i18n.js";
import { usePanelStore } from "../../../stores/usePanelStore.js";
import { buildSummaryBarState } from "./summaryBarState.js";

const panelStore = usePanelStore();

const summaryBar = ref(null);
const folderBreadcrumb = ref(null);
const pillsHost = ref(null);
const summaryText = ref("");
const duplicateText = ref("");
const showDuplicateAlert = ref(false);
const breadcrumbVisible = ref(false);
const breadcrumbBack = ref(null);
const breadcrumbUp = ref(null);
const breadcrumbItems = ref([]);

const pillsView = createContextPillsView();

const normalizedKindFilter = computed(() => String(panelStore.kindFilter || "").trim().toLowerCase());
const mediaShortcuts = computed(() => {
    const typeLabel = t("label.type", "Type");
    return [
        {
            kind: "image",
            icon: "pi pi-image",
            title: `${typeLabel}: ${t("filter.images", "Images")}`,
        },
        {
            kind: "video",
            icon: "pi pi-video",
            title: `${typeLabel}: ${t("filter.videos", "Videos")}`,
        },
        {
            kind: "audio",
            icon: "pi pi-volume-up",
            title: `${typeLabel}: ${t("filter.audio", "Audio")}`,
        },
        {
            kind: "model3d",
            icon: "pi pi-box",
            title: `${typeLabel}: 3D`,
        },
    ];
});

let duplicateAlertAction = null;

function handleDuplicateAlertClick() {
    try {
        duplicateAlertAction?.();
    } catch (e) {
        console.debug?.(e);
    }
}

function isKindShortcutActive(kind) {
    return normalizedKindFilter.value === String(kind || "").trim().toLowerCase();
}

function notifyFiltersChanged() {
    try {
        window.dispatchEvent(new CustomEvent("mjr:filters-changed"));
    } catch (e) {
        console.debug?.(e);
    }
}

function toggleKindShortcut(kind) {
    const normalized = String(kind || "").trim().toLowerCase();
    if (!normalized) return;
    panelStore.kindFilter = isKindShortcutActive(normalized) ? "" : normalized;
    notifyFiltersChanged();
}

function updateSummaryBar({ state, gridContainer, context = null, actions = null } = {}) {
    const nextState = buildSummaryBarState({ state, gridContainer, context });

    panelStore.lastGridCount = nextState.shown;
    panelStore.lastGridTotal = nextState.total;
    panelStore.viewScope = nextState.activeScope;

    summaryText.value = nextState.summaryText;
    duplicateText.value = nextState.duplicateText;
    showDuplicateAlert.value = nextState.showDuplicates;
    duplicateAlertAction = nextState.showDuplicates
        ? () => {
              try {
                  actions?.onDuplicateAlertClick?.(context?.duplicatesAlert || null);
              } catch (e) {
                  console.debug?.(e);
              }
          }
        : null;

    try {
        pillsView.update({
            state,
            gridContainer,
            rawQuery: nextState.rawQuery,
            actions,
        });
    } catch (e) {
        console.debug?.(e);
    }
}

function setFolderBreadcrumb({
    visible = false,
    back = null,
    up = null,
    items = [],
} = {}) {
    breadcrumbVisible.value = !!visible;
    breadcrumbBack.value = back && typeof back === "object" ? back : null;
    breadcrumbUp.value = up && typeof up === "object" ? up : null;
    breadcrumbItems.value = Array.isArray(items)
        ? items
              .map((item) => ({
                  label: String(item?.label || ""),
                  target: String(item?.target || ""),
                  current: !!item?.current,
                  onClick: typeof item?.onClick === "function" ? item.onClick : null,
              }))
              .filter((item) => item.label)
        : [];
}

function runBreadcrumbAction(action) {
    if (!action || action.disabled || typeof action.onClick !== "function") return;
    try {
        action.onClick();
    } catch (e) {
        console.debug?.(e);
    }
}

onMounted(() => {
    try {
        pillsHost.value?.appendChild?.(pillsView.wrap);
    } catch (e) {
        console.debug?.(e);
    }
});

defineExpose({ summaryBar, updateSummaryBar, folderBreadcrumb, setFolderBreadcrumb });
</script>

<template>
    <div
        ref="folderBreadcrumb"
        class="mjr-folder-breadcrumb"
        :class="{ 'is-visible': breadcrumbVisible }"
        aria-label="Folder breadcrumb"
    >
        <MButton
            v-if="breadcrumbBack"
            type="button"
            class="mjr-btn-link mjr-folder-breadcrumb-action"
            severity="secondary"
            text
            :disabled="breadcrumbBack.disabled"
            @click="runBreadcrumbAction(breadcrumbBack)"
        >
            {{ breadcrumbBack.label }}
        </MButton>
        <MButton
            v-if="breadcrumbUp"
            type="button"
            class="mjr-btn-link mjr-folder-breadcrumb-action"
            severity="secondary"
            text
            :disabled="breadcrumbUp.disabled"
            @click="runBreadcrumbAction(breadcrumbUp)"
        >
            {{ breadcrumbUp.label }}
        </MButton>
        <span v-if="breadcrumbBack || breadcrumbUp" class="mjr-folder-breadcrumb-separator">
            |
        </span>
        <template v-for="(item, index) in breadcrumbItems" :key="`${item.target}:${index}`">
            <span v-if="index > 0" class="mjr-folder-breadcrumb-separator">/</span>
            <MButton
                type="button"
                class="mjr-btn-link mjr-folder-breadcrumb-segment"
                :class="{ 'is-current': item.current }"
                severity="secondary"
                text
                :disabled="item.current"
                @click="runBreadcrumbAction(item)"
            >
                {{ item.label }}
            </MButton>
        </template>
    </div>
    <div ref="summaryBar" class="mjr-am-summary" aria-live="polite">
        <div class="mjr-am-summary-left">
            <div class="mjr-am-summary-text">{{ summaryText }}</div>
        </div>
        <div class="mjr-am-summary-right">
            <div class="mjr-media-shortcuts" :aria-label="t('label.type', 'Type')" role="group">
                <MButton
                    v-for="shortcut in mediaShortcuts"
                    :key="shortcut.kind"
                    type="button"
                    class="mjr-icon-btn mjr-media-shortcut-btn"
                    severity="secondary"
                    text
                    rounded
                    :title="shortcut.title"
                    :aria-label="shortcut.title"
                    :aria-pressed="String(isKindShortcutActive(shortcut.kind))"
                    :class="{ 'mjr-context-active': isKindShortcutActive(shortcut.kind) }"
                    @click="toggleKindShortcut(shortcut.kind)"
                >
                    <i :class="shortcut.icon" aria-hidden="true" />
                </MButton>
            </div>
            <MButton
                v-if="showDuplicateAlert"
                type="button"
                class="mjr-am-dup-alert"
                severity="secondary"
                text
                :title="duplicateText"
                style="
                    padding: 2px 8px;
                    border: 1px solid var(--border-color, #555);
                    background: var(--comfy-menu-bg, #222);
                    color: var(--input-text, #eee);
                    border-radius: 999px;
                    cursor: pointer;
                "
                @click="handleDuplicateAlertClick"
            >
                {{ duplicateText }}
            </MButton>
            <div ref="pillsHost" />
        </div>
    </div>
</template>

<style scoped>
.mjr-folder-breadcrumb {
    --mjr-breadcrumb-accent: #56a8ff;
    --mjr-breadcrumb-current: #35d08b;
    display: none;
    align-items: center;
    gap: 4px;
    padding: 3px 6px;
    margin: 1px 0 3px;
    font-size: 11px;
    opacity: 0.78;
    overflow: auto;
    white-space: nowrap;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, var(--mjr-breadcrumb-accent) 22%, transparent);
    background: color-mix(
        in srgb,
        var(--mjr-breadcrumb-accent) 9%,
        transparent
    );
}

.mjr-folder-breadcrumb.is-visible {
    display: flex;
}

.mjr-folder-breadcrumb-action {
    padding: 2px 8px;
    border: 1px solid color-mix(in srgb, var(--mjr-breadcrumb-accent) 42%, transparent);
    border-radius: 6px;
    background: color-mix(in srgb, var(--mjr-breadcrumb-accent) 16%, transparent);
    color: color-mix(in srgb, var(--mjr-breadcrumb-accent) 78%, #ffffff);
    font: inherit;
}

.mjr-folder-breadcrumb-action:not(:disabled):hover {
    border-color: color-mix(in srgb, var(--mjr-breadcrumb-accent) 62%, transparent);
    background: color-mix(in srgb, var(--mjr-breadcrumb-accent) 24%, transparent);
}

.mjr-folder-breadcrumb-segment {
    max-width: 220px;
    min-width: 0;
    padding: 1px 5px;
    border: 1px solid transparent;
    border-radius: 5px;
    background: color-mix(in srgb, var(--mjr-breadcrumb-accent) 8%, transparent);
    color: color-mix(in srgb, var(--mjr-breadcrumb-accent) 76%, #ffffff);
    font: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mjr-folder-breadcrumb-segment:not(:disabled):hover {
    border-color: color-mix(in srgb, var(--mjr-breadcrumb-accent) 38%, transparent);
    background: color-mix(in srgb, var(--mjr-breadcrumb-accent) 16%, transparent);
}

.mjr-folder-breadcrumb-segment.is-current,
.mjr-folder-breadcrumb-segment:disabled {
    border-color: color-mix(in srgb, var(--mjr-breadcrumb-current) 38%, transparent);
    background: color-mix(in srgb, var(--mjr-breadcrumb-current) 14%, transparent);
    color: color-mix(in srgb, var(--mjr-breadcrumb-current) 74%, #ffffff);
    cursor: default;
}

.mjr-folder-breadcrumb-separator {
    color: color-mix(in srgb, var(--mjr-breadcrumb-accent) 58%, var(--mjr-muted, rgba(255, 255, 255, 0.62)));
    opacity: 0.9;
}

.mjr-media-shortcuts {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
}

.mjr-media-shortcut-btn {
    width: 24px;
    height: 24px;
}

.mjr-media-shortcut-btn .pi {
    font-size: 11px;
}
</style>
