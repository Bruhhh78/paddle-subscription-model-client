export const PLAN_MAP = {
    "pri_01kjhpqk173gteddh49xr0w5ff": "Monthly",
    "pri_01kjhpvh54yw0efjdejtae7hd7": "Quarterly",
    "pri_01kjhpy7h5yp81skqz2zbvbf2y": "Annual"
};

export const STATUS_STYLE = {
    active: { color: "green", label: "🟢 Active" },
    canceling: { color: "orange", label: "🟡 Will Cancel by Period End" },
    canceled: { color: "red", label: "🔴 Canceled" },
    past_due: { color: "orange", label: "🟠 Payment Issue" },
    inactive: { color: "gray", label: "⚪ Inactive" },
    pausing: { color: "blue", label: "🔵 Will Pause by Period End" },
    paused: { color: "darkblue", label: "🔷 Paused" },
};