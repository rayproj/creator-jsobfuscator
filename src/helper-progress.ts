import { Presets, SingleBar } from "cli-progress";

export function startProgressBar(total: number) {
    const progressBar = new SingleBar({}, Presets.shades_classic);
    progressBar.start(total, 0);
    return progressBar;
}