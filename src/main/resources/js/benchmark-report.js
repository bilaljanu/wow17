/**
 * Benchmark report generator and template.
 *
 * Generates JSON reports in the standard format:
 * {
 *   "timestamp": "...",
 *   "scenario": "standard",
 *   "duration_ms": 60000,
 *   "fps": {"avg": 0, "min": 0, "max": 0, "p1": 0},
 *   "frameTime": {"avg_ms": 0, "p1_ms": 0, "p5_ms": 0, "max_ms": 0},
 *   "drawCalls": 0,
 *   "memory_mb": 0,
 *   "status": "no-renderer|rendering|world-loaded|playable"
 * }
 *
 * Also provides before/after comparison and report export.
 */

(function() {
    'use strict';

    const REPORT_VERSION = '1.0.0';
    const REPORT_DIR = '/home/bilal/wow17/benchmarks';

    /**
     * Standard report template — all fields present with zero values.
     * Use this as a baseline for before/after comparison.
     */
    function createTemplate() {
        return {
            timestamp: new Date().toISOString(),
            version: REPORT_VERSION,
            scenario: 'standard',
            duration_ms: 60000,
            fps: { avg: 0, min: 0, max: 0, p1: 0 },
            frameTime: { avg_ms: 0, p1_ms: 0, p5_ms: 0, p99_ms: 0, max_ms: 0 },
            drawCalls: 0,
            memory_mb: 0,
            status: 'no-renderer',
            rendererActive: false,
            worldLoaded: false,
            chunksLoaded: 0,
            totalChunks: 0,
            playerMoving: false,
            cameraTurning: false
        };
    }

    /**
     * Compare two reports and return a diff.
     * @param {Object} before - baseline report
     * @param {Object} after - new report
     * @returns {Object} diff with delta and percentage changes
     */
    function compare(before, after) {
        const diff = {
            timestamp: new Date().toISOString(),
            before: before.timestamp,
            after: after.timestamp,
            fps: {},
            frameTime: {},
            drawCalls: { delta: 0, pct: 0 },
            memory_mb: { delta: 0, pct: 0 },
            status: { before: before.status, after: after.status, changed: before.status !== after.status }
        };

        for (const key in after.fps) {
            const b = before.fps[key] || 0;
            const a = after.fps[key] || 0;
            diff.fps[key] = {
                before: b,
                after: a,
                delta: a - b,
                pct: b > 0 ? Math.round(((a - b) / b) * 100) : 0
            };
        }

        for (const key in after.frameTime) {
            const b = before.frameTime[key] || 0;
            const a = after.frameTime[key] || 0;
            diff.frameTime[key] = {
                before: b,
                after: a,
                delta: a - b,
                pct: b > 0 ? Math.round(((a - b) / b) * 100) : 0
            };
        }

        diff.drawCalls.delta = (after.drawCalls || 0) - (before.drawCalls || 0);
        diff.drawCalls.pct = before.drawCalls > 0
            ? Math.round(((after.drawCalls - before.drawCalls) / before.drawCalls) * 100)
            : 0;

        diff.memory_mb.delta = (after.memory_mb || 0) - (before.memory_mb || 0);
        diff.memory_mb.pct = before.memory_mb > 0
            ? Math.round(((after.memory_mb - before.memory_mb) / before.memory_mb) * 100)
            : 0;

        return diff;
    }

    /**
     * Download a report as a JSON file.
     * @param {Object} report
     * @param {string} filename
     */
    function downloadReport(report, filename) {
        const json = JSON.stringify(report, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'benchmark-' + Date.now() + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log('[Benchmark] Report downloaded:', a.download);
    }

    /**
     * Format a report as a human-readable string.
     * @param {Object} report
     * @returns {string}
     */
    function formatReport(report) {
        if (!report) return 'No report data';
        const lines = [
            '=== BENCHMARK REPORT ===',
            `Timestamp: ${report.timestamp}`,
            `Scenario: ${report.scenario}`,
            `Duration: ${report.duration_ms}ms`,
            `Status: ${report.status}`,
            `Renderer Active: ${report.rendererActive}`,
            `World Loaded: ${report.worldLoaded}`,
            `Chunks: ${report.chunksLoaded}/${report.totalChunks}`,
            `Player Moving: ${report.playerMoving}`,
            `Camera Turning: ${report.cameraTurning}`,
            '',
            '--- FPS ---',
            `  Average: ${report.fps.avg}`,
            `  Min:     ${report.fps.min}`,
            `  Max:     ${report.fps.max}`,
            `  1% Low:  ${report.fps.p1}`,
            '',
            '--- Frame Time (ms) ---',
            `  Average: ${report.frameTime.avg_ms}`,
            `  P1:      ${report.frameTime.p1_ms}`,
            `  P5:      ${report.frameTime.p5_ms}`,
            `  P99:     ${report.frameTime.p99_ms}`,
            `  Max:     ${report.frameTime.max_ms}`,
            '',
            `Draw Calls: ${report.drawCalls}`,
            `Memory: ${report.memory_mb} MB`,
            '========================'
        ];
        return lines.join('\n');
    }

    /**
     * Validate a report against the template schema.
     * @param {Object} report
     * @returns {boolean}
     */
    function validateReport(report) {
        if (!report || typeof report !== 'object') return false;
        const required = ['timestamp', 'scenario', 'duration_ms', 'fps', 'frameTime', 'drawCalls', 'memory_mb', 'status'];
        for (const key of required) {
            if (!(key in report)) return false;
        }
        if (!report.fps || typeof report.fps.avg !== 'number') return false;
        if (!report.frameTime || typeof report.frameTime.avg_ms !== 'number') return false;
        const validStatuses = ['no-renderer', 'rendering', 'world-loaded', 'playable'];
        if (!validStatuses.includes(report.status)) return false;
        return true;
    }

    // Expose public API
    window.BenchmarkReport = {
        createTemplate,
        compare,
        downloadReport,
        formatReport,
        validateReport,
        REPORT_VERSION
    };

    console.log('[Benchmark] Report template initialized');
})();