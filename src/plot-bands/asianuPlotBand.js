import { winPlotBand, lossPlotBand } from './commonPlotBands';

// TODO: calculate average of N ticks
export default (contract) => [
    lossPlotBand('loss', 0, contract.barrier),
    winPlotBand('win', contract.barrier, Number.MAX_VALUE),
];